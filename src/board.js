import './App.css';
import React, { Component } from 'react'
import io from 'socket.io-client'
// socketIO

// for local
// let ENDPOINT
//
// if (process.env.NODE_ENV === 'development') {
//   ENDPOINT = 'http://localhost:8000/'
// } else {
//   ENDPOINT = "https://back-end-444.herokuapp.com/"
// }


// for heroku
const ENDPOINT = "https://back-end-444.herokuapp.com/"

const socket = io.connect(ENDPOINT)

console.log(ENDPOINT, " this is the url from board.js")

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
                colors: false,
                dark: this.props.darkMode,
                player: 1,
                oneLeft: 12,
                twoLeft: 12,
            }
        }

    getOpponentsMoves = () => {
        socket.on('move', move => {
            this.setState({
                board: move
            })
        })
    }

    checkWinner = () => {
        this.state.board.map((row, index) => row.map((square, i) => {
            if (this.state.board[index][i] !== 1){
                console.log("Player 2 wins!")
            }
            if (this.state.board[index][i] !== 2) {
                console.log("Player 1 wins")
            }
        }))
    }

    componentDidMount(){
        this.getOpponentsMoves()
    }

    //===================================================Board movement=========
    mouseDown = (index, i) => {
        //console.log(`${index}, ${i}, start pos ${this.state.player}`)
        let playerNum = this.state.board[index][i] // chose player number // eithe 1, 2 for nor or 5, 6 for kings
        this.setState({
            firstStart: index,
            firstEnd: i,
            player: playerNum
        })
    }

    mouseUp = (index, i) => {
        //console.log(`${index}, ${i}, end pos ${this.state.player}`)
        if (this.state.oneLeft === 0 || this.state.twoLeft === 0 ){
            console.log("Game over")
            if (this.state.oneLeft === 0){
                this.setState({
                    board: gameBoard,
                    oneLeft: 12,
                    twoLeft: 12,
                })
                return alert("Player 2 wins!")
            } else {
                this.setState({
                    board: gameBoard,
                    oneLeft: 12,
                    twoLeft: 12,
                })
                return alert("Player 1 wins!")
            }
        }
        let copyBoard = [...this.state.board] // define now and not in every statement
        this.setState({
            secondStart: index,
            secondEnd: i,
        }) // cannot access these variables in this function.

        if (this.state.board[index][i] !== 1 && this.state.board[index][i] !== 2) {
            // square is empty allow piece to move.
            if (index > this.state.firstStart + 1 || index < this.state.firstStart - 1 || index === this.state.firstStart){
                return alert('Invalid move ;)')
            }
            copyBoard[this.state.firstStart][this.state.firstEnd] = 4
            copyBoard[index][i] = this.state.player // new square is now player
            this.setState({
                board: copyBoard,
            })

        } else {// square is occupied, check jump square to see if jummp possible.
            if (this.state.player === 1){ // player 1 movement is diff // or king piece number
                if (i === this.state.firstEnd + 1) {// player is jumping right
                    console.log("player 1 jump right") // end pos == secS +1 secE +1
                    if (this.state.board[index + 1][i +1] !== 1 && this.state.board[index + 1][i +1] !== 2) { // or king pieces
                        copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // remove start player
                        copyBoard[index][i] = 4 // remove jumped char
                        copyBoard[index + 1][i +1] = this.state.player // set end  pos to char

                        this.setState({
                            board: copyBoard,
                            twoLeft: this.state.twoLeft -1,
                        })
                    }
                } else {// player is jumping left
                    console.log("player 1 jump left")
                    if (this.state.board[index + 1][i - 1] !== 1 && this.state.board[index + 1][i - 1] !== 2) { // or king pieces
                        copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // remove start player
                        copyBoard[index][i] = 4 // remove jumped char
                        copyBoard[index + 1][i - 1] = this.state.player // set end  pos to char

                        this.setState({
                            board: copyBoard,
                            twoLeft: this.state.twoLeft -1,
                        })
                    }
                }
            } else if (this.state.player === 2){ // this.state.player === 2
                if (i === this.state.firstEnd - 1) {
                    console.log("p2 moving left")
                    if(this.state.board[index -1 ][i -1] !== 1 && this.state.board[index -1][i -1] !== 2) { // or king pieces
                        // square is empty allow jump
                        console.log("jumping left")
                        copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // remove start player
                        copyBoard[index][i] = 4 // remove jumped char

                        copyBoard[index - 1][i - 1] = this.state.player

                        this.setState({
                            board: copyBoard,
                            oneLeft: this.state.oneLeft - 1
                        })
                    } else {
                        return alert('invalid move')
                    }
                } else {
                    // moving right
                    if(this.state.board[index -1][i +1] !== 1 && this.state.board[index -1][i +1] !== 2){ // or king pieces
                        console.log("p2 jumping right")
                        copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // remove start player
                        copyBoard[index][i] = 4 // remove jumped char

                        copyBoard[index - 1][i +1] = this.state.player

                        this.setState({
                            board:copyBoard,
                            oneLeft: this.state.oneLeft - 1
                        })
                    } else {
                        return alert("incorrect move")
                    }
                }
            } else {
                console.log("this.state.player is reading something weird..")
                console.log(this.state.player)
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
                            return     <div key={index + " " + i} className={this.state.colors ?  "NEWred" : "red"  }></div>
                        } else {
                            if (square === 1) {
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseUp={()=> this.mouseUp(index, i)}><div key={'red'}   onMouseDown={()=> this.mouseDown(index, i)} className={this.state.colors ? "NEWplayer1" : "player1"}></div></div>
                            } else if (square === 2) {
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseUp={()=> this.mouseUp(index, i)}><div key={'black'} onMouseDown={()=> this.mouseDown(index, i)} className={this.state.colors ? "NEWplayer2" : "player2"}></div></div>
                            } else if (square === 5){
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseUp={()=> this.mouseUp(index, i)}><div key={'black'} onMouseDown={()=> this.mouseDown(index, i)} className={this.state.colors ?  "NEWking1"  :  "king1" }></div></div>
                            }else if ( square === 6){
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseUp={()=> this.mouseUp(index, i)}><div key={'black'} onMouseDown={()=> this.mouseDown(index, i)} className={this.state.colors ?  "NEWking2"  :  "king2" }></div></div>
                            }else {
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseUp={()=> this.mouseUp(index, i)}></div>
                            }
                        }
                    }))}
                </div>
            </div>
        )
    }
}
