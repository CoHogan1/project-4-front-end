import './App.css';
import React, { Component } from 'react'
import io from 'socket.io-client'
// socketIO

let ENDPOINT = ''

if (process.env.NODE_ENV === 'development') {
  ENDPOINT = 'http://localhost:8000/'
} else {
  ENDPOINT = "https://back-end-444.herokuapp.com/"
}

const socket = io.connect(ENDPOINT)

const gameBoard = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [3, 0, 3, 0, 3, 0, 3, 0],
  [0, 3, 0, 3, 0, 3, 0, 3],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
]

export default class Board extends Component {
    constructor(props){
        super(props)
            this.state= {
                board: gameBoard,
                firstStart: '',
                firstEnd: '',
                secondStart: '',
                secondEnd: '',
                move: false,
                playerMove: [],
                colors: false,
                dark: this.props.darkMode,
                player: 0,
            }
        }

    getOpponentsMoves = () => {
        //console.log('clicked');
        socket.on('move', move => {
            //console.log(move)
            this.setState({
                board: move
            })
        })
        //console.log(this.state.board);
    }

    componentDidMount(){
        this.getOpponentsMoves()
        //console.log(this.state.board)
    }


    // comp will unmount
    componentWillUnmount(){
        //console.log("unmounting socketio.")
    }

    //===================================================Board movement=========
    mouseDown = (index, i) => {
        console.log(`${index}, ${i}, start pos`)
        let playerNum
        if(gameBoard[index][i] === 1 ){
            playerNum = true
        } else {
            playerNum = false
        }// true for player 1, false for player 2
        this.setState({
            firstStart: index,
            firstEnd: i,
            player: playerNum
        })
    }


    mouseUp = (index, i) => {
        console.log(`${index}, ${i}, end pos`)
        // saves values to state
        this.setState({
            secondStart: index,
            secondEnd: i,
        })
        // this choses the color
        if (this.state.player) { // player 1 turn - red
            if (this.state.board[index][i] === 2) { // there is oponent on square
                if (this.state.secondEnd === this.state.firstEnd + 1) {// player is moving right
                    if(this.state.board[index + 1 ][i + 1] !== 2 && this.state.board[index + 1 ][i + 1] !== 1) {// if jump possible
                        console.log("allowed jump to the right")
                        let copyBoard = [...this.state.board]
                        copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // previous position clear square
                        copyBoard[this.state.secondStart][this.state.secondEnd] = 4
                        copyBoard[index+1][i+1] = 1 // ending position to the right
                        this.setState({
                            board: copyBoard
                        })
                    } else {
                        // keep player turn
                        return alert("Cannot jump that piece")
                    }
                } else { // player is moving left
                    if (this.state.secondEnd === this.state.firstEnd - 1) {// player is moving left
                        if(this.state.board[index + 1 ][i - 1] !== 2 && this.state.board[index + 1 ][i - 1] !== 1) {// if jump possible
                            console.log("allowed jump to the right")
                            let copyBoard = [...this.state.board]
                            copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // previous position clear square
                            copyBoard[this.state.secondStart][this.state.secondEnd] = 4
                            copyBoard[index+1][i-1] = 1 // ending pos after jump
                            this.setState({
                                board:copyBoard
                            })
                        } else {
                            // keep player turn
                            return alert("Cannot jump that piece")
                        }
                    }
                }
            } else { // square is empty player can move there
                let copyBoard = [...this.state.board]
                copyBoard[this.state.firstStart][this.state.firstEnd] = 4
                copyBoard[index][i] = 1
                this.setState({
                    board: copyBoard
                })
            }

        } else { // player 2 logic 222222222222222222222222222222222222222222222
            if (this.state.player === false) {// player 2
                if (this.state.board[index][i] === 1) { // if lands on player
                    if (this.state.secondEnd === this.state.firstEnd - 1) {// player is moving left
                        if(this.state.board[index - 1 ][i - 1] !== 2 && this.state.board[index - 1 ][i - 1] !== 1) {// if jump possible
                            console.log("allowed jump to the left")
                            let copyBoard = [...this.state.board]
                            copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // previous position clear square
                            copyBoard[this.state.secondStart][this.state.secondEnd] = 4 // player removed
                            copyBoard[index-1][i-1] = 2 // ending position to the left player 2
                            this.setState({
                                board: copyBoard
                            })
                        } else {
                            // keep player turn
                            return alert("Cannot jump that piece")
                        }
                    } else {// moving to the right
                        if(this.state.board[index - 1 ][i + 1] !== 2 && this.state.board[index - 1 ][i + 1] !== 1) {// if jump possible
                            console.log("allowed jump to the right")
                            let copyBoard = [...this.state.board]
                            copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // previous position clear square
                            copyBoard[this.state.secondStart][this.state.secondEnd] = 4
                            copyBoard[index - 1][i + 1] = 2 // ending pos after jump
                            this.setState({
                                board:copyBoard
                            })
                        }

                    }
                } else { // no player on square
                    let copyBoard = [...this.state.board]
                    copyBoard[this.state.firstStart][this.state.firstEnd] = 4
                    copyBoard[index][i] = 2
                    this.setState({
                        board: copyBoard
                    })
                }
            }
        }
    }


    sendMove = () => {
        if (this.state.secondEnd === '') {
            return alert('Select a move please')
        }
        let copyBoard = [...this.state.board]
        this.setState({
            move: false,
            board: copyBoard,
            firstStart: '',
            firstEnd: '',
            secondStart: '',
            secondEnd: '',
        })
        socket.emit('move', copyBoard)
    }

    selectAMove = () => {
        alert("Please select a move")
    }

    togCol = () => {
        if (this.state.colors) {
            this.setState({
                colors: false,
            })
        } else {
            this.setState({
                colors: true,
            })
        }
    }
    //===================================================Board movement=========
    render(){
        return(
            <div className="board-container" >
                <div className={this.state.colors ? "NEWplayer1" :"player1"} >One</div>
                <div className={this.state.colors ? "NEWplayer2" :"player2"} >Two</div>
                <button onClick={this.sendMove}>Send Move</button>
                <button onClick={this.togCol}>Game Colors</button>

                <div className="board">
                    {
                        this.state.board.map((row, index) => row.map((square, i) => {
                        if (square === 0){
                            return     <div key={index + " " + i} className={this.state.colors ? "NEWred" :"red"}></div>
                        } else {
                            if (square === 1) {
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseUp={()=> this.mouseUp(index, i)}><div key={'red'}   onMouseDown={()=> this.mouseDown(index, i)} className={this.state.colors ? "NEWplayer1" : "player1"}></div></div>
                            } else if (square === 2) {
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseUp={()=> this.mouseUp(index, i)}><div key={'black'} onMouseDown={()=> this.mouseDown(index, i)} className={this.state.colors ? "NEWplayer2" : "player2"}></div></div>
                            } else {
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseUp={()=> this.mouseUp(index, i)}></div>
                            }
                        }
                    }))}
                </div>
            </div>
        )
    }
}
