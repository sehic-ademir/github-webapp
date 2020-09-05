import React, { Component } from 'react';
import './loader.css';
class Loader extends Component {


    render() { 
        return ( <div> {this.props.response !== 422 ? <div className="loader mx-auto mt-5"></div> : '' }</div>);
    }
}
 
export default Loader;