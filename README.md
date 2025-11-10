# Men's Clothing Ecommerce Website

A modern, responsive ecommerce website for men's clothing built with Node.js, Express, and vanilla JavaScript.

## Features

- 🛍️ Product catalog with 12+ men's clothing items
- 🎯 Category filtering (Shirts, Pants, Shoes, Jackets)
- 🛒 Shopping cart functionality
- 📱 Fully responsive design
- 🎨 Modern and clean UI
- 💾 Cart persistence using localStorage

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

3. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
├── server.js          # Express server and API endpoints
├── package.json       # Dependencies and scripts
├── public/
│   ├── index.html    # Main HTML file
│   ├── styles.css    # CSS styling
│   └── script.js     # Frontend JavaScript
└── README.md         # This file
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products?category=Shirts` - Get products by category
- `GET /api/products/:id` - Get a specific product
- `GET /api/categories` - Get all categories

## Technologies Used

- Node.js
- Express.js
- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript
- Responsive Design

## Features in Detail

### Products
- Classic White Dress Shirt
- Slim Fit Denim Jeans
- Leather Casual Sneakers
- Navy Blue Blazer
- Cotton T-Shirt Pack
- Chino Trousers
- Leather Dress Shoes
- Hooded Winter Jacket
- Plaid Flannel Shirt
- Cargo Shorts
- Running Sneakers
- Bomber Jacket

### Responsive Design
- Mobile-first approach
- Hamburger menu for mobile devices
- Flexible grid layout
- Touch-friendly buttons

Enjoy shopping! 🎉

