'use strict';

const path = require('path');
const fs = require('fs');
const chalk = require('react-dev-utils/chalk');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../paths');

const { resolveModule, resolveApp } = paths;

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

// Dummy function just to not mess up with the name of the entries
const resolveExtension = filePath => filePath;

// Object where will be setted all entries for the webpack
const entry = {};

// Array where will be pushed all the dynamically generated html files
const views = [];

// Production config for the HtmlWebpackPlugin
const Htmlconfig = {
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

// Function that generates the html with the HtmlWebpackPlugin
const generateHtml = filename => {
  const id = filename.replace('.html', '');
  return new HtmlWebpackPlugin(
    Object.assign(
      {},
      {
        inject: true,
        template: paths.indexHtml,
        templateParameters: { id },
        chunks: ['bundle'],
        filename,
      },
      process.env.NODE_ENV === 'production' ? Htmlconfig : undefined
    )
  );
};

// Create the html's with the HtmlWebpackPlugin based on the id's found in the index.js
const handleHtml = filename => views.push(generateHtml(filename));

// Set another entries to the webpack
const handleJs = filename => {
  const property = resolveModule(resolveExtension, filename);
  const value = resolveModule(resolveFunction, `${templatePath}${filename}`);
  Reflect.set(entry, [property], value);
};

const handleManifest = () => {
  // Regex to get all the .js and .html files from the manifest.json
  const regexManifest = /(?<=")([\w\/\.-]+\b(?:(?:j|t)sx?|html))(?=")/g;

  // Read the manifest.json
  const manifestFile = fs.readFileSync(paths.manifestJson).toString();

  // Execute the regex
  const files = manifestFile.match(regexManifest);

  // If nothing found, throw an error
  if (!files) {
    console.log(
      `\n${chalk.default.redBright(
        'No .js or .html files was found in the manifest.json.'
      )}\n`
    );
    process.exit(1);
  }

  // Iterates through the matches found and generate the html and entries necessaries
  for (const filename of files) {
    path.extname(filename) === '.html'
      ? handleHtml(filename)
      : handleJs(filename);
  }
};

const init = () => {
  // Set the bundle entry on webpack based on the index.js
  Reflect.set(entry, 'bundle', paths.indexJs);
  handleManifest();
};

init();

module.exports = { entry, views };
