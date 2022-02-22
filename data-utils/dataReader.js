const fs = require('fs')

const dataReader = {}

dataReader.getFile = (filePath) => {
  return fs.readFileSync(filePath, 'utf8')
}

module.exports = dataReader
