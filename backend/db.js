const  mongoose=require('mongoose')
const dotenv=require('dotenv').config()
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log(" MongoDB is Connected.....");
  })
  .catch((err) => {
    console.log(" MongoDB connection Error:", err);
  });