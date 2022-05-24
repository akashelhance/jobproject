import User from '../models/User.js'
import {StatusCodes} from 'http-status-codes'

const register=async (req,res,next)=>{
    const { firstname, lastname,address,mobile,email, password } = req.body
   
    if (!firstname || !email || !password|| !mobile|| !address|| !lastname ) {
      throw new Error('please provide all values')
    }

    const userAlreadyExists = await User.findOne({ email })
  if (userAlreadyExists) {
    throw new Error('Email already in use')
  }
        
        const user = await User.create(req.body)
        const token = user.createJWT()
        res.status(StatusCodes.OK).json({user: {
            email: user.email,
            lastName: user.lastName,
        
            firstname: user.firstname,
            address: user.address,
            mobile: user.mobile
          },
          token,
          location: user.location,
        })
    
}

const allUsers=async(req,res)=>{
  const queryObject = {
    
  }
  let result = User.find(queryObject)
  if (!result) {
    throw new Error('NO user found')
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 3
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const allusers = await result

  const totalusers = await User.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalusers / limit)

  res.status(StatusCodes.OK).json({ allusers,totalusers,numOfPages })

}


const findUser=async(req,res)=>{
  const firstname=req.body.firstname

  if (!firstname ) {
    throw new Error('please provide firstname')
  }

    const queryObject = {
      firstname:req.body.firstname
  }
  
   let result = User.find(queryObject)
  if (!result) {
    throw new Error('NO user found')
  }
  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 3
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const userbyfirstname = await result
  const totalusers = await User.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalusers / limit)

  res.status(StatusCodes.OK).json({ userbyfirstname,totalusers,numOfPages})

}

const findUserByLastName=async(req,res)=>{
  const lastname=req.body.lastname
  if (!lastname ) {
    throw new Error('please provide lastname')
  }
  const queryObject = {
    lastname:req.body.lastname
}

let result = User.find(queryObject)
if (!result) {
  throw new Error('NO user found')
}
const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 3
const skip = (page - 1) * limit

result = result.skip(skip).limit(limit)

const userbylastname = await result
  const totalusers = await User.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalusers / limit)

  res.status(StatusCodes.OK).json({ userbylastname,totalusers,numOfPages})

}



const findUserByEmail=async(req,res)=>{
  const email=req.body.email

  if (!email ) {
    throw new Error('please provide email')
  }

  const queryObject = {
    email:req.body.email
}
let result = User.find(queryObject)
if (!result) {
  throw new Error('NO user found')
}
const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 3
const skip = (page - 1) * limit

result = result.skip(skip).limit(limit)

  const userbyemail = await result
  const totalusers = await User.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalusers / limit)

  res.status(StatusCodes.OK).json({ userbyemail,totalusers,numOfPages})

}


const findUserByMobile=async(req,res)=>{
  const mobile=req.body.mobile

  if (!mobile ) {
    throw new Error('please provide mobile')
  }

  const queryObject = {
    mobile:req.body.mobile
}
let result = User.find(queryObject)
if (!result) {
  throw new Error('NO user found')
}
const page = Number(req.query.page) || 1
const limit = Number(req.query.limit) || 3
const skip = (page - 1) * limit

result = result.skip(skip).limit(limit)

  const userbymobile = await result
  const totalusers = await User.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalusers / limit)

  res.status(StatusCodes.OK).json({ userbymobile,totalusers,numOfPages})

}


const login=async(req,res)=>{

  const { email, password } = req.body
  if (!email || !password) {
    throw new Error('Please provide all values')
  }

  const user = await User.findOne({ email }).select('+password')
  if (!user) {
    throw new Error('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new Error('Invalid Credentials')
  }
  const token = user.createJWT()
  user.password = undefined
  res.status(StatusCodes.OK).json({ user, token, location: user.location })

}

const updateUser = async (req, res) => {
    const { email, firstname, lastname, address,mobile} = req.body
    if (!firstname || !email || !mobile|| !address|| !lastname )  {
      throw new Error('Please provide all values')
    }
    //userId is coming from the auth.js middleware
    const user = await User.findOne({ _id: req.user.userId })
  
    user.email = email
    user.firstname = firstname
    user.lastname = lastname
    user.address  = address
    user.mobile  = mobile
  
    await user.save()
    //Creating a new token is totally optional
    const token = user.createJWT()
  
    res.status(StatusCodes.OK).json({ user, token, location: user.location })
  }

export {register, login, updateUser,allUsers,findUser,findUserByEmail,findUserByLastName, findUserByMobile}