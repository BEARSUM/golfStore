const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMTFAYWRtaW4uY29tIiwiaWF0IjoxNjg5MzMwNDE4LCJleHAiOjE2ODk0MTY4MTh9.rR-quAzqpC9ihN8kejwNCsjMVPlQ0D4L-azdrsyqXDM";

const API_URL = "http://localhost:8080";
getorderlist();

async function getorderlist() {
  try {
    const response = await fetch(`${API_URL}/order`, {
      method: "GET",
    });
    const data = await response.json(); // JSON 데이터 추출
    orderList(data.orders);
  } catch (e) {
    alert(e);
  }
}

async function updateOrderStatus(orderId, status) {
  try {
    await fetch(`${API_URL}/order/${orderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deliveryStatus: status }),
    });
    alert("배송 상태가 수정되었습니다.");
    // 주문 목록 다시 불러오기
    getorderlist();
  } catch (error) {
    alert("서버 오류: 배송 상태 수정에 실패했습니다.");
    console.error(error);
  }
}

async function orderList(orders) {
  const allorder = document.querySelector("#orderList");
  console.log(orders);
  allorder.innerHTML = "";
  for (let i = 0; i < orders.length; i++) {
    const item = document.createElement("tr");
    const { _id, deliveryStatus, userId, totalAmount } = orders[i];

    item.innerHTML = `<tr>
      <td>${_id}</td>
      <td>${totalAmount}원</td>
      <td>
        <select id="order-status-${i}">
          <option value="pending" ${
            deliveryStatus === 0 ? "selected" : ""
          }>배송준비중</option>
          <option value="shipping" ${
            deliveryStatus === 1 ? "selected" : ""
          }>배송중</option>
          <option value="shipped" ${
            deliveryStatus === 2 ? "selected" : ""
          }>배송완료</option>
        </select>
      </td>
      <td>
        <button class="delete-button">주문 삭제</button>
      </td>
    </tr>`;
    allorder.appendChild(item);

    const selectOrderStatus = item.querySelector(`#order-status-${i}`);
    selectOrderStatus.addEventListener("change", function () {
      const newStatusText = selectOrderStatus.value; // 선택된 option의 value 값
      let newStatus;

      switch (newStatusText) {
        case "pending":
          newStatus = 0;
          break;
        case "shipping":
          newStatus = 1;
          break;
        case "shipped":
          newStatus = 2;
          break;
        default:
          newStatus = 0; // 기본값 설정
      }

      updateOrderStatus(orders[i]._id, newStatus);
    });

    const deleteBtn = item.querySelector(".delete-button");
    deleteBtn.addEventListener("click", function (event) {
      deleteOrder(orders[i]._id);
    });
  }
}
