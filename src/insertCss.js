/**
 * Isomorphic CSS style loader for Webpack
 *
 * Copyright © 2015 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

const inserted = {};

function removeCss(ids) {
  for (const id of ids) {
    if (--inserted[id] === 0) {
      const elem = document.getElementById('s' + id);
      if (elem) {
        elem.parentNode.removeChild(elem);
      }
    }
  }
}

/**
 * Example:
 *   // Insert CSS styles object generated by `css-loader` into DOM
 *   var removeCss = insertCss([[1, 'body { color: red; }']]);
 *
 *   // Remove it from the DOM
 *   removeCss();
 */
function insertCss(styles, options) {
  for (const [id, css, media] of styles) {
    if (inserted[id]) {
      inserted[id]++;
      continue;
    }

    inserted[id] = 1;

    let elem = document.getElementById('s' + id);

    if (!elem) {
      elem = document.createElement('style');
      elem.id = 's' + id;
      elem.setAttribute('type', 'text/css');

      if (media) {
        elem.setAttribute('media', media);
      }
    }

    if ('textContent' in elem) {
      elem.textContent = css;
    } else {
      elem.styleSheet.cssText = css;
    }

    if (options && options.prepend) {
      document.head.insertBefore(elem, document.head.childNodes[0]);
    } else {
      document.head.appendChild(elem);
    }
  }

  return removeCss.bind(null, styles.map(x => x[0]));
}

module.exports = insertCss;