const express=require('express')
const router= express.Router();
const {createuser, loginuser, getUsers, deleteUser, toggleUserStatus, updateUser, changePassword}=require('../Controller/usercontroller');
const { leaverequest, showleavereq } = require('../Controller/leavecontroller');





router.post('/signup',createuser)
router.post('/login',loginuser)
router.get('/users', getUsers)
router.delete('/users/:id',deleteUser)
router.post('/leave',leaverequest)
router.get('/leave',showleavereq)
router.put('/users/:id',updateUser);
router.post('/change-password',changePassword)

router.put('/users/:id/status',toggleUserStatus); 


    

module.exports=router;