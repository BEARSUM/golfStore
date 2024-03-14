async function getUserData(token) {
  try {
    const response = await axios.get(
      `http://localhost:8080/users/token/${token}`
    );
    return response;
  } catch (err) {
    if (window.location.pathname === "/my.html") {
      window.location.href = "/login.html";
    }
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("Authorization");
    alert("로그아웃 되었습니다.");
    return null;
  }
}

async function updateHeaderMenu() {
  const login = document.querySelector("#login");
  const logout = document.querySelector("#logout");
  const adminPage = document.querySelector("#adminPage");
  const edit = document.querySelector("#edit");
  const seeOrder = document.querySelector("#seeOrder");
  const register = document.querySelector("#register");
  const search = document.querySelector(".search");

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken && window.location.pathname !== "/login.html") {
    const userData = await getUserData(accessToken);

    // console.log("userData", userData);
    if (userData) {
      if (userData.isAdmin) {
        logout.classList.remove("hidden");
        adminPage.classList.remove("hidden");
        edit.classList.add("hidden");
        seeOrder.classList.add("hidden");
        login.classList.add("hidden");
        register.classList.add("hidden");
        search.classList.add("hidden");
      } else {
        logout.classList.remove("hidden");
        edit.classList.remove("hidden");
        seeOrder.classList.add("hidden");
        adminPage.classList.add("hidden");
        login.classList.add("hidden");
        register.classList.add("hidden");
        cart.classList.remove("hidden");
      }
    } else {
      logout.classList.add("hidden");
      adminPage.classList.add("hidden");
      edit.classList.add("hidden");
      seeOrder.classList.add("hidden");
      login.classList.remove("hidden");
      register.classList.remove("hidden");
      cart.classList.remove("hidden");
    }
  }
}

export { updateHeaderMenu, getUserData };
