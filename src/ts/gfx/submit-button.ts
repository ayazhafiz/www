import { $ } from '../util/el';

/**
 * Stores the elements of the submit button
 * @constant
 */
const submitButton: { el: string; arrows: string[]; spinners: string[] } = {
  el: 'div.next',
  arrows: ['div.arrow', 'div.arrow-head'],
  spinners: ['.double-bounce1', '.double-bounce2'],
};

/**
 * Toggles between submit button and its spinner
 * @function
 */
function toggleSpinner(
  spinnerDisplay: string,
  arrowDisplay: string,
  buttonColor: string,
  scope: string = '.file-scope',
) {
  for (const spinner of submitButton.spinners) {
    $(`${scope} ${spinner}`).style.display = spinnerDisplay;
  }
  for (const arrow of submitButton.arrows) {
    $(`${scope} ${arrow}`).style.display = arrowDisplay;
  }
  $(`${scope} ${submitButton.el}`).style.background = buttonColor;
}

export { submitButton, toggleSpinner };
