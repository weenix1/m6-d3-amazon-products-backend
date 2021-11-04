import Product from "./products.js"; //3.
import Review from "./reviews.js";
import Category from "./category.js";
import ProductCategory from "./productCategory.js";
import User from "./user.js";

// WAY 1
//hasMany
//belongsTo

Product.hasMany(Review, { onDelete: "CASCADE" }); // creates authorId in Article. Get Authors including articles
Review.belongsTo(Product, { onDelete: "CASCADE" }); // creates authorId in Article. Get Articles including authors

//Way 2

// Author.hasMany(Article, { foreignKey: "author_id" }); // creates authorId in Article
// Article.belongsTo(Author, { foreignKey: "author_id" }); // creates authorIs in Article

//Way 3
// Author.hasMany(Article); // creates authorId in Article
// Article.belongsTo(Author); // creates authorIs in Article
User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });

Product.belongsToMany(Category, {
  through: { model: ProductCategory, unique: false },
});
Category.belongsToMany(Product, {
  through: { model: ProductCategory, unique: false },
});

export default { Product, Review, Category, User, ProductCategory };
