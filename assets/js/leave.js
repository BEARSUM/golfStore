//특정 회원 조회
let userData = [];
const URI = "http://localhost:8080";
const token = localStorage.getItem("token");
console.log("token", token);

const userUrl = `${URI}/users/token`;
async function getUser() {
  // fetch 요청 옵션 설정
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // 헤더에 토큰 추가
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const res = await fetch(`${userUrl}/${token}`, options);
    if (!res.ok) return;
    userData = await res.json();
  } catch (error) {
    console.log(error);
  }
}
let userId = "";
getUser().then(() => {
  userId = userData._id;
  console.log(userId);
});

//탈퇴 버튼
const leaveBtn = document.querySelector(".leave-button");

leaveBtn.addEventListener("click", () => {
  const checkbox = document.getElementById("leave-checkbox");

  // 체크박스가 체크되어 있는지 확인
  if (!checkbox.checked) {
    window.alert("회원탈퇴 내용에 동의 하셔야 완료됩니다.");
  } else {
    //회원 탈퇴
    leaveUser(userId);
  }
});

//회원 탈퇴 api

async function leaveUser(userId) {
  const userListUrl = `${URI}/users/${userId}`;
  try {
    const res = await fetch(`${userListUrl}`, { method: "DELETE" });
    if (!res.ok) {
      throw new Error("회원 탈퇴 요청이 실패했습니다.");
    }
    const jsonData = await res.json();
    console.log("회원 탈퇴가 성공적으로 처리되었습니다.", jsonData);
  } catch (error) {
    console.error(error);
    alert("에러 발생!");
  }
}
