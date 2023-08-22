import http from 'k6/http';
import { sleep } from 'k6';


// TESTING STRESS TO OUR SYSTEM
export const options ={
    stages:[
        {target:1000, duration:'1m'},
        {target:800, duration:'11m'},
        {target:60, duration:'1s'},
        {target:60, duration:'1m'},
        {target:0, duration:'5m'},
        {target:100, duration:'1m'},
        {target:40, duration:'100s'},
        {target:600, duration:'3s'},
        {target:60, duration:'3m'},
    ],
    thresholds:{
        http_req_failed:['rate<0.01','rate<=0.01','rate<0.1'],
        http_req_duration:['p(95)< 200','p(99)< 300','p(99.9)< 500']
    }


}


export default function(){
    http.get('http://localhost:5000/api/v1/projects/')
    sleep(1)
}