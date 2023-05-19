import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser, findUser } from "../controllers/user.controllers.js";
import { createSurgery, deleteSurgery, getSurgeries, getSurgery, updateSurgery } from "../controllers/surgery.controllers.js";

const router = Router()

//Usuarios -->

router.get('/users', getUsers)

router.post('/users', createUser)

router.put('/users/:id', updateUser)

router.delete('/users/:id', deleteUser)

router.get('/users/:id', getUser)

router.post('/userfind', findUser)

//Cirugias -->

router.get('/surgeries', getSurgeries)

router.post('/surgeries', createSurgery)

router.put('/surgeries/:id', updateSurgery)

router.delete('/surgeries/:id', deleteSurgery)

router.get('/surgeries/:id', getSurgery)

export default router