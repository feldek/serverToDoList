"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("users", [
      { id: "f8dd1ba9-251d-47da-a708-0a12786a83d8",email: "123@gmail.com", password: "123" },
      { id:"aed94919-a7e1-467b-a74d-e001b6036892", email: "222@gmail.com", password: "123" },
      { id: "56e3c7f1-5930-4384-92f9-4f64c2409aec",email: "999@gmail.com", password: "123" },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  },
};
