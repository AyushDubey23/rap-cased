// Initialize cart (stored in localStorage for persistence)
if (!localStorage.getItem('cart')) {
    localStorage.setItem('cart', JSON.stringify([]));
}

// Function to update the cart UI
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');

    // Update cart count
    cartCount.textContent = cart.length;

    // Clear current cart display
    cartItems.innerHTML = '';

    // Loop through cart items and add them to the cart display
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <img src="images/a.jpg" alt="${item.name}">
            <div class="product-info">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
            </div>
            <button class="remove-item" data-index="${index}">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    // Event listener for remove button
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeItemFromCart(index);
        });
    });
}

// Add item to the cart
function addToCart(name, price) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    const newItem = { name, price };
    cart.push(newItem);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Remove item from cart
function removeItemFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart'));
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Clear the cart
function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    updateCart();
}

// Toggle cart visibility
document.getElementById('cart-btn').addEventListener('click', () => {
    const cartSection = document.getElementById('cart');
    cartSection.style.display = (cartSection.style.display === 'none' || cartSection.style.display === '') ? 'block' : 'none';
    cartSection.style.transform = (cartSection.style.transform === 'translateX(100%)') ? 'translateX(0)' : 'translateX(100%)';
});

// Close cart button
document.getElementById('close-cart').addEventListener('click', () => {
    const cartSection = document.getElementById('cart');
    cartSection.style.transform = 'translateX(100%)';
});

// Clear Cart Button
document.getElementById('clear-cart').addEventListener('click', () => {
    clearCart();
});

// Initialize the cart UI on page load
window.onload = updateCart;

// Attach event listeners to product buttons (for adding to cart)
const buttons = document.querySelectorAll('.add-to-cart');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const productName = e.target.parentElement.querySelector('h3').textContent;
        const productPrice = e.target.parentElement.querySelector('p').textContent.split('₹')[1];
        addToCart(productName, productPrice);
    });
});
const toggleBtn = document.querySelector('.toggle');
const navLinks = document.querySelector('.nav-links');

toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('toggle');
});
