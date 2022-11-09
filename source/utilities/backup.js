const path = require('path')
const moment = require('moment')
const fs = require('fs').promises

async function backupDatabase(databaseDirectory, databaseBackupDirectory) {
  const fileNames = await fs.readdir(databaseDirectory)

  if (fileNames.length < 1) {
    return
  }

  await fs.mkdir(databaseBackupDirectory, { recursive: false }).catch(() => {})

  fileNames.forEach(async (fileName) => {
    const filePath = `${path.join(databaseDirectory, fileName)}`
    const fileNameExtension = path.extname(fileName)
    const fileNameWithoutExtension = path.basename(fileName, fileNameExtension)

    const subDirectory = path.join(
      databaseBackupDirectory,
      fileNameWithoutExtension
    )

    await fs.mkdir(subDirectory, { recursive: false }).catch(() => {})

    const dateTime = moment().format('YYYY-MM-DD_HH-mm-ss')
    const backupFilePath = `${path.join(
      subDirectory,
      fileNameWithoutExtension
    )}_${dateTime}${fileNameExtension}`

    await fs.copyFile(filePath, backupFilePath)
    console.log(`DATABASE BACKUP: ${backupFilePath} created`)
  })
}

module.exports = backupDatabase
