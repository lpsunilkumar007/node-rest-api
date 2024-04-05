const EmployeeModel = require("../../common/models/Employee");

module.exports = {
  getAll: (req, res) => {   
    EmployeeModel.getAll()
      .then((employee) => {
        return res.status(200).json({
          status: true,
          data: employee,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  } 
};