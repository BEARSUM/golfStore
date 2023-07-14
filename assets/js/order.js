//order.js
import { addCommas, formatPhoneNumber } from "../useful-functions.js";
const receiverNameInput = document.querySelector("#receiverName");
const receiverPhoneNumberInput = document.querySelector("#receiverPhoneNumber");
const postalCodeInput = document.querySelector("#postalCode");
const searchAddressButton = document.querySelector("#searchAddressButton");
const address1Input = document.querySelector("#address1");
const address2Input = document.querySelector("#address2");
const requestSelectBox = document.querySelector("#requestSelectBox");
const orderButton = document.querySelector("#orderButton");
const productCount = document.querySelector("#product-count");
const productTotal = document.querySelector("#product-total");
const totalPrice = document.querySelector("#total-price");
const deliveryPrice = document.querySelector("#delivery-price");
const cartList = JSON.parse(localStorage.getItem("products"));

// 이벤트 추가
searchAddressButton.addEventListener("click", searchAddress);
orderButton.addEventListener("click", doCheckout);
drawOrderCard();
// 이벤트에 사용할 함수
function searchAddress() {
  new daum.Postcode({
    oncomplete: function (data) {
      let addr = "";
      let extraAddr = "";

      if (data.userSelectedType === "R") {
        addr = data.roadAddress;
      } else {
        addr = data.jibunAddress;
      }

      if (data.userSelectedType === "R") {
        if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
          extraAddr += data.bname;
        }
        if (data.buildingName !== "" && data.apartment === "Y") {
          extraAddr +=
            extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
        }
        if (extraAddr !== "") {
          extraAddr = " (" + extraAddr + ")";
        }
      } else {
      }

      postalCodeInput.value = data.zonecode;
      address1Input.value = `${addr} ${extraAddr}`;
      address2Input.placeholder = "상세 주소를 입력해 주세요.";
      address2Input.focus();
    },
  }).open();
}

async function doCheckout() {
  // 각 입력값 가져옴
  const fullName = receiverNameInput.value;
  const phoneNumber = formatPhoneNumber(receiverPhoneNumberInput.value);
  const postalCode = postalCodeInput.value;
  const address1 = address1Input.value;
  const address2 = address2Input.value;
  const request = requestSelectBox.value;

  // 입력이 안 되어 있을 시
  if (!receiverName || !receiverPhoneNumber || !postalCode || !address2) {
    return alert("배송지 정보를 모두 입력해 주세요.");
  }

  // 객체 만듦
  console.log(cartList);
  const data = {
    products: cartList,
    fullName,
    phoneNumber: phoneNumber,
    address: {
      postalCode,
      address1,
      address2,
    },
  };
  // // JSON 만듦
  const dataJson = JSON.stringify(data);

  const res = await Api.post("/api/order/", data);
  if (res) {
    console.log("res", res);
    localStorage.removeItem("products");
    alert("주문에 성공하였습니다!");
    location.href = "order-complete";
  }
}

//결제정보 카드에 상품 수와 가격 삽입
async function drawOrderCard() {
  let allPrice = 0;
  let totalCount = 0;
  cartList.map((item) => {
    const { productPrice, quantity } = item;
    allPrice += productPrice * quantity;
    totalCount += quantity;
  });
  let price = allPrice;
  productCount.innerHTML = totalCount + "개";
  productTotal.innerHTML = `${addCommas(price)}원`;
  deliveryPrice.innerHTML = `3,000원`;
  totalPrice.innerHTML = `${addCommas(price + 3000)}원`;
}
