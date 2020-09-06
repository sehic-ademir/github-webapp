import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            search: '',
            searchPrefixOptions: ['repository', 'users'],
            searchPrefix: ''         
        }
         this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.setState({
            searchPrefix: this.state.searchPrefixOptions[0]
        });
    }
    handleChange(e){
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    
    render() { 
        const searchValue = this.state.search;
        const searchPrefix = this.state.searchPrefix;
        const searchPrefixOptions = this.state.searchPrefixOptions;
        let isValidSearch = false;
            if(searchValue && searchPrefix)
                isValidSearch = true;

        return ( 
            <div className="bg-dark py-2 col-lg-12 col-12 row no-gutters">
                <div className="col-xl-1 col-lg-2 col-md-4 col-4 mx-auto mx-lg-0 mb-3 mb-lg-0">
                    <Link to="/"><img src="/logo.png" className="img-fluid w-25" alt="logo" /></Link>
                </div>
                <div className="col-xl-3 col-lg-5 col-md-3 my-2 my-lg-0">
                    <Link to="/insert/token"><button className="btn btn-light">No results? Enter your token here!</button></Link>
                </div>
            <form className="col-lg-4 mx-auto mx-md-0 ml-md-auto offset-md-4 col-12 row text-center" >
                <select onChange={this.handleChange} name="searchPrefix" className="form-control col-xl-4 col-lg-3 col-12 mb-2 mb-md-0 text-capitalize mx-auto">
                    { searchPrefixOptions.map((searchPrefixOption) =>
                        <option key={searchPrefixOption} value={searchPrefixOption} >{searchPrefixOption}</option>
                    )}
                </select>
			    <input type="text" id="searchUser" className="form-control col-xl-5 col-lg-4 col-12 ml-1 mx-auto my-2 my-lg-0"  placeholder={"Search " + searchPrefix} value={searchValue} name="search" onChange={this.handleChange} required />
                <Link className="col-xl-2 col-lg-3 col-12 ml-md-1 my-2 my-md-0 no-bg"  to={isValidSearch ? `/${searchPrefix}/${searchValue}/1` : ''}><button className="btn btn-light">Search</button></Link>
		    </form>
            </div>
         );
    }
}
 
export default SearchBox;