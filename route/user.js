import express from "express";
import { createStudent, getAllStudents, loginUser, getUserById, deleteUser} from "../controller/user.js"
const router = express.Router()
router.post('/register', createStudent)
router.get('/', getAllStudents)
router.get('/:id', getUserById)
router.post('/login', loginUser)

router.put('/:id', deleteUser )
export default router