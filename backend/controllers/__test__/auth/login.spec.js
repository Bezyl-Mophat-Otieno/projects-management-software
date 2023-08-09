const {loginUser} = require('../../authControler')
const DB = require('../../../database/dbHelpers')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')

jest.mock('../../../database/dbHelpers')
jest.mock('bcryptjs')
jest.mock('jsonwebtoken')
describe('Testing the log in ', () => {

    it('should return an error when either of the fields is not provided', async() => { 
        const mockedRequest = {
            body:{

            }
        }
        const mockedResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn() 
        }

        await loginUser(mockedRequest, mockedResponse)
        expect(mockedResponse.status).toHaveBeenCalledWith(400)
        expect(mockedResponse.json).toHaveBeenCalledWith({message:"Please provide email and password"})
    } )

    it('should return an error when the user does not exist ',async()=>{
        const mockedRequest = {
            body:{
                email:"mocked_email",
                password:"mocked_password"
            }
        }
        const mockedResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn() 
        }
        const user = await DB.executeProcedure.mockResolvedValueOnce({
            recordset:[]    
        })
        await loginUser(mockedRequest, mockedResponse)
        expect(mockedResponse.status).toHaveBeenCalledWith(401)
        expect(mockedResponse.json).toHaveBeenCalledWith({message:" You are not registered , please register first"})
    })
    it('should return a UNAUTHORIZED error when the credentials are incorrect',async()=>{

        const mockedRequest = {
            body:{
                email:"mocked_email",
                password:"mocked_password"
            }
        }
        const mockedResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn() 
        }
        const mockedUser = {
            email:'',
            password:''

        }
        const user = await DB.executeProcedure.mockResolvedValueOnce({
            recordset:[mockedUser]    
        })

        await bcrypt.compare.mockResolvedValue(false)

        const isMatch =   bcrypt.compare()


        await loginUser(mockedRequest, mockedResponse)

        expect(mockedResponse.status).toHaveBeenCalledWith(401)
        expect(mockedResponse.json).toHaveBeenCalledWith({message:"login failed , invalid credentials"})
    })

    it('should return success when the login is successful', async()=>{



        const mockedRequest = {
            body:{
                email:"mocked_email",
                password:"mocked_password"
            }
        }
        const mockedResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn() 
        }
        const mockedUser = {
            email:'',
            password:''

        }
        DB.executeProcedure.mockResolvedValue({
            recordset:[mockedUser]    
        })

        const user = await DB.executeProcedure()

       await bcrypt.compare.mockResolvedValue(true)
        const isMatch =  bcrypt.compare()
        jwt.sign.mockReturnValue('token_value')

        const token = jwt.sign()

       

        await loginUser(mockedRequest, mockedResponse)
        expect(mockedResponse.status).toHaveBeenCalledWith(200)
        expect(mockedResponse.json).toHaveBeenCalledWith({message:"login successful",token:token})


    })
    
});
