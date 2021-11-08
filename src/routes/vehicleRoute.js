import { Router } from "express";
//import controllers
import {
  getVehicles,
  getOneVehicle,
  saveVehicle,
  deleteVehicle
} from '../controllers/vehicleController'

// api/vehicles
//all the routes
const router = Router();
router.get('/', getVehicles)
router.get('/:id', getOneVehicle)
router.delete('/:id', deleteVehicle)
router.put('/:id', saveVehicle)
router.post('/', saveVehicle)
 
export default router;
