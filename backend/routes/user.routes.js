
import { getUserProfile, followUnfollowUser,getSuggestedUsers,updateUser} from '../controllers/user.controller.js';
import { protectRoute} from '../middleware/protectRoute.js';
import express from 'express';

const router = express.Router();


//all shld be authenticated if its not one cannot update aor any of this
router.get("/profile/:username",protectRoute,getUserProfile);//req from params
router.get("/suggested",protectRoute,getSuggestedUsers);
router.get("/follow/:id",protectRoute,followUnfollowUser);
router.get("/update",protectRoute,updateUser);

export default router;