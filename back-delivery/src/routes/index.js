import { Router } from "express";
/* Importing routes */
import shippment from "./shippmentRoute";
import service from "./serviceRoute";
import vehicle from "./vehicleRoute";
import payment from "./paymentRoute";
import options from "./optionsRoute";
import auth from "./authRoute";
import register from "./registerRoute";
import user from "./usersRouter";
/* Importing middleware */
import { authMiddleware } from "../middlewares/auth";
import { suscriptionMiddleware } from "../middlewares/suscription";

const router = Router();

router.use("/shippment", authMiddleware, suscriptionMiddleware, shippment);
router.use("/service", authMiddleware, suscriptionMiddleware, service);
router.use("/vehicle", authMiddleware, suscriptionMiddleware, vehicle);
router.use("/payment", authMiddleware, suscriptionMiddleware, payment);
router.use("/options", authMiddleware, suscriptionMiddleware, options);
router.use("/auth", auth);
router.use("/register", authMiddleware, register);
router.use("/user", authMiddleware,suscriptionMiddleware, user);

export default router;
