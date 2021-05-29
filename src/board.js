import './App.css';
import React, { Component } from 'react'
import io from 'socket.io-client'

// socketIO
const ENDPOINT = "http://localhost:8000";
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

// backend func is 'move'

// copy hooks from chat.js to get the board arrays to be sent and re rendered.


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





            }
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
        console.log("sending");
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

    }

    selectAMove = () => {
        alert("Please select a move")
    }
    //===================================================Board movement=========



    render(){
        return(
            <div className="board-container" >

                <div className="player1">One</div>
                <div className="player2">Two</div>
                <button onClick={this.state.move ? this.sendMove : this.selectAMove}  >Send Move</button>

                <div className="board">

                    {
                        this.state.board.map((row, index) => row.map((square, i) => {
                        if (square === 0){
                            return     <div key={index + " " + i} className="red"   onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}></div>
                        } else {
                            if (square === 1) {
                                return <div key={index + " " + i} className="black" onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}><div key={index + " " + i} onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)} className="player1"></div></div>
                            } else if (square === 2) {
                                return <div key={index + " " + i} className="black" onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}><div key={index + " " + i} onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)} className="player2"></div></div>
                            } else {
                            return     <div key={index + " " + i} className="black" onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}></div>
                            }
                        }

                    }))}
                </div>
            </div>
        )
    }
}
