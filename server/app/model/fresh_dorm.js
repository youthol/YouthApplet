module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const FreshDorm = app.model.define(
    "fresh_dorm",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      sdut_id: {
        type: STRING(11),
        allowNull: false
      },
      sdut_name: {
        type: STRING,
        allowNull: false
      },
      gender: {
        type: STRING,
        allowNull: false
      },
      nation: {
        type: STRING,
        allowNull: false
      },
      class_name: {
        type: STRING,
        allowNull: false
      },
      apartment: {
        type: STRING,
        allowNull: false
      },
      room: {
        type: STRING,
        allowNull: false
      },
      bed: {
        type: STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      underscored: true
    }
  );

  return FreshDorm;
};
