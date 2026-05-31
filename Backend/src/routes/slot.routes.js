import express from "express"
import {protect} from "../middlewares/protect.js"
import { authorizeRoles } from "../middlewares/role.js"


const router = express.Router()



export default router