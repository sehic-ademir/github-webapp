export const GithubRequests = (params) => {
    let token = localStorage.getItem('token');
        if(token)
            token = `token ${token}`
        else token = '';
    
    const settings = {
        method: 'GET',
        headers: {
            "Authorization": `${token}`,
            "Accept": "application/vnd.github.v3+json",
        }
    }
    let data = ''
    if(params.url === 'users')
        data = getUsers(params.keyword, params.page, settings);
    else if(params.url === 'repositories')
        data = getRepositories(params.keyword, params.page, settings);
    else if(params.url === 'user-repo'){
        if(params.page)
            data = userRepoWithPage(params.keyword, params.page, settings);
        else data = userRepo(params.keyword, settings);
    }
    else if(params.url === 'user')
        data = getUser(params.keyword, settings);
    else if(params.url === 'auth-user-following')
        data = authUserFollowing(params.keyword, settings);
    else if(params.url === 'user-followers')
        data = userFollowers(params.keyword, params.page, settings);
    else if(params.url === 'user-follow')
        data = userFollow(params.keyword, settings);
    else if(params.url === 'user-unfollow')
        data = userUnfollow(params.keyword, settings);
    return data;
}
    // de3e35c0f06c1ae8524c1bc08756bddf0c21208c
const getRepositories = async (keyword, page, settings) => {
    const response =  await fetch(`https://api.github.com/search/repositories?q='${keyword}&per_page=10&page=${page}`, settings);
    return response;
}
const userRepoWithPage = async (keyword, page, settings) => {
    const response =  await fetch(`https://api.github.com/users/${keyword}/repos?per_page=10&page=${page}`, settings);
    return response;
}
const userRepo = async (keyword, settings) => {
    const response =  await fetch(`https://api.github.com/users/${keyword}/repos`, settings);
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