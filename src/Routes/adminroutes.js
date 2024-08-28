// const adminController = require("../Controllers/admincontrollers.js");
const { deptAdminController, centerAdminController }= require("../Controllers/admincontrollers.js");
const {SendMail}= require("../Servives/adminservice.js");

const express = require("express");
const router = express.Router();

router.post("/deptadminregister",deptAdminController.registerDeptAdmin)
router.post("/deptadminlogin",deptAdminController.loginDeptAdmin)
router.post("/centeradminregister",centerAdminController.registerCenterAdmin)
router.post("/centeradminlogin",centerAdminController.loginCenterAdmin)
router.post("/candidateattendence",centerAdminController.candidateAttendence)
router.post("/adminapproval",centerAdminController.adminApproval)
router.post("/viewresultapproval",deptAdminController.viewResultApproval)
router.post("/sendmail",SendMail)

module.exports = router;

