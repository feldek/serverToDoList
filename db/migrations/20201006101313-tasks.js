"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable("tasks", {
      name: { type: Sequelize.DataTypes.STRING, allowNull: false },
      id: {
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.literal("uuid_generate_v4()"),
        allowNull: false,
        primaryKey: true,
      },
      order: {
        type: Sequelize.DataTypes.DOUBLE,
        allowNull: false,
      },
      description: {
        type: Sequelize.DataTypes.STRING,
        defaultValue: "",
      },
      listId: {
        type: Sequelize.DataTypes.UUID,
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        allowNull: false,
        references: {
          model: "lists",
          key: "id",
        },
      },
      updatedAt: Sequelize.DataTypes.DATE,
      createdAt: Sequelize.DataTypes.DATE,
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("tasks");
  },
};
