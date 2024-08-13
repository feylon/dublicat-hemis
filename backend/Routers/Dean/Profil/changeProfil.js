import { Router } from "express";
import { checkToken, get_id } from "../../../functions/jwtDean.js";
import Joi from "joi";

const router = Router();

router.post("/", checkToken, function (req, res) {
  let Schema = Joi.object({
    email: Joi.string().required().min(3).max(15),
    login: Joi.string().required().min(3).max(15),
    firstname: Joi.string().required().min(3).max(15),
    lastname: Joi.string().required().min(3).max(15),
    brithday: Joi.date().required(),
    address: Joi.string().required().min(3).max(15),
    Parent_Name: Joi.string().required().min(3).max(15),
    tumanId: Joi.number().min(1).max(225).required(),
    viloyatId: Joi.number().min(1).max(15).required(),
  });
  let checkSchema = Schema.validate(req.body);
  if (checkSchema.error)
    return res.status(401).send({ error: checkSchema.error.message });
  const {
    email,
    login,
    firstname,
    lastname,
    brithday,
    address,
    Parent_Name,
    tumanId,
    viloyatId,
  } = req.body;
  try {
    res.send(req.body);
    
  } catch (error) {}
});
export default router;
