module.exports = (sequelize, Sequelize) => {
  const CommentClosure = sequelize.define('comment_closure', {
    ancestor: {
      type: Sequelize.INTEGER,
      allowNull:  false,
    },
    descendant: {
      type: Sequelize.INTEGER,
      allowNull:  false,
    },
    depth: {
      type: Sequelize.INTEGER,
      allowNull:  false,
    }
  });

  return CommentClosure;
};