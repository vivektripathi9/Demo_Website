const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Dummy products data - Men's Clothing
const products = [
  {
    id: 1,
    name: "Classic White Dress Shirt",
    category: "Shirts",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1594938291221-94f18ad5c2eb?w=500",
    description: "Premium cotton dress shirt perfect for business and formal occasions.",
    inStock: true
  },
  {
    id: 2,
    name: "Slim Fit Denim Jeans",
    category: "Pants",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500",
    description: "Comfortable slim-fit jeans made from premium denim fabric.",
    inStock: true
  },
  {
    id: 3,
    name: "Leather Casual Sneakers",
    category: "Shoes",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "Stylish leather sneakers for everyday comfort and style.",
    inStock: true
  },
  {
    id: 4,
    name: "Navy Blue Blazer",
    category: "Jackets",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    description: "Elegant navy blue blazer for formal and semi-formal occasions.",
    inStock: true
  },
  {
    id: 5,
    name: "Cotton T-Shirt Pack (3)",
    category: "Shirts",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
    description: "Pack of 3 premium cotton t-shirts in various colors.",
    inStock: true
  },
  {
    id: 6,
    name: "Chino Trousers",
    category: "Pants",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1506629905607-0e9c2c1c5e5a?w=500",
    description: "Classic chino trousers perfect for smart casual wear.",
    inStock: true
  },
  {
    id: 7,
    name: "Leather Dress Shoes",
    category: "Shoes",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500",
    description: "Premium leather dress shoes for formal occasions.",
    inStock: true
  },
  {
    id: 8,
    name: "Hooded Winter Jacket",
    category: "Jackets",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    description: "Warm and stylish winter jacket with hood and multiple pockets.",
    inStock: true
  },
  {
    id: 9,
    name: "Plaid Flannel Shirt",
    category: "Shirts",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500",
    description: "Cozy flannel shirt perfect for casual autumn and winter days.",
    inStock: true
  },
  {
    id: 10,
    name: "Cargo Shorts",
    category: "Pants",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1506629905607-0e9c2c1c5e5a?w=500",
    description: "Comfortable cargo shorts with multiple pockets for summer.",
    inStock: true
  },
  {
    id: 11,
    name: "Running Sneakers",
    category: "Shoes",
    price: 99.99,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500",
    description: "High-performance running shoes with excellent cushioning.",
    inStock: true
  },
  {
    id: 12,
    name: "Bomber Jacket",
    category: "Jackets",
    price: 119.99,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500",
    description: "Stylish bomber jacket with ribbed cuffs and hem.",
    inStock: true
  }
];

// API Routes
app.get('/api/products', (req, res) => {
  const { category } = req.query;
  if (category) {
    const filteredProducts = products.filter(p => 
      p.category.toLowerCase() === category.toLowerCase()
    );
    return res.json(filteredProducts);
  }
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

app.get('/api/categories', (req, res) => {
  const categories = [...new Set(products.map(p => p.category))];
  res.json(categories);
});

// Serve main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

