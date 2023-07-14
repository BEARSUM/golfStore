function createFooter() {
  const footer = document.createElement("footer");
  footer.innerHTML = `
  <hr class="footer-separator"> <!-- 구분선 추가 -->
      <div class="footerbody">
        <div class="footerCompany">THE GOLF</div>
        <div class="businessInfo">사업자 정보</div>
        <div class="footerContents">
          <a href="#"><span>이용약관</span></a>
          <a href="#"><span>개인정보처리방침</span></a>
          <a href="#"><span>청소년보호정책</span></a>
          <a href="#"><span>대량주문안내</span></a>
          <a href="#"><span>채용공고</span></a>
        </div>
        <div class="businessDetailOne">
          <span>대표이사 : 한규정</span>
          <span>서울특별시 강남구 삼성로 518</span>
          <span>사업자등록번호 : 138-85-19612</span>
        </div>
        <div class="businessDetailTwo">
          <span>대표전화 : 1234-1234(발신자 부담전화)</span>
          <span>FAX : 0123-456-7899(지역번호 공통)</span>
          <span>서울시 서울특별시 통신판매업신고번호 : 제 653호 </span>
        </div>
        <div class="finalFooter">©THE GOLF all rights reserved</div>
      </div>
    `;
  document.body.appendChild(footer);
}

export { createFooter };
