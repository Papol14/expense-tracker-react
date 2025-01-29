const Balance = ({ balance }) => {
  return (
    <div className="backdrop-blur-md bg-white/20 p-6 rounded-xl shadow-lg border border-white/30 mb-6">
      <h2 className="text-lg font-semibold text-white mb-2">Your Balance</h2>
      <h3 className={`text-3xl font-bold ${
        balance < 0 ? 'text-red-400' : 'text-green-400'
      } transition-colors`}>
        ${balance.toFixed(2)}
      </h3>
    </div>
  );
};

export default Balance;
