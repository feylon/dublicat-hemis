import { Router } from "express";
import { checkToken } from "../../../functions/jwtDean.js";
import Joi from "joi";


const router = Router();

router.post("/:id", checkToken, async (req, res) => {
  const Schema = Joi.object({
  
    state : Joi.boolean().required(),
    
});

  let checkSchema = Schema.validate(req.body);
  if (checkSchema.error)
    return res.status(400).send({ error: checkSchema.error.message });
  let {
state
  } = req.body;
  try {

    await global.pool.query(
      `update student 
set
state = false
 where id = $1;
`,
      [
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
