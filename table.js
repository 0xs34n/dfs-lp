const Table = require('cli-table');
const data = require('./DK_test_salary.json');

/**
 * creates a table for Draft Kings Salary and FPPG table
 * @return {Object} table object to be printed to stdout
 */
function createFPPGSalaryTable() {
  const table = new Table({ head: ['Player', 'FPPG', 'cost', 'position'] });
  let row;
  for (let i = 0; i < data.length; i += 1) {
    row = [];
    row.push(data[i].Name);
    row.push(data[i].AvgPointsPerGame);
    row.push(data[i].Salary);
    row.push(data[i].Position);

    table.push(row);
  }

  return table;
};

console.log(createFPPGSalaryTable().toString());
