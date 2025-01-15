import { useState } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import History from "./components/History";
import TransactionForm from "./components/TransactionForm";

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const addTransaction = (transaction) => {
    if (editingTransaction) {
      // Update existing transaction
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id ? transaction : t
        )
      );
      setEditingTransaction(null);
    } else {
      // Add new transaction
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
    <div className="bg-yellow-200 max-w-xl mx-auto p-4 rounded-md">
      <Header />
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
    </div>
  );
};

export default App;
