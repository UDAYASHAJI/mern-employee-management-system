const express = require('express');
const router = express.Router();
const {
  createuser,
  loginuser,
  getUsers,
  deleteUser,
  toggleUserStatus,
  updateUser,
  changePassword
} = require('../Controller/usercontroller');

const {
  leaverequest,
  showleavereq,
  deleteLeave,
  updateApproval
} = require('../Controller/leavecontroller');
const { getUserProfile } = require('../Controller/userprofilecontroller');

// User routes
router.post('/signup', createuser);
router.post('/login', loginuser);
router.get('/users', getUsers);
router.get('/users/:email',getUserProfile);   
router.put('/users/:id', updateUser);
router.put('/users/:id/status', toggleUserStatus);
router.delete('/users/:id', deleteUser);
router.post('/change-password', changePassword);

// Leave routes
router.post('/leave', leaverequest);
router.get('/leave', showleavereq);
router.put('/leave/:id/approval', updateApproval);
router.delete('/leave/:id', deleteLeave);

module.exports = router;
