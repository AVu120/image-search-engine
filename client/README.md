<h1 align="center">Base React, Webpack & Babel Project Template</h1>

## Table of Contents

- [About](#about)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Accessing the Application](#accessing-the-application)
- [Citations](#Citations)

## About

A basic custom config repo to quickly clone and start building on top of to create any project with React, Webpack and Babel. It already has webpack dev server for development and webpack for production.

## Built With

- [React](https://reactjs.org/) for frontend
- [Webpack](https://webpack.js.org/) for JavaScript source code bundling.
- [Babel](https://babeljs.io/) for transpiling new JavaScript features & React into vanilla JS to work in older web browsers.

## Getting Started

1. Clone the project source code.

```
git clone https://github.com/AVu120/base-react-webpack-babel-template.git
```

2. Navigate into the repo folder.

```
cd base-react-webpack-babel-template
```

3. Download all required dependancies.

```
npm i

```

4.

- Start the app in development mode on a local dev server (webpack dev server).

```
npm start
```

- Start the app in production mode on a [mock local prod server](https://www.npmjs.com/package/http-server).

```
npx http-server dist
```

## Accessing the Application

1. Enter the url displayed in the CLI. For example:

- When deployed in development mode 'Project is running at http://localhost:8080/'.
- When deployed in production mode locally using http-server: 'Starting up http-server, serving dist
  Available on:
  http://10.0.0.14:8080
  http://127.0.0.1:8080
  http://192.168.35.161:8080
  Hit CTRL-C to stop the server'

## Citations

I used information from the following links to create this repo:

- https://www.robinwieruch.de/minimal-react-webpack-babel-setup
- https://www.robinwieruch.de/webpack-advanced-setup-tutorial
