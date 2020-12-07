'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("lists", [
      { boardId: "03d132de-5d62-4efa-bd59-9219dcaf6477", id: "62d152e9-6697-4b0b-94b7-5064baf3b28c", name: "List 1"},
      { boardId: "03d132de-5d62-4efa-bd59-9219dcaf6477", id: "03d132de-9d62-4efa-bd59-1219dcaf6477", name: "List 2"},
      { boardId: "62d152e9-6697-4b0b-94b7-5464baf3b28c", id: "6dd132e4-6699-4b0b-94b7-2464baf3b28c", name: "List 3"},
      { boardId: "62d152e9-6697-4b0b-94b7-5464baf3b28c", id: "63d132e5-6697-4b0b-94b7-3464baf3b28c", name: "List 4"},
      { boardId: "6dd132e4-6697-4b0b-94b7-5464baf3b28c", id: "04d107de-5d65-4efa-bd59-4219dcaf6477", name: "List 5"},
      { boardId: "6dd132e4-6697-4b0b-94b7-5464baf3b28c", id: "05d102de-5d61-3efa-bd59-5219dcaf6477", name: "List 6"},
      { boardId: "63d132e5-6697-4b0b-94b7-5464baf3b28c", id: "16d102de-5d60-2efa-bd59-6219dcaf6477", name: "List 7"},      
      { boardId: "63d132e5-6697-4b0b-94b7-5464baf3b28c", id: "26d102de-5d68-2efa-bd59-7219dcaf6477", name: "List 8"},      
      { boardId: "04d107de-5d62-4efa-bd59-9219dcaf6477", id: "36d102de-5d64-2efa-bd59-9219dcaf6477", name: "List 9"},      
      { boardId: "05d102de-5d62-3efa-bd59-9219dcaf6477", id: "46d102de-5d66-2efa-bd59-8219dcaf6477", name: "List 10"},      
      { boardId: "05d102de-5d62-3efa-bd59-9219dcaf6477", id: "46d102de-6d68-1efa-bd59-8219dcaf6477", name: "List 101"},      
      { boardId: "06d102de-5d62-2efa-bd59-9219dcaf6477", id: "51d102de-5d63-2efa-bd59-0219dcaf6477", name: "List 11"},      
      { boardId: "04d107de-5d62-4efa-bd59-9219dcaf6477", id: "52d102de-5d63-2efa-bd59-0219dcaf6477", name: "List 12"},      
      { boardId: "04d107de-5d62-4efa-bd59-9219dcaf6477", id: "53d102de-5d63-2efa-bd59-0219dcaf6477", name: "List 13"},      
      { boardId: "04d107de-5d62-4efa-bd59-9219dcaf6477", id: "54d102de-5d63-2efa-bd59-0219dcaf6477", name: "List 14"},      
      
    ]);
  },  
  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("lists", null, {});
  }
};
