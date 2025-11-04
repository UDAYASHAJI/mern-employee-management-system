const LeaveModel = require("../Models/leaveschema");
const UserModel = require("../Models/userSchema");

const leaverequest = async (req, res) => {
  try {
    const { name, email, datestart, dateend, leavetype, reason } = req.body;
    const existing = await UserModel.findOne({ email: email });
    if (!existing) {
      return res.status(400).json({
        message: "Email is not registered as an Employee, Enter a valid Email",
      });
    }
    const leave = await new LeaveModel({
      name,
      email,
      datestart,
      dateend,
      leavetype,
      reason,
    });
    await leave.save();
    return res.status(201).json({
      message: "Leave request send sucesssfully",
      leave,
    });
  } catch (err)
   {
    res.status(500).json({
      message: "Failed to Send  send leave request",
    });
  }
};

const showleavereq = async (req, res) => {
  try {
    const allreq = await LeaveModel.find();
    res.status(200).json({
      message: "All laeave request fetched successfully...",
      success: true,
      allreq,
    });
  } catch (err) {
    res.status(500).json({
      message: "failed to fetch request",
      success: false,
    });
  }
};

const deleteLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await LeaveModel.findByIdAndDelete(id);

    if (!leave) {
      return res.status(404).json({
        message: "Leave request not found",
        success: false,
      });
    }

    res.status(200).json({
      message: "Leave request deleted successfully",
      success: true,
      leave,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to delete leave request",
      success: false,
      error: err.message,
    });
  }
};

const updateApproval = async (req, res) => {
  try {
    const { id } = req.params;
    const { approval } = req.body;

    const leave = await LeaveModel.findByIdAndUpdate(
      id,
      { approval },
      { new: true }
    );

    if (!leave) {
      return res
        .status(404)
        .json({ message: "Leave request not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Approval status updated", success: true, leave });
  } catch (err) {
    res
      .status(500)
      .json({
        message: "Failed to update approval",
        success: false,
        error: err.message,
      });
  }
};

module.exports = { leaverequest, showleavereq, deleteLeave, updateApproval };
