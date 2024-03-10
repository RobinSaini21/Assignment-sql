const { Sequelize, DataTypes } = require('sequelize');


module.exports = sequelize = new Sequelize("postgresql://RobinSaini21:xfBr1oWn5NcO@ep-shy-frog-16946117.ap-southeast-1.aws.neon.tech/quest_db?sslmode=require", {
  dialect: 'postgres', 
});
