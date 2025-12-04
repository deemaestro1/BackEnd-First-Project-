import express from "express";
import { createStudent, getAllStudents, loginUser, getUserById, updateUser, deleteUser} from "../controller/user.js"
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router()
router.post('/register', createStudent)
router.get('/', protect, getAllStudents)
router.get('/:id', getUserById)
router.post('/login', loginUser)
router.put('/:id', updateUser )
router.delete('/:id', deleteUser )
export default router