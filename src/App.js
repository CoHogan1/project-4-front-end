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
            out: true,
            email:'',
            uname: '',
            pass:'',
            darkMode: false,
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
            if (loginResponse.status === 201) {
                this.setState({
                    user: parsedResponse.data
                })
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
                    out: true,
                })
            }
        }
        catch(err){
          console.log('Error => ', err);
        }
        console.log(this.state.user)
    }

    logOut = async (e) => {
        console.log("logging out")
        e.preventDefault()
        const url = this.state.userURL + 'logout'
        const resp = await fetch(url ,{
            credentials: 'include',
            method: "DELETE",
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        if (resp.status === 2000) {
            this.setState({
                user: '',
            })
        }
    }



    toggle = () => {
        if (this.state.darkMode) {
            this.setState({
                darkMode: false,
            })
            //console.log(this.state.darkMode);
        } else {
            this.setState({
                darkMode: true
            })
            //console.log(this.state.darkMode);
        }
    }

    render() {
        return (
            <div className={this.state.darkMode ? "DARKApp" : "App"}>
                <div className={this.state.darkMode ? 'DARKnav' : "nav"}>
                    <h1>Checkers</h1>
                    <button onClick={this.toggle}>Darkmode</button>
                </div>

            { this.state.out ? <div>

                <Board darkMode={this.state.darkMode}/>
                <Chat darkMode={this.state.darkMode}/>

                <button onClick={this.logOut}>Logout</button>
                </div> :




                <div className={this.state.darkMode ? "DARKallForms" :"allForms"}>

                <div className={this.state.darkMode ? "DARKloginForm" :'loginForm'}>
                    <h1>Login</h1>
                    <form className={this.state.darkMode ? "DARKforms":"forms"} onSubmit={this.onLoginSubmit}>
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
                        <input className={this.state.darkMode? "DARKsubmit" :"submit"} type='submit' value='Login'></input>
                        </div>
                    </form>
                </div>

            <div className={this.state.darkMode? "DARKspace":"spacer"}></div>

                <div className={this.state.darkMode? "DARKnewUserForm" :'newUserForm'}>
                <h1>Create User</h1>
                    <form className={this.state.darkMode ? "DARKforms":"forms"} onSubmit={this.newUserSubmit}>
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
                        <input className={this.state.darkMode? "DARKsubmit" :"submit"} type='submit' value='Create'></input>
                        </div>
                    </form>
                </div>
            </div> }




            </div>
        )
    }
}
