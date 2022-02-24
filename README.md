Assignment A4 done for the course 2DV515 at Linnaeus University. [Link to assignment description](https://coursepress.lnu.se/courses/web-intelligence/assignments/a4)
It uses the Naïve Bayes machine learning algorithm to classify it's input data and displays various classification info in the console.

Run with `npm start ./PATH-TO-CSV-DATA`, for example `npm start ./data/iris.csv`

Example output
```
Numbers of examples: 150
Numbers of attributes: 4
Numbers of classes: 3

Training time: 0.433 ms
Predict time: 2.039 ms
Accuracy time: 0.038 ms

Accuracy: 96.00%, (144/150 correctly classified)

Confusion Matrix:

0 [ 50, 0, 0 ] -> Iris-setosa
1 [ 0, 47, 3 ] -> Iris-versicolor
2 [ 0, 3, 47 ] -> Iris-virginica

┌─────────┬────┬────┬────┐
│ (index) │ 0  │ 1  │ 2  │
├─────────┼────┼────┼────┤
│    0    │ 50 │ 0  │ 0  │
│    1    │ 0  │ 47 │ 3  │
│    2    │ 0  │ 3  │ 47 │
└─────────┴────┴────┴────┘
```





