import cohortFourSchema from "../model/user.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { trusted } from "mongoose";



// Resister User
export const createStudent = async (req, res) => {
    const {
        name,email,phoneNumber,password,country,state,
        userName
    } = req.body
    try{
        // check if email exist 
        const exist = await cohortFourSchema.findOne({ email })
        if (exist)
            return res.status(400).json ({
        message: "email already exist"
    })
      
    // HASH PASSWORD

   
    
        const salt =await bcrypt.genSalt(10)
        const hashPassword =await bcrypt.hash(password,salt)
   

        // create new user
        const student = await cohortFourSchema.create({
            name,
            email,
            phoneNumber,
            password:hashPassword,
            country,
            state,
            userName
        })
        return res.status(201).json({
            message: "Registration Successful", 
            student, 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"server error", error})
        }
    }
    
    // Get All Users
    export const getAllStudents  = async(req, res) => {
        try {
            let students = await cohortFourSchema.find().select
            ('-password')
            res.status(200).json(students)
        } catch (error) {
            res.status(500).json({message: "server Error", 
                error})
        }
    }

// lOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user exists
    const user = await cohortFourSchema.findOne({ email });
    if (!user)
      return res.status(404).json({ message: "Email Not Registered" });

    // compare password
   const isMatch = await bcrypt.compare(password, user.password);
 
  if (!isMatch) {
  return res.status(400).json({ message: "Incorrect Password" });
}


    // CREATE TOKEN (Correct Syntax)
    const token = jwt.sign( 
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USERS BY ID
export const getUserById = async (req, res) => {
    const userId = req.params.id
    try {
        const user = await cohortFourSchema.findById(userId).select
      
        if(!user)return res.status(404).json({message:"user not found"})
    } catch (error) {
      res.status(500)({message:error.message})
    }

}

// UPDATE USER
export const updateUser = async (req, res) => {
  let userId = req.params.id
  const {name, email, phoneNumber, password, country, state} = req.body
  try {
    let user = await cohortFourSchema.findById(userId)
    if(!user) return res.status(404).json({message:"user not Found"})

    //Update Only Provided Fields
  user.name = name || user.name
  user.email = email || user.email
  user.phoneNumber = phoneNumber || user.phoneNumber
  user.password = password || user.password
  user.country = country || user.country
  user.state = country || user.state
  await user.save()
  res.status(200).json({
    message:"User Succefully Updated",
    user:{
      email:user.email,
       phoneNumber:user.phoneNumber,
        country:user.country,
         state:user.state
    }
  })
} catch (error) {
  res.status(500).json({message:error.message})
}
}

// DELETE USER 
 export const deleteUser = async (req, res) =>{
  const userId = req.params.id
  try {
    const user = await cohortFourSchema.findById(userId)
    if(!user) return res.status(404).json({messasge:"User Dont Exist"})
      await user.deleteOne()
    res.status(200).json({message:"User Deleted Succesfully"})
  } catch (error) {
    res.status(500).json({message:error.message})
  }
}