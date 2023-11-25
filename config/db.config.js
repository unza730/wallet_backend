// // config/database.js
// import { Sequelize } from 'sequelize';

// const sequelize = new Sequelize(process.env.DB, process.env.USER, process.env.PASSWORD, {
//     host: 'localhost',
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000
//     }
// });

// export { sequelize };
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('wallet', 'root', 'PHW#84#jeor', {
  host: 'localhost',
  dialect: 'mysql',
  define: {
    timestamps: false, // Disable timestamps by default
  },
});

module.exports = sequelize;
