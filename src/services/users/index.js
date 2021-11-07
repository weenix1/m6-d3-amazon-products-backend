import express from "express";
import models from "../../db/models/index.js";

const { User, Review, Product } = models;
const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const users = await User.findAll({
        include: Review,
        where: {
          ...(req.query.search && {
            [Op.or]: [
              { name: { [Op.iLike]: `%${req.query.search}%` } },
              { email: { [Op.iLike]: `%${req.query.search}%` } },
            ],
          }),
        },
      });
      res.send(users);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await User.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.route("/bulkCreate").post(async (req, res, next) => {
  try {
    const data = await User.bulkCreate(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const User = await User.findByPk(req.params.id);
      res.send(User);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      delete req.body.email;
      delete req.body.id;
      const newUser = await User.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },
          returning: true,
        }
      );
      res.send(newUser[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await User.destroy({
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
