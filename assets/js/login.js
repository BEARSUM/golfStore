const URI = "http://localhost:8080/users/sign-in";

const idInput = document.querySelector("#idInput");
const passwordInput = document.querySelector("#passwordInput");
const loginButton = document.querySelector("#loginButton");
const logoutButton = document.querySelector("#logoutButton");

loginButton.addEventListener("click", handleSubmit);
logoutButton.addEventListener("click", handleLogout);

async function fetchAPI(data) {
  const response = await fetch(URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const responseData = await response.json();
    const token = responseData.token;

    // 토큰 값을 로컬 스토리지에 저장
    localStorage.setItem("token", token);
    localStorage.setItem("Authorization", `Bearer ${token}`);

    //alert("로그인에 성공하였습니다!");
    window.location.href = "/index.html";
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message);
  }
}

function handleLogout(e) {
  e.preventDefault();

  // 로컬 스토리지에서 토큰을 삭제합니다.
  localStorage.removeItem("token");
  localStorage.removeItem("Authorization");
  //alert("로그아웃에 성공하였습니다!");
  window.location.href = "/index.html"; // 로그아웃 후 이동할 로그인 페이지의 URL을 적어주세요.
}

async function handleSubmit(e) {
  e.preventDefault();

  if (!idInput.value) {
    return alert("아이디를 입력해 주세요.");
  }

  if (!passwordInput.value) {
    return alert("비밀번호를 입력해 주세요.");
  }

  const data = {
    email: idInput.value,
    password: passwordInput.value,
  };

  try {
    await fetchAPI(data);
  } catch (error) {
    alert("로그인에 실패하였습니다. " + error.message);
    console.error(error);
  }
}
