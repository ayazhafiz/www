import * as FileSaver from 'file-saver';
import { $ } from '../ts/page/el';
import '../ts/third-party/codemirror.rod';

import './try.anoop.scss';

const INTRO = 'Anooop';
const FONT =
  'SF Mono, Dejavu Sans Mono, Menlo, Monaco, Consolas, Courier New, monospace';
const HEADERS = new Headers({
  'Content-Type': 'application/json'
});
const State = {
  rodEditor: null,
  rodEval: null,
  last: null
};

const evaluate = async (str: string): Promise<string> => {
  return await fetch('/try/anoop', {
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

const getValue = (from: any = State.rodEditor): string => from.getValue();

const setResult = (str: string): void => State.rodEval.getDoc().setValue(str);

const save = (str: string): void => {
  const fileName = (str.length < 16 ? str : str.substr(0, 16))
    .trim()
    .replace(/\s/, '-');
  const blob = new Blob([State.last], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, `${fileName}.anoop`);
};

document.addEventListener('DOMContentLoaded', async () => {
  State.rodEditor = CodeMirror(document.body, {
    value: INTRO,
    lineNumbers: true,
    tabSize: 2,
    theme: 'material',
    mode: 'rod'
  });

  State.rodEval = CodeMirror(document.body, {
    value: await evaluate((State.last = State.rodEditor.getValue())),
    lineNumbers: true,
    theme: 'material',
    readOnly: 'nocursor',
    mode: 'text'
  });
  State.rodEval.display.wrapper.classList.add('eval');

  const execute = document.createElement('div');
  execute.classList.add('run');
  execute.innerText = 'run (\u2318 + Ent)';
  State.rodEditor.display.wrapper.appendChild(execute);

  const download = execute.cloneNode(true);
  (<HTMLElement>download).classList.add('download');
  (<HTMLElement>download).innerText = 'download `.anoop`';
  State.rodEval.display.wrapper.appendChild(download);

  [State.rodEditor, State.rodEval].forEach(
    a => (a.display.wrapper.style.fontFamily = FONT)
  );

  document.addEventListener('keydown', async (evt: KeyboardEvent) => {
    if (
      (evt.keyCode === 13 || evt.which === 13) &&
      (evt.metaKey || evt.ctrlKey) &&
      getValue() !== State.last
    ) {
      setResult(await evaluate((State.last = getValue())));
    }
  });
  execute.addEventListener('click', async () => {
    if (getValue() !== State.last) {
      setResult(await evaluate((State.last = getValue())));
    }
  });
  download.addEventListener('click', () => {
    save((State.last = State.rodEditor.getValue()));
  });
});
