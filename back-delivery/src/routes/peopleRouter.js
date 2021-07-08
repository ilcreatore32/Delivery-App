import { Router } from "express";
// //import validation
// import {
//   productValidationRules,
//   validate
// } from '../middlewares/validation';
//import controllers
import {
  getOnePerson,
  getPeople
} from '../controllers/peopleController'

//all the routes
const router = Router();
router.get('/:id', getOnePerson)
      .get('/', getPeople)

export default router;
