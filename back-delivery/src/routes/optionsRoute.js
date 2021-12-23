import { Router } from "express";
//import controllers
import {
  getUbication,
  getProducts,
  getConveyance,
  getVehicles,
  getContact
} from '../controllers/optionsController'

// api/options
//all the routes
 
const router = Router();
router.get('/ubication', getUbication)
router.get('/products', getProducts)
router.get('/conveyance', getConveyance)
router.get('/vehicles', getVehicles)
router.get('/contact', getContact)
 
export default router;