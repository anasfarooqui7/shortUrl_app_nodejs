const { DataTypes, Model } = require('sequelize');
const shortUrlDb = require('../config/dbConnection.js');

const userSchema = shortUrlDb.define("users", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        require:true
    },
    email:{
        type: DataTypes.STRING,
        require:true,
        unique:true
    },
    role:{
        type: DataTypes.STRING,
        require:true,
        defaultValue:"NORMAL",
    },
    password:{
        type: DataTypes.STRING,
        require:true
    }
},{
    timestamps: true
});

async function syncDatabase() {
    try {
      await shortUrlDb.sync();
      console.log("Database synchronized successfully.");
    } catch (error) {
      console.error('Failed to synchronize the database:', error);
    }
}

// we use this when we add a new column
// async function syncDatabase() {
//     try {
//       await shortUrlDb.sync({ force: true });
//       console.log("Database synchronized successfully.");
//     } catch (error) {
//       console.error('Failed to synchronize the database:', error);
//     }
// }
  
  syncDatabase();
  
  module.exports = userSchema;