const Balance = ({ balance }) => {
  return (
    <div className="bg-gray-100 p-4 shadow-md text-center">
      <h2 className="text-lg font-semibold">Your Balance</h2>
      <h3 className={`text-2xl font-bold ${balance < 0 ? 'text-red-600' : 'text-green-600'}`}>
        ${balance.toFixed(2)}
      </h3>
    </div>
  );
};

export default Balance;
