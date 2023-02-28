/* eslint-disable no-undef */
import '../../css/inputWinningNumber.css';
import { calculateBenefit } from '../../domain/calculateBenefit';
import { judgeResult } from '../../domain/judgeResult';
import LottoValidator from '../../domain/LottoValidator';
class InputWinningNumberBox extends HTMLElement {
  constructor() {
    super();
    // const myAttribute = this.getAttribute('my-attribute');
    // console.log(myAttribute); // prints the value of the 'my-attribute' attribute
    this.innerHTML = `
  <div id="input-winning-number-title">
    지난 주 당첨 번호 6개와 보너스 번호 1개를 입력해주세요.
  </div>
  <div class="d-flex justify-content-between">
    <div>
      당첨 번호
    </div>
    <div>
      보너스 번호
    </div>
  </div>
  <form id="winning-number-submit">
    <div class="d-flex justify-content-between">
      <div>
        <input class="ball-box" name="main0" />
        <input class="ball-box" name="main1" />
        <input class="ball-box" name="main2" />
        <input class="ball-box" name="main3" />
        <input class="ball-box" name="main4" />
        <input class="ball-box" name="main5" />
      </div>
      <div>
        <input class="ball-box" name="bonus" />    
      </div>
    </div>
    <button class="width-100 btn lotto-primary lotto-greyscale-1" id="game-modal-open-button">결과 확인하기</button>
  </form>
    `;
  }

  connectedCallback() {
    console.log('(InputWinningNumberBox)는 연결됐다');
    // browser calls this method when the element is added to the document
    // (can be called many times if an element is repeatedly added/removed)

    const winningNumberObject = (event) => {
      const formData = new FormData(event.target);
      return {
        main: [
          formData.get('main0'),
          formData.get('main1'),
          formData.get('main2'),
          formData.get('main3'),
          formData.get('main4'),
          formData.get('main5'),
        ],
        bonus: formData.get('bonus'),
      };
    };


    const winningNumberValidator = (winningNumber) => {
      LottoValidator.checkWinningNumber(winningNumber.main.join(','));
      LottoValidator.checkBonusNumber(winningNumber.bonus);
      LottoValidator.checkLottoDuplicate(winningNumber);
    };

    const calculateLottos = () => {
      const result = judgeResult(globalThis.global.getStore('lottos'), globalThis.global.getStore('winningNumber'));
      const benefit = calculateBenefit(globalThis.global.getStore('lottos').length * 1000, result);
      globalThis.global.setStore('result', result);
      globalThis.global.setStore('benefit', benefit);
    };

    const openGameModal = () => {
      const modal = document.getElementById("game-modal");
      modal.style.display = "block";
    };

    const form = document.getElementById("winning-number-submit");
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      try {
        const winningNumber = winningNumberObject(event);
        winningNumberValidator(winningNumber);
        globalThis.global.setStore('winningNumber', winningNumber);
        calculateLottos(global);
        console.log(globalThis.global.getStore('result'));
        openGameModal();
        const el3 = document.getElementById('game-result');
        el3.innerHTML = '<game-modal></game-modal>';
      } catch (error) {
        alert(error.message);
      }
    });
  }

  disconnectedCallback() {
    console.log('(InputWinningNumberBox)는 연결이 해제됐다');
    // browser calls this method when the element is removed from the document
    // (can be called many times if an element is repeatedly added/removed)
  }
}
export default InputWinningNumberBox;
