'use strict';

const paths = require('../paths');
const path = require('path');
const manifest = require(paths.manifestJson);
const fs = require('fs');
const { resolveModule, resolveOwn, resolveApp } = paths;

const ownPackageJson = require('../../package.json');
const reactScriptsPath = resolveApp(`node_modules/${ownPackageJson.name}`);
const reactScriptsLinked =
  fs.existsSync(reactScriptsPath) &&
  fs.lstatSync(reactScriptsPath).isSymbolicLink();

let resolveFunction = resolveApp;
let templatePath = '';
if (
  !reactScriptsLinked &&
  __dirname.indexOf(path.join('packages', 'react-scripts', 'config')) !== -1
) {
  templatePath = '../cra-template/template/';
  resolveFunction = resolveOwn;
}

const resolveExtension = filePath => filePath;

const background = {};
const content = {};
const popup = {};
const options = {};
const devtools = {};

if (manifest.browser_action && manifest.browser_action.default_popup) {
  Reflect.set(popup, 'popup', paths.popupJs);
}

if (manifest.options_page) {
  Reflect.set(options, 'options', paths.optionsJs);
}

if (manifest.devtools_page) {
  Reflect.set(devtools, 'devtools', paths.devtoolsJs);
}

if (manifest.background && manifest.background.scripts) {
  manifest.background.scripts.forEach(value => {
    const prop = resolveModule(resolveExtension, value);
    const val = resolveModule(resolveFunction, `${templatePath}${value}`);
    Reflect.set(background, [prop], val);
  });
}

if (manifest.content_scripts) {
  manifest.content_scripts.forEach(script => {
    if (script.js) {
      script.js.forEach(value => {
        const prop = resolveModule(resolveExtension, value);
        const val = resolveModule(resolveFunction, `${templatePath}${value}`);
        Reflect.set(content, [prop], val);
      });
    }
  });
}

const entry = {
  ...popup,
  ...options,
  ...devtools,
  ...background,
  ...content,
};

module.exports = { entry };
