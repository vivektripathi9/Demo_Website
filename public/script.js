// Global state
// Dummy products data - Men's Clothing
const allProducts = [
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

let cart = [];
let currentCategory = 'all';

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartModal = document.getElementById('cartModal');
const closeModal = document.getElementById('closeModal');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayProducts(allProducts);
    setupEventListeners();
    loadCartFromStorage();
    updateCartUI();
});

// Display products
function displayProducts(products) {
    if (products.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; grid-column: 1 / -1;">No products found in this category.</p>';
        return;
    }

    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x300?text=Product+Image'">
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-description">${product.description}</div>
                <div class="product-footer">
                    <div class="product-price">$${product.price.toFixed(2)}</div>
                    <button class="add-to-cart" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter products by category
function filterProducts(category) {
    currentCategory = category;
    if (category === 'all') {
        displayProducts(allProducts);
    } else {
        const filtered = allProducts.filter(p => p.category === category);
        displayProducts(filtered);
    }
}

// Add to cart
function addToCart(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCartToStorage();
    updateCartUI();
    showNotification('Product added to cart!');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
    showNotification('Product removed from cart!');
}

// Update cart quantity
function updateCartQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        saveCartToStorage();
        updateCartUI();
    }
}

// Update cart UI
function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; padding: 2rem;">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
            </div>
            <div style="display: flex; align-items: center; gap: 10px;">
                <button onclick="updateCartQuantity(${item.id}, -1)" style="padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer;">-</button>
                <span>${item.quantity}</span>
                <button onclick="updateCartQuantity(${item.id}, 1)" style="padding: 5px 10px; background: #27ae60; color: white; border: none; border-radius: 5px; cursor: pointer;">+</button>
                <button onclick="removeFromCart(${item.id})" style="padding: 5px 10px; background: #e74c3c; color: white; border: none; border-radius: 5px; cursor: pointer; margin-left: 10px;">Remove</button>
            </div>
        </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = total.toFixed(2);
}

// Save cart to localStorage
function saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Load cart from localStorage
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
}

// Setup event listeners
function setupEventListeners() {
    // Category buttons
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProducts(btn.dataset.category);
        });
    });

    // Cart icon
    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'block';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Checkout button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty!');
            return;
        }
        alert('Thank you for your purchase! This is a demo site.');
        cart = [];
        saveCartToStorage();
        updateCartUI();
        cartModal.style.display = 'none';
    });

    // Hamburger menu
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                navMenu.classList.remove('active');
            }
        });
    });
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #27ae60;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 3000;
        animation: slideIn 0.3s;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Add CSS for notification animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

