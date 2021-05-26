import './App.css';
import React, { Component } from 'react'
//import io from 'socket.io-client'
import Chat from './chat'
import Board from './board'



export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'Conner',
            userURL: 'http://localhost:8000/api/v1/users/',
            user: '',
            email:'',
            uname: '',
            pass:'',
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    // Create new user
    newUserSubmit = async (event) => {
        console.log("new user submit clicked");
        event.preventDefault()
        const url = this.state.userURL + 'register'
        try{
            const loginResponse = await fetch (url, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    email:    event.target.email.value,
                    username: event.target.username.value,
                    password: event.target.password.value,
                }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            const parsedResponse = await loginResponse.json()
            console.log(parsedResponse)
            if (loginResponse.status === 200) {
                this.setState({
                    user: parsedResponse.data
                })
                // clear the input form after submission.

            }
        }
        catch(err){
          console.log('Error => ', err);
        }
    }

    //login
    onLoginSubmit = async (event) => {
        event.preventDefault()
        if (event.target.email.value === '') {
            alert('Fill out the form please')

        }
        const url = this.state.userURL + 'login'
        try {
            const response = await fetch (url, {
                credentials: 'include',
                method: 'POST',
                body: JSON.stringify({
                    email:    event.target.email.value,
                    username: event.target.username.value,
                    password: event.target.password.value,
                }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            const parsedResponse = await response.json()
            console.log(parsedResponse.data)
            if (response.status === 200) {
                this.setState({
                    user: parsedResponse.data,
                })
            }
        }
        catch(err){
          console.log('Error => ', err);
        }
        console.log(this.state.user)
    }













    render() {
        return (
            <div className="App">
                <h1>Checkers</h1>
                <Board />

                <Chat />

               <div className="allForms">

                <div className='loginForm'>
                    <h1>Login</h1>
                    <form className="forms" onSubmit={this.onLoginSubmit}>
                        <label>Email:</label>
                        <input onChange={this.handleChange} name='email' ></input>
                        <br></br>
                        <label>Username:</label>
                        <input name='username' onChange={this.handleChange} ></input>
                        <br></br>
                        <label>Password:</label>
                        <input name='password' onChange={this.handleChange} type='password'></input>
                        <br></br>
                        <div className="s">
                        <input className="submit" type='submit' value='Login'></input>
                        </div>
                    </form>
                </div>

                <div className="spacer"></div>

                <div className='newUserForm'>
                <h1>Create User</h1>
                    <form className="forms" onSubmit={this.newUserSubmit}>
                        <label>Email:</label>
                        <input onChange={this.handleChange} name='email' value={this.state.email} ></input>
                        <br></br>
                        <label>Username:</label>
                        <input onChange={this.handleChange} name='username'  ></input>
                        <br></br>
                        <label>Password:</label>
                        <input onChange={this.handleChange} name='password' type='password'  ></input>
                        <br></br>
                        <div className="s">
                        <input className="submit" type='submit' value='Create'></input>
                        </div>
                    </form>
                </div>
                </div>

            </div>
        )
    }
}
