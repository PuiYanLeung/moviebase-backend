const { DataTypes } = require("sequelize");
const { connection } = require("../db");
const User = require("./user");
const Film = require("./film");

const WatchList = connection.define("WatchList", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
    UserId: {
        type: DataTypes.INTEGER,
        allowNull: false
        
    },
    FilmId: {
        type: DataTypes.INTEGER,
        allowNull: false       
    }
}, {});

User.hasMany(WatchList);
WatchList.belongsTo(User);
Film.hasMany(WatchList);
WatchList.belongsTo(Film);

module.exports = WatchList;
