document.addEventListener("DOMContentLoaded", async function () {
  try {
    // 쿼리 파라미터에서 회원의 _id 값을 가져옴
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("id");

    if (!userId) {
      throw new Error("회원 ID를 찾을 수 없습니다.");
    }

    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMTFAYWRtaW4uY29tIiwiaWF0IjoxNjg5MzMwNDE4LCJleHAiOjE2ODk0MTY4MTh9.rR-quAzqpC9ihN8kejwNCsjMVPlQ0D4L-azdrsyqXDM";

    const response = await fetch(
      `http://kdt-sw-5-team06.elicecoding.com/users/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("회원 정보를 가져오는데 실패했습니다.");
    }

    const user = await response.json();

    const userDetailContainer = document.querySelector(
      ".user-detail-container"
    );
    userDetailContainer.innerHTML = "";

    // 회원 상세 정보를 표로 표시할 HTML 요소를 생성하고 추가
    const userInfoTable = document.createElement("table");
    userInfoTable.innerHTML = `
      <tr>
        <th>이름</th>
        <td>${user.name}</td>
      </tr>
      <tr>
        <th>Email</th>
        <td>${user.email}</td>
      </tr>
      <tr>
        <th>전화번호</th>
        <td>${user.phoneNumber}</td>
      </tr>
      <tr>
        <th>주소</th>
        <td>${user.address.streetAddress}, ${user.address.detailAddress}, ${user.address.postalCode}</td>
      </tr>
      <tr>
        <th>생년월일</th>
        <td>${user.birthdate}</td>
      </tr>
    `;

    userDetailContainer.appendChild(userInfoTable);
  } catch (error) {
    console.error(error);
  }
});
