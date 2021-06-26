import { Router } from "express";
import vehicle from "./vehicleRoutes";

const router = Router();

router.use("/vehicles", vehicle);

export default router;
