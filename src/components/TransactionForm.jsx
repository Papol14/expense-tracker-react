import React, { useState } from "react";

const TransactionForm = ({ addTransaction }) => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!description || !amount) {
      alert("Please fill in both fields");
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 1000000),
      description,
      amount: parseFloat(amount),
    };

    addTransaction(newTransaction);
    setDescription("");
    setAmount("");
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-4">Add New Transaction</h3>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label htmlFor="description" className="mb-1 font-medium">
            Name
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter text..."
            required
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="amount" className="mb-1 font-medium">
            Amount
          </label>
          <span className="text-sm text-gray-500 mb-1">
            (negative-expense, positive-income)
          </span>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            required
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
