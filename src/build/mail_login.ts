import { $ } from '../ts/util/el';
import { submitButton, toggleSpinner } from '../ts/gfx/submit-button';

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
const LOGIN: {
  attr: { username: HTMLInputElement; password: HTMLInputElement };
} = {
  attr: {
    username: <HTMLInputElement>$('input#username'),
    password: <HTMLInputElement>$('input#password'),
  },
};

/**
 * Submits a mail login request
 * @async @function
 */
async function submitLoginRequest(): Promise<loginAttempt> {
  const form = new FormData();
  form.append('username', LOGIN.attr.username.value);
  form.append('password', LOGIN.attr.password.value);

  return fetch(`/mail/verify`, {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      Cache: 'no-cache',
    }),
    credentials: 'include',
    body: form,
  }).then((data) => data.json());
}

/**
 * Attempts to login, with UI notifications
 * @async @function
 */
async function attemptLogin() {
  toggleSpinner('block', 'none', 'transparent', '.login-scope');
  (await submitLoginRequest()).valid ? redirectToMail() : showIncorrect();
}

/**
 * Redirects to mail client
 * @function
 */
function redirectToMail(): void {
  window.location.href = '/mail';
}

/**
 * Displays UI notifications of incorrect login credentials
 * @function
 */
function showIncorrect(): void {
  toggleSpinner('none', 'block', '#fff', '.login-scope');
  Object.values(LOGIN.attr).forEach((el) => {
    if (el === LOGIN.attr.password) {
      el.value = '';
    }
    el.addClass('wrong');
    setTimeout(() => el.removeClass('wrong'), 500);
  });
}

/**
 * Adds listeners for the mail login server
 * @event
 */
(() => {
  Object.entries(LOGIN.attr).forEach((list) => {
    list[1].onfocus = function(this: HTMLInputElement) {
      this.placeholder = '';
    };

    list[1].onblur = function(this: HTMLInputElement) {
      this.placeholder = list[0];
    };
  });

  $(submitButton.el).onclick = attemptLogin;
  Object.values(LOGIN.attr).forEach(
    (input) =>
      (input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          attemptLogin();
        }
      }),
  );
})();
