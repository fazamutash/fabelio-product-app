const Joi = require('joi');
const validateRequest = require('../middleware/validate-request');
const fabelioService = require('../services/fabelio.service');
module.exports = fabelio = {};

fabelio.submitSchema = function (req, res, next) {
  const schema = Joi.object({
    link: Joi.string().uri().required()
  });
  validateRequest(req.body, next, schema);
}

fabelio.getSchema = function (req, res, next) {
  const schema = Joi.object({
    productId: Joi.number().required()
  });
  validateRequest(req.params, next, schema);
}

fabelio.submit = async function (req, res) {
  if (!req.body.link.includes("fabelio.com/ip/")) return res.status(400).send({message: "Validation error: \"link\" is not a fabelio product"});
  try {
    const link = req.body.link;
    console.log(link)
    const product = await fabelioService.create(link);
    return res.json({product});
  } catch (error) {
    console.log(error)
    res.status(422).send({message: error.message});
  }
}

fabelio.get = async function (req, res) {
  try {
    const product = await fabelioService.get(req.params.productId);
    return res.json({product});
  } catch (error) {
    console.log(error)
    res.status(422).send({message: error.message});
  }
}

fabelio.getAll = async function (req, res) {
  try {
    const products = await fabelioService.getAll();
    return res.json({products});
  } catch (error) {
    console.log(error)
    res.status(422).send({message: error.message});
  }
}
