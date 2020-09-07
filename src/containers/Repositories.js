import React, { Component } from 'react';
import Repo from '../components/Repo';
import Loader from '../components/loader';
import Paging from '../components/paging';
import { GithubRequests } from '../components/helpers/GithubRequests';
class Repositories extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            repos: '',
            page: this.props.match.params.page,
            query: this.props.match.params.id,
            response: '',
            total_count: ''
         }
    }
    componentDidMount() {
        const query = this.props.match.params.id;
        this.callRepos(query);
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.id !== this.props.match.params.id)
            this.callRepos(this.props.match.params.id);
        if(prevProps.match.params.page !== this.props.match.params.page)
            this.callRepos(this.props.match.params.id);
    }
    async callRepos(query) {
        window.scrollTo(0, 0);
        let params = {
            url: 'repositories',
            keyword: this.props.match.params.id,
            page: this.props.match.params.page
        };
        const res = await GithubRequests(params);
        const json = await res.json();
        this.setState({
            repos: json,
            response: res,
            total_count: json.total_count
        });
    }
    render() { 
        const repos = this.state.repos.items;
        const total_count = this.state.total_count;
        return ( 
            <div>
                { total_count > 0 ? <div> { repos.map((repo) => 
               <Repo  repo={repo} key={repo.id} /> )}
               <Paging  _component={'repository'} total_count={this.state.repos.total_count} params={this.props.match.params} />
                </div>
                 : total_count === 0 ? <div className="justify-content-center py-4"><h4>No results found.</h4></div> : <Loader response={this.state.response}  /> }
            </div>
         );
    }
}
 
export default Repositories;