import { Wallet as WalletIcon, TrendingUp, TrendingDown, Coins } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/Navbar';

const Wallet = () => {
  const { coinBalance, transactions } = useApp();

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">My Wallet</h1>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl shadow-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <WalletIcon className="h-8 w-8" />
              <span className="text-lg font-semibold">Coin Balance</span>
            </div>
            <Coins className="h-10 w-10 opacity-50" />
          </div>
          <div className="text-5xl font-bold mb-2">{coinBalance}</div>
          <p className="text-orange-100 text-sm">
            ≈ ₹{(coinBalance * 0.5).toFixed(2)} discount value
          </p>
          <div className="mt-4 pt-4 border-t border-orange-400/30">
            <p className="text-orange-100 text-sm">
              Earn more coins by playing games and shopping with us!
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center space-x-2">
            <span>Transaction History</span>
          </h2>

          {transactions.length > 0 ? (
            <div className="space-y-3">
              {transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-full ${
                        transaction.type === 'earned'
                          ? 'bg-green-100'
                          : 'bg-red-100'
                      }`}
                    >
                      {transaction.type === 'earned' ? (
                        <TrendingUp className="h-5 w-5 text-green-600" />
                      ) : (
                        <TrendingDown className="h-5 w-5 text-red-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">
                        {transaction.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.date)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-bold text-lg ${
                        transaction.type === 'earned'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'earned' ? '+' : '-'}
                      {transaction.amount}
                    </p>
                    <p className="text-xs text-gray-500">coins</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Coins className="h-16 w-16 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No transactions yet</p>
              <p className="text-gray-400 text-sm mt-1">
                Start shopping and playing games to earn coins!
              </p>
            </div>
          )}
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-6">
          <h3 className="font-bold text-blue-900 mb-3 flex items-center space-x-2">
            <Coins className="h-5 w-5" />
            <span>How to Earn Coins?</span>
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Play quiz games and earn up to 100 coins per game</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Get daily login bonuses</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Refer friends and earn bonus coins</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Use 100 coins to save ₹50 on your orders!</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
