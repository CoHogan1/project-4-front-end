import './App.css';
import React, { Component } from 'react'
import io from 'socket.io-client'
// socketIO
const ENDPOINT = "http://localhost:8000";
const socket = io.connect(ENDPOINT)

//const orderNamespace = io.of("/move")

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
        let playerNum = gameBoard[index][i] // 1 for player 1, 2 for player 2
        this.setState({
            firstStart: index,
            firstEnd: i,
            player: playerNum
        })
    }


    mouseUp = (index, i) => {
        console.log(`${index}, ${i}, end pos`)
        if (this.state.player === 1) {
            let copyBoard = [...this.state.board]
            copyBoard[this.state.firstStart][this.state.firstEnd] = 4
            copyBoard[index][i] = 1
            this.setState({
                board: copyBoard
            })
        } else {
            let copyBoard = [...this.state.board]
            copyBoard[this.state.firstStart][this.state.firstEnd] = 4
            copyBoard[index][i] = 2
            this.setState({
                board: copyBoard
            })
        }


        // if (index !== this.state.firstStart + 1) { // need to clear first state.
        //     console.log(index)
        //     console.log("invalid move")
        //     return
        // }
        //
        // // if (i !== this.state.firstEnd + 1 || i !== this.state.firstEnd - 1) {
        // //
        // // }
        //
        // if (this.state.board[index][i] !== 2) {
        //     console.log("open position")
        // } else {
        //     console.log("player two is there")
        // }

        // this.setState({
        //     secondStart: index,
        //     secondEnd: i,
        //     move: true,
        // })
    }

    sendMove = () => {
        if (this.state.secondEnd === '') {
            return this.selectAMove()
        }
        let copyBoard = [...this.state.board]
        copyBoard[this.state.firstStart][this.state.firstEnd] = 4
        copyBoard[this.state.secondStart][this.state.secondEnd] = 1
        this.setState({
            move: false,
            board: copyBoard,
            firstStart: '',
            firstEnd: '',
            secondStart: '',
            secondEnd: '',
        })
        //console.log(this.state.board);
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
                <button onClick={this.state.move ? this.sendMove : this.selectAMove}>Send Move</button>
                <button onClick={this.togCol}>Game Colors</button>


                <div className="board">
                    {
                        this.state.board.map((row, index) => row.map((square, i) => {
                        if (square === 0){
                            return     <div key={index + " " + i} className={this.state.colors ? "NEWred" :"red"} onMouseDown={()=> this.mouseDown(index, i)} ></div>
                        } else {
                            if (square === 1) {
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseUp={()=> this.mouseUp(index, i)}><div key={'red'} onMouseDown={()=> this.mouseDown(index, i)} className={this.state.colors ? "NEWplayer1" :"player1"}>x</div></div>
                            } else if (square === 2) {
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseUp={()=> this.mouseUp(index, i)}><div key={'black'} onMouseDown={()=> this.mouseDown(index, i)} className={this.state.colors ? "NEWplayer2" :"player2"}>y</div></div>
                            } else {
                            return     <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseUp={()=> this.mouseUp(index, i)}></div>
                            }
                        }
                    }))}
                </div>
            </div>
        )
    }
}
