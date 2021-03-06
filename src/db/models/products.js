import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Product = sequelize.define(
  "products",
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

    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }
  //   {
  //     timestamps: false,
  //   }
);

console.log("executes products.js"); //4.

export default Product;
