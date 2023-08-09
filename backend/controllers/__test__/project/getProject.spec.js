const {getProject} = require('../../projectControler')
const DB = require ('../../../database/dbHelpers')

jest.mock('../../../database/dbHelpers')

describe('Get Project', () => {
    it('should return the project if it exists', async() => {
        const mockedReq ={
            params:{
                id:'project_id'
            }
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockedProject = {
            project_id: 'project_id',
            project_name: 'project_name',
        }

        DB.executeProcedure.mockResolvedValue({
            recordset:[mockedProject]
        })
        const result = DB.executeProcedure()
        await getProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(200)
        expect(mockedRes.json).toHaveBeenCalledWith({project: mockedProject})
    })
    it('should return a 404 if the project does not exist', async() => {
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
            recordset:[]
        })
        const result = DB.executeProcedure()
        await getProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(404)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project not found"})
    })
    
});
