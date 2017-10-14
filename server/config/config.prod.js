"use strict";

exports.sequelize = {
  dialect: "mysql",
  database: "testdb",
  host: "localhost",
  port: "3306",
  username: "root",
  password: "youth7n",
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
};
