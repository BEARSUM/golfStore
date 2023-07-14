window.addEventListener("DOMContentLoaded", async (event) => {
  async function getOrder() {
    // 장바구니 데이터를 로컬 스토리지에서 가져옴
    const cartList = JSON.parse(localStorage.getItem("cart-list")) || {};

    // HTML 요소를 가져옴
    const orderCountEl = document.getElementById("ordercount");
    const totalAmountEl = document.getElementById("totalAmount");

    let totalSubtotal = 0;
    let orderCount = 0;

    const orderList = Object.values(cartList).map((product) => {
      // 각 상품에 대한 가격과 총합을 계산함
      const productPrice = product.price;
      const productSubtotal = productPrice * product.quantity;
      totalSubtotal += productSubtotal;
      orderCount += product.quantity;

      // 주문 정보 객체 생성
      return {
        productId: product._id, // _id 값을 productId로 사용
        orderCount: product.quantity,
        price: productPrice,
        subtotal: productSubtotal,
        size: product.size,
      };
    });

    // 주문 정보 객체를 JSON 형식으로 변환함
    const orderListJson = JSON.stringify(orderList);

    // 주문 정보를 로컬 스토리지에 저장함
    localStorage.setItem("order-list", orderListJson);

    // 주문 수량과 총 결제금액을 표시함
    orderCountEl.textContent = `${orderCount}개`;
    totalAmountEl.textContent = `${totalSubtotal}원`;
  }

  // 초기화 함수를 호출함
  await getOrder();

  // 결제하기 버튼 클릭 이벤트
  document.getElementById("orderButton").addEventListener("click", async () => {
    const receiverName = document.getElementById("receiverName").value;
    const receiverPhoneNumber = document.getElementById(
      "receiverPhoneNumber"
    ).value;
    const address2 = document.getElementById("address2").value;
    const requestSelectBox = document.getElementById("requestSelectBox").value;

    // Validation: 각 필드가 비어있는지 확인
    if (!(receiverName && receiverPhoneNumber && address2)) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    // TODO: 결제 처리 코드를 여기에 작성

    // 결제가 성공적으로 처리된 후, 장바구니 비우기
    localStorage.removeItem("cart-list");

    // 주문 완료 페이지로 리다이렉트
    window.location.href = "/orderComplete.html";
  });
});
