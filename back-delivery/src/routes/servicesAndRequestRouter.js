import { Router } from "express";

import {
  requestServiceValidationRules,
  validate
} from '../middlewares/validation';

import {
  addServicesRequests,
  getAllServicesOrRequestsPerID,
  getOneServicesRequests,
  updateServicesRequests,
  deleteServicesRequests
} from '../controllers/servicesAndRequestsController'

//all the routes
const router = Router();
router.post('/', requestServiceValidationRules(), validate, addServicesRequests)
      .get('/:id', getAllServicesOrRequestsPerID)
      .get('/getOne/:request&:service', getOneServicesRequests)
      .put('/:request&:service', requestServiceValidationRules(), validate, updateServicesRequests)
      .delete('/:request&:service', deleteServicesRequests)

export default router;
