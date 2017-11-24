declare const CodeMirror: any;

CodeMirror.defineSimpleMode('rod', {
  start: [
    { regex: /&/, token: 'variable' },
    { regex: /(?:\(|\))/, token: 'keyword' },
    { regex: /\/|_|>/, token: 'attribute' },
    { regex: /-|\+|\^|\*/, token: 'number' },
    { regex: /;;.*/, token: 'comment' },
    { regex: /<|:|!/, token: 'tag' }
  ]
});
