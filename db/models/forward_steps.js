"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class forward_steps extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  forward_steps.init(
    {
      address: {
        type: DataTypes.STRING,
      },
      secret: {
        type: DataTypes.STRING,
      },
      percentage: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "forward_steps",
    }
  );
  return forward_steps;
};
