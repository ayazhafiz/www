import { $ } from '../util/el';

const whale = [
  $('.header'),
  ...[].slice.call(document.querySelectorAll('.outer-wrapper *')),
];

export { whale };
