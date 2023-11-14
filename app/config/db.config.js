module.exports = {
  HOST: "localhost",
  USER: "postgres",
  // PASSWORD: "secret",
  PASSWORD: "1959post",
  DB: "node_postgres",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};