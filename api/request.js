import axios from 'axios';
import _ from 'lodash';
//import { store } from '../store';
//import {logoutUser} from "../actions";

function getToken() {
    const state = store.getState();
    if (state && state.auth && state.auth.user) {
        return state.auth.user.token;
    }
    return '';
}

/**
 * Create an Axios Client with defaults
 * @type {AxiosInstance}
 */
const client = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        //'LANG': 'ko',
        //'Authorization': '',
    },
});

//Set Timeout
client.defaults.timeout = 5000;


/**
 * Request wrapper with default success/error actions
 * @param url
 * @param method
 * @param data
 * @returns {Promise<*>}
 */
const request = async ({url, method = 'get', data}) => {
    console.log(`\nurl: ${url} \nmethod: ${method} \ndata: ${JSON.stringify(data)}`);
    try {
        //let token = getToken();
        //let headers = _.isEmpty(token) ? {} : {Authorization: `Bearer ${token}`};
        const response = await client({url, method, data });
        return response.data;
    } catch (error) {
        let errorCode;
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.error(error.response.data);
            // console.error(error.response.status);
            // console.error(error.response.headers);
            const statusCode = error.response.status;
            errorCode = `${statusCode}`;
            switch (statusCode) {
                case 401:
                    store.dispatch(logoutUser());
                    break;
                default:
                    break;
            }
        }

        //console.error(`server error :  ${e.error}` )
        return {errorCode, data: null, message: error.message || 'error'};
    }
};

export default request;
