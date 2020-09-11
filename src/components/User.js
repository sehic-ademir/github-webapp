import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './components.css';
import { getUser, userFollow, userUnfollow, authUserFollowing } from './helpers/GithubRequests';
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            following: false,
            res_status: ''
         }
         this.callFollow = this.callFollow.bind(this);
         this.callUnfollow = this.callUnfollow.bind(this);

    }
    componentDidMount() {
        this.callUser();
        this.checkIfFollowing();
    }
    async callUser(){
        const res = await getUser(this.props.id);
        const json = await res.json();
        this.setState({
            user: json
        });
    }
    async callFollow(){
        const res = await userFollow(this.props.id);
        this.setState({
            res_status: res.status
        });
        if(res.status === 401) {
            alert('No token submitted');
            return;
        }
        this.setState({
            following: true,
            res_status: res.status
        });
        const changes = {
            action: 'followed',
            id: this.props.id
        };
        this.saveChanges(changes);
    }
    async callUnfollow(){
        const res = await userUnfollow(this.props.id);
        this.setState({
            following: false,
            res_status: res.status,
        });
        const changes = {
            action: 'unfollowed',
            id: this.props.id
        };
        this.saveChanges(changes);
    }
    async checkIfFollowing(){
        const res = await authUserFollowing(this.props.id);
        console.log(res);
        if(res.status === 204)
            this.setState({
                following: true
            });
    }
    async saveChanges(changes){
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(changes)
        }
        const res = await fetch('/save-changes', settings);
        return res;
    }
    render() {
        const user = this.state.user;
        const following = this.state.following;

        return (
            <>
              {user ?   <div class="card my-2">
                    <div className="col-xl-2 col-lg-4 col-md-5 col-6 mx-auto my-4">
                    <Link to={`/user/${user.login}`}><img class="card-img-top rounded-circle img-fluid" src={user.avatar_url} alt={`${user.login} avatar`}/></Link>
                    </div>
                    <div class="card-body">
                    <Link to={`/user/${user.login}`}><h5 class="card-title">{user.name} ({user.login})</h5></Link>
                        <h6 class="card-subtitle mb-2 text-muted">{user.location}</h6>
                        <p class="card-text">{user.bio}</p>
                        <div className="my-2">
                            { following ?  
                            <button className="btn btn-danger" onClick={this.callUnfollow}>Unfollow</button>
                            :
                            <button className="btn btn-primary"  onClick={this.callFollow}>Follow</button>
                            }
                        </div>
                    </div>
                    <div className="card-footer bg-blue text-light">
                        <div className="row no-gutters">
                            <div className="col-4">
                                <Link className="text-light" to={`/users/followers/${user.login}/1`}>
                                    <span className="h4">{user.followers}</span> <br/>
                                    <span className="mb-0 text-ltblue">Followers</span>
                                </Link>
                            </div>
                            <div className="col-4">
                                <Link className="text-light" to={`/users/following/${user.login}/1`}>
                                    <span className="h4">{user.following}</span> <br/>
                                    <span className="mb-0 text-ltblue">Following</span>
                                </Link>
                            </div>
                            <div className="col-4">
                                <Link className="text-light" to={`/users/repo/${user.login}/1`}>
                                    <span className="h4">{user.public_repos}</span> <br/>
                                    <span className="mb-0 text-ltblue">Repositories</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
   : '' }
        </>
         );
    }
}

export default User;