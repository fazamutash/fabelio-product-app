"use strict";

const timestamp = new Date();

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "Products",
      [
        {
          link: 'https://fabelio.com/ip/meja-tamu-chloe-set-3-new',
          name: 'Meja Tamu Chloe - Set of 3',
          price: 'Rp1.044.450',
          image: 'https://cdn-m2.fabelio.com/catalog/product/e/d/edt1_18.jpg?auto=format&w=1678',
          details: 'this is from seed',
          createdAt: timestamp,
          updatedAt: timestamp,
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Products", null, {});
  },
};
