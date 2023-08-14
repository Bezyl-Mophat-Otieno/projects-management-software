const {completeProject} = require('../../userControler')
const DB = require('../../../database/dbHelpers')

jest.mock('../../../database/dbHelpers')

describe('Testing the complete project functionality', () => {
    it('should make sure the Id for both the user and project is passed', async () => {
        const mockedReq = {
            params: {},
            body:{}
        }
        const mockedRes = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }
        await completeProject(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.json).toHaveBeenCalledWith({message: 'Please provide a valid id , for both the  project and user '});

    })

    it('should return an alert/fail when the user or project does not exist', async () => {

        const mockedReq = {
            params: {
                id: 1
            },
            body:{
                project_Id:1
            }
        }
        const mockedRes = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }
        await completeProject(mockedReq, mockedRes);


         DB.executeProcedure.mockResolvedValue({rowsAffected:[0]})
            const result = await DB.executeProcedure()
            console.log(result)
        await completeProject(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.json).toHaveBeenCalledWith({message: 'User or project does not exist , Thus no update made'})


    })

    it('ahould get the details of the user, that has completed the project else give an alert/fail', async () => {


        const mockedReq = {
            params: {
                id: 1
            },
            body:{
                project_Id:1
            }
        }
        const mockedRes = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }
        await completeProject(mockedReq, mockedRes);

         DB.executeProcedure.mockResolvedValueOnce({rowsAffected:[1]})
         DB.executeProcedure.mockResolvedValueOnce({rowsAffected:[1]})
         DB.executeProcedure.mockResolvedValueOnce({recordset:[0]})
  
            const result = await DB.executeProcedure()
            console.log(result)
        await completeProject(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(500);
        expect(mockedRes.json).toHaveBeenCalledWith({message: 'User or project does not exist , Thus no update made'})

    })
    
});
