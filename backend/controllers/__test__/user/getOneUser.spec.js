const {getOneUser} = require('../../userControler')
const DB = require('../../../database/dbHelpers')

jest.mock('../../../database/dbHelpers')
describe('Update a user',() => {
    it('Should return an error when the params is not passed with a value  ', async () => {
        const mockedReq = {
            params: {}
        }
        const mockedRes = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await getOneUser(mockedReq, mockedRes);
        mockedRes.status(400).json({message: 'Please provide a valid id'}); 

        
    });
    it('Should return an error when the user does not exist', async () => {

        const mockedReq = {
            params: {
                id: 1
            }
        }
        const mockedRes = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        const mockedUser = [
            {
                id:1,
                name:'test',
                email:'test@gmail.com'
            }
        ]
        await DB.executeProcedure.mockResolvedValue({recordset:[]})

        const result = await DB.executeProcedure()
        await getOneUser(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.json).toHaveBeenCalledWith({message:'User does not exist'});
    })

    it('it should successfully get a single User', async () => {


        const mockedReq = {
            params: {
                id: 1
            }
        }
        const mockedRes = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        const mockedUser = [
            {
                id:1,
                name:'test',
                email:'test@gmail.com'
            }
        ]
        await DB.executeProcedure.mockResolvedValue({recordset:mockedUser})

        const result = await DB.executeProcedure()
        await getOneUser(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(200);
        expect(mockedRes.json).toHaveBeenCalledWith({message:'User found Successfully'});


    })
    
})