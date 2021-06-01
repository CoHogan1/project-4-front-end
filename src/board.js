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
                dark: this.props.darkMode
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
        console.log("unmounting socketio.")
    }

    //===================================================Board movement=========
    mouseDown = (index, i, event) => {
        //console.log('mouseDown');
        //console.log(index, i)
        // add a conditional to see which playe is moving.
         this.setState({
            firstStart: index,
            firstEnd: i,
        })
    }

    mouseUp = (index, i) => {
        //console.log('Mouse UP')
        //console.log(index, i)
        this.setState({
            secondStart: index,
            secondEnd: i,
            move: true,
        })
    }
    sendMove = () => {
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
                            return     <div key={index + " " + i} className={this.state.colors ? "NEWred" :"red"}   onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}></div>
                        } else {
                            if (square === 1) {
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}><div key={index + " " + i} onMouseDown={()=> this.mouseDown(index, i)} onMouseUp={(e)=> this.mouseUp(index, i, e)} className={this.state.colors ? "NEWplayer1" :"player1"}></div></div>
                            } else if (square === 2) {
                                return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}><div key={index + " " + i} onMouseDown={()=> this.mouseDown(index, i)} onMouseUp={(e)=> this.mouseUp(index, i, e)} className={this.state.colors ? "NEWplayer2" :"player2"}></div></div>
                            } else {
                            return     <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}></div>
                            }
                        }
                    }))}
                </div>
            </div>
        )
    }
}
