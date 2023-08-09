const {v4} = require('uuid');
const {StatusCodes} = require('http-status-codes');
const {sendMail} = require('../email-service/sendMail')
const DB = require('../database/dbHelpers');


const createProject  = async (req, res) => {
    const id = v4();
    const {project_name, project_description, } = req.body;


    try {

        if(!project_name || !project_description){
            return res.status(StatusCodes.BAD_REQUEST).json({msg: "Please fill in all fields"})
        }else{

          const result = await DB.executeProcedure('createProject', {id, project_name, project_description})

          console.log(result)

          if(result.rowsAffected[0] == 1){
              return res.status(StatusCodes.CREATED).json({msg: "Project created successfully"})
          }else{
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Server Error"})
          }
        }
        
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Server Error"}) 
    }
}

const getProjects = async (req, res) => {
    try {
        const result = (await DB.executeProcedure('getProjects'));
        const projects = result.recordset;
        if(projects.length > 0) {
            return res.status(StatusCodes.OK).json({projects})
        }
        if(projects.length == 0){
            return res.status(StatusCodes.NOT_FOUND).json({msg: "No projects found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Server Error"}) 
    }
}

const getProject = async (req, res) => {
    const {id} = req.params;
    try {
        const result  = (await DB.executeProcedure('getProject', {id}))
        const project = result.recordset[0];
        if(project){
            return res.status(StatusCodes.OK).json({project})

        }else{
            return res.status(StatusCodes.NOT_FOUND).json({msg: "Project not found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Server Error"}) 
    }
}

const updateProject = async (req,res) => {
    const {id} = req.params;


    try {
        const result = await DB.executeProcedure('updateProject', {...req.body, id})
        if(result.rowsAffected[0] == 1){
            return res.status(StatusCodes.OK).json({msg: "Project updated successfully"})
        }else{
            return res.status(StatusCodes.NOT_FOUND).json({msg: "Project not found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Server Error"}) 
    }
}

const deleteProject = async (req, res) => {
    const {id} = req.params;
    try {
        const result = await DB.executeProcedure('deleteProject', {id})
        if(result.rowsAffected[0] == 1){
            return res.status(StatusCodes.OK).json({msg: "Project deleted successfully"})
        }else{
            return res.status(StatusCodes.NOT_FOUND).json({msg: "Project not found"})
            
        }
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Server Error"})
    }   
}

const completeProject = async (req, res) => {

    const {id} = req.params;

    try {
        const result = await DB.executeProcedure('completeProject', {id})
        if(result.rowsAffected[0] == 1){
            return res.status(StatusCodes.OK).json({msg: "Project completed successfully"})
        }else{
            return res.status(StatusCodes.NOT_FOUND).json({msg: "Project not found"})
        }
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Server Error"})
    }   
}

// make a project to be assigned to a user
const assignProject = async (req , res )=>{
    const {id} = req.params;
    const {user_id , deadline} = req.body;

    const project = (await DB.executeProcedure('getProject', {id})).recordset[0]
    const user = (await DB.executeProcedure('getOneUser', {id:user_id})).recordset[0]

    const updateUserDetails = {
        id:user_id,
        project_Id:id
    }
    console.log(updateUserDetails)

    const mailOptions = {
        from: process.env.EMAIL,
        to: `${user.email}`,
        subject: 'Hello from Nodemailer',
        text: `Hello ${user.userName}, you have been assigned to a project "${project.project_name}" with a deadline of ${deadline} \n\n\ regards, \n\n\ Project Manager`,
      };

    try {
        await DB.executeProcedure('assignUserProject',updateUserDetails)
        await DB.executeProcedure('assignProject', {id, user_id , deadline})
        await sendMail(mailOptions)
        return res.status(StatusCodes.OK).json({msg: "Project assigned successfully"})
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Server Error"})
    }   
}

module.exports = {
    createProject,
    getProjects,
    getProject ,
    updateProject,
    deleteProject,
    completeProject,
    assignProject

    
}