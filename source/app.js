const os = require('os')
const fs = require('fs')
const moment = require('moment')
const express = require('express')
const cors = require('cors')
require('./utilities/console.log-replacement.js')
const Workers = require('./utilities/Workers.js')
const color = require('./utilities/console-log-colors')
const getAccounts = require('./routes/get-accounts.js')
const postAccounts = require('./routes/post-accounts.js')
const deleteAccounts = require('./routes/delete-accounts.js')
const catchAll = require('./routes/catch-all')

const app = express()

app.use(express.json({ limit: '1mb' }))

corsOptions = {
  origin: '*',
}
app.use(cors(corsOptions))

console.log(
  'OS uptime:',
  moment().startOf('day').seconds(os.uptime()).format('HH:mm:ss')
)

function startDBServer(
  port,
  hostName,
  databaseDirectory,
  databaseBackupDirectory
) {
  return new Promise((resolve) => {
    app.listen(port, hostName, function () {
      const hostNameInColor =
        color.fg.Yellow + this.address().address + color.Reset
      const portInColor = color.fg.Blue + this.address().port + color.Reset
      console.log('Database server has started on:', hostNameInColor + ':' + portInColor)
      resolve()
    })

    fs.mkdirSync(databaseDirectory, { recursive: true })

    Workers.backupDatabaseRegularly(
      databaseDirectory,
      databaseBackupDirectory,
      86400000
    )

    /*
     * must be placed down the bottom of the file for the routing to work
     */
    app.use('/accounts', getAccounts)
    app.use('/accounts', postAccounts)
    app.use('/accounts', deleteAccounts)
    app.use(catchAll)
  })
}

module.exports = startDBServer
