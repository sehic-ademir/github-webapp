import React, { Component } from 'react';
import User from '../components/User';
import Repo from '../components/Repo';
import { getUser, userRepo } from '../components/helpers/GithubRequests';
import Loader from '../components/loader';
class UserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            repository: '',
            id: '',
            user: '',
            userResponse: ''
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
        const res = await getUser(id);
        const json = await res.json();
        if(res.status < 400)
            this.setState({
                user: json,
                userResponse: res.status
            });
    }
    async callRepos(id){
        const res = await userRepo(id);
        const json = await res.json();
        if(res.status < 400)
        this.setState({
            repository: json
        });
    }
    render() { 
        const repository = this.state.repository;
        const user = this.state.user;
        console.log(user);
        return ( 
            <div className="px-0 mx-auto col-xl-7 col-lg-10 col-md-10 col-12">
              {this.state.userResponse === 404 ? <div className="justify-content-center py-4"><h4>No results found.</h4></div> : user ? 
              <div><User id={user.login} key={user.login} /></div> :  <Loader /> 
              
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