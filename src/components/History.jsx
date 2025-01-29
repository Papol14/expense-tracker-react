import { useState } from 'react';

const History = ({ transactions, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    description: '',
    amount: 0
  });

  const handleEdit = (transaction) => {
    if (editingId === null) {
      setEditingId(transaction.id);
      setEditForm({
        description: transaction.description,
        amount: transaction.amount,
        id: transaction.id
      });
    }
  };

  const handleSave = (id) => {
    onEdit({
      ...editForm,
      id: id,
      amount: parseFloat(editForm.amount) // Ensure amount is a number
    });
    setEditingId(null);
    setEditForm({ description: '', amount: 0 });
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({ description: '', amount: 0 });
  };

  return (
    <div className="backdrop-blur-md bg-white/20 p-6 rounded-xl shadow-lg border border-white/30">
      <h3 className="text-xl font-semibold text-white mb-4">History</h3>
      <ul className="space-y-3">
        {transactions.map((transaction) => (
          <li 
            className={`backdrop-blur-sm ${
              transaction.amount < 0 
                ? 'bg-red-400/30 border-red-400/50' 
                : 'bg-green-400/30 border-green-400/50'
            } rounded-lg p-4 border transition-all hover:shadow-md flex justify-between items-center`} 
            key={transaction.id}
          >
            {editingId === transaction.id ? (
              <>
                <div className="flex gap-3 flex-1">
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="p-2 rounded-lg bg-white/70 border border-white/30 backdrop-blur-sm flex-1 focus:outline-none focus:ring-2 focus:ring-white/50"
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({...editForm, amount: e.target.value})}
                    className="p-2 rounded-lg bg-white/70 border border-white/30 backdrop-blur-sm w-28 focus:outline-none focus:ring-2 focus:ring-white/50"
                    step="0.01"
                  />
                </div>
                <div className="flex gap-2 ml-3">
                  <button
                    onClick={() => handleSave(transaction.id)}
                    className="p-2 px-4 text-sm bg-green-500/80 hover:bg-green-600/80 text-white rounded-lg backdrop-blur-sm transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 px-4 text-sm bg-gray-500/80 hover:bg-gray-600/80 text-white rounded-lg backdrop-blur-sm transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-white">
                  <span className="font-medium">{transaction.description}</span>
                  <span className="ml-2 font-semibold">
                    {transaction.amount > 0 ? "+" : ""}${transaction.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="p-2 px-4 text-sm bg-blue-500/80 hover:bg-blue-600/80 text-white rounded-lg backdrop-blur-sm transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-2 px-4 text-sm bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg backdrop-blur-sm transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
