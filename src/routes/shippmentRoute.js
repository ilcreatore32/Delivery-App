import { Router } from "express";
//import controllers
import {
  getShippments,
  getOneShippment,
  editShippment,
  updateShippment,
  deleteShippment
} from '../controllers/shippmentController'

// api/shippment
//all the routes
const router = Router();
router.get('/', getShippments)
router.get('/:id', getOneShippment)
router.delete('/:id', deleteShippment)
router.get('/edit/:id', editShippment) 
router.put('/:id', updateShippment)
 
export default router;
