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
