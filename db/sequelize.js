const { Sequelize, DataTypes } = require('sequelize');


module.exports = sequelize = new Sequelize(process.env.POSTGRESS_SQL, {
  dialect: 'postgres', 
});
