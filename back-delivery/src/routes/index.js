import { Router } from "express";
import vehicle from "./vehicleRoutes";
import area from "./areaRouter";
import service from "./serviceRouter";

const router = Router();

router.use("/vehicles", vehicle);
router.use("/areas", area);
router.use("/services", service);

export default router;
