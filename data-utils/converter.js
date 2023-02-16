const csv = require('csvtojson')
const converter = csv({ delimiter: ',', noheader: true, output: 'csv' })

// read and convert the csv data to an js object to be used for NaiveBayes
module.exports.getData = async (dataPath) => {
  let dataObj = {}

  return converter.fromFile(dataPath).then((convertedCsv) => {
    // X input examples, y intLabels
    let data = { x: [], y: [] }
    let labelStrings = { currentIdInt: 0 } // keep track and keep label strings as ints

    convertedCsv.forEach((dataEntry, index) => {
      // store each data attr for each X in a array
      let xAmple = []
      for (let i = 0; i < dataEntry.length; i++) {
        // ignore first line for values
        if (index > 0) {
          if (i < dataEntry.length - 1) {
            xAmple.push(parseFloat(dataEntry[i]))
          } else {
            // assumes last attr is the class/label
            data.x.push(xAmple)
            if (!labelStrings[dataEntry[i]]) {
              labelStrings[dataEntry[i]] = { label: dataEntry[i], id: labelStrings.currentIdInt }
              labelStrings.currentIdInt++
            }
            data.y.push(labelStrings[dataEntry[i]].id)
          }
        }
      }
    })
    dataObj.data = data
    dataObj.labelStrings = labelStrings
    return dataObj
  })
}

module.exports.getDataMap = async (dataPath) => {
  let dataHolder = {}

  return converter.fromFile(dataPath).then((convertedCsv) => {
    let daMap = new Map()

    let x = []
    let y = []

    let labelStrings = { currentIdInt: 0 }

    convertedCsv.forEach((dataEntry, index) => {
      let xAmple = []
      for (let i = 0; i < dataEntry.length; i++) {
        if (index > 0) {
          if (i < dataEntry.length - 1) {
            xAmple.push(parseFloat(dataEntry[i]))
          } else {
            x.push(xAmple)
            if (!labelStrings[dataEntry[i]]) {
              labelStrings[dataEntry[i]] = { label: dataEntry[i], id: labelStrings.currentIdInt }
              labelStrings.currentIdInt++
            }
            y.push(labelStrings[dataEntry[i]].id)
          }
        }
      }
    })

    daMap.set('x', x)
    daMap.set('y', y)

    dataHolder.data = daMap
    dataHolder.labelStrings = labelStrings
    return dataHolder
  })
}
