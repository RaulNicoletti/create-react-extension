'use strict';

const paths = require('../paths');
const path = require('path');
const config = require(paths.configJson);
const fs = require('fs');
const { resolveModule, resolveApp } = paths;
const HtmlWebpackPlugin = require('html-webpack-plugin');

let resolveFunction = resolveApp;
let templatePath = '';

// @remove-on-eject-begin
const ownPackageJson = require('../../package.json');
const reactScriptsPath = resolveApp(`node_modules/${ownPackageJson.name}`);
const reactScriptsLinked =
  fs.existsSync(reactScriptsPath) &&
  fs.lstatSync(reactScriptsPath).isSymbolicLink();
const isEjected =
  !reactScriptsLinked &&
  __dirname.indexOf(path.join('packages', 'react-scripts', 'config')) !== -1;

const resolveOwn = relativePath =>
  path.resolve(__dirname, '..', '..', relativePath);
if (isEjected) {
  templatePath = '../cra-template/template/';
  resolveFunction = resolveOwn;
}
// @remove-on-eject-end

const resolveExtension = filePath => filePath;

const entry = {};
const views = [];

const HTMLconfig = {
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
};

const generateHTML = data => {
  const { html } = data;
  let filename = html;
  let id = html;
  const ext = path.extname(html);
  if (ext) {
    id = id.replace(ext, '');
  } else {
    filename = `${filename}.html`;
  }

  return new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        inject: true,
        template: paths.indexHtml,
        templateParameters: { id },
        chunks: [id],
        filename,
      },
      process.env.NODE_ENV === 'production' ? HTMLconfig : undefined
    )
  );
};

config.views.forEach(value => {
  let prop = value.html;
  const ext = path.extname(value.html);

  if (ext) {
    prop = value.html.replace(ext, '');
  }

  const val = resolveModule(resolveFunction, `${templatePath}${value.js}`);
  Reflect.set(entry, prop, val);

  const html = generateHTML(value);
  views.push(html);
});

config.scripts.forEach(value => {
  const prop = resolveModule(resolveExtension, value);
  const val = resolveModule(resolveFunction, `${templatePath}${value}`);
  Reflect.set(entry, [prop], val);
});

module.exports = { entry, views };
