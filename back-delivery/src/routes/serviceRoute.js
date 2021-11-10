import { Router } from "express";
//import controllers
import {
  getServices,
  getOneService,
  editService,
  saveService,
  deleteService
} from '../controllers/serviceController'

// api/services
//all the routes
const router = Router();
router.get('/', getServices)
router.get('/:id', getOneService)
router.delete('/:id', deleteService)
router.get('/edit/:id', editService) 
router.put('/:id', saveService)
router.post('/', saveService)
 
export default router;
