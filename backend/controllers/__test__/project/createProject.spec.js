const {createProject} = require('../../projectControler')
const DB = require ('../../../database/dbHelpers')

jest.mock('../../../database/dbHelpers')
describe('Creating a project ', () => {
    it('should return an error when  any of the fields is not provided', async() => {
        const mockedReq ={
            body:{}
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await createProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(400)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Please fill in all fields"})
    });
    
    it('should create a project successfully', async () => {
        const mockedReq ={
            body:{
                project_name: "test",
                project_description:"test"                
            }
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await DB.executeProcedure.mockResolvedValue({
            rowsAffected:[1]
        })
        const result = await DB.executeProcedure()
        console.log(result)
        await createProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(201)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project created successfully"})
    })

    it('it should return a server error when the project fails to create',async()=>{
        const mockedReq ={
            body:{
                project_name: "test",
                project_description: "test"                
            }
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await DB.executeProcedure.mockResolvedValue({
            rowsAffected: [0]
        })

        const result = await DB.executeProcedure()

        await createProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(500)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Server Error"})

    })

});
