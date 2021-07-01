import { Router } from "express";
//import validation
import {
  shippingRequestsValidationRules,
  validate
} from '../middlewares/validation';
//import controllers
import {
  addShippingRequest,
  getAllShippingRequests,
  getOneShippingRequest,
  updateShippingRequest,
  deleteShippingRequest
} from '../controllers/shippingRequestsController'

//all the routes
const router = Router();
router.post('/', shippingRequestsValidationRules(), validate, addShippingRequest)
      .get('/', getAllShippingRequests)
      .get('/:id', getOneShippingRequest)
      .put('/:id',shippingRequestsValidationRules(), validate, updateShippingRequest)
      .delete('/:id', deleteShippingRequest)

export default router;
