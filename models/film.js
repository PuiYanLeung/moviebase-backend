const { DataTypes } = require("sequelize");
const { connection } = require("../db");

const Film = connection.define("Film", {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: {
        type: DataTypes.STRING
    },
    lang: {
        type: DataTypes.STRING
    },
    filmyear: {
        type: DataTypes.INTEGER
    },
    duration: {
        type: DataTypes.STRING
    },
    restriction: {
        type: DataTypes.STRING
    },
    director: {
        type: DataTypes.STRING
    },
    casting: {
        type: DataTypes.STRING
    },
    rating: {
        type: DataTypes.INTEGER,
        validate: { min: 1, max: 5 }
    },
    photoURL:{
        type: DataTypes.STRING
    },
    image:{
        type: DataTypes.STRING
    }
}, {});

module.exports = Film;
