

const {getLoggedInUser} = require('../../authControler');
describe('Check logged in User', (req , res ) => {
    it('should return the user if logged in', async()=>{
        const mockedReq = {
            info : {
                email: 'mocked_email',
                password: 'mocked_password'
            }
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await getLoggedInUser(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(200)
        expect(mockedRes.json).toHaveBeenCalledWith({message:"Authorized",data:mockedReq.info})
    } )
    it('should return unauthorized if not logged in', async()=>{
        const mockedReq = {
            info : null
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }

        await getLoggedInUser(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(401)
        expect(mockedRes.json).toHaveBeenCalledWith({message:"Unauthorized"})
    })
});
