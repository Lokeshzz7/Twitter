import express from 'express';
const router = express.Router();
import { getUserProfile, followUnfollowUser,getSuggestedUsers,updateUser} from '../controllers/user.controller.js';
import { protectRoute} from '../middleware/protectRoute.js';

router.get("/profile/:username",protectRoute,getUserProfile);
router.get("/suggested",protectRoute,getSuggestedUsers);
router.get("/follow/:id",protectRoute,followUnfollowUser);
router.get("/update",protectRoute,updateUser);

export default router;