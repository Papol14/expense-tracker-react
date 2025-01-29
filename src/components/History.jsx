const History = ({ 
  transactions, 
  onDelete, 
  onEdit, 
  editForm, 
  onEditFormChange, 
  onSave, 
  onCancel,
  editingTransaction 
}) => {
  return (
    <div className="backdrop-blur-md bg-white/20 p-4 sm:p-6 rounded-xl shadow-lg border border-white/30">
      <h3 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">History</h3>
      {transactions.length === 0 ? (
        <div className="text-white text-center py-3 sm:py-4 backdrop-blur-sm bg-white/10 rounded-lg text-sm sm:text-base">
          No records found
        </div>
      ) : (
        <ul className="space-y-3">
          {transactions.map((transaction) => (
            <li 
              className={`backdrop-blur-sm ${
                transaction.amount < 0 
                  ? 'bg-red-400/30 border-red-400/50' 
                  : 'bg-green-400/30 border-green-400/50'
              } rounded-lg p-3 sm:p-4 border transition-all hover:shadow-md`} 
              key={transaction.id}
            >
              {editingTransaction?.id === transaction.id ? (
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full">
                    <input
                      type="text"
                      value={editForm.description}
                      onChange={(e) => onEditFormChange('description', e.target.value)}
                      className="p-2 rounded-lg bg-white/70 border border-white/30 backdrop-blur-sm w-full focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                      placeholder="Description"
                    />
                    <input
                      type="number"
                      value={editForm.amount}
                      onChange={(e) => onEditFormChange('amount', e.target.value)}
                      className="p-2 rounded-lg bg-white/70 border border-white/30 backdrop-blur-sm w-full sm:w-32 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm sm:text-base"
                      step="0.01"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onSave(transaction.id)}
                      className="p-2 px-3 sm:px-4 text-xs sm:text-sm bg-green-500/80 hover:bg-green-600/80 text-white rounded-lg backdrop-blur-sm transition-colors flex-1 sm:flex-none"
                    >
                      Save
                    </button>
                    <button
                      onClick={onCancel}
                      className="p-2 px-3 sm:px-4 text-xs sm:text-sm bg-gray-500/80 hover:bg-gray-600/80 text-white rounded-lg backdrop-blur-sm transition-colors flex-1 sm:flex-none"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between gap-2 sm:gap-3 sm:items-center">
                  <div className="text-white text-sm sm:text-base">
                    <span className="font-medium">{transaction.description}</span>
                    <span className="ml-2 font-semibold">
                      {transaction.amount > 0 ? "+" : ""}${transaction.amount.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => onEdit(transaction)}
                      className="p-2 px-3 sm:px-4 text-xs sm:text-sm bg-blue-500/80 hover:bg-blue-600/80 text-white rounded-lg backdrop-blur-sm transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(transaction.id)}
                      className="p-2 px-3 sm:px-4 text-xs sm:text-sm bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg backdrop-blur-sm transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );

};

export default History;
