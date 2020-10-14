'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("tasks", [
      { listId: "62d152e9-6697-4b0b-94b7-5064baf3b28c", id: "03d132de-9d62-4efa-bd59-1219dcaf6477", name: "Task 2", order : "0"},
      { listId: "03d132de-9d62-4efa-bd59-1219dcaf6477", id: "62d152e9-6697-4b0b-94b7-5064baf3b28c", name: "Task 1", order : "0"},
      { listId: "6dd132e4-6699-4b0b-94b7-2464baf3b28c", id: "6dd132e4-6699-4b0b-94b7-2464baf3b28c", name: "Task 3", order : "0"},
      { listId: "63d132e5-6697-4b0b-94b7-3464baf3b28c", id: "63d132e5-6697-4b0b-94b7-3464baf3b28c", name: "Task 4", order : "0"},
      { listId: "04d107de-5d65-4efa-bd59-4219dcaf6477", id: "04d107de-5d65-4efa-bd59-4219dcaf6477", name: "Task 5", order : "0"},
      { listId: "05d102de-5d61-3efa-bd59-5219dcaf6477", id: "05d102de-5d61-3efa-bd59-5219dcaf6477", name: "Task 6", order : "0"},
      { listId: "16d102de-5d60-2efa-bd59-6219dcaf6477", id: "16d102de-5d60-2efa-bd59-6219dcaf6477", name: "Task 7", order : "0"},      
      { listId: "26d102de-5d68-2efa-bd59-7219dcaf6477", id: "26d102de-5d68-2efa-bd59-7219dcaf6477", name: "Task 8", order : "0"},      
      { listId: "36d102de-5d64-2efa-bd59-9219dcaf6477", id: "36d102de-5d64-2efa-bd59-9219dcaf6477", name: "Task 9", order : "0"},      
      { listId: "46d102de-5d66-2efa-bd59-8219dcaf6477", id: "46d102de-5d66-2efa-bd59-8219dcaf6477", name: "Task 10", order : "0"},      
      
      
      { listId: "62d152e9-6697-4b0b-94b7-5064baf3b28c", id: "01d132de-9d62-4efa-bd59-1219dcaf6477", name: "Task 2", order : "100000"},
      { listId: "03d132de-9d62-4efa-bd59-1219dcaf6477", id: "02d152e9-6697-4b0b-94b7-5064baf3b28c", name: "Task 1", order : "100000"},
      { listId: "6dd132e4-6699-4b0b-94b7-2464baf3b28c", id: "03d132e4-6699-4b0b-94b7-2464baf3b28c", name: "Task 3", order : "100000"},
      { listId: "63d132e5-6697-4b0b-94b7-3464baf3b28c", id: "04d132e5-6697-4b0b-94b7-3464baf3b28c", name: "Task 4", order : "100000"},
      { listId: "04d107de-5d65-4efa-bd59-4219dcaf6477", id: "05d197de-5d65-4efa-bd59-4219dcaf6477", name: "Task 5", order : "100000"},
      { listId: "05d102de-5d61-3efa-bd59-5219dcaf6477", id: "06d102de-6d61-3efa-bd59-5219dcaf6477", name: "Task 6", order : "100000"},
      { listId: "16d102de-5d60-2efa-bd59-6219dcaf6477", id: "07d102de-5d60-2efa-bd59-6219dcaf6477", name: "Task 7", order : "100000"},      
      { listId: "26d102de-5d68-2efa-bd59-7219dcaf6477", id: "08d102de-5d68-2efa-bd59-7219dcaf6477", name: "Task 8", order : "100000"},      
      { listId: "36d102de-5d64-2efa-bd59-9219dcaf6477", id: "09d102de-5d64-2efa-bd59-9219dcaf6477", name: "Task 9", order : "100000"},      
      { listId: "46d102de-5d66-2efa-bd59-8219dcaf6477", id: "10d102de-5d66-2efa-bd59-8219dcaf6477", name: "Task 10", order : "100000"},      
      
      { listId: "62d152e9-6697-4b0b-94b7-5064baf3b28c", id: "12d132de-9d62-4efa-bd59-1219dcaf6477", name: "Task 2", order : "200000"},
      { listId: "03d132de-9d62-4efa-bd59-1219dcaf6477", id: "13d152e9-6697-4b0b-94b7-5064baf3b28c", name: "Task 1", order : "200000"},
      { listId: "6dd132e4-6699-4b0b-94b7-2464baf3b28c", id: "14d132e4-6699-4b0b-94b7-2464baf3b28c", name: "Task 3", order : "200000"},
      { listId: "63d132e5-6697-4b0b-94b7-3464baf3b28c", id: "15d132e5-6697-4b0b-94b7-3464baf3b28c", name: "Task 4", order : "200000"},
      { listId: "04d107de-5d65-4efa-bd59-4219dcaf6477", id: "16d107de-5d65-4efa-bd59-4219dcaf6477", name: "Task 5", order : "200000"},
      { listId: "05d102de-5d61-3efa-bd59-5219dcaf6477", id: "17d102de-5d61-3efa-bd59-5219dcaf6477", name: "Task 6", order : "200000"},
      { listId: "16d102de-5d60-2efa-bd59-6219dcaf6477", id: "18d102de-5d60-2efa-bd59-6219dcaf6477", name: "Task 7", order : "200000"},      
      { listId: "26d102de-5d68-2efa-bd59-7219dcaf6477", id: "19d102de-5d68-2efa-bd59-7219dcaf6477", name: "Task 8", order : "200000"},      
      { listId: "36d102de-5d64-2efa-bd59-9219dcaf6477", id: "20d102de-5d64-2efa-bd59-9219dcaf6477", name: "Task 9", order : "200000"},      
      { listId: "46d102de-5d66-2efa-bd59-8219dcaf6477", id: "21d102de-5d66-2efa-bd59-8219dcaf6477", name: "Task 10", order : "200000"},      
      
      { listId: "62d152e9-6697-4b0b-94b7-5064baf3b28c", id: "24d152e9-6697-4b0b-94b7-5064baf3b28c", name: "Task 1", order : "300000"},
      { listId: "03d132de-9d62-4efa-bd59-1219dcaf6477", id: "23d132de-9d62-4efa-bd59-1219dcaf6477", name: "Task 2", order : "300000"},
      { listId: "6dd132e4-6699-4b0b-94b7-2464baf3b28c", id: "25d132e4-6699-4b0b-94b7-2464baf3b28c", name: "Task 3", order : "300000"},
      { listId: "63d132e5-6697-4b0b-94b7-3464baf3b28c", id: "26d132e5-6697-4b0b-94b7-3464baf3b28c", name: "Task 4", order : "300000"},
      { listId: "04d107de-5d65-4efa-bd59-4219dcaf6477", id: "27d107de-5d65-4efa-bd59-4219dcaf6477", name: "Task 5", order : "300000"},
      { listId: "05d102de-5d61-3efa-bd59-5219dcaf6477", id: "28d102de-5d61-3efa-bd59-5219dcaf6477", name: "Task 6", order : "300000"},
      { listId: "16d102de-5d60-2efa-bd59-6219dcaf6477", id: "29d102de-5d60-2efa-bd59-6219dcaf6477", name: "Task 7", order : "300000"},      
      { listId: "26d102de-5d68-2efa-bd59-7219dcaf6477", id: "30d102de-5d68-2efa-bd59-7219dcaf6477", name: "Task 8", order : "300000"},      
      { listId: "36d102de-5d64-2efa-bd59-9219dcaf6477", id: "31d102de-5d64-2efa-bd59-9219dcaf6477", name: "Task 9", order : "300000"},      
      { listId: "46d102de-5d66-2efa-bd59-8219dcaf6477", id: "32d102de-5d66-2efa-bd59-8219dcaf6477", name: "Task 10", order : "300000"},      
      

      { listId: "54d102de-5d63-2efa-bd59-0219dcaf6477", id: "56d102de-5d63-2efa-bd59-0219dcaf6477", name: "Task 1", order : "0"},      
      { listId: "54d102de-5d63-2efa-bd59-0219dcaf6477", id: "11d102de-5d63-2efa-bd59-0219dcaf6477", name: "Task 2", order : "100000"},      
      { listId: "54d102de-5d63-2efa-bd59-0219dcaf6477", id: "22d102de-5d63-2efa-bd59-0219dcaf6477", name: "Task 3", order : "200000"},      
      { listId: "54d102de-5d63-2efa-bd59-0219dcaf6477", id: "33d102de-5d63-2efa-bd59-0219dcaf6477", name: "Task 4", order : "300000"},      
      { listId: "54d102de-5d63-2efa-bd59-0219dcaf6477", id: "20d102de-5d64-3efa-bd59-9219dcaf6473", name: "Task 5", order : "400000"},      
      { listId: "54d102de-5d63-2efa-bd59-0219dcaf6477", id: "21d102de-5d66-6efa-bd59-8219dcaf6476", name: "Task 6", order : "500000"},      
      { listId: "54d102de-5d63-2efa-bd59-0219dcaf6477", id: "20d102de-5d64-9efa-bd59-9219dcaf6479", name: "Task 7", order : "700000"},      
      { listId: "54d102de-5d63-2efa-bd59-0219dcaf6477", id: "21d102de-3d66-2efa-bd59-8219dcaf6412", name: "Task 8", order : "800000"},      
            
      { listId: "52d102de-5d63-2efa-bd59-0219dcaf6477", id: "20d102de-5d64-1efa-bd59-9219dcaf6471", name: "Task 11", order : "0"},      
      { listId: "52d102de-5d63-2efa-bd59-0219dcaf6477", id: "21d102de-5d66-4efa-bd59-8219dcaf6474", name: "Task 12", order : "100000"},      
      { listId: "52d102de-5d63-2efa-bd59-0219dcaf6477", id: "20d102de-5d64-7efa-bd59-9219dcaf6407", name: "Task 13", order : "200000"},      
      { listId: "52d102de-5d63-2efa-bd59-0219dcaf6477", id: "20d102de-4d64-3efa-bd59-9219dcaf6413", name: "Task 14", order : "300000"},      
      { listId: "52d102de-5d63-2efa-bd59-0219dcaf6477", id: "21d102de-1d66-0efa-bd59-8219dcaf6410", name: "Task 15", order : "400000"},      
      
      { listId: "53d102de-5d63-2efa-bd59-0219dcaf6477", id: "21d102de-5d66-2efa-bd59-8219dcaf6472", name: "Task 21", order : "0"},      
      { listId: "53d102de-5d63-2efa-bd59-0219dcaf6477", id: "20d102de-5d64-5efa-bd59-9219dcaf6475", name: "Task 22", order : "100000"},      
      { listId: "53d102de-5d63-2efa-bd59-0219dcaf6477", id: "21d102de-5d66-8efa-bd59-8219dcaf6478", name: "Task 23", order : "200000"},      
      { listId: "53d102de-5d63-2efa-bd59-0219dcaf6477", id: "20d102de-2d64-1efa-bd59-9219dcaf6411", name: "Task 24", order : "300000"},      
      { listId: "53d102de-5d63-2efa-bd59-0219dcaf6477", id: "21d102de-8d66-4efa-bd59-8219dcaf6414", name: "Task 25", order : "400000"},    
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("tasks", null, {});
  }
};
