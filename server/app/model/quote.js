module.exports = app => {
  const {
    STRING,
    INTEGER,
    DATE,
    TEXT
  } = app.Sequelize;

  const Quote = app.model.define(
    "quote", {
      qid: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      imgUrl: {
        type: STRING,
        allowNull: false
      },
      day: {
        type: STRING(2),
        allowNull: false
      },
      date: {
        type: STRING(99),
        allowNull: false
      },
      content: {
        type: STRING,
        allowNull: false
      },
      author: {
        type: STRING,
        allowNull: false
      }
    }, {
      timestamps: false
    }
  );

  return Quote;
};