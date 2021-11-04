import sequelize from "../index.js";
import s from "sequelize";
const { DataTypes } = s;

const Review = sequelize.define("reviews", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  //Way 3

  //   authorId: {
  //     type: DataTypes.INTEGER,
  //     references: {
  //       model: "authors",
  //       key: "id",
  //     },
  //   },

  // Way 2.
  //   author_id:{
  //       type:DataTypes.INTEGER
  //   }
});

//Article.sync({force:true})
export default Review;
