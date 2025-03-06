import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import Header from "./components/Header";
import Balance from "./components/Balance";
import History from "./components/History";
import TransactionForm from "./components/TransactionForm";
import About from "./pages/About";
import DocumentHead from "./components/DocumentHead";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = ({
  transactions,
  deleteTransaction,
  editTransaction,
  addTransaction,
  editingTransaction,
  editForm,
  handleEditFormChange,
  handleSave,
  handleCancel,
  getBalance,
}) => {
  return (
    <>
      <DocumentHead 
        title="Expense Tracker" 
        description="Track your income and expenses with this simple and powerful expense tracker application."
      />
      <Balance balance={getBalance()} />
      <History
        transactions={transactions}
        onDelete={deleteTransaction}
        onEdit={editTransaction}
        editForm={editForm}
        onEditFormChange={handleEditFormChange}
        onSave={handleSave}
        onCancel={handleCancel}
        editingTransaction={editingTransaction}
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
    const savedTransactions = localStorage.getItem("transactions");
    return savedTransactions ? JSON.parse(savedTransactions) : [];
  });
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [editForm, setEditForm] = useState({
    description: "",
    amount: 0,
  });

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const handleEditFormChange = (field, value) => {
    setEditForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = (id) => {
    const updatedTransaction = {
      ...editForm,
      id: id,
      amount: parseFloat(editForm.amount),
    };
    setTransactions(
      transactions.map((t) => (t.id === id ? updatedTransaction : t))
    );
    setEditingTransaction(null);
    setEditForm({ description: "", amount: 0 });
    toast.success("Transaction updated successfully!");
  };

  const handleCancel = () => {
    setEditingTransaction(null);
    setEditForm({ description: "", amount: 0 });
    toast.info("Edit canceled.");
  };

  const addTransaction = (transaction) => {
    if (editingTransaction) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id ? transaction : t
        )
      );
      setEditingTransaction(null);
      toast.success("Transaction updated successfully!");
    } else {
      setTransactions([transaction, ...transactions]);
      toast.success("Transaction added successfully!");
    }
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
    toast.error("Transaction deleted.");
  };

  const editTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setEditForm({
      description: transaction.description,
      amount: transaction.amount,
    });
    toast.info("Editing transaction...");
  };

  const getBalance = () => {
    return transactions.reduce((acc, curr) => acc + curr.amount, 0);
  };

  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-yellow-500 to-red-500 p-4 sm:p-8">
          <div className="w-full max-w-xl mx-auto backdrop-blur-lg bg-white/60 p-4 sm:p-6 rounded-xl shadow-xl border border-white/30">
            <Header />
            <nav className="mb-4 sm:mb-6">
              <ul className="flex gap-4 sm:gap-6 justify-center p-4">
                <li>
                  <Link
                    to="/"
                    className="bg-blue-400 p-2 rounded-md  hover:text-gray-200 transition-colors font-semibold text-sm sm:text-base"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="bg-blue-400 p-2 rounded-md  hover:text-gray-200 transition-colors font-semibold text-sm sm:text-base"
                  >
                    About
                  </Link>
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
                    editForm={editForm}
                    handleEditFormChange={handleEditFormChange}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                    getBalance={getBalance}
                  />
                }
              />
              <Route path="/about" element={<About />} />
            </Routes>
          </div>
        </div>
        <ToastContainer />
      </Router>
    </HelmetProvider>
  );
};

export default App;
