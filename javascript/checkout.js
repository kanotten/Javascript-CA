document.addEventListener("DOMContentLoaded", async function () {

  function cart() {
    if (!checkoutArray || checkoutArray.length === 0) {
      checkoutHtml.innerHTML = "<h2>Cart is empty</h2>";
      return;
    }
    checkoutArray.forEach((movie) => {
      checkoutHtml.innerHTML += `
            <hr>
            <div>title: ${movie.title}</div>
            <div>price: ${movie.price}</div>
            <div>quantity: ${movie.quantity}</div>
            <hr>
            `;
    });
  }
  function renderCart() {
    let totalSum = 0;

    checkoutArray.forEach((item) => {
      totalSum += Math.trunc(item.price * item.quantity);
    });
    totalPrice.innerHTML = `<h3>total: ${totalSum}</h3>`;
  }

  const checkoutHtml = document.getElementById("checkout");
  const totalPrice = document.getElementById("total");
  const checkoutArray = JSON.parse(localStorage.getItem("cart")) || [];
  const pay = document.getElementById("goToPayment");

  pay.addEventListener("click", () => {
    location.href = "confirmation.html";
  });

  renderCart();
  cart();

  var button = document.querySelector("#shopbutton");
  button.textContent = "Shopping cart (" + checkoutArray.length + ")";
});
