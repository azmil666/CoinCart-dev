import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

const MOCK_PRODUCTS = [
  {
    id: '1',
    name: 'Butter Chicken Combo',
    description: 'Delicious butter chicken with naan and rice',
    price: 299,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500',
    category: 'Food',
  },
  {
    id: '2',
    name: 'Basmati Rice 5kg',
    description: 'Premium quality basmati rice',
    price: 450,
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500',
    category: 'Grocery',
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    description: 'Bluetooth 5.0 earbuds with charging case',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500',
    category: 'Electronics',
  },
  {
    id: '4',
    name: 'Masala Dosa',
    description: 'Crispy dosa with potato filling and chutney',
    price: 120,
    image: 'https://images.unsplash.com/photo-1694672832722-31289c40d0e7?w=500',
    category: 'Food',
  },
  {
    id: '5',
    name: 'Atta 10kg Pack',
    description: 'Whole wheat flour for soft rotis',
    price: 380,
    image: 'https://images.unsplash.com/photo-1628408797043-9cf0ce93569c?w=500',
    category: 'Grocery',
  },
  {
    id: '6',
    name: 'Smart Watch',
    description: 'Fitness tracker with heart rate monitor',
    price: 2499,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Electronics',
  },
  {
    id: '7',
    name: 'Paneer Tikka Pizza',
    description: 'Indian-style pizza with paneer tikka topping',
    price: 349,
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500',
    category: 'Food',
  },
  {
    id: '8',
    name: 'Toor Dal 1kg',
    description: 'Fresh yellow lentils',
    price: 140,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500',
    category: 'Grocery',
  },
  {
    id: '9',
    name: 'Power Bank 20000mAh',
    description: 'Fast charging portable charger',
    price: 899,
    image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500',
    category: 'Electronics',
  },
  {
    id: '10',
    name: 'Sid',
    description: 'Sidharth S',
    price: 1,
    image: '/sid.jpg',
    category: 'Food',
  },
];

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Food', 'Grocery', 'Electronics'];

  const filteredProducts = MOCK_PRODUCTS.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-8">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Discover Products
          </h1>
          <p className="text-gray-600">Shop and earn coins on every purchase</p>
        </div>

        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-2">
            <Filter className="h-5 w-5 text-gray-600 flex-shrink-0" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
