const {updateProject} = require('../../projectControler')
const DB = require ('../../../database/dbHelpers')

jest.mock('../../../database/dbHelpers')

describe('Update Project', () => {
    it('should update a project successfully if found',async()=>{
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
        await updateProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(200)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project updated successfully"})
    })
    it('should return an error when a project is not updated successfully',async()=>{

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
        await updateProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(404)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project not found"})

    })
});
