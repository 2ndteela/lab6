import React, { Component } from 'react';
import axios from 'axios';

export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            isAuth: false,
            newColor: ''
        }
    }
    componentWillMount() {
        const toSend = this.props.info
        axios.post('http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:3000/login', toSend)
        .then((res, req, err) => {
            if(res.data.isAuth) {
                this.setState ({
                    user: res.data.user,
                    isAuth: true
                })
                document.querySelector('.header').style.backgroundColor = `#${this.state.user.color}`
            }
            else {
                this.setState({
                    message: res.data.message
                })
            } 

        })
    }

    updateColor(e) {
        this.setState({
            newColor: e.target.value
        })
        document.getElementById('sample-color').style.backgroundColor = `#${e.target.value}`
        document.getElementById('save-color').style.display = 'flex'
    }

    saveColor() {
       const toSend = {
            email: this.state.user.email,
            color: "#"+this.state.newColor
        }
        axios.put('http://ec2-52-38-205-4.us-west-2.compute.amazonaws.com:3000/new-color', toSend)
        .then((res, req, err) => {
        })
    }

    render() {
            if(this.state.isAuth) {
        return ( 
            <div>
                <div className='header'>
                    <h1>Welcome Back {this.state.user.username}</h1>
                </div>
                <div id='profile-stuff'>
                <p>You said your favorite color was: <strong>{this.state.user.color}</strong></p>
                <p>You can pick a new one here</p>
                <input placeholder='Color Hex Code W/o #' value={this.state.newColor} onChange={(e)=> this.updateColor(e)}  />
                <div id='sample-color'><h1>Preview</h1></div>
                <button id='save-color' onClick={()=> this.saveColor()}>Save new color</button>
                </div>
            </div> 
            )
            }
        else return <h1>{this.state.message}</h1>
    }
}
 
export default Profile;