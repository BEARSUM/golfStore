// header.js
const parentCategoryId = new URLSearchParams(window.location.search).get('c');

async function getCategory() {
  const URI = 'http://kdt-sw-5-team06.elicecoding.com';
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
  const existingHeader = document.querySelector('header');

  if (existingHeader) {
    existingHeader.remove();
  }

  const header = document.createElement('header');
  header.className = 'w-full';
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
                <a href="/admin">관리자 페이지</a> 
              </li>
              <li id="edit" class="hidden">
                <a href="/edit">회원정보수정</a> 
              </li>
              <li id="seeOrder" class="hidden">
                <a href="/changeOrder">주문정보조회</a> 
              </li>
  
              <li id="register">
                <a href="/register.html">
                  <i class="fa-solid fa-user-plus"></i>회원가입
                </a>
              </li>
              <li>
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

  const mainCategoryDiv = header.querySelector('.main-category');
  const categories = await getCategory();

  const parentCategories = categories.filter(
    (category) => !category.parentCategoryId
  );
  const childCategories = categories.filter(
    (category) => category.parentCategoryId
  );

  parentCategories.forEach((parentCategory) => {
    const parentCategoryItem = document.createElement('div');
    parentCategoryItem.className = 'category-item';
    parentCategoryItem.innerHTML = `
      <a href="/product.html?c=${parentCategory.categoryName}">${parentCategory.categoryName}</a>
      <div class="sub-categories hidden"></div>
    `;

    mainCategoryDiv.appendChild(parentCategoryItem);

    const subCategoriesDiv =
      parentCategoryItem.querySelector('.sub-categories');

    childCategories
      .filter(
        (childCategory) => childCategory.parentCategoryId === parentCategory.id
      )
      .forEach((childCategory) => {
        const childCategoryItem = document.createElement('div');
        childCategoryItem.innerHTML = `<a href="/product.html?c=${childCategory.categoryName}">${childCategory.categoryName}</a>`;
        subCategoriesDiv.appendChild(childCategoryItem);
      });

    parentCategoryItem.addEventListener('mouseenter', () => {
      subCategoriesDiv.classList.remove('hidden');
    });

    parentCategoryItem.addEventListener('mouseleave', () => {
      subCategoriesDiv.classList.add('hidden');
    });
  });
}

document.addEventListener('DOMContentLoaded', createHeader);

export { createHeader };
