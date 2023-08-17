const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const DB = require('../database/dbHelpers');
const {v4} = require('uuid');
const {StatusCodes} = require('http-status-codes');
const { sendMail } = require('../email-service/sendMail');
// import {registerSchema } from '../validators/inputFields';

const createUser = async (req, res, next) => {

        const id = v4();
      
        const {password,...payload } = req.body;
        if(!payload.username || !payload.email || !password) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'Please fill all fields'});
        }else{

        
        const hashedPassword = await bcrypt.hash(password, 5);

        // console.log({...payload,password:hashedPassword,id})
      try {

        const result = await DB.executeProcedure('addUser', {...payload,password:hashedPassword,id});
        console.log(result)

        if(result.rowsAffected[0] === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'User already exists',status:'failed'});
        }else{
            res.status(StatusCodes.CREATED).json({message: 'User Registered successfully',status:'success'});    
        }
        
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'User already exists',status:'failed'})
        
    }
}

}
const getUsers = async (req, res, next) => {

    try {
        const result = (await DB.executeProcedure('getUsers'));
        const users = result.recordset;
        if(result.recordset.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'No users found'});
        }else{
            res.status(StatusCodes.OK).json({users});    
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Something went wrong in the server'})
        console.log(error); 
    }
}

const updateUser = async (req, res,) => {
    try {
        
        const {id} = req.params;
        if(!id) {
            res.status(StatusCodes.BAD_REQUEST).json({message: 'Please provide a valid id'});
        }else{

        
       const result = await DB.executeProcedure('updateUser', {...req.body, id});
    //    console.log(result.rowsAffected[0]===0)
       
       if(result.rowsAffected[0] === 0) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'User does not exist'});
       }else{
           res.status(StatusCodes.OK).json({message: 'User updated successfully'});   
       }
    }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Something went wrong in the server'})
        console.log(error);     
    }
}

const deleteUser = async (req, res,) => {

    try {
         const {id}= req.params;
         if(!id) {
                res.status(StatusCodes.BAD_REQUEST).json({message: 'Please provide a valid id'});
         }else{
         const result = await DB.executeProcedure('deleteUser', {id});
         if(result.rowsAffected[0] === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'User does not exist'});
         }else{
             res.status(StatusCodes.OK).json({message: 'User deleted successfully'});
         }
        }
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Something went wrong in the server'})
        console.log(error);   
    }
}

const getOneUser = async (req, res, next) => {
    try {
        const {id} = req.params;
        if(!id) {
            res.status(StatusCodes.BAD_REQUEST).json({message: 'Please provide a valid id'});
        }else{

         
        const result = (await DB.executeProcedure('getOneUser', {id:req.params.id}));
        if(result.recordset.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'User does not exist'});
        }else{
            const user = result.recordset[0];
            console.log(user)
            res.status(StatusCodes.OK).json({message:'User found Successfully',user});
        }
        } 
    } catch (err) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: 'Something went wrong in the server'})
        console.log(err);
        
    }
}
const getProjectAssigned = async = async(req, res, next) => {
    try {
        const {id} = req.params
        if(!id) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'Please provide a valid id'});
        }
        const result = (await DB.executeProcedure('getProjectAssigned',{id}))
        if(result.recordset.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'No project assigned to this user'});
        }else{
            const project = result.recordset[0];
            res.status(StatusCodes.OK).json({project});   
        }
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Server Error"}) 
    }
}

const completeProject = async = async(req, res,) => {

    const {id} = req.params;
    const {project_Id} = req.body;

    if(!id || !project_Id) {
        return res.status(StatusCodes.BAD_REQUEST).json({message: 'Please provide a valid id , for both the  project and user '});
    } else{
    try {
         const userUpdateDetails = {
            id,
            project_Id:null,
            isAssigned:0,       
         }
         const projectUpdateDetails = {
            id:project_Id,
            completed:1,
         }  


           const result1 = await DB.executeProcedure('updateUser', userUpdateDetails);

           const result2 = await DB.executeProcedure('updateProject', projectUpdateDetails);

         

           if(result1.rowsAffected[0] === 0 || result2.rowsAffected[0] === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'User or project does not exist , Thus no update made'});
           } else{
           // send an email to the admin on project completion
           const result3 = (await DB.executeProcedure('getOneUser', {id}));
           if(result3.recordset.length === 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({message: 'User does not exist'});
           }else{
              const user = result3.recordset[0];
              const result4 = (await DB.executeProcedure('getProject', {id:project_Id}));
              if(result4.recordset.length === 0) {
                return res.status(StatusCodes.BAD_REQUEST).json({message: 'Project does not exist'});
               }else{
                const project = result4.recordset[0];
                console.log(user?.email)
                const mailOptions = {
                    from:user?.email,
                    to: process.env.ADMIN_EMAIL,
                    subject: 'Project Completed',
                    html: `<b>Hello , Mr. Project Manager, the project " ${project.project_name} "has been completed successfully<b> <br/> <b>Regards, ${user.userName}</b>`
                }


             await sendMail(mailOptions);


           res.status(StatusCodes.OK).json({message: 'Project completed successfully'});
            }
        }
    }           
    } catch (error) {
        console.log(error)
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({msg: "Server Error"})
        
    }
}


}






module.exports = {
    createUser ,
    getUsers,
    updateUser,
    deleteUser,
    getOneUser,
    getProjectAssigned,
    completeProject
}