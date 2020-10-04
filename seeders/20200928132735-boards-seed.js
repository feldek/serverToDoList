'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("boards", [
      { userId: "f8dd1ba9-251d-47da-a708-0a12786a83d8", id: "03d132de-5d62-4efa-bd59-9219dcaf6477", name: "1 123@gmail.com"},
      { userId: "f8dd1ba9-251d-47da-a708-0a12786a83d8", id: "62d152e9-6697-4b0b-94b7-5464baf3b28c", name: "123@gmail.com"},
      { userId: "aed94919-a7e1-467b-a74d-e001b6036892", id: "6dd132e4-6697-4b0b-94b7-5464baf3b28c", name: "2 123@gmail.com"},
      { userId: "aed94919-a7e1-467b-a74d-e001b6036892", id: "63d132e5-6697-4b0b-94b7-5464baf3b28c", name: "3 123@gmail.com"},
      { userId: "56e3c7f1-5930-4384-92f9-4f64c2409aec", id: "04d107de-5d62-4efa-bd59-9219dcaf6477", name: "board 1234@gmail.com"},
      { userId: "56e3c7f1-5930-4384-92f9-4f64c2409aec", id: "05d102de-5d62-3efa-bd59-9219dcaf6477", name: "board 999"},
      { userId: "56e3c7f1-5930-4384-92f9-4f64c2409aec", id: "06d102de-5d62-2efa-bd59-9219dcaf6477", name: "999@gmail.com"},      
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("boards", null, {});
  }
};
