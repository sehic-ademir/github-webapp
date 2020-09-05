import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenInput from './TokenInput';
import './components.css';
import Loader from './loader';
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: `token ${localStorage.getItem('key')}`,
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
        const token = localStorage.getItem('token');
        const settings = {
            method: 'GET',
            headers: {
                "Authorization": `token ${token}`,
                "Accept": "application/vnd.github.v3+json",
            }
        }
        const res = await fetch(`https://api.github.com/users/${this.props.id}`, settings);
        const json = await res.json();
        this.setState({
            user: json
        });
    }
    async callFollow(){
        const token = localStorage.getItem('token');
        const settings = {
            method: 'PUT',
            headers: {
                "Authorization": `token ${token}`,
                "Accept": "application/vnd.github.v3+json",
            }
        }
        const res = await fetch(`https://api.github.com/user/following/${this.props.id}`, settings);
        this.setState({
            res_status: res.status
        });
        if(res.status === 401)
            return;
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
    async callUnfollow(e){
        const token = localStorage.getItem('token');
        const settings = {
            method: 'DELETE',
            headers: {
                "Authorization": `token ${token}`,
                "Accept": "application/vnd.github.v3+json",
            }
        }
        const res = await fetch(`https://api.github.com/user/following/${this.props.id}`, settings);
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
        const token = localStorage.getItem('token');
        const settings = {
            method: 'GET',
            headers: {
                "Authorization": `token ${token}`,
                "Accept": "application/vnd.github.v3+json",
            }
        }
        const res = await fetch(`https://api.github.com/user/following/${this.props.id}`, settings);
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
            {user ? 
        <div className="card col-xl-7 col-lg-10 col-md-10 col-12 px-0 mx-auto overflow-hidden my-4">
        { this.state.res_status === 401 ? <TokenInput/> : '' }
           <div className="col-lg-6 mx-auto col-12"><img className="card-img-top w-25 mx-auto mt-4 rounded-circle" src={user.avatar_url} alt={user.avatar_url} /></div> 
            <div className="card-body">
                <Link to={`/user/${user.login}`} className="h5 card-title text-blue my-2">{user.name} ({user.login})</Link>
                <h6 className="card-subtitle mb-2 text-muted">{user.location}</h6>
                <p className="card-text">{user.bio}</p>
                <div className="my-2">  
                    { following ?  <button className="btn btn-danger ml-auto mr-2" onClick={this.callUnfollow}>Unfollow</button>
                   :
                    <button className="btn btn-primary align-self-center ml-auto mr-2"  onClick={this.callFollow}>Follow</button>
                    }
                    </div>
            </div>
            <div className="card-footer bg-blue text-light row no-gutters">
                <Link className="col-4 text-light" to={`/users/followers/${user.login}/1`}>
                    <p className="h4">{user.followers}</p>
                    <p className="mb-0 text-ltblue">Followers</p>
                </Link>
                <Link className="col-4 text-light" to={`/users/following/${user.login}/1`}>
                    <p className="h4">{user.following}</p>
                    <p className="mb-0 text-ltblue">Following</p>
                </Link>
                <Link className="col-4 text-light" to={`/users/repo/${user.login}/1`}>
                    <p className="h4">{user.public_repos}</p>
                    <p className="mb-0 text-ltblue">Repositories</p>
                </Link>
                </div>
        </div> : <Loader /> } 
        </>
         );
    }
}

export default User;