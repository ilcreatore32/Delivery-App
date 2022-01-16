import { Router } from "express";
//import controllers
import {
  registerUser
} from '../controllers/registerController'
import { personImage } from "../middlewares/multer";

// api/register
//all the routes

const router = Router();
router.post('/',personImage, registerUser)
 
export default router; 