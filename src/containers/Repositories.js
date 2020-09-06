import React, { Component } from 'react';
import Repo from '../components/Repo';
import Loader from '../components/loader';
import Paging from '../components/paging';
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
            res = await fetch(`https://api.github.com/search/repositories?q='${query}&per_page=10&page=${this.props.match.params.page}`, settings);
        else res = await fetch(`https://api.github.com/search/repositories?q=${query}&per_page=10&page=${this.props.match.params.page}`);
        const json = await res.json();
        console.log(json);
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