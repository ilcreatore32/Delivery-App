import { Router } from "express";
//import controllers
import {
  getOptions
} from '../controllers/optionsController'

// api/options
//all the routes

const router = Router();
router.get('/', getOptions)
 
export default router;