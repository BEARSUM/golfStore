const orderType = document.querySelectorAll(".recent-order-type div");

const statusValue = document.querySelectorAll(".status-value");

orderType.forEach((el) =>
  el.addEventListener("click", function (e) {
    changeTab(e);
    console.log(e.target.className);
  })
);

let changedValue = [];
function changeTab(e) {
  if (e.target.className === "delivery") {
    changedValue = ["상품준비중", "배송중", "배송완료"];
  } else {
    changedValue = ["취소", "교환", "반품"];
  }
  for (let i = 0; i < changedValue.length; i++) {
    statusValue[i].innerText = changedValue[i];
  }
}

//특정 회원 조회
let userData = [];
const URI = "http://kdt-sw-5-team06.elicecoding.com:3000";
const token = localStorage.getItem("token");

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
  try {
    const res = await fetch(`${userUrl}/${token}`, options);
    if (!res.ok) return;
    userData = await res.json();
    console.log("userData", userData);
  } catch (error) {
    console.log(error);
  }
}

//회원 이름,이메일,id
let userId = "";
getUser().then(() => {
  const userName = document.querySelector(".member-name strong");
  const userEmail = document.querySelector(".member-email");

  userName.innerText = userData.name;
  userEmail.innerText = userData.email;

  userId = userData._id;
});

//회원의 주문정보 불러오기
const orderUrl = `${URI}/order`;
async function getOrderData() {
  try {
    const response = await fetch(`${orderUrl}`);
    const jsonData = await response.json();
    let orderData = jsonData.orders;
    console.log("orderData", orderData);
    //order정보의 userId와 로그인된회원의 id의 일치확인
    const orderCount = orderData.filter((order) => order.userId === userId);
    const userOrderQuantity = document.querySelector(".ordered-quantity");
    userOrderQuantity.innerText = orderCount.length;
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return [];
  }
}
getOrderData();
