import { Router } from "express";
//import controllers
import {
  getUsers,
  getOneUser,
  editUser
} from '../controllers/userController';

// api/user
//all the routes

const router = Router();
router.get('/', getUsers)
router.get('/:id', getOneUser)
router.get('/edit/:id', editUser)
 
export default router;
