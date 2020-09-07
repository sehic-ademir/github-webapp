export const GithubRequests = (params) => {
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
    let data = ''
    if(params.url === 'users')
        data = getUsers(params.keyword, params.page, settings);
    else if(params.url === 'repositories')
        data = getRepositories(params.keyword, params.page, settings);
    else if(params.url === 'user-repo')
            data = userRepo(params.keyword, params.page, settings);
    else if(params.url === 'user')
        data = getUser(params.keyword, settings);
    else if(params.url === 'user-followers')
        data = userFollowers(params.keyword, params.page, settings);
    else if(params.url === 'user-following')
        data = userFollowing(params.keyword, params.page, settings);
    const checkIfTokenInvalid = async () => {
        let data_status = await data;
        if(data_status.status === 401){
            localStorage.removeItem('token');
            window.location.reload();
        }
    }
    checkIfTokenInvalid();
    if(params.url === 'auth-user-following')
        data = authUserFollowing(params.keyword, settings);
    else if(params.url === 'user-follow')
        data = userFollow(params.keyword, settings);
    else if(params.url === 'user-unfollow')
        data = userUnfollow(params.keyword, settings);
    

    return data;
}
const getRepositories = async (keyword, page, settings) => {
    const response =  await fetch(`https://api.github.com/search/repositories?q='${keyword}&per_page=10&page=${page}`, settings);
    return response;
}

const userRepo = async (keyword, page, settings) => {
    const response =  await fetch(`https://api.github.com/users/${keyword}/repos${page ? `?per_page=10&page=${page}` : '' } `, settings);
    return response;
}
const getUsers = async (keyword, page, settings) => {    
    const response =  await fetch(`https://api.github.com/search/users?q=${keyword}&per_page=10&page=${page}`, settings);
    return response;
}
const getUser = async (keyword, settings) => {    
    const response =  await fetch(`https://api.github.com/users/${keyword}`, settings);
    return response;
}
const authUserFollowing = async (keyword, settings) => {    
    const response = await fetch(`https://api.github.com/user/following/${keyword}`, settings);
    return response;
}
const userFollowers = async (keyword, page, settings) => {    
    const response = await fetch(`https://api.github.com/users/${keyword}/followers${page ? `?per_page=10&page=${page}` : '' } `, settings);
    return response;
}
const userFollowing = async (keyword, page, settings) => {    
    const response = await fetch(`https://api.github.com/users/${keyword}/following${page ? `?per_page=10&page=${page}` : '' } `, settings);
    return response;
}
const userUnfollow = async (keyword, settings) => {    
    let unfollow = settings;
    unfollow.method = 'delete';
    const response = await fetch(`https://api.github.com/user/following/${keyword}`, unfollow);
    return response;
}
const userFollow = async (keyword, settings) => {    
    let follow = settings;
    follow.method = 'PUT';
    const response = await fetch(`https://api.github.com/user/following/${keyword}`, follow);
    return response;
}