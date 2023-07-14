//userId 불러오기-어떻게 하나요
const userId = "어떻게 가져오나요..";
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
const URI = "http://kdt-sw-5-team06.elicecoding.com";
const userListUrl = `${URI}/users/${userId}`;

async function leaveUser(userId) {
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
