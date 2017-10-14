module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Question = app.model.define(
    "question",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      num: {
        type: STRING,
        allowNull: false
      },
      mark: {
        type: STRING,
        allowNull: false
      },
      question:{
        type: STRING,
        allowNull: true
      },
      A: {
        type: STRING,
        allowNull: true
      },
      B: {
        type: STRING,
        allowNull: true
      },
      C: {
        type: STRING,
        allowNull: true
      },
      D: {
        type: STRING,
        allowNull: true
      },
      E: {
        type: STRING,
        allowNull: true
      },
      F: {
        type: STRING,
        allowNull: true
      },
      G: {
        type: STRING,
        allowNull: true
      },
      H: {
        type: STRING,
        allowNull: true
      },
      I: {
        type: STRING,
        allowNull: true
      },
      G: {
        type: STRING,
        allowNull: true
      },
      K: {
        type: STRING,
        allowNull: true
      },
     L: {
        type: STRING,
        allowNull: true
      },
      M: {
        type: STRING,
        allowNull: true
      },
    },
    {
      timestamps: false,
      underscored: true
    }
  );

  return Question;
};
