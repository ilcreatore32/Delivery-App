import { Router } from "express";
/* Importing routes */
import shippment from "./shippmentRoute";
import service from "./serviceRoute";
import vehicle from "./vehicleRoute";
import payment from "./paymentRoute";
import options from "./optionsRoute";
import auth from "./authRoute";
import register from "./registerRoute";
/* Importing middleware */
import { authMiddleware } from "../middlewares/auth";

const router = Router();

router.use("/shippment", authMiddleware, shippment);
router.use("/service", authMiddleware, service);
router.use("/vehicle", authMiddleware, vehicle);
router.use("/payment", authMiddleware, payment);
router.use("/options", authMiddleware, options);
router.use("/auth", auth);
router.use("/register", authMiddleware, register);

export default router;
