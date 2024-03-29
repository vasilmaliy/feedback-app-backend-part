const config = require("../config/db.config.js");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: '0',

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.comment = require("../models/comment.model.js")(sequelize, Sequelize);
db.post = require("../models/post.model.js")(sequelize, Sequelize);
db.vote = require("../models/vote.model.js")(sequelize, Sequelize);

db.user.hasMany(db.comment);
db.post.hasMany(db.comment);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId",
});

db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

// db.post.hasOne(db.vote, {
//   foreignKey: 'postId'
// });
// db.vote.belongsTo(db.post);

db.post.belongsToMany(db.user, {
  through: db.vote,
  foreignKey: "postId",
  otherKey: "userId",
});

db.user.belongsToMany(db.post, {
  through: db.vote,
  foreignKey: "userId",
  otherKey: "postId"
});

db.user.hasMany(db.comment, {
  foreignKey: "userId"
})

db.post.hasMany(db.comment, {
  foreignKey: "postId"
})

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;
