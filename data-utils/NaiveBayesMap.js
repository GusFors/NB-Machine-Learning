class NaiveBayesMap {
  constructor() {
    this.categories = new Map()
  }

  fit(X, y) {
    for (let i = 0; i < y.length; i++) {
      if (!this.categories.has(y[i])) {
        this.categories.set(
          y[i],
          new Map([
            ['means', []],
            ['stdev', []],
            ['data', []],
          ])
        )
      }
      this.categories.get(y[i]).get('data').push(X[i])
    }
    console.log(this.categories)
  }
}

module.exports = NaiveBayesMap

// Calculate Gaussian Probability Density, from L07
function gpdf(x, mean, stdev) {
  return (1 / (Math.sqrt(2 * Math.PI) * stdev)) * Math.exp(-(Math.pow(x - mean, 2) / (2 * Math.pow(stdev, 2))))
}
