const URI = "http://localhost:8080";

async function getProductSearchResults(searchValue) {
  const productsUrl = `${URI}/products`;

  try {
    const res = await fetch(`${productsUrl}`);
    if (!res.ok) return;
    const jsonData = await res.json();
    const products = jsonData.products;

    // 검색어와 일치하는 상품들을 필터링
    const matchingProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return matchingProducts;
  } catch (error) {
    console.log(error);
  }
}

async function displaySearchResults() {
  const searchProductsDiv = document.querySelector(".searchProducts");
  const productContainer = document.createElement("div");
  productContainer.className = "product_container";
  productContainer.style.display = "flex"; // 가로로 정렬되도록 스타일을 추가
  productContainer.style.flexWrap = "wrap"; // 요소들이 화면을 넘어가면 밑으로 정렬되도록 스타일을 추가
  productContainer.style.justifyContent = "center"; // 요소들을 가로 방향으로 중앙에 배치
  productContainer.style.alignItems = "center"; // 요소들을 세로 방향으로 중앙에 배치

  // URL의 쿼리 문자열에서 검색어 값가져오기
  const searchValue = new URLSearchParams(window.location.search).get("search");

  if (searchValue) {
    const matchingProducts = await getProductSearchResults(searchValue);

    // 검색 결과를 동적으로 생성하여 표시
    if (matchingProducts && matchingProducts.length > 0) {
      matchingProducts.forEach((product) => {
        // 쿼리 문자열을 사용하여 링크 생성
        const queryString = `productId=${product._id}`;
        const link = `productDetail.html?${queryString}`;
        const productItem = document.createElement("div");
        productItem.className = "product-item";
        productItem.innerHTML = `
        <a href="${link}" class="product">
          <img src="${URI}/${product.images[0]}" alt="${product.name}" />
          <p class="item-brand">${product.brand}</p>
          <p class="item-name">${product.name}</p>
          <p class="item-price">${product.price}원</p>
          </a>
        `;

        productContainer.appendChild(productItem);
      });
    } else {
      searchProductsDiv.textContent = "일치하는 상품이 없습니다.";
    }
  } else {
    searchProductsDiv.textContent = "Please provide a search query.";
  }

  searchProductsDiv.appendChild(productContainer);
}
document.addEventListener("DOMContentLoaded", displaySearchResults);
