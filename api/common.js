import axios from 'axios'
import request from './request'


async function test() {
    try{
        const req = await axios.get('https://jsonplaceholder.typicode.com/posts?id=1')
        return req.data
    } catch (e) {
        console.error(`server error :  ${e.error}` )
    }
    
}

async function reqTest() {
    const response = await request({
        url: '/posts?id=1',
        method: 'get'
    });
    // if (response.errorCode != '000') {
    //     return {...response, message: 'fail'}
    // }
    return {...response};
}

const CommonApi = {
    test,
    reqTest
};

export default CommonApi;