import { useState, useEffect } from "react";
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
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem('transactions');
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [editingTransaction, setEditingTransaction] = useState(null);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);


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
    if (editingTransaction && transaction.id === editingTransaction.id) {
      // If we're updating an existing transaction
      setTransactions(
        transactions.map((t) =>
          t.id === transaction.id ? transaction : t
        )
      );
      setEditingTransaction(null);
    } else {
      // If we're starting to edit a transaction
      setEditingTransaction(transaction);
    }
  };

  const getBalance = () => {
    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
        <div className="max-w-xl mx-auto backdrop-blur-lg bg-white/30 p-6 rounded-xl shadow-xl border border-white/30">
          <Header />
          <nav className="mb-6">
            <ul className="flex gap-6 justify-center">
              <li>
                <Link to="/" className="text-white hover:text-gray-200 transition-colors font-semibold">Home</Link>
              </li>
              <li>
                <Link to="/about" className="text-white hover:text-gray-200 transition-colors font-semibold">About</Link>
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
          </div>
        </Router>
  );
};

export default App;
