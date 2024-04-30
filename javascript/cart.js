function getProductIdFromUrl() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("id");
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
