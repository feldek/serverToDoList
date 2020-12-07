module.exports = (sequelize, DataTypes) => {
  let lists = sequelize.define("lists", {
    boardId: {
      type: DataTypes.UUID,
    },
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
  });

  lists.associate = (db) => {
    lists.hasMany(db.tasks, {
      foreignKey: "listId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    lists.belongsTo(db.boards, {
      foreignKey: "boardId",
    });
  };
  
  return lists;
};
