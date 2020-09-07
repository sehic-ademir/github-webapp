import React, { Component } from 'react';
import Repo from '../components/Repo';
import Paging from '../components/paging';
import Loader from '../components/loader';
import { GithubRequests } from '../components/helpers/GithubRequests';
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
        let params = {
            url: 'user-repo',
            keyword: this.props.match.params.id,
            page: this.props.match.params.page
        };
        const res = await GithubRequests(params);
        const json = await res.json();
        if(res.status !== 404)
        this.setState({
            repository: json,
            response: res
        });
        this.callPages();
    }
    // the link above does not have total_count so we have to call repo again with full paging in order to receive total pages
    async callPages(){
        let params = {
            url: 'user-repo',
            keyword: this.props.match.params.id,
            page: ''
        };
        const res = await GithubRequests(params);
        const json = await res.json();
        this.setState({
            total_count: json.length || 0
        });
    }

    render() { 
        const repository = this.state.repository;
        const total_count = this.state.total_count;
        return ( 
            <div>
            { total_count === '' ? <Loader response={this.state.response} /> : total_count === 0 ? <div className="justify-content-center py-4"><h4>No results found.</h4></div> : repository ? 
                <div> { repository.map((repo) => 
                    <Repo  repo={repo} key={repo.id} /> )}
                    <Paging  _component={'users/repo'} total_count={total_count} params={this.props.match.params} />
                </div> : ''
             }
        </div>
         );
    }
}
 
export default UserRepo;