const District = require("../Modules/locationModule");

const locationController = {}

locationController.addDistrict = async (req, res) => {
    try {
        const district = {
          districtname: req.body.districtname,
          districtcode: req.body.districtcode,
        };
        const newDistrict = new District(district);
        await newDistrict.save();
        res.send("District added successfully");
    } catch (error) {
        console.error("Error adding district:", error);
        res.status(500).send("Error in adding district: " + error.message);
    }
}

locationController.getDistrict = async (req, res) => {
    try {
        const districts = await District.find();
        res.send(districts);
    } catch (error) {
        console.error("Error getting districts:", error);
        res.status(500).send("Error in getting districts: " + error.message);
    }
}

module.exports = locationController;