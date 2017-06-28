/**
 * removePlayer() removes a player from the linear programming model
 * @param  {String} playerName - name of the NBA player
 * @param  {JSON} model - linear programming model
 * @return {JSON} - optimization model without the player
 */

function removePlayer(playerName, model) {
  const modelWithoutPlayer = model;

  delete modelWithoutPlayer.constraints[playerName];
  delete modelWithoutPlayer.variables[playerName];
  delete modelWithoutPlayer.ints[playerName];

  return modelWithoutPlayer;
};

module.exports = {
  removePlayer
}