import {Router} from "express"
import {checkToken, get_id} from "../../../functions/jwtDean.js";
import Joi from "joi";

const router = Router();


router.post("/", checkToken, function(req, res){

    let Schema = Joi.object({
        email
    login
    firstname
    brithday
address
Parent_Name

    })

})

