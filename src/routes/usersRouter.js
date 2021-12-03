import { Router } from "express";
//import controllers
import {
  getUsers
} from '../controllers/userController';

// api/user
//all the routes

const router = Router();
router.get('/', getUsers)
 
export default router;
