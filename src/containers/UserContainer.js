import React, { Component } from 'react';
import User from '../components/User';
import Repo from '../components/Repo';
class UserContainer extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            repository: '',
            id: ''
         }
    }
    componentDidMount() {
        let id = this.props.id ? this.props.id : this.props.match.params.id;
        this.setState({
            id: id
        });
        this.callRepos(id);
    }
    async callRepos(id){
        const res = await fetch(`https://api.github.com/users/${id}/repos`);
        const json = await res.json();
        this.setState({
            repository: json
        });
    }
    render() { 
        const repository = this.state.repository;
        const id = this.state.id;
        return ( 
            <div>
              {id ? <User id={id} key={id} /> : '' }
                
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