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
    student.id as student_id, 
    student.email, 
    student.firstname, 
    student.lastname, 
    student.parent_name, 
    student.course,
    student.address,
    student.brithday, 
    viloyat.name_uz as viloyat, 
    viloyat.id as viloyat_id, 
    tuman.name_uz as tuman, 
    tuman.id as tuman_id,
	groupname.name as GroupName,
	groupname.id as GroupNameID 
	
FROM 
    student
INNER JOIN 
    viloyat ON student.viloyat_id = viloyat.id
INNER JOIN 
    tuman ON student.tuman_id = tuman.id
INNER JOIN
	groupname on student.groupname_id = groupname.id
WHERE 
    student.firstname LIKE $1 
    AND student.state = true
	ORDER BY 
    student.firstname ASC
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
    student.id as student_id, 
    student.email, 
    student.firstname, 
    student.lastname, 
    student.parent_name, 
    student.course,
    student.address,
    student.brithday, 
    viloyat.name_uz as viloyat, 
    viloyat.id as viloyat_id, 
    tuman.name_uz as tuman, 
    tuman.id as tuman_id,
	groupname.name as GroupName,
	groupname.id as GroupNameID 
	
FROM 
    student
INNER JOIN 
    viloyat ON student.viloyat_id = viloyat.id
INNER JOIN 
    tuman ON student.tuman_id = tuman.id
INNER JOIN
	groupname on student.groupname_id = groupname.id
    WHERE 
    student.lastname LIKE $1 
    AND student.state = true
	ORDER BY 
    student.lastname ASC
LIMIT $2 OFFSET ($3 - 1) * $2;


            `, [`%${lastname}%`, size, page]
        );
        return res.status(200).send(data.rows);

    } catch (error) {
        console.log(error)
    }
});







export default router;