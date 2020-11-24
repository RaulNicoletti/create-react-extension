#!/usr/bin/env node
'use strict';
const { execSync } = require('child_process');
const script = '@raulnicoletti/react-scripts-extension';
let template = '@raulnicoletti/cra-template';
const index = process.argv.indexOf('--template');
if (index !== -1) {
  const templateArg = process.argv[index + 1];
  if (templateArg === 'typescript') {
    template = '@raulnicoletti/cra-template-typescript';
  } else {
    template = templateArg;
  }
}

execSync(
  `npx create-react-app ${process.argv[2]} --scripts-version "${script}" --template "${template}"`,
  { stdio: 'inherit' }
);
