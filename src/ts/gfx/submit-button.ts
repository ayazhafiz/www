import { $ } from '../page/el';

const SubmitButton: { el: string; arrows: string[]; spinners: string[] } = {
  el: 'div.next',
  arrows: ['div.arrow', 'div.arrow-head'],
  spinners: ['.double-bounce1', '.double-bounce2']
};

function toggleSpinner(spinnerDisp, arrowDisp, buttonColor) {
  for (let el of SubmitButton.spinners) {
    ($(el) as HTMLElement).style.display = spinnerDisp;
  }
  for (let el of SubmitButton.arrows) {
    ($(el) as HTMLElement).style.display = arrowDisp;
  }
  ($(SubmitButton.el) as HTMLElement).style.background = buttonColor;
}

export { SubmitButton, toggleSpinner };
