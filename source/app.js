const os = require("os");
const fs = require("fs");
const moment = require("moment");
require("dotenv").config();
const express = require("express");
require("./utilities/console.log-replacement.js");
const Workers = require("./utilities/Workers.js");
const color = require("./utilities/console-log-colors");
const getAccounts = require("./routes/get-accounts.js");
const postAccounts = require("./routes/post-accounts.js");
const deleteAccounts = require("./routes/delete-accounts.js");
const catchAll = require("./routes/catch-all");

const app = express();
app.use(express.json({ limit: "1mb" }));

console.log(
  "OS uptime:",
  moment().startOf("day").seconds(os.uptime()).format("HH:mm:ss")
);

const port = parseInt(process.env.PORT);
const IP = process.env.IP;

app.listen(port, IP, function () {
  const ipInColor = color.fg.Yellow + this.address().address + color.Reset;
  const portInColor = color.fg.Blue + this.address().port + color.Reset;
  console.log("Server has started on:", ipInColor + ":" + portInColor);
});

const databaseDirectory = process.env.DATABASE_DIRECTORY;
fs.mkdirSync(databaseDirectory, { recursive: true });
const databaseBackupDirectory = process.env.DATABASE_BACKUP_DIRECTORY;

Workers.backupDatabaseRegularly(
  databaseDirectory,
  databaseBackupDirectory,
  86400000
);

/*
 * must be placed down the bottom of the file for the routing to work
 */
app.use("/accounts", getAccounts);
app.use("/accounts", postAccounts);
app.use("/accounts", deleteAccounts);
app.use(catchAll);
