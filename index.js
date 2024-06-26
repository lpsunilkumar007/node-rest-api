const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

const { port } = require("./config");
const PORT = process.env.PORT || port;

// Express Routes Import
 const AuthorizationRoutes = require("./authorization/routes");
 const UserRoutes = require("./users/routes");
 const EmployeeRoutes = require("./employee/routes");

// Sequelize model imports
 const UserModel = require("./common/models/User");
// const ProductModel = require("./common/models/Product");

const EmployeeModel = require("./common/models/Employee");

app.use(morgan("tiny"));
app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(Express.json());

// const sequelize = new Sequelize({
//   dialect: "sqlite",
//   storage: "./storage/data.db", // Path to the file that will store the SQLite DB.
// });

const database = process.env.POSTGRES_DB || 'node-rest-api';
const username = process.env.POSTGRES_USER || 'postgres';
const password = process.env.POSTGRES_PASSWORD || 'admin';
const host = process.env.POSTGRES_HOST || '0.0.21.56:5432'; // This should match the service name defined in docker-compose.yml


const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: 'postgres',
  define: {
    // Other Sequelize configurations go here
  }
});

// Initialising the Model on sequelize
UserModel.initialise(sequelize);
//ProductModel.initialise(sequelize);
EmployeeModel.initialise(sequelize);

// Syncing the models that are defined on sequelize with the tables that alredy exists
// in the database. It creates models as tables that do not exist in the DB.
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Authentication and User Routes to the app.
   //  app.use("/", AuthorizationRoutes);
     app.use("/user", UserRoutes);
     app.use("/employee", EmployeeRoutes);

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });