class NaiveBayes {
  constructor() {
    this.categories = {}
  }

  // Trains on input examples X and labels/intCat y
  fit(X, y) {
    // separate into categories and setup structure for storing the means and stdevs
    for (let i = 0; i < y.length; i++) {
      if (!this.categories[y[i]]) {
        this.categories[y[i]] = { means: [], stdev: [], data: [] }
      }
      this.categories[y[i]].data.push(X[i])
    }

    // add the attr in each category and then divide to get the mean for each attr
    for (const [key] of Object.entries(this.categories)) {
      for (let i = 0; i < this.categories[key].data.length; i++) {
        for (let j = 0; j < this.categories[key].data[i].length; j++) {
          if (!this.categories[key].means[j]) {
            this.categories[key].means[j] = 0
          }
          this.categories[key].means[j] = this.categories[key].means[j] + this.categories[key].data[i][j]
        }
      }

      for (let m = 0; m < this.categories[key].means.length; m++) {
        this.categories[key].means[m] = this.categories[key].means[m] / this.categories[key].data.length
      }
    }

    // calc stdev for each attr in each category
    for (const [key] of Object.entries(this.categories)) {
      for (let i = 0; i < this.categories[key].means.length; i++) {
        let mean = this.categories[key].means[i]
        let deviation = []

        for (let j = 0; j < this.categories[key].data.length; j++) {
          deviation.push((this.categories[key].data[j][i] - mean) * (this.categories[key].data[j][i] - mean))
        }

        let sum = 0
        for (let x = 0; x < this.categories[key].data.length; x++) {
          sum += deviation[x]
        }

        let standardDev = Math.sqrt(sum / (this.categories[key].data.length - 1))

        this.categories[key].stdev[i] = standardDev
      }
    }
  }

  // Classifies examples X and returns an array of predictions
  predict(X) {
    // arr to return predictions
    let bestClassProb = []

    for (let i = 0; i < X.length; i++) {
      // go through each attr and calc probability to belong to each class
      let probs = {}
      for (let j = 0; j < X[i].length; j++) {
        for (const [key] of Object.entries(this.categories)) {
          // get the needed values to use in Gaussian Probability Density Function
          let x = X[i][j]
          let mean = this.categories[key].means[j]
          let stdev = this.categories[key].stdev[j]
          let pdf = gpdf(x, mean, stdev)

          if (!probs[key]) {
            probs[key] = []
          }
          // store the prob with log to avoid underflow
          probs[key][j] = Math.log(pdf)
        }
      }

      // add the attr probabilities together
      let probSum = 0
      for (const [key, value] of Object.entries(probs)) {
        let probMul
        for (let i = 0; i < value.length; i++) {
          if (!probMul) {
            probMul = value[i]
          } else {
            probMul += value[i]
          }
        }
        // get the original form back with exp
        probs[key] = Math.exp(probMul)
        probSum += Math.exp(probMul)
      }

      // normalize
      for (const [key] of Object.entries(probs)) {
        probs[key] /= probSum
      }

      // find the highest probability and push it to the return array
      let highestProb
      for (const [key, value] of Object.entries(probs)) {
        if (!highestProb) {
          highestProb = key
        }
        if (value > probs[highestProb]) {
          highestProb = key
        }
      }
      bestClassProb.push(parseInt(highestProb))
    }
    return bestClassProb
  }

  // compares the predictions preds with the actual labels y and returns the accuracy
  accuracy_score(preds, y) {
    let correctCnt = 0
    for (let i = 0; i < preds.length; i++) {
      if (preds[i] === y[i]) {
        correctCnt++
      }
    }
    return correctCnt / y.length
  }

  // Generates and returns a confusion matrix
  confusion_matrix(preds, y) {
    let matrix = []
    let cats = { cnt: 0 }

    for (let i = 0; i < preds.length; i++) {
      if (!cats[preds[i]]) {
        cats[preds[i]] = 1
        cats.cnt++
      }
    }

    // setup the matrix struct with "empty" values
    for (let i = 0; i < cats.cnt; i++) {
      if (!matrix[i]) {
        matrix[i] = []
      }
      for (let y = 0; y < cats.cnt; y++) {
        matrix[i].push(0)
      }
    }

    // generate the matrix with the actual values
    for (let j = 0; j < preds.length; j++) {
      if (preds[j] === y[j]) {
        matrix[preds[j]][y[j]]++
      } else {
        matrix[y[j]][preds[j]]++
      }
    }
    return matrix
  }
}

module.exports = NaiveBayes

// Calculate Gaussian Probability Density, from L07
function gpdf(x, mean, stdev) {
  return (1 / (Math.sqrt(2 * Math.PI) * stdev)) * Math.exp(-(Math.pow(x - mean, 2) / (2 * Math.pow(stdev, 2))))
}
