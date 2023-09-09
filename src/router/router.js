const express = require("express");
const router = express.Router();
const controller = require("../controller/urlshortner");
const port = process.env.PORT;

router.post("/v1/api/short-url/:url", controller.makeUrlShort);

router.get("/", (req, res) => {
  res.send(`Hello World!!! from ${port}`);
});

module.exports = router;
