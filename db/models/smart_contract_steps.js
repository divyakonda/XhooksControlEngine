"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class smart_contract_steps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  smart_contract_steps.init(
    {
      smart_contract_id: {
        type: DataTypes.INTEGER,
      },
      step_type: {
        type: DataTypes.STRING,
      },
      step_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "smart_contract_steps",
    }
  );
  return smart_contract_steps;
};
