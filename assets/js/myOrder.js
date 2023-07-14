//특정 회원 조회
let userData = [];
let orderData = [];
const URI = "http://kdt-sw-5-team06.elicecoding.com:3000";

const token = localStorage.getItem("token");
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

  console.log("orderData", orderData);

  let myOrders = [];
  //order정보의 userId와 로그인된회원의 id의 일치확인
  orderData.forEach((order) => {
    if (order.userId === userId) {
      myOrders.push(order);
    }
  });
  console.log("내주문들", myOrders);
  return myOrders;
}

function showMyOrder(myOrders) {
  myOrders.forEach((el) => {
    console.log("내주문", myOrders);
    const productId = el.productId;
    const orderCount = el.orderCount;

    const price = el.price;
    //배열
    let size = "";
    el.size.forEach((el) => {
      size += `, ${el}`;
    });
    let deliveryStatus = ""; //0:배송준비중 1:배송중 2:배송완료
    if (el.deliveryStatus === 0) deliveryStatus = "배송준비중";
    else if (el.deliveryStatus === 1) deliveryStatus = "배송중";
    else if (el.deliveryStatus === 2) deliveryStatus = "배송완료";
    console.log("배송상태", deliveryStatus);

    const orderedItemContainer = document.querySelector(".order-list-content");
    const orderedItemEl = document.createElement("div");
    orderedItemEl.innerHTML = `
    <div class="ordered-item-container">
    <div class="ordered-date">2023.07.01</div>
    <div class="ordered-item">
    <img src="${size}" alt="" />
    <div class="item-info">
    <div class="item-brand">${size}</div>
    <div class="item-name">${size}</div>
    <div class="item-option">옵션 : ${size}</div>
    <div class="item-price-quantity">
    <div class="item-price"><strong>${price}</strong>원</div>
    <div class="item-quantity">/${orderCount}개</div>
    </div>
    <div class="item-status-cancel">
    <div class="order-status">${deliveryStatus}</div>
    <button type="submit" class="order-cancel-button">
    주문취소
    </button>
    </div>
    </div>
    </div>
    </div>
    `;

    orderedItemContainer.appendChild(orderedItemEl);
  });
}

getUser()
  .then((user) => user._id) //getUser의 반환값 user로 회원_id를 찾는다.
  .then(getOrderData) //회원 _id를 getOrderData에서 사용할수있도록 넘겨준다.
  .then(showMyOrder);

const productsUrl = `${URI}/products`;
async function getproductInfo() {
  const res = await fetch(`${productsUrl}`);
  const jsonData = await res.json();
  const productData = jsonData.products; //전체 상품들
  console.log("productData", productData);
  return productData;
}
