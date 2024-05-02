import express from 'express'

import {
    getUser,
    getUserFriend,
    addRemoveFriend
} from '../controllers/user.js'

import { verifyToken } from '../middleware/auth.js'


const router = express.Router()


// Read

router.get("/:id", verifyToken,getUser)
router.get("/:id/getUserFriend",verifyToken,getUserFriend)

//update

router.patch("/:id/:friendid", verifyToken,addRemoveFriend)

export default router;