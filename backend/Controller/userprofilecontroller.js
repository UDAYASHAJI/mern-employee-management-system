const UserModel = require('../Models/userSchema')

const getUserProfile = async (req, res) => {
  try {
    const email = req.params.email?.toLowerCase();

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      fullname: user.fullname,
      role: user.role,
      address: user.address,
      number: user.number,
      email: user.email,
      dob: user.dob,
      status: user.status,
    });
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getUserProfile };
