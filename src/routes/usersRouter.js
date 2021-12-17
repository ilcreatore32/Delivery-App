import { Router } from "express";
//import controllers
import {
  getUsers,
  getOneUser,
  editUser,
  updateUser
} from '../controllers/userController';
import { personImage } from "../middlewares/multer";

// api/user
//all the routes

const router = Router();
router.get('/', getUsers)
router.get('/:id', getOneUser)
router.get('/edit/:id', editUser)
router.put('/:id', personImage,updateUser)
 
export default router;
