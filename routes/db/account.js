const { Pool } = require("pg");

let connectionString = {
  user: "eglkvngmdupval",
  database: "d1neoolbks8vo2",
  host: "ec2-3-248-4-172.eu-west-1.compute.amazonaws.com",
  port: "5432",
  password: "a23764d8447a33c5234f186417acc03a7c2a4ed5448b818242ad87622826d91f",
  ssl: { rejectUnauthorized: false },
};

const pool = new Pool(connectionString);

let account = {};

account.allUsers = () => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users", function (err, data) {
      if (err) return reject(err);
      return resolve(data.rows);
    });
  });
};
account.authentication = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password],
      function (err, data) {        
        if (err) return reject(err);
        if (data.rows[0]) resolve(true);
        else resolve(false);
      }
    );
  });
};
account.getUuid = (email) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT uuid FROM users where email=$1", [email], function (err, data) {
      if (err) return reject(err);
      return resolve(data.rows);
    });
  });
};

account.signUp = (item) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "INSERT INTO users(email, password) VALUES ($1, $2)",
      [item.email, item.password],
      function (err, data) {
        if (err) return reject(err);
        return resolve(data);
      }
    );
  });
};
account.userData = (email) => {
  return new Promise((resolve, reject) => {
    pool.query("SELECT * FROM users where email = $1", [email], function (err, data) {
      if (err) return reject(err);
      return resolve(data.rows[0]);
    });
  });
};
account.confirm = (uuid) => {
  return new Promise((resolve, reject) => {
    pool.query("UPDATE users SET confirm = true WHERE uuid = $1", [uuid], function (
      err,
      data
    ) {
      if (err) return reject(err);
      return resolve(data.rows);
    });
  });
};

account.changePassword = (data) => {
  return new Promise((resolve, reject) => {
    pool.query(
      "UPDATE users SET password = $1 WHERE email = $2",
      [data.newPassword, data.email],
      function (err, data) {
        if (err) return reject(err);
        return resolve(true);
      }
    );
  });
};
account.deleteUser = (uuid) => {
  return new Promise((resolve, reject) => {
    pool.query("DELETE FROM users WHERE uuid = $1", [uuid], function (err, data) {
      if (err) return reject(err);
      return resolve(true);
    });
  });
};

module.exports.account = account;
