const Balance = ({ balance }) => {
  return (
    <div className="backdrop-blur-md bg-white/20 p-4 sm:p-6 rounded-xl shadow-lg border border-white/30 mb-4 sm:mb-6">
      <h2 className="text-base sm:text-lg font-semibold mb-2">Your Balance</h2>
      <h3 className={`text-2xl sm:text-3xl font-bold ${
        balance < 0 ? 'text-red-400' : 'text-green-400'
      } transition-colors`}>
        ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
      </h3>
    </div>
  );
};

export default Balance;
