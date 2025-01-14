const History = ({ transactions }) => {
  return (
    <div className="p-2">
      <h3 className="m-1">History</h3>
      <ul>
        {transactions.map((transaction) => (
            <li 
            className={`m-1 rounded-md p-2 ${
              transaction.amount < 0 ? 'bg-red-200' : 'bg-green-200'
            }`} 
            key={transaction.id}
            >
            {transaction.description}{" "}
            <span>
              {transaction.amount > 0 ? "+" : ""}$
              {transaction.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default History;
