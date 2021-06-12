const path = require("path");
const fs = require("fs").promises;
const express = require("express");
const router = express.Router();

module.exports = router;

router.get("/:id", async (req, res) => {
  const appId = req.params.id;
  const fileName = `${appId}.json`;
  const filePath = path.join(process.env.DATABASE_DIRECTORY, fileName);

  try {
    const data = await fs.readFile(filePath, "utf-8");
    res.send(data);
  } catch (e) {
    res.status(404).json(e);
  }
});
