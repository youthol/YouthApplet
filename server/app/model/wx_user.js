module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;

  const User = app.model.define(
    "wx_user",
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        unique: true
      },
      uid: {
        type: STRING(36),
        allowNull: false
      },
      openId: {
        type: STRING(36),
        allowNull: false,
        unique: true
      },
      unionid: {
        type: STRING(36),
        allowNull: true,
        unique: true
      },
      avatarUrl: {
        type: STRING,
        allowNull: false
      },
      nickName: {
        type: STRING(64),
        allowNull: true
      },
      gender: {
        type: STRING(2),
        allowNull: true
      },
      city: {
        type: STRING(36),
        allowNull: true
      },
      province: {
        type: STRING(36),
        allowNull: true
      },
      country: {
        type: STRING(36),
        allowNull: true
      },
      language: {
        type: STRING,
        allowNull: true
      },
      sdutid: {
        type: STRING(11),
        allowNull: true,
        unique: true
      },
      name: {
        type: STRING(36),
        allowNull: true
      },
      college: {
        type: STRING(36),
        allowNull: true
      },
      grade: {
        type: STRING(36),
        allowNull: true
      },
      dormitory: {
        type: STRING(18),
        allowNull: true
      },
      room: {
        type: STRING(4),
        allowNull: true
      },
      phone: {
        type: STRING(11),
        allowNull: true
      }
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );

  return User;
};
