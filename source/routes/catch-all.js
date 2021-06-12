const color = require("../utilities/console-log-colors");
const express = require("express");
const router = express.Router();

module.exports = router;

router.get("*", function (req, res) {
  const error = [
    "Unhandled URL parameter caught. Resource ",
    req.path,
    " requested but unavailable for serving.",
  ];

  res.status(404).send(error.join(""));

  // color the requested-resource path inside the error message
  error[error.indexOf(req.path)] = color.fg.Red + req.path + color.Reset;

  console.log(error.join("")); // do not use (' ') because the color-markup array elements will then add their own space
});
