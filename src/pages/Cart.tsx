import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, Coins } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/Navbar';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateCartQuantity, removeFromCart, coinBalance } = useApp();
  const [coinsToUse, setCoinsToUse] = useState(0);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const coinDiscount = coinsToUse * 0.5;
  const total = Math.max(0, subtotal - coinDiscount);

  const maxCoinsUsable = Math.min(coinBalance, Math.floor(subtotal / 0.5));

  const handleCoinsChange = (value: number) => {
    const newValue = Math.max(0, Math.min(value, maxCoinsUsable));
    setCoinsToUse(newValue);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate('/checkout', { state: { coinsUsed: coinsToUse, discount: coinDiscount } });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to get started!</p>
            <button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-md p-4 flex items-center space-x-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.description}</p>
                  <p className="text-blue-600 font-bold text-xl mt-1">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-2 bg-gray-100 rounded-lg">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition"
                    >
                      <Minus className="h-4 w-4 text-gray-700" />
                    </button>
                    <span className="font-semibold w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="p-2 hover:bg-gray-200 rounded-lg transition"
                    >
                      <Plus className="h-4 w-4 text-gray-700" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition p-2"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="border-t pt-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 flex items-center space-x-1">
                      <Coins className="h-4 w-4 text-orange-500" />
                      <span>Use Coins</span>
                    </span>
                    <span className="text-sm text-gray-500">
                      Available: {coinBalance}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      value={coinsToUse}
                      onChange={(e) => handleCoinsChange(Number(e.target.value))}
                      min="0"
                      max={maxCoinsUsable}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter coins"
                    />
                    <button
                      onClick={() => handleCoinsChange(maxCoinsUsable)}
                      className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition text-sm font-semibold whitespace-nowrap"
                    >
                      Use Max
                    </button>
                  </div>
                  {coinsToUse > 0 && (
                    <p className="text-sm text-green-600 mt-2">
                      Saving ₹{coinDiscount.toFixed(2)} with {coinsToUse} coins
                    </p>
                  )}
                </div>

                {coinsToUse > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coin Discount</span>
                    <span className="font-semibold">-₹{coinDiscount.toFixed(2)}</span>
                  </div>
                )}
              </div>

              <div className="border-t pt-3 mb-4">
                <div className="flex justify-between text-gray-900 font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
