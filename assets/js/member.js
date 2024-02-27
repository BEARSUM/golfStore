document.addEventListener("DOMContentLoaded", async function () {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMTFAYWRtaW4uY29tIiwiaWF0IjoxNjg5MzMwNDE4LCJleHAiOjE2ODk0MTY4MTh9.rR-quAzqpC9ihN8kejwNCsjMVPlQ0D4L-azdrsyqXDM";

    const response = await fetch("http://localhost:8080/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("회원 정보를 가져오는데 실패했습니다.");
    }

    const users = await response.json();

    const userTable = document.querySelector(".userlist");
    userTable.innerHTML = "";

    // 테이블 헤더 생성
    const tableHeader = document.createElement("tr");
    tableHeader.innerHTML = `
      <th>이메일</th>
      <th>이름</th>
      <th>전화번호</th>
      <th>상세 보기</th>
    `;
    userTable.appendChild(tableHeader);

    // 사용자 정보 행 생성
    users.forEach((user) => {
      const tableRow = document.createElement("tr");
      if (user.isAdmin != true) {
        tableRow.innerHTML = `
        <td>${user.email}</td>
        <td>${user.name}</td>
        <td>${user.phoneNumber}</td>
        <td>
          <a href="manageMemberDetail.html?id=${user._id}">자세히 보기</a>
        </td>
      `;
      }

      userTable.appendChild(tableRow);
    });
  } catch (error) {
    console.error(error);
  }
});
