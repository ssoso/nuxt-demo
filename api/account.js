import request from './request'

const path = '/account';

async function SearchAccount() {
    const response = await request({
        url: path + '/SEARCH_ACCOUNT',
        method: 'get'
    });
    return {...response};
}

async function getAccountInfo() {
    const response = await request({
        url: path + '/GET_ACCOUNT_INFO',
        method: 'get'
    });
    return {...response};
}

async function editAccount() {
    const response = await request({
        url: path + '/EDIT_ACCOUNT',
        method: 'post'
    });
    return {...response};
}

async function addAccount() {
    const response = await request({
        url: path + '/ADD_ACCOUNT',
        method: 'post'
    });
    return {...response};
}

async function checkAccId() {
    const response = await request({
        url: path + '/CHECK_ACCOUNT_ID',
        method: 'post'
    });
    return {...response};
}


const PermissionApi = {
    SearchAccount,
    getAccountInfo,
    editAccount,
    addAccount,
    checkAccId

};

export default PermissionApi;