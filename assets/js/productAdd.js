import { API_URL, getAPI } from "./common.js";

const selectBox = document.getElementById("select-box");

const paintCategory = (categories) => {
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category._id;
    option.innerText = category.categoryName;
    selectBox.appendChild(option);
  });
};
getCategories();
async function getCategories() {
  try {
    const data = await getAPI(`${API_URL}/category`, {
      method: "GET",
    });
    paintCategory(data.categories);
    // console.log(data);
  } catch (e) {
    alert(e);
  }
}

const form = document.getElementById("product-form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  addProduct(formData);
});

async function addProduct(formData) {
  for (const [key, value] of formData) {
    console.log(key, value);
  }
  try {
    const data = await getAPI(`${API_URL}/products`, {
      method: "POST",
      body: formData,
    });
  } catch (e) {
    alert(e);
  }
}
