import React, { Component } from 'react';
import './App.css';
import SearchBox from './components/SearchBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Users from './containers/Users';
import Repositories from './containers/Repositories';
import UserRepo from './containers/UserRepo';
import Followers from './containers/Followers';
import Following from './containers/Following';
import UserContainer from './containers/UserContainer';
import Home from './containers/Home';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }


  render() { 
    return ( 
      <div className="App">
        <BrowserRouter>
        <SearchBox/>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/user/:id" component={UserContainer}></Route>
            <Route exact path="/users/:id/:page" component={Users}></Route>
            <Route exact path="/repository/:id/:page" component={Repositories}></Route>
            <Route exact path="/users/repo/:id/:page" component={UserRepo}></Route>
            <Route exact path="/users/followers/:id/:page" component={Followers}></Route>
            <Route exact path="/users/following/:id/:page" component={Following}></Route>
          </Switch>
        </BrowserRouter>
    </div>
     );
  }
}
export default App;
