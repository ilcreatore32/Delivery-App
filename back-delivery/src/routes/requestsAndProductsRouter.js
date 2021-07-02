import { Router } from "express";

import {
  productsRequestValidationRules,
  validate
} from '../middlewares/validation';

import {
  addRequestProduct,
  getAllRequestOrProductPerID,
  getOneRequestProduct,
  updateRequestProduct,
  deleteRequestProduct
} from '../controllers/requestsAndProductsController'

//all the routes
const router = Router();
router.post('/', productsRequestValidationRules(), validate, addRequestProduct)
      .get('/:id', getAllRequestOrProductPerID)
      .get('/getOne/:product&:request', getOneRequestProduct)
      .put('/:product&:request', productsRequestValidationRules(), validate, updateRequestProduct)
      .delete('/:product&:request', deleteRequestProduct)

export default router;
