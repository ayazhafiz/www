import * as dragula from 'dragula';
import { $ } from '../ts/util/el';
import { SubmitButton, toggleSpinner } from '../ts/gfx/submit-button';

import './mail.scss';

/**
 * Represents an upload attempt
 * @type
 */
type uploadAttempt = { file?: string; successful: boolean; error?: string };

/**
 * Stores the data elements of the mail client
 * @constant
 */
const Data = {
  form: 'div.box',
  label: 'div.box span',
  file: 'input#file',
  recipient: 'input#to',
  submit: 'div.next'
};

document.addEventListener('DOMContentLoaded', init, false);

/**
 * Initializes the mail client
 * @event
 */
function init() {
  setTimeout(function() {
    removeEntryAnims();
  }, 500);
  allowDragging();
  enableDragnDrop();

  ($(SubmitButton.el) as HTMLElement).onclick = function() {
    if (($(Data.file) as HTMLInputElement).files.length > 0) {
      attemptSubmission();
    } else {
      $(Data.form).addClass('nofile');
      setTimeout(() => $(Data.form).removeClass('nofile'), 500);
    }
  };
}

/**
 * Removes entry animations
 * @function
 */
function removeEntryAnims() {
  const divs = document.querySelectorAll(
    '.col div.title, .col > div:not(.title)'
  );
  for (let i = 0; i < divs.length; ++i) {
    (divs[i] as HTMLDivElement).style.animation = 'none';
  }
}

/**
 * Allow for Dragula support on mail client data columns
 * @function
 */
function allowDragging(): void {
  dragula([$('body')], {
    direction: 'horizontal'
  });
}

/**
 * Allow for drag and drop of mail client data columns
 * @function
 */
function enableDragnDrop(): void {
  for (let event of [
    'drag',
    'dragstart',
    'dragend',
    'dragover',
    'dragenter',
    'dragleave',
    'drop'
  ]) {
    $(Data.form).addEventListener(event, function(e) {
      e.preventDefault();
      e.stopPropagation();
    });
  }
  for (let event of ['dragover', 'dragenter']) {
    $(Data.form).addEventListener(event, function() {
      $(Data.form).addClass('is-dragover');
    });
  }
  for (let event of ['dragleave', 'dragend', 'drop']) {
    $(Data.form).addEventListener(event, function() {
      $(Data.form).removeClass('is-dragover');
    });
  }

  ($(Data.file) as HTMLInputElement).onchange = updateFileValue;
}

/**
 * Displays the file uploaded
 * @function
 */
function updateFileValue() {
  const label = this.value.replace(/\\/g, '/').replace(/.*\//, '');
  $(Data.label).innerText = label;
}

/**
 * Uploads a file to the mail server
 * @async @function
 */
async function uploadFile(): Promise<uploadAttempt> {
  let form = new FormData();
  form.append('file', ($(Data.file) as HTMLInputElement).files[0]);
  form.append('user', window.location.pathname.split('/mail/')[1]);
  form.append('escaped-key', decodeURI(window.location.search.split('=')[1]));
  form.append('recipient', ($(Data.recipient) as HTMLInputElement).value);

  return fetch('/mail/send', {
    headers: new Headers({
      Accept: 'application/json'
    }),
    method: 'POST',
    body: form
  }).then(data => data.json());
}

/**
 * Attempts to submit a file to the mail service
 * @async @function
 */
async function attemptSubmission() {
  toggleSpinner('block', 'none', 'transparent');
  const result = await uploadFile();
  if (result.successful) {
    showUploadSuccess.bind($(Data.recipient) as HTMLInputElement)();
  } else if (result.error === 'invalid credentials') {
    window.location.href = `/mail/${
      window.location.pathname.split('/mail/')[1]
    }`;
  } else if (result.error === 'recipient dne') {
    showIncorrect.bind($(Data.recipient) as HTMLInputElement)();
  }
}

/**
 * Resets file input
 * @function
 */
function resetFileInput() {
  ($(Data.file) as HTMLInputElement).type = 'text';
  ($(Data.file) as HTMLInputElement).type = 'file';
}

/**
 * Displays UI notifications of successful file upload
 * @function
 */
function showUploadSuccess(): void {
  toggleSpinner('none', 'block', '#fff');
  resetFileInput();
  $(Data.label).innerText = 'Drop file';
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
function showIncorrect(): void {
  toggleSpinner('none', 'block', '#fff');
  this.value = '';
  this.placeholder = 'User not found';
  this.addClass('wrong');
  setTimeout(() => {
    this.removeClass('wrong');
    this.placeholder = 'recipient';
  }, 1000);
}
