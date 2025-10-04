import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Wallet, Gamepad2, Home, User, LogOut } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const Navbar = () => {
  const location = useLocation();
  const { cart, coinBalance, user, setUser } = useApp();
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    setUser(null);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-white rounded-full p-2">
              <ShoppingCart className="h-6 w-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold">CoinCart</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${
                isActive('/') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Home className="h-5 w-5" />
              <span>Products</span>
            </Link>
            <Link
              to="/games"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${
                isActive('/games') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Gamepad2 className="h-5 w-5" />
              <span>Games</span>
            </Link>
            <Link
              to="/wallet"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition ${
                isActive('/wallet') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <Wallet className="h-5 w-5" />
              <span>{coinBalance} Coins</span>
            </Link>
            <Link
              to="/cart"
              className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition relative ${
                isActive('/cart') ? 'bg-white/20' : 'hover:bg-white/10'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Cart</span>
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </Link>
            <div className="flex items-center space-x-3 pl-3 border-l border-white/30">
              <span className="text-sm">{user?.name}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-white/10 transition"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center h-16">
          <Link
            to="/"
            className={`flex flex-col items-center justify-center flex-1 ${
              isActive('/') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Products</span>
          </Link>
          <Link
            to="/games"
            className={`flex flex-col items-center justify-center flex-1 ${
              isActive('/games') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Gamepad2 className="h-6 w-6" />
            <span className="text-xs mt-1">Games</span>
          </Link>
          <Link
            to="/wallet"
            className={`flex flex-col items-center justify-center flex-1 ${
              isActive('/wallet') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <Wallet className="h-6 w-6" />
            <span className="text-xs mt-1">Wallet</span>
          </Link>
          <Link
            to="/cart"
            className={`flex flex-col items-center justify-center flex-1 relative ${
              isActive('/cart') ? 'text-blue-600' : 'text-gray-600'
            }`}
          >
            <ShoppingCart className="h-6 w-6" />
            <span className="text-xs mt-1">Cart</span>
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-6 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemsCount}
              </span>
            )}
          </Link>
          <button
            onClick={handleLogout}
            className="flex flex-col items-center justify-center flex-1 text-gray-600"
          >
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
