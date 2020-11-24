# Create React Extension

This is a fork from [create-react-app](https://github.com/facebook/create-react-app)<br>
The reason why I did it was to facilitate the creation of extensions using React.<br>
I modified the `packages/react-scripts` and `packages/cra-template` to meet the needs of creating an extension.<br>

In reason of that, there is one file that you need to configure: the `config.json`.<br>
It comes with this format:<br>
![image](https://user-images.githubusercontent.com/39714682/100052745-4dca2000-2dfd-11eb-9c0b-8a0b6f62d799.png)<br>
The Webpack create the files in one large bundle unless we specificate more than one entry on it.<br>
To cover all the possible pages and scripts a extension can have (popup, options, devtool, background, content-scripts and scripts running with tabs.executeScript) I have created this file to generate dynamically the entries so we don't have to worry about.

In the `pages` property you will put the name of the html page to generate in the `html` property and the relative path to the js file in the `js` property.<br>
The `js` file will be the one you are using the `ReactDOM.render` method.<br>
You don't need to create the html files, it will be generated automacatically by the webpack.

In the `scripts` property you will put the relative path of all of your scripts that needs to be generated with particular names (background, content-scripts and scripts running with tabs.executeScript).

To facilitate, the paths you will put in the `manifest.json` file will be identical to the `config.json`, because the Webpack was configured to map correctly these things:
![image](https://user-images.githubusercontent.com/39714682/100054483-e2824d00-2e00-11eb-9eab-910666d5e84c.png)

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

or the following to create with typescript:

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
    ├── App.css
    ├── App.test.js
    ├── index.css
    ├── logo.svg
    ├── setupTests.js
    ├── background
        └── index.js
    ├── contentScripts
        └── index.js
    ├── options
        ├── index.js
        └── Options.js
    └── popup
        ├── index.js
        └── Popup.js
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
