const chai = require('chai');
const request = require('request-promise');
const { expect } = require('chai');
const should = chai.should();

const BASE = 'http://localhost:5000';

describe('Fabelio test', () => {
  it('Should load seed data', async () => {
    const options = {
      method: 'GET',
      uri: BASE + '/api',
    };
    try {
      let res = await request(options);
      res = JSON.parse(res);
      return expect(res.message).to.equal('Database has been seeded with Meja Tamu Chloe - Set of 3.');
    } catch (err) {
      should.not.exist(err);
    }
  });

  it('Should not allow link submission without link', async () => {
    const options = {
      method: 'POST',
      uri: BASE + '/api/fabelio'
    };
    try {
      await request(options);
    } catch (err) {
      expect(err.statusCode).to.equal(400);
      const errorData = JSON.parse(err.error);
      expect(errorData.message).to.equal('Validation error: "link" is required');
    }
  });

  it('Should not allow link submission with empty link', async () => {
    const options = {
      method: 'POST',
      uri: BASE + '/api/fabelio',
      form: {
        link: ''
      }
    };
    try {
      await request(options);
    } catch (err) {
      expect(err.statusCode).to.equal(400);
      const errorData = JSON.parse(err.error);
      expect(errorData.message).to.equal('Validation error: "link" is not allowed to be empty');
    }
  });

  it('Should not allow link submission if it is not a valid url', async () => {
    const options = {
      method: 'POST',
      uri: BASE + '/api/fabelio',
      form: {
        link: 'wrongpattern'
      }
    };
    try {
      await request(options);
    } catch (err) {
      expect(err.statusCode).to.equal(400);
      const errorData = JSON.parse(err.error);
      expect(errorData.message).to.equal('Validation error: "link" must be a valid uri');
    }
  });

  it('Should not allow link submission if it is not fabelio product', async () => {
    const options = {
      method: 'POST',
      uri: BASE + '/api/fabelio',
      form: {
        link: 'https://google.com'
      }
    };
    try {
      await request(options);
    } catch (err) {
      expect(err.statusCode).to.equal(400);
      const errorData = JSON.parse(err.error);
      expect(errorData.message).to.equal('Validation error: "link" is not a fabelio product');
    }
  });

  it('Should throw error if link is 404 not found', async () => {
    const options = {
      method: 'POST',
      uri: BASE + '/api/fabelio',
      form: {
        link: 'https://fabelio.com/ip/wrong-product'
      }
    };
    try {
      await request(options);
    } catch (err) {
      expect(err.statusCode).to.equal(422);
      const errorData = JSON.parse(err.error);
      expect(errorData.message).to.equal('failed to get the product');
    }
  });

  it('Should get fabelio product', async () => {
    const options = {
      method: 'POST',
      uri: BASE + '/api/fabelio',
      form: {
        link: 'https://fabelio.com/ip/kursi-kantor-bravo-new-26564'
      }
    };
    try {
      let res = await request(options);
      res = JSON.parse(res);
      expect(res.product.name).to.equal('Kursi Kantor Bravo - Plus');
    } catch (err) {
      should.not.exist(err);
    }
  });

  it('Should get product with id 1', async () => {
    const options = {
      method: 'GET',
      uri: BASE + '/api/fabelio/1'
    };
    try {
      let res = await request(options);
      res = JSON.parse(res);
      expect(res.product.name).to.equal('Meja Tamu Chloe - Set of 3');
    } catch (err) {
      should.not.exist(err);
    }
  });

  it('Should get all saved products', async () => {
    const options = {
      method: 'GET',
      uri: BASE + '/api/fabelio/',
    };
    
    try {
      let res = await request(options)
      res = JSON.parse(res);
      expect(res.products.length > 0).to.equal(true);
      const [seedData] = res.products.filter(product => product.id === 1);
      expect(seedData.name).to.equal('Meja Tamu Chloe - Set of 3');
    } catch (err) {
      should.not.exist(err);
    }
  });
});