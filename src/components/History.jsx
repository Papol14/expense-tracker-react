import { useState } from 'react';

const History = ({ transactions, onDelete, onEdit }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    description: '',
    amount: 0
  });

  const handleEdit = (transaction) => {
    setEditingId(transaction.id);
    setEditForm({
      description: transaction.description,
      amount: transaction.amount
    });
  };

  const handleSave = (id) => {
    onEdit({
      ...editForm,
      id: id
    });
    setEditingId(null);
  };

  return (
    <div className="p-2">
      <h3 className="m-1">History</h3>
      <ul>
        {transactions.map((transaction) => (
          <li 
            className={`m-1 rounded-md p-2 ${
              transaction.amount < 0 ? 'bg-red-200' : 'bg-green-200'
            } flex justify-between items-center`} 
            key={transaction.id}
          >
            {editingId === transaction.id ? (
              <>
                <div className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={editForm.description}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="p-1 rounded flex-1"
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    value={editForm.amount}
                    onChange={(e) => setEditForm({...editForm, amount: parseFloat(e.target.value)})}
                    className="p-1 rounded w-24"
                    step="0.01"
                  />
                </div>
                <div className="flex gap-2 ml-2">
                  <button
                    onClick={() => handleSave(transaction.id)}
                    className="p-1 px-2 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="p-1 px-2 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  {transaction.description}{" "}
                  <span>
                    {transaction.amount > 0 ? "+" : ""}$
                    {transaction.amount.toFixed(2)}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(transaction)}
                    className="p-1 px-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(transaction.id)}
                    className="p-1 px-2 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
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
