import http from 'k6/http';
import { sleep , check } from 'k6';
export const options = {
  vus: 5,
  duration: '30s',
};
export default function () {
    const projectId = '01e9cd59-8d34-4bb5-b1f1-0b0305986acc'
  const res = http.get(`http://localhost:5000/api/v1/projects/get/${projectId}`);
  check(res,{
    'is status 200':(r)=>r.status === 200,
  })



  sleep(1);
}
