import { API_URL, getAPI } from './common.js';

getorderlist();

async function getorderlist() {
  try {
    const data = await getAPI(`${API_URL}/order`, {
      method: 'GET',
    });
    orderList(data.orders);
  } catch (e) {
    alert(e);
  }
}

function orderList(orders) {
  const allorder = document.querySelector('#orderList');
  allorder.innerHTML = '';
  for (let i = 0; i < orders.length; i++) {
    const item = document.createElement('tr');
    const { userId, totalAmount } = orders[i];

    item.innerHTML = `<tr>
      <td>${i + 1}</td>
      <td>${userId}</td>
      <td>${totalAmount}</td>
      <td>
        <div>
          <select>
            <option value="pending">배송준비중</option>
            <option value="shipping">배송중</option>
            <option value="shipped">배송완료</option>
            <option value="canceled">주문취소</option>
          </select>
        </div>
      </td>
      <td>
        <button class="delete-button">주문 삭제</button>
      </td>
    </tr>`;
    allorder.appendChild(item);

    const deleteBtn = item.querySelector('.delete-button');
    deleteBtn.addEventListener('click', function (event) {
      deleteOrder(_id);
    });
  }
}

async function deleteOrder(_id) {
  try {
    await getAPI(`${API_URL}/order/${_id}`, {
      method: 'DELETE',
    });
    getorderlist();
  } catch (e) {
    alert(e);
  }
}
