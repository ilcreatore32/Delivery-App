import { Router } from "express";
//import validation
import {
  productValidationRules,
  validate
} from '../middlewares/validation';
//import controllers
import {
  addProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
  deleteProduct
} from '../controllers/productsController'

//all the routes
const router = Router();
router.post('/', productValidationRules(), validate, addProduct)
      .get('/', getAllProducts)
      .get('/:id', getOneProduct)
      .put('/:id',productValidationRules(), validate, updateProduct)
      .delete('/:id', deleteProduct)

export default router;
