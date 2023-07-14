document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname;

  const links = document.querySelectorAll(".admin-category-list a");

  links.forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("highlight");
    }
  });
});
