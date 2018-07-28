import dragula from 'dragula';
import { $, $$ } from '../ts/util/el';
import { submitButton, toggleSpinner } from '../ts/gfx/submit-button';
import axios from 'axios';

import './mail.scss';

/**
 * Represents an upload attempt
 * @type
 */
type UploadAttempt = {
  successful: boolean;
  file_name?: string;
  error?: string;
  upload_url?: string;
};

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
  uploadFile: null,
  savedRecipient: null,
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
async function authorizeUpload(): Promise<string> {
  const form = new FormData();
  DATA.uploadFile = DATA.file.files[0];
  form.append('recipient', DATA.recipient.value);
  form.append('file-name', DATA.uploadFile.name);
  form.append('file-type', DATA.uploadFile.type);

  return fetch('/mail/auth-upload', {
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
 * Uploads file to S3
 * @async @function
 */
async function uploadFile(signedUrl: string) {
  DATA.recipient.addClass('progress').blur();
  DATA.recipient.disabled = true;
  DATA.savedRecipient = DATA.recipient.value;

  return axios
    .request({
      method: 'PUT',
      url: signedUrl,
      headers: new Headers(),
      data: DATA.uploadFile,
      onUploadProgress: (p) => {
        DATA.recipient.value = `${((p.loaded / p.total) * 100).toFixed(2)}%`;
      },
    })
    .then((data) => {
      DATA.recipient.removeClass('progress');
      DATA.recipient.disabled = false;

      return data;
    });
}

/**
 * Attempts to submit a file to the mail service
 * @async @function
 */
async function attemptSubmission() {
  toggleSpinner('block', 'none', 'transparent');
  const result: UploadAttempt = JSON.parse(await authorizeUpload());
  if (result.successful) {
    const res = await uploadFile(result.upload_url);
    if (res.status === 200) {
      saveToServer();
    } else {
      showIncorrect.bind(DATA.recipient, 'Upload Failed')();
    }
  } else if (result.error === 'Unauthorized access.') {
    window.location.href = '/mail';
  } else {
    showIncorrect.bind(DATA.recipient, result.error)();
  }
}

/**
 * Save file uploader and reciever to server
 * @function
 */
async function saveToServer() {
  const form = new FormData();
  form.append('recipient', DATA.savedRecipient);
  form.append('file-name', DATA.uploadFile.name);
  form.append('file-type', DATA.uploadFile.type);

  const resp = await fetch('/mail/save-upload', {
    method: 'POST',
    headers: new Headers({
      Accept: 'application/json',
      Cache: 'no-cache',
    }),
    credentials: 'include',
    body: form,
  }).then((data) => data.json());

  resp.successful
    ? showUploadSuccess.bind(DATA.recipient)()
    : showIncorrect.bind(DATA.recipient, 'File save failed.')();
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
function showIncorrect(
  this: HTMLInputElement,
  error: string = 'User not found',
): void {
  toggleSpinner('none', 'block', '#fff');
  this.value = '';
  this.placeholder = error;
  this.addClass('wrong');
  setTimeout(() => {
    this.removeClass('wrong');
    this.placeholder = 'recipient';
  }, 1000);
}

/**
 * Attempts to upload files from the client
 * @function
 */
function processUpload() {
  if (DATA.file.files.length === 0) {
    DATA.form.addClass('nofile');
    setTimeout(() => DATA.form.removeClass('nofile'), 500);
  } else if (DATA.recipient.value.length === 0) {
    DATA.recipient.addClass('wrong');
    setTimeout(() => DATA.recipient.removeClass('wrong'), 500);
  } else {
    attemptSubmission();
  }
}

/**
 * Initializes the mail client
 * @event
 */
(() => {
  setTimeout(removeEntryAnims, 500);
  allowDragging();
  enableDragnDrop();

  $(submitButton.el).onclick = processUpload;
  DATA.recipient.onkeydown = (e) => {
    if (e.key === 'Enter') {
      processUpload();
    }
  };

  setTimeout(() => window.location.reload(), 3 * (60 * 60 * 1000));
})();
