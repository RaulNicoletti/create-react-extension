# Create React Extension ![](https://img.shields.io/badge/version-0.4.1--beta-yellow)

<b>This is a fork from [create-react-app](https://github.com/facebook/create-react-app)<br></b>

The reason why I did it was to facilitate the creation of extensions using React.<br>
I modified the `packages/react-scripts` to meet the needs of creating an extension.

## How to use it

The `src/index.js` is the entry point.<br>
Put all of your `render()` methods there.<br>
Follow the example that comes with the template:

```js
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Popup from './views/Popup';
import Options from './views/Options';

// the names here are arbitrary, use whatever you want. Just don't repeat them
const popup = document.getElementById('popup');
const options = document.getElementById('options');
// Error!
const anotherPopup = document.getElementById('popup');

if (popup) {
  ReactDOM.render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>,
    popup
  );
} else if (options) {
  ReactDOM.render(
    <React.StrictMode>
      <Options />
    </React.StrictMode>,
    options
  );
}
```

If you want to remove or add more `.html` pages, do it there.<br>
`.html` pages will be generated automatically based on your `manifest.json`.<br>
The names you used to define your id's in `src/index.js`, must be the same as your .html files in the manifest.json.<br>
The paths you will put in your scripts (background, content-scripts) will be relative to the `src` folder.<br>
Follow the example that comes with the template and you will not go wrong:<br>

```js
{
  "manifest_version": 2,
  "name": "React Extension",
  "version": "1.0",
  "permissions": ["<all_urls>"],
  "icons": {
    "16": "assets/logo16.png",
    "48": "assets/logo48.png",
    "128": "assets/logo128.png"
  },
  "browser_action": {
    // same name as the id in the src/index.js, plus the .html extension
    "default_popup": "popup.html"
  },
  "options_ui": {
    // same name as the id in the src/index.js, plus the .html extension
    "page": "options.html",
    "open_in_tab": true
  },
  "background": {
    // relative to the src folder
    "scripts": ["src/scripts/background/index.js"],
    "persistent": false
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      // relative to the src folder
      "js": ["src/scripts/contentScripts/index.js"]
    }
  ]
}
```

## Quick Overview

```sh
npx create-react-extension my-extension
cd my-extension
npm start
```

### Get Started Immediately

You **don’t** need to install or configure tools like webpack or Babel.<br>
They are preconfigured and hidden so that you can focus on the code.

Create a project, and you’re good to go.

## Creating an extension

**You’ll need to have Node 8.16.0 or Node 10.16.0 or later version on your local development machine** (but it’s not required on the server). You can use [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows) to switch Node versions between different projects.

To create a new extension, run:

```sh
npx create-react-extension my-extension
```

or the following to create with the typescript template:

```sh
npx create-react-extension my-extension --template typescript
```

It will create a directory called `my-extension` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install the transitive dependencies:

```
my-extension
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── public
│   ├── assets
|   |   ├── logo16.png
|   |   ├── logo48.png
|   |   ├── logo128.png
│   ├── index.html
│   └── manifest.json
└── src
    ├── views
    |   ├── App.css
    |   ├── index.css
    |   ├── logo.svg
    |   ├── Options
    |   |   └── index.js
    |   └── Popup
    |       └── index.js
    ├── scripts
    |   ├── background
    |   |   └── index.js
    |   └── contentScripts
    |       └── index.js
    ├── index.js
    └── setupTests.js
```

Once the installation is done, you can open your project folder:

```sh
cd my-extension
```

Inside the newly created project, you can run some built-in commands:

### `npm start` or `yarn start`

Runs the app in development mode.<br>
It will create a `dev` folder in the root of the project.
You can load the folder in the browser to test your extension.

The pages will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and your extension is ready to be deployed.<br>
