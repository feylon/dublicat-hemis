import { Router } from "express";
import { checkToken } from "../../../functions/jwtDean.js";
import Joi from "joi";
import { joiPasswordExtendCore } from "joi-password";
import { hash } from "../../../functions/bcrypt.js";

const joiPassword = Joi.extend(joiPasswordExtendCore);

const router = Router();

router.post("/", checkToken, async (req, res) => {
  const Schema = Joi.object({
    email: Joi.string().email().required(),
    login: Joi.string().min(3).max(16).required(),
    password: joiPassword
      .string()
      .minOfSpecialCharacters(1)
      .minOfLowercase(2)
      .minOfUppercase(1)
      .minOfNumeric(2)
      .noWhiteSpaces()
      .onlyLatinCharacters()
      .doesNotInclude(["password"])
      .required(),
    firstname: Joi.string().min(3).max(10),
    lastname: Joi.string().min(3).max(10),
    brithday: Joi.string().required(),
    address: Joi.string().required().min(3).max(45),
    Parent_Name: Joi.string().required().min(3).max(45),
    tumanId: Joi.number().min(15).max(225).required(),
    viloyatId: Joi.number().integer().min(1).max(15).required(),
    course: Joi.number().min(1).max(5).required(),
  });

  let checkSchema = Schema.validate(req.body);
  if (checkSchema.error)
    return res.status(400).send({ error: checkSchema.error.message });
  let {
    email,
    login,
    password,
    firstname,
    lastname,
    brithday,
    address,
    Parent_Name,
    tumanId,
    viloyatId,
    course,
  } = req.body;
  try {
    password = await hash(password);

    await global.pool.query(`
        INSERT INTO student (
    email, login, password, firstname, lastname,
    brithday, address, Parent_Name, course, tuman_id, viloyat_id
) VALUES (
    $1, $2, $3, $4, $5,
    $6, $7, $8, $9, $10, $11
);`, [
    email,
    login,
    password,
    firstname,
    lastname,
    brithday,
    address,
    Parent_Name,
    course,
    tumanId,
    viloyatId
]);
res.status(201).send({created : true})
  } catch (error) {
    if(error.code == '22P02') return res.status(401).send({error : "DDOS"})
    if(error.code == '23505') return res.status(401).send({error : error.detail});
    if(error.code == '22008') return res.status(401).send({error : error.message});
    if(error.code == '22007') return res.status(401).send({error : error.message});
    if(error.code == '23514') return res.status(401).send({error : "Tug'ilgan kun bugungi kundan oshib ketmasligi va 1920 y. dan doim katta bo'lishi lozim"});

    console.log(error)
  }
});

export default router;