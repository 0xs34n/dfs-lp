/**
 * buildVariables() defines all the variables for the linear objective function
 * @param  {JSON} data - from DraftKings lineups
 * @return {JSON} - a JSON of variables
 *
 *  * Eg., { 'James Harden':
 * { 'James Harden': 1, FPPG: 51.951, cost: 10900, positions... },
 * ... }
 */
function buildVariables(data) {
  const variables = {};

  for (let i = 0; i < data.length; i += 1) {
    const playerName = data[i].Name;
    const cost = data[i].Salary;
    const FPPG = data[i].AvgPointsPerGame;
    const position = data[i].Position;

    variables[playerName] = {};
    variables[playerName][playerName] = 1;
    variables[playerName].FPPG = FPPG;
    variables[playerName].cost = cost;
    variables[playerName].PG = 0;
    variables[playerName].SG = 0;
    variables[playerName].SF = 0;
    variables[playerName].PF = 0;
    variables[playerName].C = 0;
    variables[playerName].G = 0;
    variables[playerName].F = 0;
    variables[playerName].UTIL = 1;

    // Players that play multiple positions. Eg., PG/SG
    if (position.includes('/')) {
      const positions = position.split('/');
      variables[playerName][positions[0]] = 1;
      variables[playerName][positions[1]] = 1;
    } else {
      variables[playerName][position] = 1;
    }

    if (variables[playerName].PG === 1 || variables[playerName].SG === 1) {
      variables[playerName].G = 1;
    }

    if (variables[playerName].SF === 1 || variables[playerName].PF === 1) {
      variables[playerName].F = 1;
    }
  }
  return variables;
};

/**
 * buildConstraints() returns the optimization constraints
 * @param  {JSON} data - from DraftKings lineups
 * @return {JSON} - JSON of constraints
 *
 * Eg., { cost: { max: 50000 }, positions..., players...{ max: 1 }}
 */
function buildConstraints(data) {
  const constraints = {
    cost: { max: 50000 },
    PG: { min: 1 },
    SG: { min: 1 },
    SF: { min: 1 },
    PF: { min: 1 },
    C: { min: 1 },
    G: { min: 3 },
    F: { min: 3 },
    UTIL: { equal: 8 }
  };

  for (let i = 0; i < data.length; i += 1) {
    const playerName = data[i].Name;
    constraints[playerName] = { max: 1 };
  }
  return constraints;
};

/**
 * buildInts() definess all variables that are constrained to be integers
 * @param  {JSON} data - from DraftKings lineups
 * @return {JSON} - return players because all players must be integers
 *
 * Eg., { 'James Harden': 1, 'Kevin Durant': 1, ...}
 */
function buildInts(data) {
  const Ints = {};

  for (let i = 0; i < data.length; i += 1) {
    const playerName = data[i].Name;
    Ints[playerName] = 1;
  }
  return Ints;
};

module.exports = {
  buildVariables,
  buildConstraints,
  buildInts
}
