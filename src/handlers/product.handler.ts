import { Request, Response } from "express";
// import { check, validationResult } from "express-validator"; We use this in async functions and handlers

import Product from "../models/Product.model";

export const getProducts = async (req: Request, res: Response) => {
  // res.send("Server working");
  // res.json("From GET");

  // try {
  //   const products = await Product.findAll({
  //     order: [["id", "DESC"]],
  //     attributes: {
  //       exclude: ["createdAt", "updatedAt", "availability"],
  //     },
  //   });
  //   res.json({ data: products });
  // } catch (error) {
  //   console.log(error);
  // }
  const products = await Product.findAll({
    order: [["id", "DESC"]],
    attributes: {
      exclude: ["createdAt", "updatedAt"],
    },
  });
  res.json({ data: products });
};

export const getProductsById = async (req: Request, res: Response) => {
  // try {
  //   // console.log(req.params.id);
  //   // const { id } = req.params;
  //   const id = Number(req.params.id);
  //   const product = await Product.findByPk(id);

  //   if (!product) {
  //     return res.status(404).json({
  //       error: "Product not found",
  //     });
  //   }

  //   res.json({ data: product });
  // } catch (error) {
  //   console.log(error);
  // }
  const id = Number(req.params.id);
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  res.json({ data: product });
};

export const createProduct = async (req: Request, res: Response) => {
  // const product = new Product(req.body);
  // const savedProduct = await product.save();

  // To validate data (from handlers)
  // await check("name")
  //   .notEmpty()
  //   .withMessage("The product name cannot be empty")
  //   .run(req);
  // await check("price")
  //   .isNumeric()
  //   .withMessage("Invalid value")
  //   .notEmpty()
  //   .withMessage("The price name cannot be empty")
  //   .custom((value) => value > 0)
  //   .withMessage("Invalid price")
  //   .run(req);

  // let errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   return res.status(400).json({ errors: errors.array() });
  // }

  // Creating and returning created product
  // try {
  //   const product = await Product.create(req.body);
  //   res.status(201).json({
  //     data: product,
  //   });
  // } catch (error) {
  //   console.log(error);
  // }
  const product = await Product.create(req.body);
  res.status(201).json({
    data: product,
  });
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  // Updating product (update() only makes partial modifications)
  // The PUT method must perform complete modifications with the information sent
  // PUT is used to update or completely replace an existing resource on a web server
  // Replace the data with the received data, whether null or empty.
  await product.update(req.body);
  await product.save();

  res.json({ data: product });
};

export const updateAvailability = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  // PATCH is used to make partial modifications to an existing resource on the server
  // It allows you to make specific changes without affecting the rest of the information, unlike PUT, which affects the entire resource.
  // await product.update(req.body);
  product.availability = !product.dataValues.availability;
  await product.save();

  // console.log(product.dataValues);

  res.json({ data: product });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const product = await Product.findByPk(id);

  if (!product) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  await product.destroy();
  res.json({ data: "Product removed" });
};
