function createCartProductElement(product, productId) {
  const productElement = document.createElement("div");
  productElement.classList.add("product");

  const productName = document.createElement("div");
  productName.classList.add("product-name");
  productName.innerText = product.name;

  const productPrice = document.createElement("div");
  productPrice.classList.add("product-price");
  productPrice.innerText = `${product.price}원`;

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.innerText = "삭제";
  deleteButton.addEventListener("click", () => {
    deleteProduct(productId);
  });

  productElement.appendChild(productName);
  productElement.appendChild(productPrice);
  productElement.appendChild(deleteButton);

  return productElement;
}

function updateCartTotalPrice(products) {
  const productTotalElement = document.getElementById("product-total");
  const totalElement = document.getElementById("total-price");

  let totalPrice = 0;

  products.forEach((product) => {
    totalPrice += product.price;
  });

  productTotalElement.innerText = `${totalPrice}원`;
  totalElement.innerText = `${totalPrice}원`;
}

function deleteProduct(productId) {
  let cartList = JSON.parse(localStorage.getItem("cart-list")) || {};
  delete cartList[productId];
  localStorage.setItem("cart-list", JSON.stringify(cartList));
  displayCartProducts();
}

function displayCartProducts() {
  const cartList = JSON.parse(localStorage.getItem("cart-list")) || {};
  const productsElement = document.getElementById("products");
  productsElement.innerHTML = "";

  const products = Object.entries(cartList);

  products.forEach(([productId, product]) => {
    const productElement = createCartProductElement(product, productId);
    productsElement.appendChild(productElement);
  });

  updateCartTotalPrice(products.map(([_, product]) => product));

  const productCountElement = document.getElementById("product-count");
  productCountElement.innerText = products.length.toString();
}

window.addEventListener("DOMContentLoaded", () => {
  displayCartProducts();
});
