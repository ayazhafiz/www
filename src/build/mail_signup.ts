import { $ } from '../ts/util/el';
import { submitButton, toggleSpinner } from '../ts/gfx/submit-button';

import './mail_signup.scss';

/**
 * Represents a signup attempt
 * @type
 */
type signupAttempt = { successful: boolean; error?: string };

/**
 * Stores the signup elements of the mail server
 * @constant
 */
const SIGNUP: {
  attr: { username: HTMLInputElement; password: HTMLInputElement };
} = {
  attr: {
    username: <HTMLInputElement>$('input#username'),
    password: <HTMLInputElement>$('input#password'),
  },
};

/**
 * Submits a mail signup request
 * @async @function
 */
async function submitSignupRequest(): Promise<signupAttempt> {
  const form = new FormData();
  form.append('username', SIGNUP.attr.username.value);
  form.append('password', SIGNUP.attr.password.value);

  return fetch(`/mail/signup`, {
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
 * Attempts to signup, with UI notifications
 * @async @function
 */
async function attemptLogin() {
  toggleSpinner('block', 'none', 'transparent');
  const resp = await submitSignupRequest();
  resp.successful ? redirectToMail() : showIncorrect(resp.error);
}

/**
 * Redirects to mail client
 * @function
 */
function redirectToMail(): void {
  window.location.href = '/mail';
}

/**
 * Displays UI notifications of incorrect signup credentials
 * @function
 */
function showIncorrect(error: string): void {
  toggleSpinner('none', 'block', '#fff');
  Object.values(SIGNUP.attr).forEach((el) => {
    el.value = '';
    el.addClass('wrong');
    setTimeout(() => el.removeClass('wrong'), 1000);
    if (el === SIGNUP.attr.username) {
      el.placeholder = error;
      setTimeout(() => (el.placeholder = 'username'), 1000);
    }
  });
}

/**
 * Adds listeners for the mail signup server
 * @event
 */
(() => {
  Object.entries(SIGNUP.attr).forEach((list) => {
    list[1].onfocus = function(this: HTMLInputElement) {
      this.placeholder = '';
    };

    list[1].onblur = function(this: HTMLInputElement) {
      this.placeholder = list[0];
    };
  });

  $(submitButton.el).onclick = attemptLogin;
  Object.values(SIGNUP.attr).forEach(
    (input) =>
      (input.onkeydown = (e) => {
        if (e.key === 'Enter') {
          attemptLogin();
        }
      }),
  );
})();
