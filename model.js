const data = require('./DK_test_salary.json');
const builder = require('./builder.js');

const model = {
  optimize: 'FPPG',
  opType: 'max',
  constraints: builder.buildConstraints(data),
  variables: builder.buildVariables(data),
  ints: builder.buildInts(data),
};

module.exports = model;
