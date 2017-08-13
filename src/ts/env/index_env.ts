import { $ } from '../page/el';

let whale;
function getWhale() {
  whale = [
    $('.header'),
    ...[].slice.call(document.querySelectorAll('.outer-wrapper *'))
  ];
  document.removeEventListener('DOMContentLoaded', getWhale);
}

document.addEventListener('DOMContentLoaded', getWhale);

export { whale };
