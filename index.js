const solver = require("javascript-lp-solver");
const model = require('./model.js');
const helper = require('./helper.js');

// helper.removePlayer('LeBron James', model);
console.log(solver.Solve(model));