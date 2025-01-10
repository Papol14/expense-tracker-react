import { useState } from "react";
import Header from "./components/Header";
import Balance from "./components/Balance";
import History from "./components/History";
import TransactionForm from "./components/TransactionForm";

const App = () => {
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (transaction) => {
    setTransactions([transaction, ...transactions]);
  };

  const getBalance = () => {
    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  };

  return (
    <div className="bg-yellow-200 max-w-xl mx-auto p-4">
      <Header />
      <Balance balance={getBalance()} />
      <History transactions={transactions} />
      <TransactionForm addTransaction={addTransaction} />
    </div>
  );
};

export default App;
