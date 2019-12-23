"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: { type: DataTypes.STRING, allowNull: false },
      username: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      birthYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1990
      },
      fav_poke: { type: DataTypes.STRING, defaultValue: null }
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
