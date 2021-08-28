const axios = require('axios');
const cheerio = require('cheerio');
const Product = require("../models").Product;

module.exports = {
  create,
  get,
  getAll
};
async function loadData(link) {
  try {
    const res = await axios.get(link);
    if (res.status != 200) throw new Error('failed to get the page');
    const $ = cheerio.load(res.data);
    const productName = $('h1#product-name').text();
    if (!productName) throw new Error('failed to get the product');
    const productData = {
      link: link,
      name: productName,
      price: $('div#product-final-price').first().text(),
      image: $('picture img').attr('src'),
      details: $('.prod-dimension-list').text()
    }
    return productData;
  } catch(err) {
    console.log(err);
  }
  

}
async function create(link) {
  const product = await Product.findOne({ where: { link } });
  const productData = await loadData(link);
  if (!productData) throw new Error('failed to get the product');
  if (product) {
    const updatedProduct = await product.update(productData);
    return updatedProduct;
  } else {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
  }
}

async function get(id) {
  const detailProduct = await Product.findOne({ where: { id } });
  const productData = await loadData(detailProduct.link);
  if (detailProduct) {
    const updatedProduct = await detailProduct.update(productData);
    return updatedProduct;
  } else {
    return {}
  } 
}

async function getAll() {
  const products = await Product.findAll();
  if (products) {
    return products;
  } else {
    return {}
  } 
}