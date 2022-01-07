import { Router } from "express";
import { authenticateUser, getAuthenticatedUser } from "../controllers/authController";
import { authMiddleware } from "../middlewares/auth";
import { suscriptionMiddleware } from "../middlewares/suscription";

const router = Router();

// Login
// api/auth

router.post('/',
  authenticateUser
)

//get authenticated user
router.get('/',
  authMiddleware,
  suscriptionMiddleware,
  getAuthenticatedUser
)

export default router;

