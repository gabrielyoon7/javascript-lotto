/* eslint-disable no-undef */
class PurchaseResults extends HTMLElement {
  constructor() {
    super();
    // const myAttribute = this.getAttribute('my-attribute');
    // console.log(myAttribute); // prints the value of the 'my-attribute' attribute
    this.innerHTML = `
    <div>
      <div id="purchase-results-title">총 ${globalThis.global.getStore('lottos').length}개를 구매하였습니다.</div>
      <div>
        ${globalThis.global.getStore('lottos').map((lotto) => `
        <div class="d-flex align-items-center">
          <div class="lotto-ticket-icon">🎟️</div>
          <div class="lotto-ticket ">${lotto.getNumbers().join(', ')}</div>
        </div>
        `).join('')}
      </div>
    </div>
    `;
  }

  connectedCallback() {
    console.log('(PurchaseResults)는 연결됐다');
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)
  }

  disconnectedCallback() {
    console.log('(PurchaseResults)는 연결이 해제됐다');
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }
}
export default PurchaseResults;
