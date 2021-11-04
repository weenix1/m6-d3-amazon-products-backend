import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Category = sequelize.define(
  "category",
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isMobile: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);
console.log("executes category.js");
export default Category;
