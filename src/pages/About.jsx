const About = () => {
	return (
		<div className="bg-yellow-200 max-w-xl mx-auto p-4 rounded-md">
			<h1 className="text-2xl font-bold mb-4">About Expense Tracker</h1>
			
			<div className="bg-white rounded-lg p-4 mb-4 shadow-md">
				<h2 className="text-xl font-semibold mb-2">What is Expense Tracker?</h2>
				<p className="mb-4">
					Expense Tracker is a simple yet powerful tool to help you manage your personal finances.
					Keep track of your income and expenses, and maintain a clear view of your financial status.
				</p>

				<h2 className="text-xl font-semibold mb-2">Features</h2>
				<ul className="list-disc list-inside mb-4">
					<li>Track income and expenses</li>
					<li>Real-time balance calculation</li>
					<li>Transaction history</li>
					<li>Edit and delete transactions</li>
					<li>Color-coded entries for easy visualization</li>
				</ul>

				<h2 className="text-xl font-semibold mb-2">How to Use</h2>
				<p className="mb-4">
					Simply add your transactions using the form below the balance display.
					Positive amounts represent income, while negative amounts represent expenses.
					You can edit or delete any transaction from the history section.
				</p>
				<h2 className="text-center text-xl font-semibold mt-5 mb-2">Honorable Mention</h2>
			  <img src="./assets/horse.png" alt="Horse" className="w-1/2 mx-auto" />
			  <i className="text-center block">Kabayong nakaupo</i>
			</div>

			<div className="text-center text-gray-600 mt-4">
				Created by: JP
			</div>
		</div>
	);
};

export default About;