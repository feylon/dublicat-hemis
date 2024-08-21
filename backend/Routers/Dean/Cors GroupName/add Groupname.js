import {Router}from "express"
import { checkToken } from "../../../functions/jwtDean.js"

const router = Router();


router.get('/', checkToken, function (req, res){
    
})