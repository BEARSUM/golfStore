const itemList = document.querySelector(".products-items");
for (let i = 1; i <= 16; i++) {
  const item = document.createElement("div");

  item.classList.add("item");

  item.innerHTML = `
    <div class="item-row">
                <img id="itemId" src="../img/men-top-${i}.jpg" alt="" />
                <i class="fa-regular fa-star"></i>
              </div>
              <div class="item-row">
                <div class="item-brand">브랜드명</div>
                <div class="item-name">상품명</div>
                <div class="item-price">00000원</div>
                <div class="item-review">
                  <i class="fa-regular fa-star"></i>
                  <span class="item-rating">5.0/5</span>
                  <span class="item-bar"></span>
                  <span class="item-review-number">리뷰 1</span>
                </div>
                <div class="item-new">신상품</div>
              </div>
  `;
  itemList.appendChild(item);
}
