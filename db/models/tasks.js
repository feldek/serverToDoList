module.exports = (sequelize, DataTypes) => {
  let tasks = sequelize.define("tasks", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    order: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    listId: {
      type: DataTypes.UUID,
    },
  });

  tasks.associate = (db) => {
    tasks.belongsTo(db.lists, {
      foreignKey: "listId",
    });
  };

  return tasks;
};
