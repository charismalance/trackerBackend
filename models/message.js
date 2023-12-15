'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.User , {foreignKey:'selerId' ,foreignKey:"reciverId"})
      // this.hasMany(models.User , {foreignKey:'reciverId'})
      this.belongsTo(models.Room  , {foreignKey:'roomId'})
      // define association here
    }
  }
  message.init({
    message: DataTypes.STRING,
    senderId: DataTypes.INTEGER,
    reciverId: DataTypes.INTEGER,
    roomId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'message',
  });
  return message;
};