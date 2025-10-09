import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';

const MOCK_PRODUCTS = [
{
    "id": "1",
    "name": "Butter Chicken Combo",
    "description": "Delicious butter chicken with naan and rice",
    "price": 299,
    "image": "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=500",
    "category": "Food"
  },
  {
    "id": "2",
    "name": "Basmati Rice 5kg",
    "description": "Premium quality basmati rice",
    "price": 450,
    "image": "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500",
    "category": "Grocery"
  },
  {
    "id": "3",
    "name": "Wireless Earbuds",
    "description": "Bluetooth 5.0 earbuds with charging case",
    "price": 1299,
    "image": "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500",
    "category": "Electronics"
  },
  
  {
    "id": "6",
    "name": "Smart Watch",
    "description": "Fitness tracker with heart rate monitor",
    "price": 2499,
    "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500",
    "category": "Electronics"
  },
  {
    "id": "7",
    "name": "Paneer Tikka Pizza",
    "description": "Indian-style pizza with paneer tikka topping",
    "price": 349,
    "image": "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
    "category": "Food"
  },
  {
    "id": "8",
    "name": "Toor Dal 1kg",
    "description": "Fresh yellow lentils",
    "price": 140,
    "image": "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500",
    "category": "Grocery"
  },
  {
    "id": "9",
    "name": "Power Bank 20000mAh",
    "description": "Fast charging portable charger",
    "price": 899,
    "image": "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=500",
    "category": "Electronics"
  },
  {
    "id": "10",
    "name": "Vegetable Biryani",
    "description": "Fragrant rice dish with mixed vegetables and spices",
    "price": 240,
    "image": "https://images.unsplash.com/photo-1631515243179-88c954a20b92?w=500",
    "category": "Food"
  },
  {
    "id": "11",
    "name": "Green Tea Bags (100 pack)",
    "description": "Natural and healthy green tea",
    "price": 199,
    "image": "https://images.unsplash.com/photo-1582522851412-25e17178a9c8?w=500",
    "category": "Grocery"
  },
  {
    "id": "12",
    "name": "Portable Bluetooth Speaker",
    "description": "Waterproof speaker with deep bass",
    "price": 1499,
    "image": "https://images.unsplash.com/photo-1546435017-8b06659725f1?w=500",
    "category": "Electronics"
  },
  {
    "id": "13",
    "name": "Chole Bhature",
    "description": "Spicy chickpea curry with fried bread",
    "price": 180,
    "image": "https://images.unsplash.com/photo-1589302324021-3642732997d4?w=500",
    "category": "Food"
  },
  {
    "id": "14",
    "name": "Sugar 1kg Pouch",
    "description": "Refined white crystal sugar",
    "price": 55,
    "image": "https://images.unsplash.com/photo-1611090001007-88d3d9203247?w=500",
    "category": "Grocery"
  },
  {
    "id": "15",
    "name": "Gaming Mouse",
    "description": "High-precision optical gaming mouse",
    "price": 750,
    "image": "https://images.unsplash.com/photo-1583921356779-7df9f89417d4?w=500",
    "category": "Electronics"
  },
  {
    "id": "16",
    "name": "Chicken Tandoori",
    "description": "Marinated chicken roasted in a tandoor",
    "price": 399,
    "image": "https://images.unsplash.com/photo-1585238318353-834f8a85c88b?w=500",
    "category": "Food"
  },
  {
    "id": "17",
    "name": "Cooking Oil (Sunflower) 5L",
    "description": "Light and healthy cooking oil",
    "price": 950,
    "image": "https://images.unsplash.com/photo-1623942004245-568853b49911?w=500",
    "category": "Grocery"
  },
  {
    "id": "18",
    "name": "Laptop Cooling Pad",
    "description": "Dual-fan cooling pad for laptops",
    "price": 650,
    "image": "https://images.unsplash.com/photo-1517058145455-2244243a85b9?w=500",
    "category": "Electronics"
  },
  {
    "id": "19",
    "name": "Rajma Chawal",
    "description": "Red kidney bean curry served with rice",
    "price": 210,
    "image": "https://images.unsplash.com/photo-1601614741369-0268579d4695?w=500",
    "category": "Food"
  },
  {
    "id": "20",
    "name": "Salt Iodized 1kg",
    "description": "Free-flowing iodized common salt",
    "price": 25,
    "image": "https://images.unsplash.com/photo-1582490515152-ee77e3870377?w=500",
    "category": "Grocery"
  },
  {
    "id": "21",
    "name": "DSLR Camera Kit",
    "description": "Entry-level DSLR with lens and bag",
    "price": 29999,
    "image": "https://images.unsplash.com/photo-1516035069371-29a1b244cc3c?w=500",
    "category": "Electronics"
  },
  {
    "id": "22",
    "name": "Aloo Paratha (2 pcs)",
    "description": "Flatbread stuffed with spiced potato filling",
    "price": 80,
    "image": "https://images.unsplash.com/photo-1678129759495-2c813f848520?w=500",
    "category": "Food"
  },
  {
    "id": "23",
    "name": "Coffee Powder 200g",
    "description": "Instant coffee powder, rich aroma",
    "price": 250,
    "image": "https://images.unsplash.com/photo-1579887754378-b1182283a812?w=500",
    "category": "Grocery"
  },
  {
    "id": "24",
    "name": "Smart TV 43 inch LED",
    "description": "Full HD Smart LED TV with built-in Wi-Fi",
    "price": 24999,
    "image": "https://images.unsplash.com/photo-1593305841991-05c297ba4567?w=500",
    "category": "Electronics"
  },
  {
    "id": "25",
    "name": "Vada Pav (2 pcs)",
    "description": "Spicy potato fritter in a bread bun",
    "price": 60,
    "image": "https://images.unsplash.com/photo-1672378950543-85f09689531d?w=500",
    "category": "Food"
  },
  {
    "id": "26",
    "name": "Assorted Dry Fruits 500g",
    "description": "Mix of almonds, cashews, and raisins",
    "price": 850,
    "image": "https://images.unsplash.com/photo-1623912111466-b3334812f8f8?w=500",
    "category": "Grocery"
  },
  {
    "id": "27",
    "name": "Electric Kettle 1.8L",
    "description": "Stainless steel electric water kettle",
    "price": 799,
    "image": "https://images.unsplash.com/photo-1625916328638-348e3e46c766?w=500",
    "category": "Electronics"
  },
  {
    "id": "28",
    "name": "Dal Makhani",
    "description": "Creamy black lentil and kidney bean curry",
    "price": 270,
    "image": "https://images.unsplash.com/photo-1579782500057-0841f3d537f2?w=500",
    "category": "Food"
  },
  {
    "id": "29",
    "name": "Honey Pure 500g",
    "description": "Natural and unadulterated honey",
    "price": 320,
    "image": "https://images.unsplash.com/photo-1558230559-d897f26201a4?w=500",
    "category": "Grocery"
  },
  {
    "id": "30",
    "name": "Tablet 10.1 inch",
    "description": "Android tablet with high-resolution display",
    "price": 14999,
    "image": "https://images.unsplash.com/photo-1618037628859-715b9cc18991?w=500",
    "category": "Electronics"
  }
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
