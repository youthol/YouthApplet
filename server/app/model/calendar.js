module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Calendar = app.model.define(
    "calendar",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      date: {
        type: DATE,
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

  return Calendar;
};
