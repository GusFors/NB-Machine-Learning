class NaiveBayesMap {
  constructor() {
    this.categories = new Map()
  }

  fit(X, y) {
    console.log(X)
  }
}

module.exports = NaiveBayesMap

// Calculate Gaussian Probability Density, from L07
function gpdf(x, mean, stdev) {
  return (1 / (Math.sqrt(2 * Math.PI) * stdev)) * Math.exp(-(Math.pow(x - mean, 2) / (2 * Math.pow(stdev, 2))))
}
