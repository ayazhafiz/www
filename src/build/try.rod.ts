import FileSaver from 'file-saver';
import '../ts/third-party/codemirror.rod';

import './try.rod.scss';

declare type CodeMirror = any;

/**
 * Initial Rod STDIN
 * @constant
 */
const INTRO = `^^^^^^^+     ;; 0 -> 65
		    /    ;; print, 65 -> 0
(			       ;; LOOP
  +,		     ;;   [[65]] -> [& +1]
  +++***+	   ;;   <- 25
)			       ;; LOOP

>
++++++(+,+++***++)`;

/**
 * Code fonts
 * @constant
 */
const FONT = [
  'SF Mono',
  'Dejavu Sans Mono',
  'Menlo',
  'Monaco',
  'Consolas',
  'Courier New',
  'monospace',
].join(', ');

/**
 * Request headers
 * @constant
 */
const HEADERS = new Headers({
  'Content-Type': 'application/json',
});

/**
 * Anoop editor and interpreter STATE
 * @constant
 */
const STATE: { rodEditor: CodeMirror; rodEval?: CodeMirror; last?: string } = {
  rodEditor: CodeMirror(document.body, {
    value: INTRO,
    lineNumbers: true,
    tabSize: 2,
    theme: 'material',
    mode: 'rod',
  }),
};

/**
 * Evaluates a Rod expression
 * @async @function
 */
const evaluate = async (str: string): Promise<string> => {
  return fetch('', {
    method: 'POST',
    headers: HEADERS,
    body: JSON.stringify({
      arg: str,
    }),
  })
    .then((resp) => resp.json())
    .then((resp) => (resp.error ? resp.error : resp.success))
    .catch((err) => err);
};

/**
 * Gets an Rod expression from the editor
 * @function
 */
const getValue = (from: any = STATE.rodEditor): string =>
  from.getValue().replace(/\s|;;.*|[^+\-*^/_><&(),:!;]/g, '');

/**
 * Displays the interpreted Anoop expression
 * @async @function
 */
const setResult = (str: string): void => STATE.rodEval.getDoc().setValue(str);

/**
 * Saves an interpreted Anoop expression
 * @function
 */
const save = (str: string): void => {
  setResult(str);
  const fileName = (str.length < 16 ? str : str.substr(0, 16))
    .trim()
    .replace(/\s/, '-');
  const blob = new Blob([STATE.last], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, `${fileName}.fish`);
};

/**
 * Loads the Anoop editor and interpreter display
 * @event
 */
(async () => {
  STATE.rodEval = CodeMirror(document.body, {
    value: await evaluate(
      (STATE.last = STATE.rodEditor
        .getValue()
        .replace(/\s|;;.*|[^+\-*^/_><&(),:!;]/g, '')),
    ),
    lineNumbers: true,
    theme: 'material',
    readOnly: 'nocursor',
    mode: 'text',
  });
  STATE.rodEval.display.wrapper.classList.add('eval');

  const execute = document.createElement('div');
  execute.classList.add('run');
  execute.innerText = 'run (\u2318 + Ent)';
  STATE.rodEditor.display.wrapper.appendChild(execute);

  const download = execute.cloneNode(true);
  (<HTMLElement>download).classList.add('download');
  (<HTMLElement>download).innerText = 'download `.fish`';
  STATE.rodEval.display.wrapper.appendChild(download);

  [STATE.rodEditor, STATE.rodEval].forEach(
    (a) => (a.display.wrapper.style.fontFamily = FONT),
  );

  document.addEventListener('keydown', async (evt: KeyboardEvent) => {
    if (
      (evt.keyCode === 13 || evt.which === 13) &&
      (evt.metaKey || evt.ctrlKey) &&
      getValue() !== STATE.last
    ) {
      setResult(await evaluate((STATE.last = getValue())));
    }
  });
  execute.addEventListener('click', async () => {
    if (getValue() !== STATE.last) {
      setResult(await evaluate((STATE.last = getValue())));
    }
  });
  download.addEventListener('click', async () => {
    save(await evaluate((STATE.last = STATE.rodEditor.getValue())));
  });
})();
