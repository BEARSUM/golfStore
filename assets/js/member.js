// JavaScript 파일 (member.js)
document.addEventListener("DOMContentLoaded", async function () {
  try {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluMTFAYWRtaW4uY29tIiwiaWF0IjoxNjg5MzMwNDE4LCJleHAiOjE2ODk0MTY4MTh9.rR-quAzqpC9ihN8kejwNCsjMVPlQ0D4L-azdrsyqXDM";

    const response = await fetch(
      "http://kdt-sw-5-team06.elicecoding.com/users",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("회원 정보를 가져오는데 실패했습니다.");
    }

    const users = await response.json();

    const userTable = document.querySelector(".userlist");
    userTable.innerHTML = "";

    users.forEach((user) => {
      const tableRow = document.createElement("tr");
      tableRow.innerHTML = `
        <td>${user.email}</td>
        <td>${user.name}</td>
        <td>${user.phoneNumber}</td>
        <td>
          <a href="manageMemberDetail.html?id=${user._id}">자세히 보기</a>
        </td>
      `;

      userTable.appendChild(tableRow);
    });
  } catch (error) {
    console.error(error);
  }
});
