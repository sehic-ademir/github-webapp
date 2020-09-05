import React, { Component } from 'react';
import Repo from '../components/Repo';
import Paging from '../components/paging';
import Loader from '../components/loader';
class UserRepo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            repository: '',
            response: '',
            total_count: ''
         }
    }
    componentDidMount() {
        this.callRepos();
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.page !== this.props.match.params.page)
            this.callRepos(this.props.match.params.id);
    }
    async callRepos(){
        const res = await fetch(`https://api.github.com/users/${this.props.match.params.id}/repos?per_page=10&page=${this.props.match.params.page}`);
        const json = await res.json();
        this.setState({
            repository: json,
            response: res
        });
        this.callPages();
    }
    // this link does not have total count so we have to call repo again with full paging in order to receive total pages
    async callPages(){
        const res = await fetch(`https://api.github.com/users/${this.props.match.params.id}`);
        const json = await res.json();
        this.setState({
            total_count: json.public_repos
        });
    }

    render() { 
        const repository = this.state.repository;
        const total_count = this.state.total_count;
        return ( 
            <div>
            { total_count > 0 ?  <div> { repository.map((repo) => 
           <Repo  repo={repo} key={repo.id} /> )}
           <Paging  _component={'users/repo'} total_count={total_count} params={this.props.match.params} />
            </div>
             : this.state.response.status !== 200 ? <div className="justify-content-center py-4"><h4>No results found.</h4></div> : <Loader response={this.state.response}  /> }
        </div>
         );
    }
}
 
export default UserRepo;