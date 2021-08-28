const Sequelize = require('sequelize');
require("dotenv").config();
const config    = require('../config/config.json').development;

const devConfig = `postgresql://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;

const proConfig = process.env.DATABASE_URL;

const productModel = require('./product');

const sequelize = new Sequelize(process.env.NODE_ENV === "production" ? proConfig : devConfig)

const models = {
    Product: productModel(sequelize, Sequelize.DataTypes)
}


module.exports = models;