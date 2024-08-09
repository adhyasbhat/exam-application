const mongoose = require('mongoose');

const deptAdminSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
const centerAdminSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
const DeptAdmin = mongoose.model('DeptAdmin', deptAdminSchema);
const CenterAdmin = mongoose.model('CenterAdmin', centerAdminSchema);

module.exports = { DeptAdmin, CenterAdmin };
