async function cancelOrder(orderId) {
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const res = await fetch(`${URI}/order/${orderId}`, options);
    if (res.ok) {
      alert("주문이 취소되었습니다.");
      location.reload(); // 페이지 새로고침
    } else {
      throw new Error("주문 취소 중 오류가 발생했습니다.");
    }
  } catch (error) {
    console.error(error);
    alert("주문 취소 중 오류가 발생했습니다.");
  }
}

//특정 회원 조회
let userData = [];
let orderData = [];
const URI = "http://localhost:8080";

const token = localStorage.getItem("accessToken");
const productListUrl = `${URI}/products`;
const userUrl = `${URI}/users/token`;

async function getUser() {
  // fetch 요청 옵션 설정
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 헤더에 토큰 추가
      Authorization: `Bearer ${token}`,
    },
  };

  const res = await fetch(`${userUrl}/${token}`, options);
  const userData = await res.json();
  return userData; //1. userData(로그인한 유저데이터)
}

//회원의 주문정보 불러오기
const orderUrl = `${URI}/order`;

async function getOrderData(userId) {
  const res = await fetch(orderUrl);
  const jsonData = await res.json();
  const orderData = jsonData.orders; //전체 주문들

  let myOrders = [];
  //order정보의 userId와 로그인된회원의 id의 일치확인
  orderData.forEach((order) => {
    if (order.userId === userId) {
      myOrders.push(order);
    }
  });
  return myOrders;
}

async function showMyOrder(myOrders) {
  const orderedItemContainer = document.querySelector(".order-list-content");
  myOrders.reverse();

  for (const el of myOrders) {
    const products = el.products;
    const totalAmount = el.totalAmount;
    let deliveryStatus = "";

    if (el.deliveryStatus === 0) deliveryStatus = "배송준비중";
    else if (el.deliveryStatus === 1) deliveryStatus = "배송중";
    else if (el.deliveryStatus === 2) deliveryStatus = "배송완료";

    const orderSetEl = document.createElement("div"); // 주문 세트 컨테이너
    orderSetEl.classList.add("order-set"); // 'order-set' 클래스를 컨테이너에 추가

    const orderEl = document.createElement("div"); // 주문 요소
    orderEl.innerHTML = `<div class='top-part'><div class="ordered-date">2023.07.15</div><button class="order-cancel-button" type="submit">주문취소</button></div>`;

    const cancelBtn = orderEl.querySelector(".order-cancel-button"); // 버튼 엘리먼트 가져오기

    cancelBtn.addEventListener("click", async () => {
      try {
        const orderId = el._id; // 해당 주문의 orderId 얻어오기
        await cancelOrder(orderId); // 주문 취소 요청 보내기
        // 취소 성공 시 추가 작업 수행
      } catch (error) {
        console.error(error);
        alert("주문 취소 중 오류가 발생했습니다.");
        // 오류 처리 로직 추가
      }
    });

    for (const product of products) {
      const productId = product.productId;
      const response = await fetch(`${URI}/products/${productId}`);
      const productData = await response.json();

      const productEl = document.createElement("div");
      productEl.innerHTML = `
        <div class="ordered-item-container">
          <div class="ordered-item">
            <img src="${URI}/${productData.product.images[0]}" alt=""/>
            <div class="item-info">
              <div class="item-brand">${productData.product.brand}</div>
              <div class="item-name">${productData.product.name}</div>
              <div class="item-option">사이즈 : ${product.size}</div>
              <div class="item-price-quantity">
                <div class="item-price"><strong>${productData.product.price}</strong>원</div>
                <div class="item-quantity"> / ${product.orderCount}개</div>
              </div>
              <div class="item-status-cancel">
                <div class="order-status">${deliveryStatus}</div>
              </div>
            </div>
          </div>
        </div>
      `;

      orderEl.appendChild(productEl);
    }

    const totalAmountEl = document.createElement("div");
    totalAmountEl.textContent = `총 결제금액 : ${totalAmount}원`;
    totalAmountEl.classList.add("total-amount"); // Add the desired class name
    orderEl.appendChild(totalAmountEl);

    orderSetEl.appendChild(orderEl);
    orderedItemContainer.appendChild(orderSetEl);
  }
}

getUser()
  .then((user) => user._id) //getUser의 반환값 user로 회원_id를 찾는다.
  .then(getOrderData) //회원 _id를 getOrderData에서 사용할수있도록 넘겨준다.
  .then(showMyOrder);
