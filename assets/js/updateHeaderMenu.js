async function getUserData(token) {
  if (!token) {
    return null;
  }

  try {
    const response = await fetch(
      `http://kdt-sw-5-team06.elicecoding.com:3000/users/token/${token}`
    );
    return await response.json();
  } catch (err) {
    console.log(err);
    return null; // If there is an error, return null
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

  const token = localStorage.getItem("token");
  const userData = await getUserData(token);

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

export { updateHeaderMenu, getUserData };
