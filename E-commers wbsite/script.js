// ====== GLOBAL CART ======
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ====== UPDATE CART COUNT (Navbar) ======
function updateCartCount() {
  const cartCount = document.getElementById("cart-count");
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}
updateCartCount();

// ====== ADD TO CART ======
function addToCart(productName, price, image) {
  const product = { name: productName, price: price, image: image, qty: 1 };
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${productName} added to cart!`);
}

// ====== DISPLAY CART ITEMS (cart.html) ======
function displayCart() {
  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartItems || !cartTotal) return;

  cartItems.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="text-center">Your cart is empty 🛒</p>`;
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.qty;

      const div = document.createElement("div");
      div.classList.add("d-flex", "align-items-center", "mb-3");
      div.innerHTML = `
        <img src="${item.image}" alt="${item.name}" class="me-3" width="70">
        <div class="flex-grow-1">
          <h6>${item.name}</h6>
          <p>PKR ${item.price} x ${item.qty}</p>
        </div>
        <button class="btn btn-sm btn-danger" onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItems.appendChild(div);
    });
  }

  cartTotal.textContent = total;
}

// ====== REMOVE ITEM FROM CART ======
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartCount();
}

// ====== CHECKOUT PAGE (checkout.html) ======
function handleCheckoutForm() {
  const checkoutForm = document.getElementById("checkout-form");
  if (!checkoutForm) return;

  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const orderDetails = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      payment: document.getElementById("payment").value,
      cart: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.qty, 0)
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    localStorage.removeItem("cart"); // empty cart after checkout

    window.location.href = "order-success.html";
  });
}

// ====== ORDER SUCCESS PAGE (order-success.html) ======
function displayOrderSuccess() {
  const orderDetails = JSON.parse(localStorage.getItem("orderDetails"));
  const summaryList = document.getElementById("success-order-summary");
  const successTotal = document.getElementById("success-total");

  if (!orderDetails || !summaryList || !successTotal) return;

  summaryList.innerHTML = "";
  orderDetails.cart.forEach(item => {
    const li = document.createElement("li");
    li.classList.add("list-group-item");
    li.innerHTML = `${item.name} - PKR ${item.price} x ${item.qty}`;
    summaryList.appendChild(li);
  });

  successTotal.textContent = orderDetails.total;
}

// ====== INIT FUNCTIONS PER PAGE ======
document.addEventListener("DOMContentLoaded", () => {
  displayCart();
  handleCheckoutForm();
  displayOrderSuccess();
});

// Cart Count Example (for demo only)
let cartCount = 0;
const cartIcon = document.querySelector('.cart-icon span');
if (cartIcon) cartIcon.innerText = cartCount;

// Contact Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const responseDiv = document.getElementById('formResponse');

    if (!name || !email || !message) {
      responseDiv.innerHTML = "<p style='color:red;'>Please fill in all fields.</p>";
      return;
    }

    // Fake success message (replace with backend integration later)
    responseDiv.innerHTML = "<p style='color:green;'>Thank you, " + name + "! We’ll contact you soon.</p>";

    contactForm.reset();
  });
}
