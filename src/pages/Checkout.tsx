import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CreditCard, Smartphone, Banknote, CheckCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import Navbar from '../components/Navbar';

const PAYMENT_METHODS = [
  {
    id: 'upi',
    name: 'UPI',
    icon: Smartphone,
    options: ['PhonePe', 'Google Pay', 'Paytm', 'BHIM UPI'],
  },
  {
    id: 'card',
    name: 'Debit/Credit Card',
    icon: CreditCard,
    options: [],
  },
  {
    id: 'cod',
    name: 'Cash on Delivery',
    icon: Banknote,
    options: [],
  },
];

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, clearCart, setCoinBalance, addTransaction } = useApp();
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const { coinsUsed = 0, discount = 0 } = location.state || {};

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal > 500 ? 0 : 40;
  const total = subtotal - discount + deliveryFee;

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    setTimeout(() => {
      if (coinsUsed > 0) {
        setCoinBalance((prev) => prev - coinsUsed);
        addTransaction({
          type: 'spent',
          amount: coinsUsed,
          description: 'Used for order discount',
        });
      }

      clearCart();
      setIsProcessing(false);
      setOrderPlaced(true);
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
        <Navbar />
        <div className="max-w-2xl mx-auto px-4 py-12">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Placed Successfully!</h1>
            <p className="text-gray-600 mb-6">Thank you for shopping with CoinCart</p>

            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <p className="text-gray-700 mb-2">Your order will be delivered soon</p>
              <p className="text-sm text-gray-500">You'll receive a confirmation message shortly</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate('/')}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition"
              >
                Continue Shopping
              </button>
              <button
                onClick={() => navigate('/games')}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
              >
                Play Games & Earn Coins
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Items</h2>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 py-3 border-b last:border-b-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">{item.name}</h3>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-bold text-blue-600">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Payment Method</h2>
              <div className="space-y-3">
                {PAYMENT_METHODS.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.id}>
                      <button
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full p-4 rounded-lg border-2 transition flex items-center space-x-3 ${
                          selectedPayment === method.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-300'
                        }`}
                      >
                        <Icon className="h-6 w-6 text-gray-700" />
                        <span className="font-semibold text-gray-800">{method.name}</span>
                      </button>
                      {selectedPayment === method.id && method.options.length > 0 && (
                        <div className="mt-2 ml-4 space-y-2">
                          {method.options.map((option) => (
                            <div
                              key={option}
                              className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg"
                            >
                              <input
                                type="radio"
                                name="upi-option"
                                id={option}
                                defaultChecked={option === method.options[0]}
                                className="text-blue-600"
                              />
                              <label htmlFor={option} className="text-gray-700 cursor-pointer">
                                {option}
                              </label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-20">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Order Summary</h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Coin Discount ({coinsUsed} coins)</span>
                    <span className="font-semibold">-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Delivery Fee</span>
                  {deliveryFee === 0 ? (
                    <span className="text-green-600 font-semibold">FREE</span>
                  ) : (
                    <span className="font-semibold">₹{deliveryFee}</span>
                  )}
                </div>

                {subtotal < 500 && (
                  <p className="text-xs text-gray-500">
                    Add ₹{(500 - subtotal).toFixed(2)} more for free delivery
                  </p>
                )}
              </div>

              <div className="border-t pt-3 mb-4">
                <div className="flex justify-between text-gray-900 font-bold text-lg">
                  <span>Total</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </button>

              <p className="text-xs text-gray-500 text-center mt-3">
                By placing this order, you agree to our terms and conditions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
