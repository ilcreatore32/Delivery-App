import { Router } from "express";
import { authenticateUser, getAuthenticatedUser } from "../controllers/authController";
import { authMiddleware } from "../middlewares/auth";

const router = Router();

// Login
// api/auth

router.post('/',
  authenticateUser
)

//get authenticated user
router.get('/',
  authMiddleware,
  getAuthenticatedUser
)

export default router;

