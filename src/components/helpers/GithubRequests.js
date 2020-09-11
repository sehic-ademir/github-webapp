let token = localStorage.getItem('token');
if(token)
    token = `token ${token}`
else token = '';
let settings;
if(token !== ''){
settings = {
    method: 'GET',
    headers: {
        "Authorization": `${token}`,
        "Accept": "application/vnd.github.v3+json",
    }
}
}
else {
settings = {
    method: 'GET',
    headers: {
        "Accept": "application/vnd.github.v3+json",
    }
}
}
export const getRepositories = async (keyword, page) => {
    const response =  await fetch(`https://api.github.com/search/repositories?q='${keyword}&per_page=10&page=${page}`, settings);
    checkIfTokenInvalid(response);
    return response;
}

export const userRepo = async (keyword, page) => {
    const response =  await fetch(`https://api.github.com/users/${keyword}/repos${page ? `?per_page=10&page=${page}` : '' } `, settings);
    checkIfTokenInvalid(response);
    return response;
}
export const getUsers = async (keyword, page) => {    
    const response =  await fetch(`https://api.github.com/search/users?q=${keyword}&per_page=10&page=${page}`, settings);
    checkIfTokenInvalid(response);
    return response;
}
export const getUser = async (keyword) => {    
    const response =  await fetch(`https://api.github.com/users/${keyword}`, settings);
    checkIfTokenInvalid(response);
    return response;
}
export const authUserFollowing = async (keyword) => {    
    const response = await fetch(`https://api.github.com/user/following/${keyword}`, settings);
    checkIfTokenInvalid(response);
    return response;
}
export const userFollowers = async (keyword, page) => {    
    const response = await fetch(`https://api.github.com/users/${keyword}/followers${page ? `?per_page=10&page=${page}` : '' } `, settings);
    checkIfTokenInvalid(response);
    return response;
}
export const userFollowing = async (keyword, page) => {    
    const response = await fetch(`https://api.github.com/users/${keyword}/following${page ? `?per_page=10&page=${page}` : '' } `, settings);
    checkIfTokenInvalid(response);
    return response;
}
export const userUnfollow = async (keyword) => {    
    let unfollow = settings;
    unfollow.method = 'delete';
    const response = await fetch(`https://api.github.com/user/following/${keyword}`, unfollow);
    checkIfTokenInvalid(response);
    return response;
}
export const userFollow = async (keyword) => {    
    let follow = settings;
    follow.method = 'PUT';
    const response = await fetch(`https://api.github.com/user/following/${keyword}`, follow);
    checkIfTokenInvalid(response);
    return response;
}
const checkIfTokenInvalid = async (data) => {
    let data_status = await data;
    let token = localStorage.getItem('token');
    if(data_status.status === 401 && token){
        localStorage.removeItem('token');
        window.location.reload();
        return;
    }
}