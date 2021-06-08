import './App.css';
import React, { Component } from 'react'
//import io from 'socket.io-client'
import Chat from './chat'
import Board from './board'

// let BASEURL = ''
//
// if (process.env.NODE_ENV === 'development') {
//   BASEURL = 'http://localhost:8000/'
// } else {
//   BASEURL = "https://back-end-444.herokuapp.com/"
// }

const BASEURL = "https://back-end-444.herokuapp.com/"

console.log(BASEURL, " this the url from app.js")

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            name:'Conner',
            base: BASEURL,
            userURL: 'api/v1/users/',
            user:'',
            user2:'',
            out: true, // this says if the user is logged in.
            email:'',
            uname: '',
            pass:'',
            darkMode: false,
            numberOfUsers: 0,
            listOfUsers: [],
            editUser: {},
            toggleModal: false,
            showU: false,
            username1: '',
            username2: '',
            email: '',
            password: '',
            togModal: false,
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
        console.log(this.state.base + this.state.userURL + 'register');
        const url = this.state.base + this.state.userURL + 'register'
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
        const url = this.state.base + this.state.userURL + 'login'
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
            //console.log(parsedResponse.data)
            if (response.status === 200) {
                this.setState({
                    user: parsedResponse.data,
                    out: true,
                    username1: parsedResponse.data.username,
                })
            }
        }
        catch(err){
          console.log('Error => ', err);
        }
        //console.log(this.state.user)
    }

    // user 2
    onLoginSubmit2 = async (event) => {
        event.preventDefault()
        if (event.target.email.value === '') {
            alert('Fill out the form please')

        }
        const url = this.state.base + this.state.userURL + 'login'
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
                    user2: parsedResponse.data,
                    out: true,
                })
            }
        }
        catch(err){
          console.log('Error => ', err);
        }
        //console.log(this.state.user)
    }

    logOut = async (e) => {
        console.log("logging out")
        e.preventDefault()
        const url = this.state.base + this.state.userURL + 'logout'
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

    fetchInfo = () => {
        //console.log(this.state.base + this.state.userURL);
        fetch(this.state.base + this.state.userURL, {
            credentials: 'include',
            method: 'GET',
            headers: {
                'Content-Type' : 'application/json'
            },
        })
        .then(res => {return res.json()
        }).then(data => {
            //console.log(data.data)
            this.setState({
                listOfUsers: data.data,
          })
        })
    }
    addUser = (newUser) => {
        const copyUsers = [...this.state.listOfUsers]
        copyUsers.push(newUser)
        this.setState({
            listOfUsers: copyUsers
        })
        console.log(this.state.listOfUsers[this.state.listOfUsers.length -1])
        this.componentDidMount()
    }
    showEdit = (user) => {
        console.log("Edit Clicked")
        //console.log(dog);
        this.setState({
            togModal: true,
            username: user.username,
            email: user.email,
            password: user.password,
            editUser: user,
        })
    }
    handleSubmit = async (e) => {
        e.preventDefault()
        console.log(this.state.base + this.state.userURL + this.state.editUser.id)
        const url = this.state.base + this.state.userURL + this.state.editUser.id
        try{
            const response = await fetch (url, {
                credentials: 'include',
                method: 'PUT',
                body: JSON.stringify({
                    username: e.target.username.value,
                    email: e.target.email.value,
                    password: e.target.password.value,
                }),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            if (response.status === 200) {
                const updatedUser = await response.json()
                const  findIndex = this.state.listOfUsers.findIndex(user => user.id === updatedUser.data.id)
                const copyUsers = [...this.state.listOfUsers]
                copyUsers[findIndex] =  updatedUser.data
                this.setState({
                    listOfUsers: copyUsers,
                    togModal: false,
                })
            }
        }
        catch(err){
          console.log('Error => ', err);
        }
        console.log(this.state.listOfUsers+ " updated user")
    }
    deleteUser = async (id) => {
        const url = this.state.base + this.state.userURL + id
        try{
            const response = await fetch(url, {
                credentials: 'include',
                method: 'DELETE',
            })
            if (response.status === 200) {
                const findIndex = this.state.listOfUsers.findIndex(user => user.id === id)
                const copyUsers = [...this.state.listOfUsers]
                copyUsers.splice(findIndex,1)
                this.setState({
                    listOfUsers: copyUsers
                })
            }
        }
        catch(err){
            console.log(err)
        }
    window.location.reload(false)// maybe I can call componentDidMount()..?
    }
    toggleUsers = () => {
        //console.log('clicked')
        if (this.state.showU){
            this.setState({
                showU: false,
            })
        } else {
            this.setState({
                showU: true,
            })
        }
        this.componentDidMount()
    }

    componentDidMount(){
        this.fetchInfo()
        //console.log("fetchedinfo")
        //console.log(this.state.listOfUsers)
    }

    render() {
        return (
            <div className={this.state.darkMode ? "DARKApp" : "App"}>
                <div className={this.state.darkMode ? 'DARKnav' : "nav"}>
                    <h1 className={this.state.darkMode ? 'DARKh1' : "h1"}>Checkers</h1>
                    <button onClick={this.toggle}>Darkmode</button>
                    {this.state.out ?
                        <div>
                        <button onClick={this.logOut}>Logout</button>
                        <p className={this.state.darkMode ? "DARKun1" : "un1"}>Player 1:{this.state.user.username}</p>
                        <p className={this.state.darkMode ? "DARKun1" : "un1"}>Player 2:{this.state.user2.username}</p>
                        </div>
                        :

                        <div></div>
                    }
                </div>

            { this.state.out ? <div>


                <div className="center">

                <Board user={this.state.user.username}/>
                <Chat  user={this.state.user.username} />
                </div>

                </div> :

                <div className={this.state.darkMode ? "DARKallForms" :"allForms"}>

                <div className={this.state.darkMode ? "DARKloginForm" :'loginForm'}>
                    <h1>Login User: 1</h1>
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

                <div className={this.state.darkMode ? "DARKloginForm2" :'loginForm2'}>
                    <h1>Login User: 2</h1>
                    <form className={this.state.darkMode ? "DARKforms":"forms"} onSubmit={this.onLoginSubmit2}>
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

            <div>
                <button className="userButton" onClick={this.toggleUsers}>View All users</button>

            {this.state.showU ?
                <div>
                {this.state.listOfUsers.map(user => {
                    return (
                        <ul key={user.id}>
                            <li>UserName:{user.username}</li>
                            <li>Id:{user.id}</li>
                            <li>Email:{user.email}</li>
                            <li>Pass:{user.password}</li>
                            <li className="delbut" onClick={()=> this.deleteUser(user.id)}>Delete</li>
                            <li className="edbut" onClick={()=> this.showEdit(user)}>Edit</li>
                            <br></br>
                        </ul>
                    )
                })
            } </div> :
                <div>Add User First</div>
                }
                </div>

                {this.state.togModal ?
                    <div>
                        <h1>Edit User</h1>
                        <form onSubmit={this.handleSubmit}>
                            <label>Name:</label>
                            <input name='username' value={this.state.username} onChange={this.handleChange} ></input>

                            <label>Email:</label>
                            <input name='email' value={this.state.email} onChange={this.handleChange} ></input>

                            <label>Pass:</label>
                            <input name='password' value={this.state.password} onChange={this.handleChange}  ></input>

                            <input type='submit'></input>
                        </form>
                    </div>
                    : <div></div>
                }

                <div className='foot'>Footer</div>
            </div>
        )
    }
}
