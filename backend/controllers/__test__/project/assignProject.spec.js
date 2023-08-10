const {assignProject} = require('../../projectControler')
const DB = require ('../../../database/dbHelpers')

jest.mock('../../../database/dbHelpers')
describe('Assigning A project', () => {
    it('should return an error when any of the fields is empty', () => {
        const mockedReq = {
            params:{} ,
            body:{}
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        assignProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(400)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Please fill in all fields , including the project id"})

    });
    it('should return an error when the project or user is not found', async () => {

        const mockedReq = {
            params:{
                id: 'project_id'
            } ,
            body:{
                user_id: 'user_id',
                deadline: 'deadline'
            }
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await DB.executeProcedure.mockResolvedValue({rowsAffected: [0]})
        await DB.executeProcedure.mockResolvedValue({rowsAffected: [0]})
        const userRowsAffected = await DB.executeProcedure.mockResolvedValue({rowsAffected: [0]})
        const projectRowsAffected = await DB.executeProcedure.mockResolvedValue({rowsAffected: [0]})
        // console.log(projectRowsAffected)
        // console.log(userRowsAffected)
        await assignProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(404)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project or user not found"})

    })
    
    
    })

    

    

