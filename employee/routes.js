const router = require("express").Router();

// Middleware Imports
//const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
//const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
//const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const EmployeeController = require("./controllers/EmployeeController");

// JSON Schema Imports for payload verification
//const updateUserPayload = require("./schemas/updateUserPayload");
//const changeRolePayload = require("./schemas/changeRolePayload");

const { roles } = require("../config");

router.get(
  "/all",
 // [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
 EmployeeController.getAll
);



module.exports = router;