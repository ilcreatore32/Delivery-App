import { Router } from "express";
//import validation
import {
  vehicleValidationRules,
  validate
} from '../middlewares/validation';
//import controllers
import {
  addVehicle,
  getAllVehicles,
  getOneVehicle,
  updateVehicle,
  deleteVehicle
} from '../controllers/vehiclesController'

//all the routes
const router = Router();
router.post('/', vehicleValidationRules(), validate, addVehicle)
      .get('/', getAllVehicles)
      .get('/:id', getOneVehicle)
      .put('/:id',vehicleValidationRules(), validate, updateVehicle)
      .delete('/:id', deleteVehicle)

export default router;
