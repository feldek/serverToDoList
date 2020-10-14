module.exports = (sequelize, DataTypes) => {
  let boards = sequelize.define("boards", {
    userId: {
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
  boards.associate = (db) => {
    boards.hasMany(db.lists, {
      foreignKey: "boardId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });

    boards.belongsTo(db.users, {
      foreignKey: "userId",
    });
  };

  return boards;
};
