import { Router } from "express";
//import validation
import {
  serviceValidationRules,
  validate
} from '../middlewares/validation';
//import controllers
import {
  addService,
  getAllServices,
  getOneService,
  updateService,
  deleteService
} from '../controllers/serviceController'

//all the routes
const router = Router();
router.post('/', serviceValidationRules(), validate, addService)
      .get('/', getAllServices)
      .get('/:id', getOneService)
      .put('/:id',serviceValidationRules(), validate, updateService)
      .delete('/:id', deleteService)

export default router;
