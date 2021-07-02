import { Router } from "express";
import vehicle from "./vehicleRoutes";
import area from "./areaRouter";
import service from "./serviceRouter";
import request from "./shippingRequestRouter";
import product from "./productRouter";
import service_request from "./servicesAndRequestRouter";

const router = Router();

router.use("/vehicles", vehicle);
router.use("/areas", area);
router.use("/services", service);
router.use("/requests", request);
router.use("/products", product);
router.use("/service_request", service_request);

export default router;
