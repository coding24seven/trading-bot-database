const path = require("path");
const fs = require("fs").promises;
const express = require("express");
const router = express.Router();

module.exports = router;

router.post("/:id", async (req, res) => {
  const appId = req.params.id;
  const data = req.body;
  const fileName = `${appId}.json`;
  const filePath = path.join(process.env.DATABASE_DIRECTORY, fileName);

  try {
    const stringifiedData = JSON.stringify(data, null, 2);
    await fs.writeFile(filePath, stringifiedData);
    res.json(data);
  } catch (e) {
    res.status(500).json(e);
  }
});
