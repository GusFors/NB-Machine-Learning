const conv = require('./data-utils/converter')
const NaiveBayes = require('./data-utils/NaiveBayes')
const { performance } = require('perf_hooks')

async function run() {
  // get data from file specified in process arguments
  const args = process.argv.slice(2)
  const data = await conv.getData(args[0])
  let nb = new NaiveBayes()

  // train with the data
  const t0 = performance.now()
  nb.fit(data.data.x, data.data.y)
  const t1 = performance.now()

  // predict classifications with the same data
  const t2 = performance.now()
  let preds = nb.predict(data.data.x)
  const t3 = performance.now()

  // get the accuracy score, comparing the predictions with the labels y
  const t4 = performance.now()
  let acc = nb.accuracy_score(preds, data.data.y)
  const t5 = performance.now()

  // output classification and time info to the console
  console.log(`\nNumbers of examples: \x1b[33m${data.data.y.length}\x1b[0m`)
  console.log(`Numbers of attributes: \x1b[33m${data.data.x[0].length}\x1b[0m`)
  console.log(`Numbers of classes: \x1b[33m${data.labelStrings.currentIdInt}\x1b[0m`)

  console.log(`\nTraining time: \x1b[33m${(t1 - t0).toFixed(3)}\x1b[0m ms`)
  console.log(`Predict time: \x1b[33m${(t3 - t2).toFixed(3)}\x1b[0m ms`)
  console.log(`Accuracy time: \x1b[33m${(t5 - t4).toFixed(3)}\x1b[0m ms`)

  console.log(`\nAccuracy: \x1b[33m${(acc * 100).toFixed(2)}%\x1b[0m, (\x1b[33m${data.data.y.length * acc}/${data.data.y.length}\x1b[0m correctly classified)`)
  console.log('\nConfusion Matrix:\n')

  // generate and output the confusion matrix in two forms to the console
  let matrix = nb.confusion_matrix(preds, data.data.y)
  for (let i = 0; i < matrix.length; i++) {
    let label
    for (const [key, value] of Object.entries(data.labelStrings)) {
      if (value.id === i) {
        label = value.label
      }
    }
    console.log(i, matrix[i], '-> ' + label)
  }
  console.log()
  console.table(matrix)
}

run()
