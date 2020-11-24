'use strict';

const fs = require('fs-extra');
const paths = require('../../config/paths');

function copyPublicFolder(path) {
  fs.copySync(paths.appPublic, path, {
    dereference: true,
    filter: file => file !== paths.indexHtml,
  });
}

module.exports = { copyPublicFolder };
