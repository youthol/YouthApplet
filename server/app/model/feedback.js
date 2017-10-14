module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const Feedback = app.model.define(
    "feedback",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      uid: {
        type: STRING,
        allowNull: false
      },
      content: {
        type: TEXT,
        allowNull: false
      }
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );

  return Feedback;
};
