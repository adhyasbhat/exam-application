const { adminSchema } = require("../Modules/adminModule");
const candidateSchema=require("../Modules/candidateModule")

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


handleAction = async (req,res) => {
  const { user_id, action } = req.body;
  try {
    let adminStatus = '';


    if (action === 'accept') {
      adminStatus = 'accepted';
    } else if (action === 'reject') {
      adminStatus = 'rejected';
    } else {

      return res.status(400).json({ error: 'Invalid action' });
    }

    const updateStatus=await candidateSchema.findByIdAndUpdate(
      user_id,
      { adminStatus },
      { new: true }

    );
    if (!updateStatus) {
      throw new Error('Candidate not found');
    }

    res.json({ message: 'Admin status updated successfully' });
  
  } catch (error) {
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
}

module.exports = { registerAdmin, handleAction };