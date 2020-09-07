import React, { Component } from 'react';
import Loader from '../components/loader';
import User from '../components/User';
import Paging from '../components/paging';
import { GithubRequests } from '../components/helpers/GithubRequests';
class Following extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            users: '',
            response: '',
            total_count: ''
         }
    }
    componentDidMount() {
       this.callUsers();
    }
    componentDidUpdate(prevProps, prevState) {
        if(prevProps.match.params.id !== this.props.match.params.id)
            this.callUsers();

        if(prevProps.match.params.page !== this.props.match.params.page)
        this.callUsers  ();
            
    }
    async callUsers(){
    const query = this.props.match.params.id;
    let params = {
        url: 'user-followers',
        keyword: query,
        page: this.props.match.params.page
    };
    const res = await GithubRequests(params);
    const json = await res.json();
    if(res.status !== 403 && res.status !== 404)
    this.setState({
        users: json,
        response: res
    });
    this.callPages();
    }
    async callPages(){
        const query = this.props.match.params.id;
        let params = {
            url: 'user-followers',
            keyword: query,
            page: ''
        };
        const res = await GithubRequests(params);
        const json = await res.json();
        this.setState({
            total_count: json.length || 0
        });
    }
    render() { 
        const users = this.state.users;
        const total_count = this.state.total_count;
        return ( 
            <div className="bg-light h-100">
                <div className=" py-4 justify-content-center">
                { total_count === ''  ? 
                <Loader className="justify-content-center" response={this.state.response}  /> :  total_count === 0 ? <div className="col-12 justify-content-center py-4"><h4>No results found.</h4></div> : users ?
                <div>
              {  users.map((user) => 
                    <User id={user.login} key={user.login} />
                    )}
                      <Paging  _component={'users/following'} total_count={total_count} params={this.props.match.params} />
               
                </div>   : ''}
            </div>
            </div>
         );
    }
}
 
export default Following;