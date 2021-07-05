import { Router } from "express";
import vehicle from "./vehicleRoutes";
import area from "./areaRouter";
import service from "./serviceRouter";
import request from "./shippingRequestRouter";
import product from "./productRouter";
import service_request from "./servicesAndRequestRouter";
import request_products from "./requestsAndProductsRouter";
import people from "./peopleRouter";

const router = Router();

router.use("/vehicles", vehicle);
router.use("/areas", area);
router.use("/services", service);
router.use("/requests", request);
router.use("/products", product);
router.use("/service_request", service_request);
router.use("/request_products", request_products);
router.use("/people", people);

export default router;
