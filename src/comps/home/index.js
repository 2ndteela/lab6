import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './style.css'

export class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: ''
         }
    }

    email(e) {
        this.setState({
            email: e.target.value
        })
        this.props.email(e.target.value)
    }

    password(e) {
        this.setState({
            password: e.target.value
        })
        this.props.pass(e.target.value)
    }

    render() { 
        return (
            <div>
        <div className='header'>
        <h1>Firebase Authenication</h1>
      </div>
      <div id="container">
        <div id='sign-in'>
            <input placeholder='Email' value={this.state.email} onChange={(e)=> this.email(e)}/>
            <input placeholder='Password' value={this.state.password} onChange={(e)=> this.password(e)} onBlur={(e)=> this.password(e)}/>
            <div id="sign-in-buttons">
              <NavLink to='/profile'>Sign in</NavLink>
              <NavLink to='/new-user'>Create User</NavLink>
            </div>
        </div>
      </div>
      </div> 
       )
    }
}
 
export default Home;