module.exports = (sequelize, Sequelize) => {
  const Vote = sequelize.define("votes", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
  });

  return Vote;
};