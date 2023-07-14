function createHeader() {
  const header = document.createElement("header");
  header.className = `w-full`;
  header.innerHTML = ` <div class="header">
    <nav class="" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="mainLogo">
          <img src="/assets/img/pageLogo2 (1).png" />
        </div>

        <div class="menuOnTopright">
          <ul class="headerMenu" id="#">
            <li id="login"><a href="/login.html">로그인</a></li>
            <li id="register">
              <a href="/register.html">
                <i class="fa-solid fa-user-plus"></i>회원가입
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
       `;
  document.body.prepend(header);
}
export { createHeader };
