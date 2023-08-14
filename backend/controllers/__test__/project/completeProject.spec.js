const {completeProject} = require('../../projectControler')
const DB = require ('../../../database/dbHelpers')

jest.mock('../../../database/dbHelpers')

describe('Completing  a project ', () => {
    it('should resolve successfully when a project is completed successfully', async() => {
        const mockedReq = {
            params:{
                id: 'project_id'
            }
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        DB.executeProcedure.mockResolvedValue({
            rowsAffected:[1]
        })
        const result = DB.executeProcedure()
        await completeProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(200)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project completed successfully"})
    })
    it('should error out if a project is not found , thus not completed', async()=>{
        const mockedReq ={
            params:{
                id:'project_id'
            }
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        DB.executeProcedure.mockResolvedValue({
            rowsAffected:[0]
        })
        const result = DB.executeProcedure()
        await completeProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(404)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project not found"})
    })
    it('should create the user successfully',async()=>{

        const mockedReq ={
            params:{
                id:'project_id'
            }
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        DB.executeProcedure.mockResolvedValue({
            rowsAffected:[1]
        })
        const result = DB.executeProcedure()
        await completeProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(200)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project completed successfully"})

    })
    
});
