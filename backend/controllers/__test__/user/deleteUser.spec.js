const {deleteUser} = require('../../userControler')
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

        await deleteUser(mockedReq, mockedRes);
        mockedRes.status(400).json({message: 'Please provide a valid id'}); 

        
    });
    it('Should return an error when the user does not exist', async () => {
        const mockedReq = {
            params: {
                id: 1
            },
            body:{
                name:'test',
                email:'test@gmail.com'
            }
        }
        const mockedRes = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await DB.executeProcedure.mockResolvedValue({rowsAffected:[0]})

        const result = await DB.executeProcedure()
        // console.log(result)
       
        await deleteUser(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.json).toHaveBeenCalledWith({message:'User does not exist'});


    })

    it('it should successfully delete a user', async () => {

            const mockedReq = {
                params: {
                    id: 1
                },
                body:{
                    name:'test',
                    email:'test@gmail.com'
                }
            }
            const mockedRes = {
                status:jest.fn().mockReturnThis(),
                json:jest.fn()
            }
    
            await DB.executeProcedure.mockResolvedValue({rowsAffected:[1]})
    
            const result = await DB.executeProcedure()
            console.log(result)
           
            await deleteUser(mockedReq, mockedRes);
            expect(mockedRes.status).toHaveBeenCalledWith(200);
            expect(mockedRes.json).toHaveBeenCalledWith({message:'User deleted successfully'});

    })
    
})