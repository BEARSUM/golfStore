const registerButton = document.querySelector("#registerButton");

// API 요청 함수
async function fetchAPI(data) {
  const response = await fetch(
    "http://kdt-sw-5-team06.elicecoding.com:3000/users/sign-up",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const responseData = await response.json();

  if (response.ok) {
    alert("회원가입에 성공하였습니다!");
    window.location.href = "/login.html";
    // 회원가입 성공 시 처리할 내용을 여기에 작성하세요.
  } else {
    alert("회원가입에 실패하였습니다!");
    // 회원가입 실패 시 처리할 내용을 여기에 작성하세요.
    console.error(responseData);
  }
}

registerButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const emailInput = document.querySelector("#emailInput");
  const passwordInput = document.querySelector("#passwordInput");
  const nameInput = document.querySelector("#nameInput");
  const streetAddressInput = document.querySelector("#streetAddressInput");
  const detailAddressInput = document.querySelector("#detailAddressInput");
  const postalCodeInput = document.querySelector("#postalCodeInput");
  const birthdateInput = document.querySelector("#birthdateInput");
  const phoneNumberInput = document.querySelector("#phoneNumberInput");

  const email = emailInput.value;
  const password = passwordInput.value;
  const name = nameInput.value;
  const streetAddress = streetAddressInput.value;
  const detailAddress = detailAddressInput.value;
  const postalCode = postalCodeInput.value;
  const birthdate = birthdateInput.value;
  const phoneNumber = phoneNumberInput.value;

  const data = {
    email,
    password,
    name,
    address: {
      streetAddress,
      detailAddress,
      postalCode,
    },
    birthdate,
    phoneNumber,
  };

  console.log(JSON.stringify(data));

  // 호출된 API 요청 함수
  fetchAPI(data);
});
