//이메일 유효성 검사
const emailInput = document.querySelector("#user-email");

function checkEmail(email) {
  const regEmail =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regEmail.test(email) === false) return false;
  else return true;
}

//이메일 유효성 검사 결과 실시간으로 보기
function showCheckMsg() {
  const checkedResult = document.querySelector(".email-check-result");
  if (checkEmail(emailInput.value) === false) {
    checkedResult.innerText = "올바른 이메일을 입력하세요.";
    checkedResult.style.color = "red";
  } else {
    checkedResult.innerText = "사용 가능한 이메일입니다.";
    checkedResult.style.color = "blue";
  }
}
emailInput.addEventListener("keyup", showCheckMsg);

//주소 찾기 api
window.onload = function () {
  document
    .querySelector(".address-change-btn")
    .addEventListener("click", function () {
      //주소변경 버튼을 클릭하면
      //카카오 지도 발생
      new daum.Postcode({
        oncomplete: function (data) {
          //선택시 입력값 세팅
          document.getElementById("member-post").value = data.zonecode; // 우편 번호 넣기
          document.getElementById("member-addr").value = data.address; // 주소 넣기
          document.getElementById("member-addr-detail").focus(); //상세입력 포커싱
        },
      }).open();
    });
};

//회원정보수정요청-미완
document
  .querySelector(".my-info-container")
  .addEventListener("submit", function (event) {
    // form의 기본 동작(페이지 리로드 등)을 막습니다.
    event.preventDefault();

    // 입력된 이메일, 휴대폰 번호, 주소를 가져옵니다.
    const userEmail = document.getElementById("user-email").value;
    const userPhone = document.getElementById("user-phone").value;
    const userPost = document.getElementById("member-post").value;
    const userAddr = document.getElementById("member-addr").value;
    const userAddrDetail = document.getElementById("member-addr-detail").value;

    // 사용자 ID와 토큰을 로컬 스토리지에서 가져옵니다.
    const token = localStorage.getItem("token");

    const URI = "http://kdt-sw-5-team06.elicecoding.com";

    // 변경될 사용자 정보를 서버에 PUT 요청으로 보냅니다.
    fetch(`${URI}/${token}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: userEmail,
        phoneNumber: userPhone,
        postalCode: userPost,
        streetAddress: userAddr,
        detailAddress: userAddrDetail,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // 요청이 성공했을 때 처리
      })
      .catch((error) => {
        console.error("Error:", error);
        // 요청이 실패했을 때 처리
      });
  });
