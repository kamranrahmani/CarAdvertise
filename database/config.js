module.exports = {
  host: process.env.DATABASE_URL,
  db: process.env.DATABASE_NAME,
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  dialect: "mysql"
};
