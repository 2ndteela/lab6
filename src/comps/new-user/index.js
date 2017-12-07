import React, { Component } from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export class NewUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isAdded: false,
            show: false,
            message: ''
        }
    }
    Modal = () => {
        if(this.state.show) {
            if(this.state.isAdded) {
                return (
                    <div id='added-modal-container'>
                        <div id='added-modal'>
                            <h1>You're in!</h1>
                            <NavLink to='/profile'>Go to your Profile</NavLink>
                        </div>
                    </div>
                )
            }
            else {
                return (
                    <div id='added-modal-container'>
                        <div id='added-modal'>
                            <h1>{this.state.message}</h1>
                            <button onClick={() => this.setState({show: false})}>Okay</button>
                        </div>
                    </div>
                )
            }
        }
        else return null;
    }
    sendNew() {
        const inputs = document.querySelectorAll('input')
        const toSend = {
            username: inputs[0].value,
            password: inputs[1].value,
            email: inputs[2].value,
            color: '#' + inputs[3].value
        }
        axios.post(`http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:3000/`, toSend)
        .then((res, req, err) => {
            console.log(res.data)
            this.setState({
                show: true,
                message: res.data.message
            })
            if(res.data.test) this.setState({ isAdded: true })
            else this.setState({ isAdded: false })
            this.props.callBack(toSend)
        })
    }
    render() { 
        return ( 
        <div>
            <div className="header">
                <h1>Create a new user</h1>
            </div>
            <div id='new-user-container'>
                <div id='new-user-data'>
                    <input placeholder='Username'/>
                    <input placeholder='Password'/>
                    <input placeholder='Email'/>
                    <input placeholder='Color Hex-code W/o #'/>
                    <button onClick={() => this.sendNew()}>Sign me up!</button>
                </div>
            </div>
            {this.Modal()}
        </div> 
        )
    }
}
 
export default NewUser;