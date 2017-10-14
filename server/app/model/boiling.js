module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const Boiling = app.model.define(
    "boiling",
    {
      eid: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      title: {
        type: STRING,
        allowNull: false
      },
      descript: {
        type: TEXT,
        allowNull: false
      },
      picUrl: {
        type: STRING(99),
        allowNull: false
      }
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: true
    }
  );
  
  return Boiling;
};
