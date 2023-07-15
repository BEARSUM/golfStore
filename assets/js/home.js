// // API_URL 변수 사용
// console.log(API_URL);

// // getAPI 함수 사용
// const data = await getAPI(API_URL, { method: "GET" });
// console.log(data);
// import { API_URL, getAPI } from "./모듈파일.js";

// // API_URL 변수 사용
// console.log(API_URL);

// // getAPI 함수 사용
// const data = await getAPI(API_URL, { method: "GET" });
// console.log(data);

// const categoryProductsElement = document.getElementById("categoryProducts");
const forBeginnerProductsElement = document.getElementById(
  "forBeginnerProducts"
);
const URI = "http://kdt-sw-5-team06.elicecoding.com:3000";
const categoryListUrl = `${URI}/category`;

async function forBeginner() {
  try {
    const productsResponse = await fetch(`${URI}/products`);
    const productJsonData = await productsResponse.json();
    const productsData = productJsonData.products;

    const filteredProducts = Array.isArray(productsData)
      ? productsData.filter((product) => product.isForBeginner != null)
      : [];

    let categoryProductsHtml = `
      <div class="pagination-buttons">
             <button class="prev-button"><i class="fa-solid fa-chevron-left"></i></button>
             <h1 class='cate-name'>FOR BEGINNER<h1>
             <button class="next-button"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
      <div class="forbegin-products">
        <div class="forbegin-products-container">
          <div class="row" style="display: flex;">
    `;

    const shuffledProducts = shuffleArray(filteredProducts);

    shuffledProducts.forEach((product) => {
      const { name, images, price, brand } = product;
      const imageUrl = `${URI}/${images[0]}`; // 첫 번째 이미지 사용

      // 쿼리 문자열을 사용하여 링크 생성
      const queryString = `productId=${product._id}`;
      const link = `productDetail.html?${queryString}`;

      categoryProductsHtml += `
    <a href="${link}" class="product">
      <img src="${imageUrl}" alt="${name}" />
      <p class="item-brand">${brand}</p>
      <p class="item-name">${name}</p>
      <p class="item-price">${price}원</p>
    </a>
  `;
    });

    forBeginnerProductsElement.innerHTML = categoryProductsHtml;

    // 스크롤 이벤트를 위한 버튼 선택
    const prevButton = document.querySelector(".prev-button");
    const nextButton = document.querySelector(".next-button");

    // 스크롤 이동 거리와 딜레이 설정
    const scrollStep = 500;
    const scrollDelay = 200;

    // 이전 버튼 클릭 이벤트
    prevButton.addEventListener("click", () => {
      const productsContainer = document.querySelector(
        ".forbegin-products-container"
      );
      productsContainer.scrollBy({
        left: -scrollStep,
        behavior: "smooth",
      });
    });

    // 다음 버튼 클릭 이벤트
    nextButton.addEventListener("click", () => {
      const productsContainer = document.querySelector(
        ".forbegin-products-container"
      );
      productsContainer.scrollBy({
        left: scrollStep,
        behavior: "smooth",
      });
    });
  } catch (error) {
    console.error(error);
  }
}

const forLuxuryProductsElement = document.getElementById("luxuryProducts");

async function forLuxury() {
  try {
    // const categoryResponse = await fetch(`${categoryListUrl}/${categoryId}`);
    // const categoryData = await categoryResponse.json();
    // const categoryName = categoryData.category.categoryName;

    // const parentCategoryId = categoryData.category.parentCategoryId;
    // const parentCategoryResponse = await fetch(
    //   `${categoryListUrl}/${parentCategoryId}`
    // );
    // const parentCategoryData = await parentCategoryResponse.json();
    // const parentCategoryName = parentCategoryData.category.categoryName;

    const productsResponse = await fetch(`${URI}/products`);
    const productJsonData = await productsResponse.json();
    const productsData = productJsonData.products;

    const filteredProducts = Array.isArray(productsData)
      ? productsData.filter((product) => product.price > 150000)
      : [];

    let categoryProductsHtml = `
      <div class="pagination-buttons">
             <button class="prev-button2"><i class="fa-solid fa-chevron-left"></i></button>
             <h1 class='cate-name'>LUXURY<h1>
             <button class="next-button2"><i class="fa-solid fa-chevron-right"></i></button>
      </div>
      <div class="lux-products">
        <div class="lux-products-container">
          <div class="row" style="display: flex;">
    `;

    const shuffledProducts = shuffleArray(filteredProducts);

    shuffledProducts.forEach((product) => {
      const { name, images, price, brand } = product;
      const imageUrl = `${URI}/${images[0]}`; // 첫 번째 이미지 사용

      // 쿼리 문자열을 사용하여 링크 생성
      const queryString = `productId=${product._id}`;
      const link = `productDetail.html?${queryString}`;

      categoryProductsHtml += `
    <a href="${link}" class="product">
      <img src="${imageUrl}" alt="${name}" />
      <p class="item-brand">${brand}</p>
      <p class="item-name">${name}</p>
      <p class="item-price">${price}원</p>
    </a>
  `;
    });

    forLuxuryProductsElement.innerHTML = categoryProductsHtml;

    // 스크롤 이벤트를 위한 버튼 선택
    const prevButton2 = document.querySelector(".prev-button2");
    const nextButton2 = document.querySelector(".next-button2");

    // 스크롤 이동 거리와 딜레이 설정
    const scrollStep = 500;
    const scrollDelay = 200;

    // 이전 버튼 클릭 이벤트
    prevButton2.addEventListener("click", () => {
      const productsContainer = document.querySelector(
        ".lux-products-container"
      );
      productsContainer.scrollBy({
        left: -scrollStep,
        behavior: "smooth",
      });
    });

    // 다음 버튼 클릭 이벤트
    nextButton2.addEventListener("click", () => {
      const productsContainer = document.querySelector(
        ".lux-products-container"
      );
      productsContainer.scrollBy({
        left: scrollStep,
        behavior: "smooth",
      });
    });
  } catch (error) {
    console.error(error);
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// 특정 카테고리의 상품을 가져와서 표시
//fetchCategoryProducts("64b047a95d3587ad7fd531e0");
forBeginner();
forLuxury();

const slider = document.querySelector(".slider");
// const preButton = document.querySelector(".pre-button");
// const nexButton = document.querySelector(".nex-button");

const slideWidth = slider.offsetWidth;
let slideIndex = 0;

// preButton.addEventListener("click", () => {
//   slideIndex =
//     (slideIndex - 1 + slider.childElementCount) % slider.childElementCount;
//   updateSliderPosition();
// });

// nexButton.addEventListener("click", () => {
//   slideIndex = (slideIndex + 1) % slider.childElementCount;
//   updateSliderPosition();
// });

function updateSliderPosition() {
  slider.style.transform = `translateX(-${slideIndex * slideWidth}px)`;
}

// 자동 슬라이드
setInterval(() => {
  slideIndex = (slideIndex + 1) % slider.childElementCount;
  updateSliderPosition();
}, 5000);
