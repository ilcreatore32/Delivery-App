import { Router } from "express";
//import controllers
import {
  getPayments,
  getOnePayment,
  savePayment,
  deletePayment
} from '../controllers/paymentController'

// api/payment
//all the routes

const router = Router();
router.get('/', getPayments)
router.get('/:id', getOnePayment)
router.delete('/:id', deletePayment)
router.put('/:id', savePayment)
router.post('/', savePayment)
 
export default router;
