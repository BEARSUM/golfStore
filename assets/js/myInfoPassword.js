//새 비밀번호 유효성 검사
const newPwInput = document.querySelector("#user-new-pw");

function validatePwPattern(newPassword) {
  const regNewPassword =
    /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
  if (regNewPassword.test(newPassword) === false) return false;
  else return true;
}

//새 비밀번호, 새 비밀번호 확인의 실시간 유효성 검사 결과
function showValidatedPw() {
  const validatedResult = document.querySelector(".validate-new-password");
  const validatedResult2 = document.querySelector(".validate-new-pw-check");

  if (validatePwPattern(newPwInput.value) === false) {
    validatedResult.innerText =
      "영문, 숫자, 특수문자를 혼합하여 8~15자로 입력해주세요.";
    validatedResult.style.color = "red";

    validatedResult2.innerText = "유효한 비밀번호가 아닙니다.";
    validatedResult2.style.color = "red";
  } else {
    validatedResult.innerText = "사용 가능한 비밀번호 입니다.";
    validatedResult.style.color = "blue";

    validatedResult2.innerText = "비밀번호가 일치하지 않습니다.";
    validatedResult2.style.color = "red";
  }
}
newPwInput.addEventListener("keyup", showValidatedPw);

//새 비밀번호 일치 확인
const newPwCheckInput = document.querySelector("#user-new-pw-check");

function showPwCheck() {
  const validatedResult = document.querySelector(".validate-new-pw-check");
  if (newPwInput.value === newPwCheckInput.value) {
    validatedResult.innerText = "비밀번호가 일치합니다.";
    validatedResult.style.color = "blue";
  } else {
    validatedResult.innerText = "비밀번호가 일치하지 않습니다.";
    validatedResult.style.color = "red";
  }
}
newPwCheckInput.addEventListener("keyup", showPwCheck);

//특정 회원 조회
let userData = [];
const URI = "http://kdt-sw-5-team06.elicecoding.com:3000";
const token = localStorage.getItem("token");

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
    console.log("userData", userData);
  } catch (error) {
    console.log(error);
  }
}
//회원 아이디
let userId = "";
getUser().then(() => {
  userId = userData._id;
  // console.log(userId);
});
//회원정보수정요청
document
  .querySelector(".my-info-container")
  .addEventListener("submit", function (event) {
    // form의 기본 동작(페이지 리로드 등)을 막습니다.
    event.preventDefault();

    // 입력된 비밀번호를 가져옵니다.
    const userOldPasswordValue = document.querySelector("#user-old-pw").value;
    const userNewPasswordValue =
      document.querySelector("#user-new-pw-check").value;

    // 변경될 사용자 정보를 서버에 PUT 요청으로 보냅니다.
    fetch(`${URI}/users/changePassword/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userId}`,
      },
      body: JSON.stringify({
        previousPassword: userOldPasswordValue,
        password: userNewPasswordValue,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("수정성공", data, userData);
        // 요청이 성공했을 때 처리
      })
      .catch((error) => {
        console.error("Error:", error);
        // 요청이 실패했을 때 처리
      });
  });

const cancelBtn = document.querySelector("#cancel-button");
cancelBtn.addEventListener("click", () => {
  window.location.href = "/index.html";
});
