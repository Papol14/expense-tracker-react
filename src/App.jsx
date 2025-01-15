import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Balance from "./components/Balance";
import History from "./components/History";
import TransactionForm from "./components/TransactionForm";
import About from "./pages/About";

const HomePage = ({ transactions, deleteTransaction, editTransaction, addTransaction, editingTransaction, getBalance }) => {
  return (
    <>
      <Balance balance={getBalance()} />
      <History 
        transactions={transactions} 
        onDelete={deleteTransaction}
        onEdit={editTransaction}
      />
      <TransactionForm 
        addTransaction={addTransaction} 
        editingTransaction={editingTransaction}
      />
    </>
  );
};

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const addTransaction = (transaction) => {
    if (editingTransaction) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id ? transaction : t
        )
      );
      setEditingTransaction(null);
    } else {
      setTransactions([transaction, ...transactions]);
    }
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const editTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const getBalance = () => {
    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  };

  return (
    <Router>
      <div className="bg-yellow-200 max-w-xl mx-auto p-4 rounded-md">
        <Header />
        <nav className="mb-4">
          <ul className="flex gap-4 justify-center">
            <li>
              <Link to="/" className="text-blue-600 hover:text-blue-800">Home</Link>
            </li>
            <li>
              <Link to="/about" className="text-blue-600 hover:text-blue-800">About</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route 
            path="/" 
            element={
              <HomePage 
                transactions={transactions}
                deleteTransaction={deleteTransaction}
                editTransaction={editTransaction}
                addTransaction={addTransaction}
                editingTransaction={editingTransaction}
                getBalance={getBalance}
              />
            } 
          />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
