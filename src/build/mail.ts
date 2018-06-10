import dragula from 'dragula';
import { $, $$ } from '../ts/util/el';
import { submitButton, toggleSpinner } from '../ts/gfx/submit-button';

import './mail.scss';

/**
 * Represents an upload attempt
 * @type
 */
type UploadAttempt = { file?: string; successful: boolean; error?: string };

/**
 * Stores the data elements of the mail client
 * @constant
 */
const DATA = {
  form: $('div.box'),
  label: $('div.box span'),
  file: <HTMLInputElement>$('input#file'),
  recipient: <HTMLInputElement>$('input#to'),
  submit: $('div.next'),
};

/**
 * Removes entry animations
 * @function
 */
function removeEntryAnims() {
  const divs = <HTMLDivElement[]>$$('.col div.title, .col > div:not(.title)');
  for (const div of divs) {
    div.style.animation = 'none';
  }
}

/**
 * Allow for Dragula support on mail client data columns
 * @function
 */
function allowDragging(): void {
  dragula([$('body')], {
    direction: 'horizontal',
  });
}

/**
 * Allow for drag and drop of mail client data columns
 * @function
 */
function enableDragnDrop(): void {
  for (const event of [
    'drag',
    'dragstart',
    'dragend',
    'dragover',
    'dragenter',
    'dragleave',
    'drop',
  ]) {
    DATA.form.addEventListener(event, (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
  }
  for (const event of ['dragover', 'dragenter']) {
    DATA.form.addEventListener(event, () => {
      DATA.form.addClass('is-dragover');
    });
  }
  for (const event of ['dragleave', 'dragend', 'drop']) {
    DATA.form.addEventListener(event, () => {
      DATA.form.removeClass('is-dragover');
    });
  }

  DATA.file.onchange = updateFileValue;
}

/**
 * Displays the file uploaded
 * @function
 */
function updateFileValue(this: HTMLInputElement) {
  const label = this.value.replace(/\\/g, '/').replace(/.*\//, '');
  DATA.label.innerText = label;
}

/**
 * Uploads a file to the mail server
 * @async @function
 */
async function uploadFile(): Promise<UploadAttempt> {
  const form = new FormData();
  form.append('file', DATA.file.files[0]);
  form.append('user', window.location.pathname.split('/mail/')[1]);
  form.append('escaped-key', decodeURI(window.location.search.split('=')[1]));
  form.append('recipient', DATA.recipient.value);

  return fetch('/mail/send', {
    headers: new Headers({
      Accept: 'application/json',
    }),
    method: 'POST',
    body: form,
  }).then((data) => data.json());
}

/**
 * Attempts to submit a file to the mail service
 * @async @function
 */
async function attemptSubmission() {
  toggleSpinner('block', 'none', 'transparent');
  const result = await uploadFile();
  if (result.successful) {
    showUploadSuccess.bind(DATA.recipient)();
  } else if (result.error === 'recipient dne') {
    showIncorrect.bind(DATA.recipient)();
  } else if (result.error === 'invalid credentials') {
    window.location.href = `/mail/${
      window.location.pathname.split('/mail/')[1]
    }`;
  }
}

/**
 * Resets file input
 * @function
 */
function resetFileInput() {
  DATA.file.type = 'text';
  DATA.file.type = 'file';
}

/**
 * Displays UI notifications of successful file upload
 * @function
 */
function showUploadSuccess(this: HTMLInputElement): void {
  toggleSpinner('none', 'block', '#fff');
  resetFileInput();
  DATA.label.innerText = 'Drop file';
  this.value = '';
  this.addClass('success');
  setTimeout(() => {
    this.removeClass('success');
  }, 1000);
}

/**
 * Displays UI notifications of failed file upload
 * @function
 */
function showIncorrect(this: HTMLInputElement): void {
  toggleSpinner('none', 'block', '#fff');
  this.value = '';
  this.placeholder = 'User not found';
  this.addClass('wrong');
  setTimeout(() => {
    this.removeClass('wrong');
    this.placeholder = 'recipient';
  }, 1000);
}

/**
 * Initializes the mail client
 * @event
 */
(() => {
  setTimeout(removeEntryAnims, 500);
  allowDragging();
  enableDragnDrop();

  $(submitButton.el).onclick = () => {
    if (DATA.file.files.length > 0) {
      attemptSubmission();
    } else {
      DATA.form.addClass('nofile');
      setTimeout(() => DATA.form.removeClass('nofile'), 500);
    }
  };
})();
