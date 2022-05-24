import express from 'express'
const router = express.Router()
import authenticateUser from '../middleware/auth.js'

import { register,login,updateUser,allUsers, findUser,findUserByEmail,findUserByLastName,findUserByMobile} from "../controllers/authController.js";

router.route('/register').post(register)
router.route('/allUsers').get(authenticateUser,allUsers)
router.route('/findUser').get(authenticateUser,findUser)
router.route('/findUseremail').get(authenticateUser,findUserByEmail)
router.route('/findUserlastname').get(authenticateUser,findUserByLastName)
router.route('/findUsermobile').get(authenticateUser,findUserByMobile)
// router.route('/findUser').get(authenticateUser,findUser)
router.route('/login').post(login)
router.route('/updateUser').patch(authenticateUser, updateUser)


export default router