window.addEventListener("DOMContentLoaded", async (event) => {
  async function getCart() {
    // 장바구니 데이터를 로컬 스토리지에서 가져옴
    const cartList = JSON.parse(localStorage.getItem("cart-list")) || {};

    // HTML 요소를 가져옴
    const productsEl = document.getElementById("products");
    const orderCountEl = document.getElementById("ordercount");
    const totalAmountEl = document.getElementById("totalAmount");

    // 장바구니에 있는 상품의 수를 표시함
    orderCountEl.textContent = Object.keys(cartList).length;

    let totalSubtotal = 0;

    Object.keys(cartList).forEach((key) => {
      const product = cartList[key];

      // 각 상품에 대한 가격과 총합을 계산함
      const productPrice = product.price;
      const productSubtotal = productPrice * product.quantity;
      totalSubtotal += productSubtotal;

      // 상품 정보를 표시하는 HTML을 생성함
      const productEl = document.createElement("div");
      productEl.innerHTML = `
        <div class = "product-container">
        <p class="product-title">${product.name}</p>
        <p style="color:#1f1f1f;">사이즈: ${product.size}</p> <!-- 상품의 크기를 추가합니다 -->
        <p style="color:#1f1f1f;">가격: ${productPrice}원</p>
        <p style="color:#1f1f1f;">수량: ${product.quantity}</p>
        <p style="color:#1f1f1f;">총 상품금액: ${productSubtotal}원</p>
        <button class="add">추가</button>
        <button class="remove">삭제</button>
        </div>
      `;
      productsEl.appendChild(productEl);

      // Add 버튼 이벤트 핸들러를 추가함
      productEl.querySelector(".add").addEventListener("click", () => {
        product.quantity++;
        totalSubtotal += product.price;
        productEl.querySelector(
          "p:nth-child(4)"
        ).textContent = `Quantity: ${product.quantity}`;
        productEl.querySelector("p:nth-child(5)").textContent = `Subtotal: ${
          product.quantity * product.price
        }원`;
        localStorage.setItem("cart-list", JSON.stringify(cartList));
        totalAmountEl.textContent = `${totalSubtotal}원`;
      });

      // Remove 버튼 이벤트 핸들러를 추가함
      productEl.querySelector(".remove").addEventListener("click", () => {
        product.quantity--;
        totalSubtotal -= product.price;
        productEl.querySelector(
          "p:nth-child(4)"
        ).textContent = `Quantity: ${product.quantity}`;
        productEl.querySelector("p:nth-child(5)").textContent = `Subtotal: ${
          product.quantity * product.price
        }원`;
        if (product.quantity <= 0) {
          delete cartList[key];
          totalSubtotal -= product.quantity * product.price; // 상품의 소계를 총 결제금액에서 빼줍니다.
          productEl.remove();
        }
        localStorage.setItem("cart-list", JSON.stringify(cartList));
        totalAmountEl.textContent = `${totalSubtotal}원`;
        orderCountEl.textContent = Object.keys(cartList).length;
      });
    });

    // 총 결제금액을 표시함
    totalAmountEl.textContent = `${totalSubtotal}원`;
  }

  // 초기화 함수를 호출함
  await getCart();

  // 제품 추가 버튼에 이벤트 핸들러를 추가함
  document
    .querySelector(".button.is-success.is-fullwidth.is-hovered.myButton")
    .addEventListener("click", () => {
      location.href = "/";
    });

  // 주문서 작성 버튼에 이벤트 핸들러를 추가함
  document
    .querySelector(
      ".aside-order .button.is-success.is-fullwidth.is-hovered.myButton"
    )
    .addEventListener("click", () => {
      location.href = "/order.html";
    });
});
