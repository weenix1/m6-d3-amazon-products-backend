import express from "express";
import models from "../../db/models/index.js";

import sequelize from "../../db/index.js";

const { Op } = sequelize;
const { Review, Product, User } = models;

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const reviews = await Review.findAll({
        include: [
          User,
          {
            model: Product,
            where: {
              ...(req.query.search && {
                [Op.or]: [{ name: { [Op.iLike]: `%${req.query.search}%` } }],
              }),
            },
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.send(reviews);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const newReview = await Review.create(req.body);
      res.send(newReview[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.route("/bulkCreate").post(async (req, res, next) => {
  try {
    const data = await Review.bulkCreate(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

/* router.route("/:productId/review").post(async (req, res, next) => {
  try {
    const product = await Review.create({
      text: req.body.text,
      productId: req.params.productId,
      userId: req.params.userId,
    });
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
}); */

router.route("/:productId/:userId").post(async (req, res, next) => {
  try {
    const product = await Review.create({
      text: req.body.text,
      productId: req.params.productId,
      userId: req.params.userId,
    });
    res.send(product);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const review = await Review.findByPk(req.params.id);
      res.send(review);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const updated = await Review.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },
          returning: true,
        }
      );
      res.send(updated);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Review.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.send({ rows });
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;
