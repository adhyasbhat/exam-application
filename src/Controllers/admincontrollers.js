const {adminSchema} = require("../Modules/adminModule");

// const adminController = {}

registerAdmin = async (req, res) => {
    try {
        const admin = {
            username: req.body.username,
            password: req.body.password
        };
        const newAdmin = new adminSchema(admin);
        await newAdmin.save();
        res.send("Admin registered successfully");
    } catch (error) {  
        console.error("Error registering admin:", error);   
        res.status(500).send("Error in registering admin: " + error.message);
    }
}
module.exports = {registerAdmin};