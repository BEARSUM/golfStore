import { API_URL, getAPI } from './common.js';

export async function addCategory() {
  try {
    await getAPI(`${API_URL}/category`, {
      method: 'POST',
    });
  } catch (e) {
    alert(e);
  }
}

export async function changeCategory() {
  try {
    await getAPI(`${API_URL}/category/${_id}`, {
      method: 'PUT',
    });
    changeCategoryList();
  } catch (e) {
    alert(e);
  }
}
const submit = document.getElementById('btn-submit');
const inputCategoryName = document.getElementById('category-name');
function ResisterCategory() {
  e.preventDefault();
}
