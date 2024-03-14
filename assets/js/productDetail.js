const URI = "http://localhost:8080";

async function getProduct() {
  try {
    //현재 URL에서 쿼리 문자열을 추출해서 URLSearchParmas 객체 생성
    const params = new URLSearchParams(window.location.search);
    //객체에서 값만 추출해서 변수 data에 저장 -> productId
    let productId = "";
    for (const value of params.values()) {
      productId = value;
    }
    // console.log(productId);

    //선택한 상품정보 불러오기
    const productDetailUrl = `${URI}/products/${productId}`;
    const res = await fetch(`${productDetailUrl}`);
    const jsonData = await res.json();
    let productDetail = jsonData.product;

    const productBrand = productDetail.brand;
    const productPrice = productDetail.price;
    const productName = productDetail.name;
    const productSize = productDetail.size; //배열
    const productImgs = productDetail.images; //배열
    // console.log("이미지", productImgs);
    const itemInfo = document.querySelector(".general-info");

    itemInfo.innerHTML = `
    <div class="item-brand">${productBrand}</div>
    <div class="item-item-name">${productName}</div>
    <div class="item-price">${productPrice}원</div>
    `;

    //상품의 사이즈 넣기
    const sizeContainer = document.querySelector("#size-option");

    productSize.forEach((el) => {
      const optionEl = document.createElement("option");
      optionEl.innerText = el;
      optionEl.value = el;

      sizeContainer.appendChild(optionEl);
    });

    //이미지 넣기
    const img1 = document.querySelector("#img1");
    img1.src = `${URI}/${productImgs[0]}`;
    const img2 = document.querySelector("#img2");
    img2.src = `${URI}/${productImgs[1]}`;

    //즐겨찾기
    const star = document.querySelector(".purchase-option i");
    star.addEventListener("click", (e) => {
      if (e.target.style.color === "var(--lightGray)") {
        e.target.style.color = "var(--yellow)";
      } else {
        e.target.style.color = "var(--lightGray)";
      }
    });

    //장바구니에 상품 추가
    function addToCart() {
      //저장되어 있는 장바구니 목록
      const savedCartList = JSON.parse(localStorage.getItem("cart-list")) || {};

      //선택된 수량 더하기
      productDetail.quantity = 0;
      productDetail.quantity += quantityValue;
      console.log(productDetail.quantity);
      productDetail.size = selectedSize;
      let { _id, size, quantity } = productDetail;

      const existingItem = Object.values(savedCartList).find(
        (ob) => ob._id === _id && ob.size === size
      );
      if (existingItem) {
        productDetail = savedCartList[`${_id}-${size}`];
      } else {
        quantity = 0;
      }

      const newList = JSON.stringify({
        ...savedCartList,
        [`${_id}-${size}`]: productDetail,
      });

      localStorage.setItem("cart-list", newList);
    }
    //장바구니 버튼 클릭시 로컬스토리지에 저장
    const cartButton = document.querySelector(".option-cart");

    cartButton.addEventListener("click", () => {
      addToCart();
      const confirmCart = confirm(
        `장바구니에 상품이 담겼습니다. 이동하시겠습니까?`
      );
      if (confirmCart) {
        location.href = "/cart.html";
      }
    });

    const buyButton = document.querySelector(".option-purchase");

    // 구매하기 버튼 클릭 시 처리
    buyButton.addEventListener("click", () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("로그인이 필요합니다. 로그인 화면으로 이동합니다.");
        location.href = "/login.html";
      } else {
        addToCart();
        // 구매 페이지로 이동
        window.location.href = "order.html";
      }
    });
  } catch (error) {
    console.log(error);
  }
}

//사이즈옵션을 변경하면 실행되는 함수
let selectedSize = "";
function selectSize() {
  const sizeOption = document.getElementById("size-option");
  selectedSize = sizeOption.value;
}

//수량 조절
const decreaseBtn = document.querySelector(".q-decrease");
const increaseBtn = document.querySelector(".q-increase");
const quantity = document.querySelector(".q-number");
let quantityValue = quantity.innerText / 1;

//수량 감소
decreaseBtn.addEventListener("click", () => {
  if (quantityValue > 1) {
    quantityValue -= 1;
  }
  quantity.innerText = quantityValue;
});

//수량 증가
increaseBtn.addEventListener("click", () => {
  quantityValue += 1;

  quantity.innerText = quantityValue;
});

getProduct();
