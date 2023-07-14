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

async function updateOrderStatus(_Id, status) {
  try {
    await getAPI(`${API_URL}/order/${_Id}`, {
      method: 'PUT',
      body: JSON.stringify({ deliveryStatus: status }),
    });
  } catch (error) {
    alert('주문 상태 업데이트에 실패했습니다.');
    console.error(error);
  }
}

function orderList(orders) {
  const allorder = document.querySelector('#orderList');
  console.log(orders);
  allorder.innerHTML = '';
  for (let i = 0; i < orders.length; i++) {
    const item = document.createElement('tr');
    const { deliveryStatus, userId, totalAmount } = orders[i];

    item.innerHTML = `<tr>
      <td>${i + 1}</td>
      <td>${userId}</td>
      <td>${totalAmount}</td>
      <td>
      <select id="order-status-${i}">
      <option value="pending" ${
        deliveryStatus === 0 ? 'selected' : ''
      }>배송준비중</option>
      <option value="shipping" ${
        deliveryStatus === 1 ? 'selected' : ''
      }>배송중</option>
      <option value="shipped" ${
        deliveryStatus === 2 ? 'selected' : ''
      }>배송완료</option>
      <option value="canceled" ${
        deliveryStatus === 3 ? 'selected' : ''
      }>주문취소</option>
    </select>
      </td>
      <td>
        <button class="delete-button">주문 삭제</button>
      </td>
    </tr>`;
    allorder.appendChild(item);

    const selectOrderStatus = item.querySelector(`#order-status-${i}`);
    selectOrderStatus.addEventListener('change', function () {
      const newStatus = selectOrderStatus.value;
      console.log(newStatus, 'new');
      updateOrderStatus(orders[i]._id, newStatus);
    });

    const deleteBtn = item.querySelector('.delete-button');
    deleteBtn.addEventListener('click', function (event) {
      deleteOrder(orders[i]._id);
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
