import { $ } from '../ts/util/el';
import { SubmitButton, toggleSpinner } from '../ts/gfx/submit-button';

import './mail_login.scss';

/**
 * Represents a login attempt
 * @type
 */
type loginAttempt = { valid: boolean };

/**
 * Stores the login elements of the mail server
 * @constant
 */
const Login: {
  attr: { username: string; password: string };
} = {
  attr: {
    username: 'input#username',
    password: 'input#password'
  }
};

document.addEventListener('DOMContentLoaded', addListeners, false);

/**
 * Adds listeners for the mail login server
 * @event
 */
function addListeners(): void {
  Object.entries(Login.attr).forEach(list => {
    ($(list[1]) as HTMLInputElement).onfocus = function() {
      (this as HTMLInputElement).placeholder = '';
    };

    ($(list[1]) as HTMLInputElement).onblur = function() {
      (this as HTMLInputElement).placeholder = list[0];
    };
  });

  ($(SubmitButton.el) as HTMLElement).onclick = attemptLogin;

  document.removeEventListener('DOMContentLoaded', addListeners, false);
}

/**
 * Submits a mail login request
 * @async @function
 */
async function submitLoginRequest(): Promise<loginAttempt> {
  return fetch('/mail/verify', {
    headers: new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }),
    method: 'POST',
    body: JSON.stringify({
      username: ($(Login.attr.username) as HTMLInputElement).value,
      password: ($(Login.attr.password) as HTMLInputElement).value
    })
  }).then(data => data.json());
}

/**
 * Attempts to login, with UI notifications
 * @async @function
 */
async function attemptLogin() {
  toggleSpinner('block', 'none', 'transparent');
  (await submitLoginRequest()).valid ? redirectToMail() : showIncorrect();
}

/**
 * Redirects to mail client
 * @function
 */
function redirectToMail(): void {
  window.location.href =
    `/mail/` +
    `${encodeURIComponent(
      ($(Login.attr.username) as HTMLInputElement).value
    )}?` +
    `key=${encodeURIComponent(
      ($(Login.attr.password) as HTMLInputElement).value
    )}`;
}

/**
 * Displays UI notifications of incorrect login credentials
 * @function
 */
function showIncorrect(): void {
  toggleSpinner('none', 'block', '#fff');
  Object.values(Login.attr).forEach(el => {
    ($(el) as HTMLInputElement).value = '';
    $(el).addClass('wrong');
    setTimeout(() => $(el).removeClass('wrong'), 500);
  });
}
