function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
}
function getProductDetails(productId) {
  const productUrl = `https://api.noroff.dev/api/v1/square-eyes/${productId}`;

  return fetch(productUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching product details", error);
      throw error;
    });
}

function renderProductDetails(product) {
  const productContainer = document.getElementById("product-details");
  if (!productContainer) {
    console.error("Product container not found");
    return;
  }

  productContainer.innerHTML = `
        <div id="product-details">
            <img class="ProductImage" src="${product.image}" alt="${product.title}">
            <h2 class="productTitle">${product.title}</h2>
            <p class="productDescription">${product.description}</p>
            <p class="productPrice">${product.price}</p>
            <button class="addToCart" id="addToCartBtn">Add to Cart</button>
            <button class="reduceFromCart" id="reduceFromCartBtn">Reduce from Cart</button>
        </div>
    `;

  const addToCartBtn = document.getElementById("addToCartBtn");
  addToCartBtn.addEventListener("click", function () {
    addToCart(product);
  });

  const reduceFromCartBtn = document.getElementById("reduceFromCartBtn");
  reduceFromCartBtn.addEventListener("click", function () {
    reduceFromCart(product.id);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const productId = getProductIdFromUrl();

  if (productId) {
    getProductDetails(productId)
      .then((product) => {
        renderProductDetails(product);
      })
      .catch((error) => {
        console.error("Error fetching or rendering product details", error);
      });
  } else {
    console.error("Product ID not found in the URL");
  }
});

function reduceFromCart(productId) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cartItems.find((item) => item.id === productId);

  if (existingProduct) {
    if (existingProduct.quantity > 1) {
      existingProduct.quantity--;
    } else {
      const index = cartItems.indexOf(existingProduct);
      if (index !== -1) {
        cartItems.splice(index, 1);
      }
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  }
}

function addToCart(product) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cartItems.find((item) => item.id === product.id);

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cartItems.push({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

function renderCart() {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsContainer.innerHTML = "";

  let totalSum = 0;

  cartItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${item.title} x${item.quantity} - Price: ${
      item.price * item.quantity
    }`;
    cartItemsContainer.appendChild(listItem);
    totalSum += item.price * item.quantity;
  });

  const totalSumElement = document.createElement("li");
  totalSumElement.textContent = `Total Sum: ${totalSum}`;
  cartItemsContainer.appendChild(totalSumElement);
}

document.addEventListener("DOMContentLoaded", function () {
  const homeLink = document.getElementById("homeLink");
  homeLink.addEventListener("click", function () {});
});
