import * as dragula from 'dragula';
import { $ } from '../ts/util/el';
import { SubmitButton, toggleSpinner } from '../ts/gfx/submit-button';

import './mail.scss';

type uploadAttempt = { file?: string; successful: boolean; error?: string };

const Data = {
  form: 'div.box',
  label: 'div.box span',
  file: 'input#file',
  recipient: 'input#to',
  submit: 'div.next'
};

document.addEventListener('DOMContentLoaded', init, false);

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

function removeEntryAnims() {
  const divs = document.querySelectorAll(
    '.col div.title, .col > div:not(.title)'
  );
  for (let i = 0; i < divs.length; ++i) {
    (divs[i] as HTMLDivElement).style.animation = 'none';
  }
}

function allowDragging(): void {
  dragula([$('body')], {
    direction: 'horizontal'
  });
}

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

function updateFileValue() {
  const label = this.value.replace(/\\/g, '/').replace(/.*\//, '');
  $(Data.label).innerText = label;
}

async function uploadFile(): Promise<uploadAttempt> {
  let form = new FormData();
  form.append('file', ($(Data.file) as HTMLInputElement).files[0]);
  form.append('user', window.location.pathname.split('/mail/')[1]);
  form.append('escaped-key', decodeURI(window.location.search.split('=')[1]));
  form.append('recipient', ($(Data.recipient) as HTMLInputElement).value);

  return fetch('/mail/send', {
    headers: {
      Accept: 'application/json'
    },
    method: 'POST',
    body: form
  }).then(data => data.json());
}

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

function resetFileInput() {
  ($(Data.file) as HTMLInputElement).type = 'text';
  ($(Data.file) as HTMLInputElement).type = 'file';
}

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
