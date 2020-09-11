import React, { Component } from 'react';
import User from '../components/User';
import Loader from '../components/loader';
import Paging from '../components/paging';
import {  getUsers } from '../components/helpers/GithubRequests';
class Users extends Component {
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
            this.callUsers();  
    }
    async callUsers(){
        this.setState({
            total_count: ''
        });
        const query = this.props.match.params.id;
        const res = await getUsers(query, this.props.match.params.page);
        const json = await res.json();
        this.setState({
            users: json,
            response: res,
            total_count: json.total_count
        });
    }
    render() { 
        const users = this.state.users.items;
        const total_count = this.state.total_count;
        return ( 
            <div className="bg-light h-100">
                <div className=" py-4 justify-content-center">
                { total_count === ''  ? 
                <Loader className="justify-content-center" response={this.state.response}  /> :  total_count === 0 ? <div className="col-12 justify-content-center py-4"><h4>No results found.</h4></div> : users ?
                    <div>
                        {  users.map((user) => 
                        <div className="px-0 mx-md-auto col-xl-8 col-lg-10 col-md-12 col-12">
                            <User id={user.login} key={user.login} /> 
                        </div>
                        )}
                        <Paging  _component={'users'} total_count={this.state.users.total_count} params={this.props.match.params} />
                
                    </div>   : ''}
                </div>
            </div>
         );
    }
}
 
export default Users;