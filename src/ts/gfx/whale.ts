import { $ } from '../util/el';

let whale;

/**
 * Determines components of a rendered whale
 *
 * @function
 */
function getWhale(): void {
  whale = [
    $('.header'),
    ...[].slice.call(document.querySelectorAll('.outer-wrapper *'))
  ];
  document.removeEventListener('DOMContentLoaded', getWhale);
}

document.addEventListener('DOMContentLoaded', getWhale);

export { whale };
