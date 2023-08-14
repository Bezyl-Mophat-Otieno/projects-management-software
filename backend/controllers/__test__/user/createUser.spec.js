const {createUser} = require('../../userControler')
const DB = require('../../../database/dbHelpers')

jest.mock('../../../database/dbHelpers')
describe('Creating a user ', () => {
    it('should return an error when any of the fields is empty', () => {
        const mockedReq = {
            body:{}
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        createUser(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(400)
        expect(mockedRes.json).toHaveBeenCalledWith({message: "Please fill all fields"})


    })
    it('should return an error when the user already exists', async() => {
        const mockedReq = {
            body:{
                username: 'test',
                email: 'email',
                password: 'password'
            }
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        DB.executeProcedure.mockResolvedValue({rowsAffected: [0]})
        const result = await  DB.executeProcedure()
        // console.log(result)
        await createUser(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(400)
        expect(mockedRes.json).toHaveBeenCalledWith({message: "User already exists",status:'failed'})

    })

    
});

