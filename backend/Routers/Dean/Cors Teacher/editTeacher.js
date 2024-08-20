import { Router } from "express";
import { checkToken } from "../../../functions/jwtDean.js";
import Joi from "joi";


const router = Router();

router.post("/:id", checkToken, async (req, res) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    login: Joi.string().min(3).max(16).required(),
    firstname: Joi.string().min(3).max(10),
    lastname: Joi.string().min(3).max(10),
    brithday: Joi.string().required(),
    address: Joi.string().required().min(3).max(45),
    Parent_Name: Joi.string().required().min(3).max(45),
    tumanId: Joi.number().min(15).max(225).required(),
    viloyatId: Joi.number().integer().min(1).max(15).required(),
    active : Joi.boolean().required(),
    
});

  let checkSchema = Schema.validate(req.body);
  if (checkSchema.error)
    return res.status(400).send({ error: checkSchema.error.message });
  let {
    email,
    login,
    firstname,
    lastname,
    brithday,
    address,
    Parent_Name,
    tumanId,
    viloyatId,
    active
  } = req.body;
  try {

    await global.pool.query(
      `update teacher 
set
email = $1,
login = $2,
firstname = $3,
lastname = $4,
brithday = $5,
address = $6,
parent_name = $7,
viloyat_id = $8,
tuman_id = $9,
active = $10
 where id = $11;
`,
      [
        email,
        login,
        firstname,
        lastname,
        brithday,
        address,
        Parent_Name,
        viloyatId,
        tumanId,
        active,
        req.params.id
      ]
    );
    res.status(201).send({ Edited: true });
  } catch (error) {
    if (error.code == "22P02") return res.status(400).send({ error: "DDOS" });
    if (error.code == "23505")
      return res.status(400).send({ error: error.detail });
    if (error.code == "22008")
      return res.status(400).send({ error: error.message });
    if (error.code == "22007")
      return res.status(400).send({ error: error.message });
    if (error.code == "23514")
      return res
        .status(400)
        .send({
          error:
            "Tug'ilgan kun bugungi kundan oshib ketmasligi va 1920 y. dan doim katta bo'lishi lozim",
        });

    console.log(error);
  }
});

export default router;
