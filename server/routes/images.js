const express = require("express");
const router = express.Router();
const { createApi } = require("unsplash-js");
const nodeFetch = require("node-fetch");
/* Enable below line only in your local environment. */
require("dotenv").config();

const api = createApi({
  accessKey: process.env.API_KEY,
  fetch: nodeFetch,
});

router.get("/", (req, res, next) => {
  const { query } = req.query;
  api.search
    .getPhotos({ query, perPage: 100 })
    .then((result) => {
      res.send(result);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send(error);
    });
});

module.exports = router;
