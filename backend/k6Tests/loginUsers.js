import http from 'k6/http'
import { sleep , check } from 'k6'


export const options = {
    vus: 5,
    stages:[
        {target:10, duration:'10s'},
        {target:20, duration:'10s'},
        {target:0, duration:'10s'},
    ],
}

export default function(){
    const url = 'http://localhost:5000/api/v1/users/login'
    const payload = JSON.stringify({
        email: 'bezylmophatotieno@gmail.com',
        password:`12345`
    })

    const params ={
        headers:{
            'Content-Type': 'application/json'
        }
    }
   const res = http.post(url,payload,params)

   check(res, {
         'is status 200': (r) => r.status === 200,
         'is message, logged in successfull' : (r)=>r.body.includes('login successful'),
   }
   )
    sleep(1)
}