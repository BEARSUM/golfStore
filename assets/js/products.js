import { API_URL, getAPI } from './common.js';

export async function getProducts() {
  try {
    const data = await getAPI(`${API_URL}/products`, {
      method: 'GET',
    });
    productsTbody(data.products);
  } catch (e) {
    alert(e);
  }
}

async function deleteProduct(_id) {
  try {
    await getAPI(`${API_URL}/products/${_id}`, {
      method: 'DELETE',
    });
    getProducts();
  } catch (e) {
    alert(e);
  }
}

function productsTbody(products) {
  const productList = document.querySelector('#product-list');
  productList.innerHTML = '';
  for (let i = 0; i < products.length; i++) {
    const item = document.createElement('tr');
    const { category, name, price, stock, _id } = products[i];
    item.innerHTML = `<tr>
       <td>${i + 1}</td>
       <td>${category}</td>
       <td>${name}</td>
       <td>${price}</td>
       <td>${stock}</td>
       <td>
         <button value="${_id}" id="delete-btn">삭제</button>
       </td>
       <td>
         <button class="change-button" id="product-change">
          수정
         </button>
       </td>
     </tr>`;
    productList.appendChild(item);

    const deleteBtn = item.querySelector('#delete-btn');
    deleteBtn.addEventListener('click', function (event) {
      deleteProduct(event.currentTarget.value);
    });
  }
}
getProducts();
