module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const NewSduts = app.model.define(
    "new_sduts",
    {
      id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      sdutid: {
        type: STRING(11),
        allowNull: false
      },
      class_name: {
        type: STRING,
        allowNull: false
      },
      campus:{
        type: STRING,
        allowNull: true
      },
      domain: {
        type: STRING,
        allowNull: false
      },
      level: {
        type: STRING,
        allowNull: true
      },
      school_len: {
        type: STRING,
        allowNull: false
      },
      province: {
        type: STRING,
        allowNull: false
      },
      exam_num: {
        type: STRING,
        allowNullw: false
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
      report_location: {
        type: STRING,
        allowNull: false
      },
      college: {
        type: STRING,
        allowNull: false
      }
    },
    {
      timestamps: false,
      underscored: true
    }
  );

  return NewSduts;
};
