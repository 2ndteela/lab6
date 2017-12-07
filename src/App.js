import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { Home } from './comps/home';
import { NewUser } from './comps/new-user/index';
import { Profile } from './comps/profile';

let thisState = {       
  password: '',
  email: ''
}
let thisCall
let changeEmail
let changePassword

const profileCaller = () => <Profile info={thisState} />
const newCaller = () => <NewUser callBack={thisCall} />
const homeCaller = () => <Home email={changeEmail} pass={changePassword} info={thisState} />

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
        password: '',
        email: ''
    }
    thisState = this.state
    this.updateState = this.updateState.bind(this)
    this.updateEmail = this.updateEmail.bind(this)
    this.updatePassword = this.updatePassword.bind(this)
    changePassword = this.updatePassword
    changeEmail = this.updateEmail
    thisCall = this.updateState
  }
  updateState(newState) {
    this.setState = {
      user: newState
    }
    thisState = newState
  }

  updateEmail(newEmail) {
    this.setState({
      email: newEmail
    })
    thisState = this.state
  }

  updatePassword(newPassword) {
    this.setState({
      password: newPassword
    })
    thisState = this.state
  }

  render() {
    return (
      <div className="App">
      <Router>
        <div>
          <Route exact path='/' component={homeCaller}></Route>
          <Route path='/new-user' component={newCaller}/>
          <Route path='/profile' component={profileCaller} />
        </div>
      </Router>
      </div>
    );
  }
}

export default App;
