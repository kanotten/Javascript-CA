function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
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

function reduceFromCart(productId) {
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cartItems.find((item) => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity--;
    if (existingProduct.quantity <= 0) {
      cartItems = cartItems.filter((item) => item.id !== productId);
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    renderCart();
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("reduceFromCartBtn")
    .addEventListener("click", function () {
      const productId = getProductIdFromUrl();
      reduceFromCart(productId);
    });
});
