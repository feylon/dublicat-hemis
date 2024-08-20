import { Router } from "express";
import Joi from "joi";
import { checkToken } from "../../../functions/jwtDean.js";

let router = Router();

router.get("/byfirstname", checkToken, async function(req, res){
    const Schema = Joi.object(
        {
            firstname : Joi.string().required(),
            size : Joi.number().integer().min(0).required(),
            page : Joi.number().integer().min(0).required()
            
        }
    );
    let checkSchema = Schema.validate(req.query);
    if (checkSchema.error) return res.status(400).send({error : checkSchema.error.message});


const {firstname, page, size} = req.query;
    try {
        let data = await global.pool.query(
            `
SELECT 
    teacher.id as teacher_id, 
    teacher.email, 
    teacher.firstname, 
    teacher.lastname, 
    teacher.parent_name, 
    teacher.address,
    teacher.brithday, 
    viloyat.name_uz as viloyat, 
    viloyat.id as viloyat_id, 
    tuman.name_uz as tuman, 
    tuman.id as tuman_id
FROM 
    teacher
INNER JOIN 
    viloyat ON teacher.viloyat_id = viloyat.id
INNER JOIN 
    tuman ON teacher.tuman_id = tuman.id
WHERE 
    teacher.firstname LIKE $1 
    AND teacher.state = true
	ORDER BY 
    teacher.firstname ASC
LIMIT $2 OFFSET ($3 - 1) * $2;


            `, [`%${firstname}%`, size, page]
        );
        return res.status(200).send(data.rows);

    } catch (error) {
        console.log(error)
    }
});













router.get("/bylastname", checkToken, async function(req, res){
    const Schema = Joi.object(
        {
            lastname : Joi.string().required(),
            size : Joi.number().integer().min(0).required(),
            page : Joi.number().integer().min(0).required()
            
        }
    );
    let checkSchema = Schema.validate(req.query);
    if (checkSchema.error) return res.status(400).send({error : checkSchema.error.message});


const {lastname, page, size} = req.query;
    try {
        let data = await global.pool.query(
            `
SELECT 
    teacher.id as teacher_id, 
    teacher.email, 
    teacher.firstname, 
    teacher.lastname, 
    teacher.parent_name, 
    teacher.address,
    teacher.brithday, 
    viloyat.name_uz as viloyat, 
    viloyat.id as viloyat_id, 
    tuman.name_uz as tuman, 
    tuman.id as tuman_id
FROM 
    teacher
INNER JOIN 
    viloyat ON teacher.viloyat_id = viloyat.id
INNER JOIN 
    tuman ON teacher.tuman_id = tuman.id
WHERE 
    teacher.lastname LIKE $1 
    AND teacher.state = true
	ORDER BY 
    teacher.lastname ASC
LIMIT $2 OFFSET ($3 - 1) * $2;


            `, [`%${lastname}%`, size, page]
        );
        return res.status(200).send(data.rows);

    } catch (error) {
        console.log(error)
    }
});







export default router;