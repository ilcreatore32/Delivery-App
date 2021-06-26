import { Router } from "express";
// import auth from "./auth.routes";
// import index from "./index.routes";
// import links from "./links.routes";
// import user from "./user.routes";
import db from '../database';
import {
  addVehicle,
  getAllVehicles,
  getOneVehicle,
  updateVehicle,
  deleteVehicle
} from '../controllers/vehiclesController'

const router = Router();

router.post('/', addVehicle)
      .get('/', getAllVehicles)
      .get('/:id', getOneVehicle)
      .put('/:id', updateVehicle)
      .delete('/:id', deleteVehicle)
	// .get('/agregar', MovieController.addForm)
	// .get('/editar/:movie_id', MovieController.getOne)
	// .use(MovieController.error404)

export default router;
