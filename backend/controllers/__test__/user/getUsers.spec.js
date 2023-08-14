const {getUsers} = require('../../userControler')
const DB = require('../../../database/dbHelpers')
jest.mock('../../../database/dbHelpers')
describe('Get all users',() => {
    it('should return an error when the users are not found',async()=>{
        const mockedReq = {}
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        DB.executeProcedure.mockResolvedValue({
            recordset:[]
        })
        const result = DB.executeProcedure()
        await getUsers(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(400)
        expect(mockedRes.json).toHaveBeenCalledWith({message: "No users found"})

    })
    it('should return all users',async()=>{
        const mockedReq = {}
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        mockedUser={
            name:'test',
            email:'email',
            password:'password'
        }
        DB.executeProcedure.mockResolvedValue({
            recordset:[mockedUser]
        })
        const result = await DB.executeProcedure()
        await getUsers(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(200)
        expect(mockedRes.json).toHaveBeenCalledWith({users:result.recordset})


    })
    
});
