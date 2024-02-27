const categoryContainer = document.querySelector(".main-category");

async function fetchCategories() {
  try {
    const response = await fetch("http://localhost:8080/category");
    const data = await response.json();
    return data.categories;
  } catch (error) {
    console.error("카테고리 조회 에러:", error);
    throw error;
  }
}

function createCategoryItem(category) {
  const categoryItem = document.createElement("div");
  categoryItem.classList.add("category-item");

  const categoryLink = document.createElement("a");
  categoryLink.href = `/category/${category.categoryId}`;
  categoryLink.textContent = category.categoryName;

  categoryItem.appendChild(categoryLink);
  categoryContainer.appendChild(categoryItem);
}

fetchCategories()
  .then((categories) => {
    categories.forEach((category) => {
      createCategoryItem(category);
    });
  })
  .catch((error) => console.error(error));
