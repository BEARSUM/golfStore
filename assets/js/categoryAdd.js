import { API_URL, getAPI } from "./common.js";

export async function addCategory(categoryName) {
  try {
    await getAPI(`${API_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryName }),
    });
  } catch (e) {
    alert(e);
  }
}

export async function changeCategory() {
  try {
    await getAPI(`${API_URL}/category/${_id}`, {
      method: "PUT",
    });
    changeCategoryList();
  } catch (e) {
    alert(e);
  }
}

const handleSubmit = (e) => {
  e.preventDefault();
  const categoryName = categoryNameInput.value.trim();
  if (categoryName) {
    addCategory(categoryName);
  } else {
    alert("카테고리 이름을 입력하세요.");
  }
};

const categoryForm = document.getElementById("addCategoryForm");
const categoryNameInput = document.getElementById("category-name");
categoryForm.addEventListener("submit", handleSubmit);
