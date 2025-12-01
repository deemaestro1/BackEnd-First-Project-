import express from "express";
import { createStudent, getAllStudents, loginUser, getUserById, updateUser, deleteUser} from "../controller/user.js"
const router = express.Router()
router.post('/register', createStudent)
router.get('/', getAllStudents)
router.get('/:id', getUserById)
router.post('/login', loginUser)
router.put('/:id', updateUser )
router.put('/:id', deleteUser )
export default router