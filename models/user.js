'use strict';
const bcrypt = require("bcrypt");

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsToMany(models.Role , {through:'UserRole' , foreignKey:'userId'})
      this.hasMany(models.UserRole , {foreignKey:'userId'})

    }
  };
  User.init({
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    nationalCode: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    verificationCode: DataTypes.STRING,
    verificationCodeExpireTime: DataTypes.DATE,
    isVerified: DataTypes.STRING,
    townshipId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: hashPassword,
      beforeUpdate: hashPassword,
    }
  });
  return User;
};


const hashPassword = async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 10);

  }
  return user;
}