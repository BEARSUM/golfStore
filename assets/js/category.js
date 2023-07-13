import { API_URL, getAPI } from './common.js';
getCategories();
async function getCategories() {
  try {
    const data = await getAPI(`${API_URL}/category`, {
      method: 'GET',
    });
    categoriesTbody(data.categories);
  } catch (e) {
    alert(e);
  }
}
export async function deleteCategory(_id) {
  try {
    await getAPI(`${API_URL}/category/${_id}`, {
      method: 'DELETE',
    });
    getCategories();
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

function changeCategoryList() {
  const categoryList = document.querySelecto('#category-list');
  categoryList.innerHTML = '';
  const changeBtn = item.querySelector('.change-btn');
  changeBtn.addEventListener('click', function (event) {
    changeCategory(event.currentTarget.value);
  });
}

function categoriesTbody(categories) {
  const categoryList = document.querySelector('#category-list');
  categoryList.innerHTML = '';
  for (let i = 0; i < categories.length; i++) {
    const item = document.createElement('tr');
    const { categoryName, _id } = categories[i];

    item.innerHTML = `<tr>
                <td>${i + 1}</td>
                <td>${categoryName}</td>
                <td>
                  <div>
                    <button value="${_id}" class="change-btn">수정</button>
                  </div>
                </td>
                <td>
                  <div>
                     <button value="${_id}" class="delete-btn">삭제</button>
                  </div>
                </td>
              </tr>`;
    categoryList.appendChild(item);

    const deleteBtn = item.querySelector('.delete-btn');
    deleteBtn.addEventListener('click', function (event) {
      deleteCategory(event.currentTarget.value);
    });
  }
}
