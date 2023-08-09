const DB  = require('../../../database/dbHelpers')
const {getProjects} = require('../../projectControler')




jest.mock('../../../database/dbHelpers')

describe('Get Projects', () => {
    it('should return all projects if they are found', async() => {
        const mockedReq = {
            body:{}
        }
        const mockedProject ={
            id:1, project_name: "test", project_description: "test"
        }

        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        DB.executeProcedure.mockResolvedValue({
            recordset: [mockedProject]
        })

        const projects = await  DB.executeProcedure()

        await getProjects(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(200)
        expect(mockedRes.json).toHaveBeenCalledWith({projects: projects.recordset})

    })
    it('should return an error if no projects is fetched from the database', async() => {

        const mockedReq = {
            body:{}
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        DB.executeProcedure.mockResolvedValue({
            recordset: []
        })
        const result = await DB.executeProcedure()
        const projects = result.recordset;

        await getProjects(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(404)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "No projects found"})

  

    })

    })
    
