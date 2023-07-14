// header.js
const parentCategoryId = new URLSearchParams(window.location.search).get("c");

async function getCategory() {
  const URI = "http://kdt-sw-5-team06.elicecoding.com:3000";
  const categoryListUrl = `${URI}/category`;

  try {
    const res = await fetch(`${categoryListUrl}`);
    if (!res.ok) return;
    const jsonData = await res.json();
    const categories = jsonData.categories;

    return categories;
  } catch (error) {
    console.log(error);
  }
}

async function createHeader() {
  const existingHeader = document.querySelector("header");

  if (existingHeader) {
    existingHeader.remove();
  }

  const header = document.createElement("header");
  header.className = "w-full";
  header.innerHTML = `
    <div class="header">
      <nav class="" role="navigation" aria-label="main navigation">
        <div class="container">
          <div class="search">
            <input type="text" placeholder="Search..." />
            <i class="fa-solid fa-magnifying-glass"></i>
          </div>
  
          <div class="mainLogo">
            <img src="/assets/img/pageLogo2 (1).png" />
          </div>
  
          <div class="menuOnTopright">
            <ul class="headerMenu" id="#">
              <li id="login"><a href="/login.html">로그인</a></li>
              
              <li id="logout" class="hidden"><a href="/">로그아웃</a></li> 
              <li id="adminPage" class="hidden">
                <a href="/manageOrder.html">관리자 페이지</a> 
              </li>
              <li id="edit" class="hidden">
                <a href="/my.html">마이페이지</a> 
              </li>
              <li id="seeOrder" class="hidden">
                <a href="/changeOrder">주문정보조회</a> 
              </li>
  
              <li id="register">
                <a href="/register.html">
                  <i class="fa-solid fa-user-plus"></i>회원가입
                </a>
              </li>
              <li id="cart" class = "hidden">
                <a href="/cart.html" aria-current="page">
                  <i class="fa-solid fa-bag-shopping"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div class="main-category">
          <div class="category-item">
            <a href="/index.html">HOME</a>
          </div>
          <div class="separator"></div>
        </div>
      </nav>
    </div>
  `;

  document.body.prepend(header);

  const mainCategoryDiv = header.querySelector(".main-category");
  const categories = await getCategory();

  const parentCategories = categories.filter(
    (category) => !category.parentCategoryId
  );
  const childCategories = categories.filter(
    (category) => category.parentCategoryId
  );

  parentCategories.forEach((parentCategory) => {
    const parentCategoryItem = document.createElement("div");
    parentCategoryItem.className = "category-item";
    parentCategoryItem.innerHTML = `
    <a href="/product.html?c=${parentCategory._id}">${parentCategory.categoryName}</a>
      <div class="sub-categories hidden"></div>
    `;

    mainCategoryDiv.appendChild(parentCategoryItem);

    const subCategoriesDiv =
      parentCategoryItem.querySelector(".sub-categories");

    childCategories
      .filter(
        (childCategory) => childCategory.parentCategoryId === parentCategory.id
      )
      .forEach((childCategory) => {
        const childCategoryItem = document.createElement("div");
        childCategoryItem.innerHTML = `<a href="/product.html?c=${childCategory.categoryName}">${childCategory.categoryName}</a>`;
        subCategoriesDiv.appendChild(childCategoryItem);
      });

    parentCategoryItem.addEventListener("mouseenter", () => {
      subCategoriesDiv.classList.remove("hidden");
    });

    parentCategoryItem.addEventListener("mouseleave", () => {
      subCategoriesDiv.classList.add("hidden");
    });
  });
}

function handleLogout(e) {
  e.preventDefault();

  // 로컬 스토리지에서 토큰을 삭제합니다.
  localStorage.removeItem("token");
  localStorage.removeItem("Authorization");

  //alert("로그아웃에 성공하였습니다!");
  window.location.href = "/index.html";
}

function handleSearch() {
  const input = document.querySelector('.search input[type="text"]');
  const searchValue = input.value;

  // 검색어를 기반으로 productSearch.html로 이동합니다.
  window.location.href = `productSearch.html?search=${searchValue}`;
}

document.addEventListener("DOMContentLoaded", function () {
  createHeader();

  // DOM이 완전히 로드된 후에 로그아웃 버튼에 이벤트 리스너를 추가
  setTimeout(() => {
    const logoutButton = document.querySelector("#logout a");
    if (logoutButton) logoutButton.addEventListener("click", handleLogout);

    const searchIcon = document.querySelector(".search i.fa-magnifying-glass");
    if (searchIcon) searchIcon.addEventListener("click", handleSearch);
  }, 0);
});

export { createHeader };
