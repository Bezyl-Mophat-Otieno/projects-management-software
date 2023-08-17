import http  from 'k6/http';
import { sleep } from 'k6';


// SMOKE TESTING OUR SYSTEM-BASIC SYSTEM FUNCTIONALITY
export const options = {
    vus : 1,
    duration : '10s',
    thresholds:{
        http_req_failed:['rate<0.01'],
        http_req_duration:['p(95)< 200']

    }

    
}

export default function(){

    http.get('http://localhost:5000/api/v1/projects/')
    sleep(1)

}