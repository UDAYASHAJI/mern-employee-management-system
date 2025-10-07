const UserModel=require('../Models/userSchema')
const bcrypt=require('bcrypt')
const jwt = require("jsonwebtoken"); 
const createuser=  async(req,res)=>

{
    const {fullname,address,number,dob,role,email,password}=req.body;

    const existing=await UserModel.findOne({email})
    if(existing)
    {
        res.json({message:"user already exist"})
    }


try{

    const hash=await bcrypt.hash(password,10)

const model=new UserModel(
    {
        fullname,address,number,email,role,dob,
        password:hash
    }
);
await model.save()
res.status(201).json({
    message:"user added successfully",
    success:true,
    
    
})

}
catch(err){

    res.status(500).json(
        {
            message:"failed to save user",
            error:err
        }
    )


}
}

const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const enteredEmail = email.trim();

    if (enteredEmail.toLowerCase() === "admin@webhub") {
      if (enteredEmail !== "admin@webhub") {
        return res
          .status(400)
          .json({ success: false, message: "User does not exist" });
      }

      if (password === "Admin@123") {
        const token = jwt.sign(
          { email: enteredEmail, role: "admin" },
          process.env.JWT_SECRET || "your-secret-key",
          { expiresIn: "1h" }
        );
        return res.json({
          success: true,
          message: "Admin login successful",
          jwtToken: token,
          fullname: "Admin",
          
        });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Password is incorrect" });
      }
    }

    const existing = await UserModel.findOne({ email: enteredEmail });

    if (!existing) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    const match = await bcrypt.compare(password, existing.password);
    if (!match) {
      return res
        .status(400)
        .json({ success: false, message: "Password is incorrect" });
    }

    const token = jwt.sign(
      { id: existing._id, email: existing.email },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "1h" }
    );

    return res.json({
      success: true,
      message: "Login successful",
      jwtToken: token,
      fullname: existing.fullname,
      email:existing.email
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; 
    const deletedUser = await UserModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to delete user" });
  }
};


const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullname, address, number, dob, role, email, password } = req.body;

    const updateData = { fullname, address, number, dob, role, email };

    if (password) {
      const bcrypt = require('bcrypt');
      const hash = await bcrypt.hash(password, 10);
      updateData.password = hash;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({ success: true, message: "User updated successfully", result: updatedUser });
  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ success: false, message: "Failed to update user" });
  }
};


const toggleUserStatus = async (req, res) => {
  try {
    const { id } = req.params;

  
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }


    user.status = user.status === "Active" ? "Inactive" : "Active";

    await user.save();

    res.json({ success: true, message: `User status updated to ${user.status}`, result: user });
  } catch (error) {
    console.error("Toggle status error:", error);
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldpassword, newpassword } = req.body;

    if (!oldpassword || !newpassword) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const userId = req.user.id; 

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(oldpassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Old password is incorrect" });
    }

    user.password = await bcrypt.hash(newpassword, 10);
    await user.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


module.exports={createuser,loginuser,getUsers,deleteUser,updateUser,toggleUserStatus,changePassword}