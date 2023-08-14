const {assignProject} = require('../../projectControler')
const {sendMail} = require('../../../email-service/sendMail')
const DB = require ('../../../database/dbHelpers')

jest.mock('../../../database/dbHelpers')
jest.mock('../../../email-service/sendMail',()=>{
    return {
        sendMail: jest.fn()
    }
})

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
        await DB.executeProcedure.mockResolvedValueOnce({rowsAffected: [0]}).mockResolvedValueOnce({rowsAffected: [0]})
        await assignProject(mockedReq, mockedRes)
        expect(mockedRes.status).toHaveBeenCalledWith(404)
        expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project or user not found"})

    })

    it('should return an error when the project is already assigned and no email should be sent', async () => {

        
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
        await DB.executeProcedure.mockResolvedValueOnce({rowsAffected: [1]}).mockResolvedValueOnce({rowsAffected: [1]})

        //  const found = await DB.executeProcedure()

        //  console.log(found)



            const mockedMailOptions = {
                from: 'from',
                to: 'to',
                subject: 'subject',
                text: 'text'
            
            }

            await DB.executeProcedure.mockResolvedValueOnce({rowsAffected: [0]}).mockResolvedValueOnce({rowsAffected: [0]})

            // const rowsAffected = await DB.executeProcedure()

            await assignProject(mockedReq, mockedRes)
            expect(mockedRes.status).toHaveBeenCalledWith(500)
            expect(mockedRes.json).toHaveBeenCalledWith({msg: "Server Error , No project was assigned"})

    })

    it('should send the email successfully when all the conditions are met',async()=>{


        
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
        await DB.executeProcedure.mockResolvedValueOnce({rowsAffected: [1]}).mockResolvedValueOnce({rowsAffected: [1]})

        //  const found = await DB.executeProcedure()




            const mockedMailOptions = {
                from: 'from',
                to: 'to',
                subject: 'subject',
                text: 'text'
            
            }

           
         
             

            await DB.executeProcedure.mockResolvedValueOnce({rowsAffected: [1]}).mockResolvedValueOnce({rowsAffected: [1]})
            
            // const rowsAffected = await DB.executeProcedure()
            sendMail.mockResolvedValueOnce({
                accepted: [ 'recipient@example.com' ],
                rejected: [],
                envelopeTime: 1010,
                messageTime: 720,
                messageSize: 354,
                response: '250 2.0.0 OK  1657313721 i12si18102814qtc.381 - gsmtp',
                envelope: { from: 'sender@example.com', to: [ 'recipient@example.com' ] },
                messageId: '<random_id@example.com>'
              }
              )
              sendMail(mockedMailOptions)
            await assignProject(mockedReq, mockedRes)
            expect(sendMail).toHaveBeenCalledWith(mockedMailOptions)
            expect(mockedRes.status).toHaveBeenCalledWith(200)
            expect(mockedRes.json).toHaveBeenCalledWith({msg: "Project assigned successfully"})

    })
    
    
    })

    

    

