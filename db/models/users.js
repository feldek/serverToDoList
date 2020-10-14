module.exports = (sequelize, DataTypes) => {
  let users = sequelize.define("users", {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    confirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
  });
  users.associate = (db) => {
    users.hasMany(db.boards, {
      foreignKey: "userId",
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    });
  };

  return users;
};
