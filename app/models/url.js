const { DataTypes, Model } = require('sequelize');
const shortUrlDb = require('../config/dbConnection.js');
const User = require('../models/user.js'); // Import the User model

const URL = shortUrlDb.define("urls", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    shortId: {
        type: DataTypes.STRING,
        require: true,
        unique: true,
    },
    redirectURL: {
        type: DataTypes.STRING,
        require: true,
    },
    visitorHistory: {
      type: DataTypes.JSON, // Define visitorHistory as JSON
      defaultValue: []
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    }
},
{
  timestamps: true // Enable timestamps
});

async function syncDatabase() {
    try {
      await shortUrlDb.sync();
      console.log("Database synchronized successfully.");
    } catch (error) {
      console.error('Failed to synchronize the database:', error);
    }
  }
  
  syncDatabase();
  
  module.exports = URL;