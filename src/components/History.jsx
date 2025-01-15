const History = ({ transactions, onDelete, onEdit }) => {
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
            <div>
              {transaction.description}{" "}
              <span>
                {transaction.amount > 0 ? "+" : ""}$
                {transaction.amount.toFixed(2)}
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(transaction)}
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
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
