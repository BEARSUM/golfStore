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

//특정 회원 조회
let userData = [];
const URI = "http://localhost:8080";
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

//이메일 유효성 검사
const emailInput = document.querySelector("#user-email-input");

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

//회원 이름,이메일,id
let userId = "";
getUser().then(() => {
  const userName = document.querySelector("#user-name-input");
  const userBirth = document.querySelector("#member-birth-input");
  const userEmail = document.querySelector("#user-email-input");
  const userPhone = document.querySelector("#user-phone-input");
  const userPost = document.querySelector("#user-post-input");
  const userStreetAddress = document.querySelector("#user-street-input");
  const userDetailAddress = document.querySelector("#user-detail-input");

  userId = userData._id;
  // console.log(userId);
  userName.value = userData.name;
  userBirth.value = userData.birthdate.slice(0, 10);
  userEmail.value = userData.email;
  userPhone.value = userData.phoneNumber;
  userPost.value = userData.address.postalCode;
  userStreetAddress.value = userData.address.streetAddress;
  userDetailAddress.value = userData.address.detailAddress;
});

//개인정보 제공동의 체크박스 확인 함수
function validateCheckboxes() {
  const checkbox1 = document.getElementById("trust-checkbox-1");
  const checkbox2 = document.getElementById("trust-checkbox-2");

  // 체크박스가 체크되어 있는지 확인
  if (!checkbox1.checked || !checkbox2.checked) {
    window.alert("개인정보 내용에 동의 하셔야 완료됩니다.");
    return false;
  }

  return true;
}
//회원정보수정요청

const submitBtn = document.querySelector("#submit-button");
submitBtn.addEventListener("click", function (event) {
  if (!validateCheckboxes()) {
    event.preventDefault(); // 이벤트 동작 중지 (폼 제출 중지)
    return;
  }
  // form의 기본 동작(페이지 리로드 등)을 막습니다.
  event.preventDefault();

  // 입력된 이메일, 휴대폰 번호, 주소를 가져옵니다.
  // const userEmailValue = document.querySelector("#user-email-input").value;
  const userPhoneValue = document.querySelector("#user-phone-input").value;
  const userPostValue = document.querySelector("#user-post-input").value;
  const userStreetAddressValue =
    document.querySelector("#user-street-input").value;
  const userDetailAddressValue =
    document.querySelector("#user-detail-input").value;

  // 변경될 사용자 정보를 서버에 PUT 요청으로 보냅니다.
  fetch(`${URI}/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userId}`,
    },
    body: JSON.stringify({
      // email: userEmailValue,
      phoneNumber: userPhoneValue,
      address: {
        postalCode: userPostValue,
        streetAddress: userStreetAddressValue,
        detailAddress: userDetailAddressValue,
      },
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
  console.log(cancelBtn);
  window.location.href = "/index.html";
});
