const jwt = require("jsonwebtoken")
const {verifyToken} = require("../../../middleware/verifyToken")


jest.mock("jsonwebtoken")
describe('Testing the Verify Token Middleware', () => {
    it('it should throw an error when the headers are not provided', async() => {
        const mockedReq = {}
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        await verifyToken(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(401)
        expect(mockedRes.json).toHaveBeenCalledWith({message: "Unauthorized"})
        
    });

    it('it should verify the token and call the next middleware function', async() => {

        const mockedReq = {
            headers: {
                token:'token'
            }
        }
        const mockedRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        }
        const mockedUser = {
            id: 1,
            username: "username",
            email: "email",
            password: "password"
        }
        jest.spyOn(jwt, 'verify').mockReturnValue({
            mockedUser
        })

        mockedReq.info = mockedUser

        expect(mockedReq.info).toEqual(mockedUser)
    })
    
    
});
