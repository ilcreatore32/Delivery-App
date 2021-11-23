import { Router } from "express";
//import controllers
import {
  getShippments,
  getOneShippment,
  editShippment,
  updateShippment,
  deleteShippment,
  addShippments
} from '../controllers/shippmentController'
import { uploadExcel } from "../middlewares/multer";

// api/shippment
//all the routes
const router = Router();
router.get('/', getShippments)
router.post('/', uploadExcel.single("excel"), addShippments)
router.get('/:id', getOneShippment)
router.delete('/:id', deleteShippment)
router.get('/edit/:id', editShippment) 
router.put('/:id', updateShippment)
 
export default router;
