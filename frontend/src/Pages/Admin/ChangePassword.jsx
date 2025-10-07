import {useState} from 'react';
import Sidebar from '../../Components/ui/Sidebar';
import Header from '../../Components/ui/Header';
import Footer from '../../Components/ui/Footer';
import { FaEye, FaEyeSlash, FaPassport } from "react-icons/fa";
import {Formik,Form,Field,ErrorMessage} from 'formik'
import '../../assets/css/changepassword.css'
import * as Yup from 'yup'
import axios from 'axios'



function ChangePassword() {

const initialValues=({
  oldpassword:"",
  newpassword:"",
  confirmpassword:"",
})




const validationSchema = Yup.object({
  oldpassword: Yup.string().required("Old password is required"),
  newpassword: Yup.string()
    .required("New password is required")
    .min(6, "Password must be at least 6 characters"),
  confirmpassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref('newpassword'), null], "Passwords must match"),
});



      const [showOldPassword, setShowOldPassword] = useState(false);
      const [showSetPassword, setShowSetPassword] = useState(false);
      const [showConfPassword, setShowConfPassword] = useState(false);


      const handleSubmit = async (values, { resetForm }) => {
        try {
          const res = await axios.post("http://localhost:3000/api/change-password", {
            oldpassword: values.oldpassword,
            newpassword: values.newpassword,
          });
          console.log(res.data);
          alert(res.data.message);
          resetForm();
        } catch (err) {
          console.error(err);
          alert(err.response?.data?.message || "Error updating password");
        }
      };
      

    
  return (
    <div>
      <Sidebar />
      <Header />
      
      <div className="container changepass-box">

        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className='changepass-form'>
          <div className='form-group'>
            <label>Old Password</label>
            <Field type={showOldPassword ? "text" :"password"} name="oldpassword" className='form-control' />
            <ErrorMessage component='div' name="oldpassword" className='err-msg'/>
            
            <span
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  style={{
                    position: "relative",
                    left: "320px",
                    bottom:"20px",
               
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#333",
                  }}
                >
                  {showOldPassword ? <FaEye /> : <FaEyeSlash />}</span>
               
          </div>
          <div className='form-group'>
            <label>New Password</label>
            <Field type={showSetPassword ? "text" :"password"} name="newpassword" className="form-control" />
            <ErrorMessage component='div' name="newpassword" className='err-msg'/>



            <span
                  onClick={() => setShowSetPassword(!showSetPassword)}
                  style={{
                    position: "relative",
                    left: "320px",
                    bottom:"20px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#333",
                  }}
                >
                  {showSetPassword ? <FaEye /> : <FaEyeSlash />}</span>
            
          </div>
          <div className='form-group'>
            <label>Confirm Password</label>
            <Field type={showConfPassword ? "text" :"password"} name="confirmpassword" className='form-control' />
            <ErrorMessage component='div' name="confirmpassword" className='err-msg'/>


            <span
                  onClick={() => setShowConfPassword(!showConfPassword)}
                  style={{
                    position: "relative",
                    left: "320px",
                    bottom:"20px",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    color: "#333",
                  }}
                >
                  {showConfPassword ? <FaEye /> : <FaEyeSlash />}</span>
          </div>
          <button type="submit" className='changepass-button'>Change Password</button>
        </Form>

        </Formik>
       
      </div>

      <Footer />
    </div>
  );
}

export default ChangePassword;
