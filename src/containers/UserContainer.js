import React, { Component } from 'react';
import User from '../components/User';
import Repo from '../components/Repo';
import { GithubRequests } from '../components/helpers/GithubRequests';
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
        let params = {
            url: 'user',
            keyword: id,
            page: ''
        };
        const res = await GithubRequests(params);
        const json = await res.json();
        if(res.status !== 404)
            this.setState({
                user: json
            });
    }
    async callRepos(id){
        let params = {
            url: 'user-repo',
            keyword: id,
            page: ''
        };
        const res = await GithubRequests(params);
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
              {user ? 
              <User id={user.login} key={user.login} /> : 
              <div className="justify-content-center py-4"><h4>No results found.</h4></div>
               }
                
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