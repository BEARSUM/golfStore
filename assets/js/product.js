const URI = "http://kdt-sw-5-team06.elicecoding.com";

const categoryListUrl = `${URI}/category`;

//header에서 클릭한 부모카테고리
const parentCategoryId = new URLSearchParams(window.location.search).get("c");
//카테고리-자식
const childCategory = document.querySelector(".product-category");

//자식 카테고리 불러오기
async function getChildCategory() {
  try {
    const res = await fetch(`${categoryListUrl}`);
    if (!res.ok) return;
    const jsonData = await res.json();
    const categories = jsonData.categories;
    console.log(categories);

    //클릭한 부모카테고리와 같은 부모카테고리를 가진 자식카테고리 찾기
    categories.forEach((el) => {
      if (el.parentCategoryId === parentCategoryId) {
        console.log(el.categoryName);

        const categoryEl = document.createElement("div");
        categoryEl.innerText = el.categoryName;
        categoryEl.dataset.id = el._id;

        childCategory.appendChild(categoryEl);
      }
    });
    //페이지 진입시 상품정보 불러오기
    const firstChildCategory = categories
      .filter((el) => el.parentCategoryId === parentCategoryId)
      .at(0);
    if (firstChildCategory) {
      itemList.innerHTML = "";
      getProducts(firstChildCategory._id);
    }
  } catch (error) {
    console.log(error);
  }
}
getChildCategory();

//전체 수량
const totalProducts = document.querySelector(".total-products");
let count = 0;

//전체상품 불러오기
const productListUrl = `${URI}/products`;

//상품 목록 불러오는 fetchData함수 선언
const itemList = document.querySelector(".products-items");

// document
//   .querySelector(".high-price")
//   .addEventListener("click", function () {
//     // 가격이 낮은 순서대로 정렬
//     products = products.sort((a, b) => a.price - b.price);
//     itemList.innerHTML = "";
//     displayProducts(products);
//   });

//가격이 높은 순서로 정렬하는 버튼
// document
//   .querySelector(".sorting-high-price-button")
//   .addEventListener("click", function () {
//     // 가격이 높은 순서대로 정렬
//     products = products.sort((a, b) => b.price - a.price);
//     itemList.innerHTML = "";
//     displayProducts(products);
//   });

async function getProducts(clickedCategoryId) {
  try {
    // fetch 함수를 사용해 전체상품 목록 데이터를 서버에서 가져옴
    const res = await fetch(`${productListUrl}`);
    const jsonData = await res.json();
    let products = jsonData.products;
    console.log(products);

    products.forEach((el) => {
      console.log(el);
      //카테고리 클릭시 상품정렬
      if (el.category === clickedCategoryId) {
        const itemEl = document.createElement("a");
        //상품 전체 수량 구하기
        totalProducts.innerText = `${++count}개의 상품`;

        //쿼리문자열 상품 id로 생성
        itemEl.href = `productDetail.html?productId=${el._id}`;

        itemEl.classList.add("item");

        itemEl.innerHTML = `
              <div class="item-row">
                <img id="itemId" src="${URI}/${el.images[0]}" alt="" />
                <i class="fa-solid fa-star"></i>
              </div>
              <div class="item-row">
                <div class="item-brand">${el.brand}</div>
                <div class="item-name">${el.name}</div>
                <div class="item-price">${el.price}원</div>
                <div class="item-review">
                  <i class="fa-solid fa-star"></i>
                  <span class="review-rating"><strong>5.0</strong>/5</span>
                  <span class="review-bar"></span>
                  <span class="review-number">리뷰 1</span>
                </div>
              </div>
      `;
        itemList.appendChild(itemEl);
      }
    });
  } catch (error) {
    console.log(error);
  }
}

childCategory.addEventListener("click", (e) => {
  let categoryId = e.target.dataset.id;
  itemList.innerHTML = "";
  getProducts(categoryId);
});
