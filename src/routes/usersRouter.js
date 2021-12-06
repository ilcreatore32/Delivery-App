import { Router } from "express";
//import controllers
import {
  getUsers,
  getOneUser,
  editUser,
  saveUser
} from '../controllers/userController';

// api/user
//all the routes

const router = Router();
router.get('/', getUsers)
router.get('/:id', getOneUser)
router.get('/edit/:id', editUser)
router.put('/:id', saveUser)
 
export default router;
