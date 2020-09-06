import React, { Component } from 'react';
class Token extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            token: ''
         }
         this.handleChange = this.handleChange.bind(this);
         this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        localStorage.setItem('token', this.state.token);
        this.props.history.push("/");
    }
    handleChange(e) {
        e.preventDefault();
        this.setState({
            token: e.target.value
        });
    }
    render() { 
        return ( 
            <form className="input-group mb-2 col-xl-6 col-12 row mx-auto mt-lg-5 border bg-blue text-light p-4 rounded" onSubmit={this.handleSubmit}>
                <h5 className="col-12">Insert your token</h5>
            <div className="input-group-prepend col-xl-4 col-4 justify-content-end pr-0 mb-4">
              <div className="input-group-text">Token</div>
            </div>
            <input type="text" className="form-control col-lg-6 col-6 mb-4" id="inlineFormInputGroup" value={this.state.token} onChange={this.handleChange} placeholder="ex. de3e35c0fb6c1a21263g5bc28125bbgp9c21182z" />
            <div className="col-12 mt-2 mb-2"><button type="submit" className="btn btn-light">Submit</button></div>
          </form> );
    }
}
 
export default Token;