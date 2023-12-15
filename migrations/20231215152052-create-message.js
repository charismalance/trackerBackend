'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('messages', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      message: {
        allowNull :false ,
        type: Sequelize.STRING
      },
      senderId: {
        allowNull :false ,
        type: Sequelize.INTEGER , 
        references:{
          model:'Users',
          key:'id'
        },
      },
      reciverId: {
        allowNull :false ,
        type: Sequelize.INTEGER ,
        references:{
          model:'Users',
          key:'id'
        },
      },
      roomId: {
        allowNull :false ,
        type: Sequelize.INTEGER , 
        references:{
          model:'Rooms',
          key:'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE ,
        defaultValue: Sequelize.literal('NOW()')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE ,
        defaultValue: Sequelize.literal('NOW()')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('messages');
  }
};