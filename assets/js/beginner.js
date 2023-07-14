// //data 예시
// const data = {
//   product: [
//     {
//       categoryName: "골프",
//       name: "골프채1",
//       price: 9000,
//       image: "src/product/productImages/image-1689006625458-126313715",
//       stock: 0,
//       isForBeginner: null,
//       _id: "64ac3221270a9f2d94146e9f",
//       __v: 0,
//     },
//     {
//       categoryName: "골프",
//       name: "골프채1",
//       price: 9000,
//       image: "src/product/productImages/image-1689006625458-126313715",
//       stock: 0,
//       isForBeginner: null,
//       _id: "64ac3221270a9f2d94146e9f",
//       __v: 0,
//     },
//   ],
// };
// //아이템 데이터 가져오기
// window.onload = async function findData() {
//   const res = await fetch("");
//   const data = await res.json();

//   //아이템 정렬
//   const itemList = document.querySelector(".beginner-items");

//   let items = data.product;
//   items.map((item) => {
//     const img = item.images[0];
//     const brand = item.brand;
//     const name = item.name;
//     const price = item.price;
//     const description = item.description;

//     //초심자상품인지 확인
//     let isForBeginner = item.isForBeginner;
//     if (isForBeginner !== null) {
//       const itemEl = document.createElement("div");

//       itemEl.classList.add("item");

//       itemEl.innerHTML = `
//               <div class="item-row">
//                 <img id="itemId" src="${img}" alt="" />
//                 <i class="fa-solid fa-star"></i>
//               </div>
//               <div class="item-row">
//                 <div class="item-brand">${brand}</div>
//                 <div class="item-name">${name}</div>
//                 <div class="item-price">${price}원</div>
//                 <div class="item-description">${description}</div>
//               </div>
//   `;
//       itemList.appendChild(itemEl);
//     }
//   });
// };

//나중에 지우기
const itemList = document.querySelector(".beginner-items");

for (let i = 1; i <= 16; i++) {
  const itemEl = document.createElement("div");

  itemEl.classList.add("item");

  itemEl.innerHTML = `
          <div class="item-row">
            <img id="itemId" src="/assets/img/men-top-${i}.jpg" alt="" />
            <i class="fa-solid fa-star"></i>
          </div>
          <div class="item-row">
            <div class="item-brand">브랜드명</div>
            <div class="item-name">상품명</div>
            <div class="item-price">00000원</div>
            <div class="item-review">
              <i class="fa-solid fa-star"></i>
              <span class="review-rating"><strong>5.0</strong>/5</span>
              <span class="review-bar"></span>
              <span class="review-number">리뷰 1</span>
          </div>
          
        </div>
  `;
  itemList.appendChild(itemEl);
}
