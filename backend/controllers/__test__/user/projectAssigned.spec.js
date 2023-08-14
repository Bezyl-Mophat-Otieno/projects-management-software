const {getProjectAssigned} = require('../../userControler')
const DB = require('../../../database/dbHelpers')

jest.mock('../../../database/dbHelpers')

describe('Testing the project Assignment Functionality', () => {
    it('Should return an error when the params is not passed with a value  ', async () => {
        const mockedReq ={
            params: {}
        }
        const mockedRes = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await getProjectAssigned(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.json).toHaveBeenCalledWith({message: 'Please provide a valid id'});


    })
    it('should return an alert when the user is not assigned a project ',async()=>{

        const mockedReq ={
            params: {
                id:'test_id'
            }
        }
        const mockedRes = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        await DB.executeProcedure.mockResolvedValue({recordset:[]})

        const result = await DB.executeProcedure()
        console.log(result)

        await getProjectAssigned(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(400);
        expect(mockedRes.json).toHaveBeenCalledWith({message: 'No project assigned to this user'});

    })
    it('should return a success when a user is assigned a project ',async()=>{


        const mockedReq ={
            params: {
                id:'test_id'
            }
        }
        const mockedRes = {
            status:jest.fn().mockReturnThis(),
            json:jest.fn()
        }

        const mockedProject = {
            id:1,
            name:'test_project',
            description:'test_description',
            status:'test_status',
            start_date:'test_start_date',
            end_date:'test_end_date',
        }

        await DB.executeProcedure.mockResolvedValue({recordset:[mockedProject]})

        const result = await DB.executeProcedure()
        console.log(result)

        await getProjectAssigned(mockedReq, mockedRes);
        expect(mockedRes.status).toHaveBeenCalledWith(200);
        expect(mockedRes.json).toHaveBeenCalledWith({project:mockedProject});



    })
    
});

