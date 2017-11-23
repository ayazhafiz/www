import * as FileSaver from 'file-saver';
import { $ } from '../ts/page/el';
import '../ts/third-party/codemirror.rod';

import './try.rod.scss';

const INTRO = `^^^^^^^+     ;; 0 -> 65
		    /    ;; print, 65 -> 0
(			       ;; LOOP
  +,		     ;;   [[65]] -> [& +1]
  +++***+	   ;;   <- 25
)			       ;; LOOP

>
++++++(+,+++***++)`;
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
  return await fetch('', {
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

const getValue = (from: any = State.rodEditor): string =>
  from.getValue().replace(/\s|;;.*|[^+\-*^/_><&(),:!;]/g, '');

const setResult = (str: string): void => State.rodEval.getDoc().setValue(str);

const save = (str: string): void => {
  setResult(str);
  const fileName = (str.length < 16 ? str : str.substr(0, 16))
    .trim()
    .replace(/\s/, '-');
  const blob = new Blob([State.last], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, `${fileName}.fish`);
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
    value: await evaluate(
      (State.last = State.rodEditor
        .getValue()
        .replace(/\s|;;.*|[^+\-*^/_><&(),:!;]/g, ''))
    ),
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
  (<HTMLElement>download).innerText = 'download `.fish`';
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
  download.addEventListener('click', async () => {
    save(await evaluate((State.last = State.rodEditor.getValue())));
  });
});
