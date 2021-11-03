import Product from "./products.js"; //3.
import Review from "./reviews.js";

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

export default { Product, Review };
