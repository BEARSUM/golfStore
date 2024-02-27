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
      <th>삭제</th>
    `;
    userTable.appendChild(tableHeader);

    // 사용자 정보 행 생성
    users.forEach((user) => {
      const tableRow = document.createElement("tr");
      if (user.isAdmin) {
        tableRow.innerHTML = `
          <td>${user.email}</td>
          <td>${user.name}</td>
          <td>${user.phoneNumber}</td>
          <td>
            <button class="delete-button" data-user-id="${user._id}">삭제</button>
          </td>
        `;
        userTable.appendChild(tableRow);
      }
    });

    // 삭제 버튼 클릭 이벤트 리스너 추가
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async function () {
        const userId = button.dataset.userId;
        const deleteUrl = `http://localhost:8080/users/${userId}`;

        try {
          const deleteResponse = await fetch(deleteUrl, {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!deleteResponse.ok) {
            throw new Error("회원 삭제에 실패했습니다.");
          }

          // 삭제 성공 시 행 제거
          button.closest("tr").remove();
        } catch (error) {
          console.error(error);
        }
      });
    });

    // 관리자 계정 생성
    const adminCreateContainer = document.querySelector(".admin-create");
    const adminCreateForm = document.createElement("form");

    adminCreateForm.innerHTML = `
      <h2>관리자 생성</h2>
      <div>
        <label for="email">이메일</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div>
        <label for="name">이름</label>
        <input type="text" id="name" name="name" required>
      </div>
      <div>
        <label for="phoneNumber">전화번호</label>
        <input type="text" id="phoneNumber" name="phoneNumber" required>
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input type="password" id="password" name="password" required>
      </div>
      <div>
        <button type="submit">생성</button>
      </div>
    `;

    adminCreateForm.addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = adminCreateForm.elements.email.value;
      const name = adminCreateForm.elements.name.value;
      const phoneNumber = adminCreateForm.elements.phoneNumber.value;
      const password = adminCreateForm.elements.password.value;

      const signUpUrl = "http://localhost:8080/users/sign-up";
      const signUpData = {
        email: email,
        name: name,
        phoneNumber: phoneNumber,
        password: password,
        isAdmin: true,
        address: {
          streetAddress: "서울특별시 강남구 테헤란로 503",
          detailAddress: "00아파트 101동 101호",
          postalCode: "12345",
        },
        birthdate: "1990-01-01T00:00:00.000Z",
      };

      try {
        const signUpResponse = await fetch(signUpUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(signUpData),
        });

        if (!signUpResponse.ok) {
          throw new Error("관리자 계정 생성에 실패했습니다.");
        }

        // 계정 생성 성공 시 페이지 새로고침
        location.reload();
      } catch (error) {
        console.error(error);
      }
    });

    adminCreateContainer.appendChild(adminCreateForm);
  } catch (error) {
    console.error(error);
  }
});
