import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './components.css';
class Repo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            copying: false
         }
        this.handleCopySSH = this.handleCopySSH.bind(this);

    }  
    handleCopySSH(e){
        navigator.clipboard.writeText(e.target.value);
        this.setState({
            copying: true
        });
        const changes = {
            id: this.props.repo.name,
            action: 'copied repo ssh'
            }
        this.saveChanges(changes);
    setTimeout  ( ( ) => {        
        this.setState({
            copying: false
        });
    }, 900);
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
        const repo = this.props.repo;
        const copying = this.state.copying;
        var thedate = new Date(Date.parse(repo.updated_at));
            thedate = thedate.toDateString();
        return ( 
            <div className="card text-left px-0 mx-auto my-2">
            <h5 className="card-header"><a href={repo.html_url} target="_blank" rel="noopener noreferrer" >{repo.full_name}</a></h5>
            <div className="card-body">
                <h5 className="card-title">Owner: <Link to={`/user/${repo.owner.login}`}>{repo.owner.login}</Link></h5>
                <p className="card-text">{repo.language}</p>
                <p className="card-text">Updated on {thedate}</p>
                <p className="card-text">{repo.description}</p>
            </div>
            <div className="card-footer text-muted">
                <button className="btn btn-blue" value={repo.ssh_url} onClick={this.handleCopySSH}> {copying ? 'Copied' : 'Copy SSH'} </button>
            </div>
            </div>
           );
    }
}
 
export default Repo;