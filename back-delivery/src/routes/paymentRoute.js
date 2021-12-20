import { Router } from "express";
//import controllers
import {
  getPayments,
  getOnePayment,
  savePayment,
  deletePayment
} from '../controllers/paymentController'
import { paymentImage } from "../middlewares/multer";

// api/payment
//all the routes

const router = Router();
router.get('/', getPayments)
router.get('/:id', getOnePayment)
router.delete('/:id', deletePayment)
router.put('/:id', paymentImage, savePayment) 
router.post('/', savePayment)
 
export default router;
