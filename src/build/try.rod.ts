import * as FileSaver from 'file-saver';
import { $ } from '../ts/page/el';

import './try.rod.scss';

declare const CodeMirror: any;

const HELLO_WORLD = `^^^^+***/+++*+**+&/+++*+(,++)+++&/
_
^^^+**+*+*+/+++***&/+++&/+++**+*+**/+++***+**/^^^^^^+/`;
const HELLO_WORLD_RES = 'Hello World!';
const HEADERS = new Headers({
  'Content-Type': 'application/json'
});
const State = {
  rodEditor: null,
  rodEval: null,
  last: null
};

const evaluate = (str: string): Promise<any> => {
  return fetch('', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      arg: str
    })
  })
    .then(resp => resp.json())
    .then(resp => (resp.error ? resp.error : resp.success))
    .catch(err => err);
};
const setResult = (str: string): void => {
  State.rodEval.getDoc().setValue(str);
};
const dload = (str: string): void => {
  setResult(str);
  const fileName = (str.length < 16 ? str : str.substr(0, 16))
    .trim()
    .replace(/\s/, '-');
  const blob = new Blob([State.last], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, `${fileName}.fish`);
};

document.addEventListener('DOMContentLoaded', (): void => {
  State.rodEditor = CodeMirror(document.body, {
    value: HELLO_WORLD,
    lineNumbers: true,
    theme: 'material'
  });

  State.rodEval = CodeMirror(document.body, {
    value: HELLO_WORLD_RES,
    lineNumbers: true,
    theme: 'material',
    readOnly: 'nocursor'
  });
  State.rodEval.display.wrapper.className += ' eval';

  const execute = document.createElement('div');
  execute.classList.add('run');
  execute.innerText = 'run (\u2318 + Ent)';
  State.rodEditor.display.wrapper.appendChild(execute);

  const download = execute.cloneNode(true);
  (<Element>download).classList.add('download');
  (<Element>download).innerText = 'download `.fish`';
  State.rodEval.display.wrapper.appendChild(download);

  document.addEventListener('keydown', (evt: KeyboardEvent): void => {
    if (
      (evt.keyCode === 13 || evt.which === 13) &&
      (evt.metaKey || evt.ctrlKey) &&
      State.rodEditor.getValue() !== State.last
    ) {
      evaluate((State.last = State.rodEditor.getValue())).then(setResult);
    }
  });
  execute.addEventListener('click', (): void => {
    if (State.rodEditor.getValue() !== State.last) {
      evaluate((State.last = State.rodEditor.getValue())).then(setResult);
    }
  });
  download.addEventListener('click', (): void => {
    evaluate((State.last = State.rodEditor.getValue())).then(dload);
  });
});
