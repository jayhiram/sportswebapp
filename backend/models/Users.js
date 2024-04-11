// models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Assuming you have a configuration file for Sequelize

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  profilePicture: {
    type: DataTypes.STRING // Assuming you'll store the URL of the profile picture
  }
});

module.exports = User;
