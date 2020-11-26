# Create React Extension ![](https://img.shields.io/badge/version-v0.3.2--beta-yellow)

<b>This is a fork from [create-react-app](https://github.com/facebook/create-react-app)<br></b>

The reason why I did it was to facilitate the creation of extensions using React.<br>
I modified the `packages/react-scripts` to meet the needs of creating an extension.

## How to use it

There is one file that you need to configure it: the `config.json`.<br>
It comes with this format:<br>

```json
{
  "views": [
    {
      "html": "popup.html",
      "js": "src/views/Popup/index.jsx"
    },
    {
      "html": "options.html",
      "js": "src/views/Options/index.jsx"
    }
  ],
  "scripts": [
    "src/scripts/background/index.js",
    "src/scripts/contentScripts/index.js"
  ]
}
```

The Webpack creates the files in one large bundle unless we specificate more than one entry on it.<br>
To cover all the possible pages and scripts an extension can have, I created this file to map and generate dynamically the entries.

### `config.json`

#### views

- <b>html</b>
  - In then `html` property you will put the name of the html page to generate.
  - You don't need to create the html files, it will be generated automatically by the webpack.
  - The name you choose will be the name that you need to put in your `ReactDOM.render` method, but without the <b>.html</b> extension.
    Example: If you choose the name `popup.html` your code will be like this:
    ```js
    ReactDOM.render(
      <React.StrictMode>
        <Popup />
      </React.StrictMode>,
      document.getElementById('popup')
    );
    ```
  - <b>Don't</b> repeat the names!
- <b>js</b>
  - In the `js` property you will put the relative path to the javascript file.
  - The `js` file will be the one you are using the `ReactDOM.render` method.<br>

#### scripts

- In the `scripts` property you will put the relative path of all of your scripts that needs to be generated with particular names (`background`, `content-scripts` and scripts running with `tabs.executeScript`).<br>

To facilitate, the paths you will put in the `manifest.json` file will be identical to the `config.json`, with the exception of the extensions you will put, always put `.js` extensions even if you are working with typescript, because the webpack will transform them all in `.js`<br>

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
├── config.json
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
    |   |   ├── index.jsx
    |   |   └── Options.jsx
    |   └── Popup
    |       ├── index.jsx
    |       └── Popup.jsx
    ├── scripts
    |   ├── background
    |   |   └── index.js
    |   └── contentScripts
    |       └── index.js
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
