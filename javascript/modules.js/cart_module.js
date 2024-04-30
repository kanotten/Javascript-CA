export function renderCart() {
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
