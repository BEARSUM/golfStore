//data 예시
// data = [{}, {}, {}];

//현재 비밀번호 일치 여부 확인 -미완
// const oldPwInput = document.querySelector("#user-old-pw");

// function checkOldPw(){
//   if(){}
// }

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
