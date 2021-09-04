<h1 align="center">Image Search Engine</h1>

![image](https://user-images.githubusercontent.com/38395166/132076987-ec55e38a-30cb-4688-8ec8-2e61c179d72f.png)

Play with this app at https://image-search-engine-avu120.herokuapp.com/.

## Table of Contents

- [About](#about)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Accessing the Application](#accessing-the-application)
- [Remote Deployment](#remote-deployment)

## About

App that lets a user enter keywords/tags and be shown matching images.

## Built With

- [React](https://reactjs.org/) for frontend.
- [Node](https://nodejs.org/en/) for backend/api-server.
- [Unsplash API](https://unsplash.com/documentation) for retrieving royalty-free images.

## Getting Started

1. Clone the project source code.

```
git clone https://github.com/AVu120/image-search-engine.git
```

2. Navigate into the repo folder.

```
cd image-search-engine
```

3.

- [Create an Unsplash developer](https://unsplash.com/documentation#creating-a-developer-account)'s account.
- Register this app in your Unsplash developer's account to be given an API key.
- Create a /server/.env file.
- Enter your API key into /server/.env as shown below:

```
API_KEY=###########################################
```

4.

- To start the app in development mode on your local pc.

  - Checkout to the dev branch.

  ```
  git checkout dev
  ```

  - Start the app in development mode by running the following commands in the given order:

  ```
  cd client
  npm i
  npm start

  cd ../server
  npm i
  npm start
  ```

  - Access the app at http://localhost:8080/

- To start the app in production mode on your local pc:

  - Checkout to the main branch.

  ```
  git checkout main
  ```

  - Ensure 'require("dotenv").config();' is uncommented in server\routes\images.js as shown below:

  ```
  const express = require("express");
  const router = express.Router();
  const { createApi } = require("unsplash-js");
  const nodeFetch = require("node-fetch");
  /* Enable below only in local environment (e.g. your PC). */
  require("dotenv").config();
  ```

  - This is to ensure we can access the api key stored in /server/.env.

  - In the root directory, run the following commands in the given order:

  ```
  npm run build
  npm start
  ```

  - Access the app at http://localhost:5000/

## Remote Deployment

When deploying this app remotely, e.g. to Heroku, repl.it, CodeSandBox, etc., note that the /server/.env file is ignored by git and thus will not be in my/your remote git repo.

Hence if you're deploying from your github repo to a Platform as a Service (PAAS) like Heroku, you'll need to do the following:

1. Ensure 'require("dotenv").config();' is commented out in server\routes\images.js as shown below:

```
const express = require("express");
const router = express.Router();
const { createApi } = require("unsplash-js");
const nodeFetch = require("node-fetch");
/* Enable below only in local environment (e.g. your PC). */
# require("dotenv").config();
```

2. Push this change (commenting out of the above line) into your remote git repo.
3. For your respective PAAS, ensure your API_KEY is stored in your production app env. That is, without the use of a permanent .env file containing it in /server on the web server. For example, here are some instructions to do this for some PaaS:

- [Heroku](https://devcenter.heroku.com/articles/config-vars#managing-config-vars) via CLI or web-GUI.
- [repl.it](https://docs.repl.it/repls/secret-keys) via a .env file that you create but only you can see (other users/guests with your repl.it link cannot see it).
