const mssql = require ('mssql');
const { sqlConfig } = require('../Config/config');
const {v4} = require('uuid')


const createProject = async(req, res)=>{
    try {
        const project_id = v4();

        const {project_title, project_description, deadline, user_id} = req.body

        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('project_id', mssql.VarChar, project_id)
            .input('project_title', mssql.VarChar, project_title)
            .input('project_description', mssql.VarChar, project_description)
            .input('deadline', mssql.Date, deadline)
            .input('user_id', mssql.VarChar, user_id)
            .execute('createProjectPROC')



            if(result.rowsAffected == 1){
            return res.status(200).json({
                message: "Project created Successfully",
            })  
            }else{
                return res.status(400).json({message: "Creation failed"})
            }   
        }
    } catch (error) {
        return res.json({error})
    }
}

const getAllProjects = async(req, res)=>{
    try {
        const pool = await (mssql.connect(sqlConfig))

        const allproject = (await pool.request().execute('getAllProjects')).recordset

        res.status(200).json({projects: allproject})
    } catch (error) {
        return res.status(400).json({error})
    }
}

const getOneProject = async(req, res)=>{
    try {
        const {project_id} = req.params

        const pool = await mssql.connect(sqlConfig)

        const project = (await pool.request().input('project_id', project_id).execute('getOneProject')).recordset

        return res.status(200).json({
            project: project
        })
    } catch (error) {
        return res.status(400).json({error})
    }
}

const updateProject = async(req, res)=>{
    try {
        const {project_id} = req.params;
        const {project_title, project_description, deadline, user_id} = req.body

        const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('project_id', mssql.VarChar, project_id)
        .input('project_title', mssql.VarChar, project_title)
        .input('project_description', mssql.VarChar, project_description)
        .input('deadline', mssql.Date, deadline)
        .input('user_id', mssql.VarChar, user_id)
        .execute('updateProject')


        if(result.rowsAffected == 1){
            res.status(200).json({
                message: 'project updated successfully'
            })
        }else{
            res.status(400).json({
                message: 'project not found'
            })
        }
    } catch (error) {
        return res.status(400).json({Error: error})
    }
}

const deleteProject = async (req, res)=>{
    try {
       const {project_id} = req.params

        const pool = await mssql.connect(sqlConfig)

        const result = await pool.request()
        .input('project_id', project_id)
        .execute('deleteProject')
      
        if(result.rowsAffected == 1){
            res.status(200).json({
                    message: 'Project deleted successfully'
            })
        }else{
            res.status(400).json({
                message: 'Project not found'
        })
        }
    } catch (error) {
        return res.status(400).json({Error: error})
    }
}

module.exports ={
    createProject,
    getAllProjects,
    getOneProject,
    updateProject,
    deleteProject
}