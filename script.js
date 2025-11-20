let cart = [];

        // Load products from JSON
        fetch('products.json')
            .then(res => res.json())
            .then(products => {
                const container = document.getElementById('products-container');
                products.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'col-sm-6 col-md-4 col-lg-3';

                    card.innerHTML = `
                        <div class="product-card p-3">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid" />
                            <h5 class="mt-3">${product.name}</h5>
                            <p>${product.description}</p>
                            <p><strong>$${product.price.toLocaleString()}</strong></p>
                            <button class="btn btn-danger w-100" onclick="addToCart(${product.id})">Add to Cart</button>
                        </div>
                    `;
                    container.appendChild(card);
                });

                // Save products globally for cart
                window.productsData = products;
            })
            .catch(err => console.error('Failed to load products:', err));

        function addToCart(id) {
            const product = window.productsData.find(p => p.id === id);
            if (product) {
                cart.push(product);
                updateCart();
                alert(`${product.name} added to cart!`);
            }
        }

        function removeFromCart(index) {
            cart.splice(index, 1);
            updateCart();
        }

        function updateCart() {
            const cartItems = document.getElementById('cart-items');
            const cartTotal = document.getElementById('cart-total');
            const cartCount = document.getElementById('cart-count');

            cartItems.innerHTML = '';
            let total = 0;
            cart.forEach((item, index) => {
                total += item.price;
                const li = document.createElement('li');
                li.innerHTML = `
                    ${item.name} - $${item.price.toLocaleString()}
                    <button onclick="removeFromCart(${index})">Remove</button>
                `;
                cartItems.appendChild(li);
            });

            cartTotal.textContent = total.toLocaleString();
            cartCount.textContent = cart.length;
        }

        document.getElementById('checkout-btn').addEventListener('click', () => {
            if(cart.length === 0){
                alert('Your cart is empty!');
                return;
            }
            alert(`Thank you for your purchase! Total: $${cart.reduce((sum, item) => sum + item.price, 0).toLocaleString()}`);
            cart = [];
            updateCart();
        });

        // Cart sidebar toggle
        const cartSidebar = document.getElementById('cart-sidebar');
        const cartToggle = document.getElementById('cart-toggle');
        cartToggle.addEventListener('click', () => {
            cartSidebar.classList.toggle('active');
        });

       // Navigate to About Us page
const aboutusBtn = document.getElementById('aboutus-btn');
aboutusBtn.addEventListener('click', () => {
    window.location.href = 'aboutus.html'; // Make sure the file path is correct
});

