import { Router } from "express";
//import validation
import {
  areaValidationRules,
  validate
} from '../middlewares/validation';
//import controllers
import {
  addArea,
  getAllAreas,
  getOneArea,
  updateArea,
  deleteArea
} from '../controllers/areasController'

//all the routes
const router = Router();
router.post('/', areaValidationRules(), validate, addArea)
      .get('/', getAllAreas)
      .get('/:id', getOneArea)
      .put('/:id',areaValidationRules(), validate, updateArea)
      .delete('/:id', deleteArea)

export default router;
