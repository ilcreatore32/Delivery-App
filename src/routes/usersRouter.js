import { Router } from "express";
//import controllers
import {
  getUsers
} from '../controllers/userController';

// api/payment
//all the routes

const router = Router();
router.get('/', getUsers)
 
export default router;
