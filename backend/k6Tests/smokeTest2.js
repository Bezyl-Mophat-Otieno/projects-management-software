import http from 'k6/http';
import { sleep } from 'k6';

// Having varying list of conditions 
export const options = {

    stages :[
        {target:10, duration:'10s'},
        {target:20, duration:'10s'},
        {target:1, duration:'8s'},
    ],
    thresholds:{
        http_req_failed:['rate<0.01'],
        http_req_duration:['p(90)< 200','p(95)< 250','p(99)< 300']
    }
    

}

export default function(){

    http.get('http://localhost:5000/api/v1/projects/')
    sleep(1)
}