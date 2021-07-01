import { Router } from "express";
import vehicle from "./vehicleRoutes";
import area from "./areaRouter";
import service from "./serviceRouter";
import request from "./shippingRequestRouter";

const router = Router();

router.use("/vehicles", vehicle);
router.use("/areas", area);
router.use("/services", service);
router.use("/requests", request);

export default router;
