import { Router } from "express";
//import controllers
import {
  registerUser
} from '../controllers/registerController'

// api/register
//all the routes

const router = Router();
router.post('/', registerUser)
 
export default router; 