const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const Sequelize = require("sequelize");
const dbConfig = require("./config/config.json").development;
const Product = require("./models").Product;
const connectToDatabase = require("./db");
const apiRoutes = require('./routes/api');
const errorHandler = require('./middleware/error-handler');
const PORT = process.env.PORT || 5000;

connectToDatabase();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
if (process.env.NODE_ENV === "production") {
  //server static content
  //npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

app.use('/api', apiRoutes);

// global error handler
app.use(errorHandler);
app.get("/api", async (req, res) => {
  try {
    const product = await Product.findOne({ where: { id: 1 }});
    const response = { message: `Database has been seeded with ${product.name}.` };
    res.send(response);
  } catch (error) {
    console.log(error);
    res.status(422).send(error);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => console.log("The node.js app is listening on port 5000."));


/*async function connectToDatabase() {

  try {
    const connection = await mysql.createConnection({ 
      host: dbConfig.host, 
      port: dbConfig.port, 
      user: dbConfig.username, 
      password: dbConfig.password 
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\`;`);
    const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
      host: dbConfig.host,
      dialect: dbConfig.dialect,
      operatorsAliases: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log("Unable to connect to the database:", error);
  }
}*/
