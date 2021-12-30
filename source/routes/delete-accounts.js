const path = require("path");
const fs = require("fs").promises;
const express = require("express");
const router = express.Router();

module.exports = router;

router.delete("/:id", async (req, res) => {
  if (req.headers.password !== process.env.DATABASE_PASSWORD) {
    console.log("DELETE: incorrect password from client");
    res.status(403).send("cannot delete database: wrong password");
    return;
  }

  const appId = req.params.id;
  const fileName = `${appId}.json`;
  const filePath = path.join(process.env.DATABASE_DIRECTORY, fileName);

  try {
    await fs.unlink(filePath);
    res.send(`file ${fileName} deleted`);
  } catch (e) {
    res
      .status(500)
      .send(`file ${fileName} does not exist or cannot be deleted`);
  }
});
