const {districtSchema} = require("../../config.js");

const locationController = {}

locationController.addDistrict = async (req, res) => {
    try {
        const district = {
          districtname: req.body.districtname,
          districtcode: req.body.districtcode,
        };
        const newDistrict = new districtSchema(district);
        await newDistrict.save();
        res.send("District added successfully");
      } catch (error) {
        console.error("Error adding district:", error);
        res.status(500).send("Error in adding district: " + error.message);
      }
}
locationController.getDistrict = async (req, res) => {
    const district = await districtSchema.find();
  res.send(district);
}
module.exports = locationController;