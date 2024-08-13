import { Router } from "express";
import Joi from "joi";


const router = Router();
router.get("/", async function (req, res) {
    try {
        let data = await global.pool.query("Select * from viloyat");
        res.send(data.rows)
    } catch (error) {
        console.log(error);
        res.status(500).send({error : "Server error"})
    }
});

router.get("/:tumanId", async function (req, res) {
    let Schema = Joi.object({
        tumanId : Joi.number().min(1).max(14)
    });
    let checkSchema = Schema.validate(req.params);
    if(checkSchema.error) return res.status(400).send({error : checkSchema.error.message})
    try {

        let data = await global.pool.query(`
            select 
tuman.name_uz as tuman_uz,
tuman.name_ru as tuman_ru,
tuman.name_oz as tuman_oz,
viloyat.name_uz as viloyat_uz,
viloyat.name_ru as viloyat_ru,
viloyat.name_oz as viloyat_oz,
viloyat.id as viloyat_id,
tuman.id as tuman_id
from tuman
inner join viloyat on tuman.viloyat_id = viloyat.id 
where viloyat.id = $1
            `, [Math.trunc(req.params.tumanId)]);
        res.send(data.rows)
    } catch (error) {
        console.log(error);
        res.status(500).send({error : "Server error"})
    }
});




export default router;