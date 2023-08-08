const mssql = require ('mssql');
const { sqlConfig } = require('../Config/config');
const {v4} = require('uuid')


const createUser = async(req, res)=>{
    try {
        const user_id = v4();

        const {email, user_name, password, about, profile_pic, role, isassigned, project_id} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('user_id', mssql.VarChar, user_id)
            .input('email', mssql.VarChar, email)
            .input('user_name', mssql.VarChar, user_name)
            .input('password', mssql.VarChar, password)
            .input('about', mssql.Date, about)
            .input('profile_pic', mssql.VarChar, profile_pic)
            .input('role', mssql.VarChar, role)
            .input('isassigned', mssql.Bit, isassigned)
            .input('project_id', mssql.VarChar, project_id)
            .execute('createUser')



            if(result.rowsAffected == 1){
            return res.json({
                message: "Project created Successfully",
            })  
            }else{
                return res.json({message: "Creation failed"})
            }   
        }
    } catch (error) {
        return res.json({error})
    }
}

module.exports = {
    createUser
}