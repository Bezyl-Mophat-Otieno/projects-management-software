const {deleteProject} = require('../../projectControler')
const DB = require ('../../../database/dbHelpers')

jest.mock('../../../database/dbHelpers')


describe('Deleting a project ', () => {
    it('it should resolve successfully if a project is deleted ',async()=>{
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
        const result = await DB.executeProcedure()
        await deleteProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(200)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project deleted successfully"})
    })
    it('should error out if a project is not found , thus not deleted', async()=>{
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
        await deleteProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(404)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project not found"})
    })
  
})
