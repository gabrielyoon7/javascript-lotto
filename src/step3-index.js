/* eslint-disable no-undef */
import './css/style.css';
import './css/layout.css';
import LottoValidator from './domain/LottoValidator';
import { generateLottos } from './domain/generateLottos';
import Global from './utils/Global';
import PurchaseResults from './view/elements/PurchaseResults';
import InputWinningNumberBox from './view/elements/InputWinningNumberBox';
import GameModal from './view/elements/GameModal';

/**
 * step 3의 시작점이 되는 파일입니다.
 * 노드 환경에서 사용하는 readline 등을 불러올 경우 정상적으로 빌드할 수 없습니다.
 */
customElements.define('purchase-results', PurchaseResults);
customElements.define('input-winning-number', InputWinningNumberBox);
customElements.define('game-modal', GameModal);

const global = new Global();
globalThis.global = global;

const form = document.getElementById("money-submit");
form.addEventListener('submit', function (event) {
  event.preventDefault();
  const money = event.target.money.value;
  try {
    LottoValidator.checkMoney(money);
    global.setStore('lottos', generateLottos((money)));
    event.target.money.value = '';
    const el1 = document.getElementById('purchase-result');
    el1.innerHTML = '<purchase-results></purchase-results>';
    const el2 = document.getElementById("input-winning-number");
    el2.innerHTML = '<input-winning-number></input-winning-number>';
  } catch (error) {
    alert(error.message);
  }
});
