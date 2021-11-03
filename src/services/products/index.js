import express from "express";
import models from "../../db/models/index.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import path from "path";

const { Product, Review } = models;
const router = express.Router();

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "Amazon-Products-backend",
  },
});

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const products = await Product.findAll({ include: Review });
      res.send(products);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.post(
  "/uploadCloudinary",
  multer({ storage: cloudinaryStorage }).single("picture"),
  async (req, res, next) => {
    try {
      /*   const cover = req.file.path; */
      const { name, category, image, price } = req.body;
      const data = await Product.create(
        req.body,
        { image: req.file.path, isAdmin: true },
        {
          fields: ["name", "category", "image", "price"],
        }
      );
      console.log(data);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.send(product);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      delete req.body.email;
      delete req.body.id;
      const newProduct = await Product.update(
        { ...req.body },
        {
          where: {
            id: req.params.id,
          },
          returning: true,
        }
      );
      res.send(newProduct[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Product.destroy({
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
