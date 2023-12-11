'use strict';
const bcrypt = require("bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
    username:"mayam@gogoli.com",
    email:"mayam@gogoli.com",
    phone:"09199559728" ,
    firstName:"mayayam" , 
    lastName:"kordlo" ,
    password: bcrypt.hashSync("maryam1372",10),
    createdAt:new Date , 
    updatedAt: new Date ,
  }])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
