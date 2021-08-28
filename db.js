const Sequelize = require("sequelize");
require("dotenv").config();
const Product = require("./models").Product;
const config = require("./config/config.json").development;

const devConfig = `postgresql://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;

const proConfig = process.env.DATABASE_URL;

const connection = async() => {
  const sequelize = new Sequelize(process.env.NODE_ENV === "production" ? proConfig : devConfig);
  try {
    await sequelize.authenticate();
  }  catch(e) {
    console.log("Unable to connect to the database:", err);
  }
  try {
    const product = await Product.findOne({ id: 1 });
    if (!product) {
      console.log("Database is not seeded, will run seeds now...");
      const { exec } = require("child_process");
      exec("./node_modules/.bin/sequelize db:seed:all", (err, stdout, stderr) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(stdout);
      });
    } else {
      console.log("Database already seeded.");
    }
  } catch(err) {
    console.log("Unable to connect to the database:", err);
  }
}

module.exports = connection;