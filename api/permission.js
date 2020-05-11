import request from './request'

const path = '/permission';

async function getGroup() {
    const response = await request({
        url: path + '/GET_GROUP',
        method: 'get'
    });
    return {...response};
}

async function getGroupList() {
    const response = await request({
        url: path + '/GET_GROUP_LIST',
        method: 'get'
    });
    return {...response};
}

async function getMenuList() {
    const response = await request({
        url: path + '/GET_GROUP',
        method: 'get'
    });
    return {...response};
}

async function getGroupMembers() {
    const response = await request({
        url: path + '/GET_GROUP_MEMBERS',
        method: 'get'
    });
    return {...response};
}

async function editGroup() {
    const response = await request({
        url: path + '/EDIT_GROUP',
        method: 'post'
    });
    return {...response};
}

async function addGroup() {
    const response = await request({
        url: path + '/ADD_GROUP',
        method: 'post'
    });
    return {...response};
}

async function getMenuPermMemberList() {
    const response = await request({
        url: path + '/GET_MENU_PERM_MEM_LIST',
        method: 'post'
    });
    return {...response};
}


const PermissionApi = {
    getGroup,
    getGroupList,
    getMenuList,
    getGroupMembers,
    editGroup,
    addGroup,
    getMenuPermMemberList

};

export default PermissionApi;