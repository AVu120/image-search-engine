<h1 align="center">Image Search Engine</h1>

## Table of Contents

- [About](#about)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Accessing the Application](#accessing-the-application)

## About

App that lets a user enter keywords/tags and be shown matching images.

## Built With

- [React](https://reactjs.org/) for frontend
- [Node](https://nodejs.org/en/) for backend/api-server

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

- To start the app in development mode (e.g. on your local pc).

  - Checkout to the dev branch.

  ```
  git checkout dev
  ```

  - [Create an Unsplash developer](https://unsplash.com/documentation#creating-a-developer-account)'s account.
  - Register this app in your Unsplash developer's account to be given an API key.
  - Create a /server/.env file.
  - Enter your API key into the /server/.env as shown below:

  ```
  API_KEY=###########################################
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

- To start the app in production mode (e.g. on your local pc):

  - Checkout to the main branch.

  ```
  git checkout main

  ```

  - Run the following commands in the given order (in the root directory):

  ```
  npm run build
  npm start
  ```

  - Access the app at http://localhost:5000/
