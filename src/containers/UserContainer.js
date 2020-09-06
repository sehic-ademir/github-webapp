import React, { Component } from 'react';
import User from '../components/User';
import Repo from '../components/Repo';
class UserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            repository: '',
            id: '',
            user: ''
         }
    }
    componentDidMount() {
        let id = this.props.id ? this.props.id : this.props.match.params.id;
        this.setState({
            id: id
        });
        this.callRepos(id);
        this.callUser(id);
    }
    async callUser(id){
        const token = localStorage.getItem('token');
        const settings = {
            method: 'GET',
            headers: {
                "Authorization": `token ${token}`,
                "Accept": "application/vnd.github.v3+json",
            }
        }
        let res;
        if(token)
            res = await fetch(`https://api.github.com/users/${id}`, settings);
        else res = await fetch(`https://api.github.com/users/${id}`);
        const json = await res.json();
        if(res.status !== 404)
            this.setState({
                user: json
            });
    }
    async callRepos(id){
        const token = localStorage.getItem('token');
        const settings = {
            method: 'GET',
            headers: {
                "Authorization": `token ${token}`,
                "Accept": "application/vnd.github.v3+json",
            }
        }
        let res;
        if(token)
            res = await fetch(`https://api.github.com/users/${id}/repos`, settings);
        else res = await fetch(`https://api.github.com/users/${id}/repos`);
        const json = await res.json();
        if(res.status !== 404 && res.status !== 403)
        this.setState({
            repository: json
        });
    }
    render() { 
        const repository = this.state.repository;
        const user = this.state.user;
        return ( 
            <div>
              {user ? <User id={user.login} key={user.login} /> : <div className="justify-content-center py-4"><h4>No results found.</h4></div> }
                
                { repository ? <>
                    <h5>Repositories</h5>
                    { repository.map((repo) => 
                <Repo  repo={repo} key={repo.id}/>
                )} </> : '' }
            </div>
         );
    }
}
 
export default UserContainer;