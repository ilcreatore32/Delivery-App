import { Router } from "express";
//import controllers
import {
  getShippments,
  getOneShippment,
  editShippment,
  deleteShippment,
  saveShippment
} from '../controllers/shippmentController'

// api/shippment
//all the routes
const router = Router();
router.get('/', getShippments)
router.post('/', saveShippment)
router.get('/:id', getOneShippment)
router.delete('/:id', deleteShippment)
router.get('/edit/:id', editShippment) 
router.put('/:id', saveShippment)
 
export default router;
