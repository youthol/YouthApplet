module.exports = app => {
  const { STRING, INTEGER, DATE, TEXT } = app.Sequelize;

  const BoilingComm = app.model.define(
    "boiling_comm",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      eid: {
        type: STRING,
        allowNull: false
      },
      nickName: {
        type: TEXT,
        allowNull: false
      },
      content: {
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

  return BoilingComm;
};
