import './App.css';
import React, { Component } from 'react'

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
                updatedBoard: [],
                firstStart: '',
                firstEnd: '',
                secondStart: '',
                secondEnd: '',
                move: false,
            }
        }
    mouseDown = (index, i, event) => {
        //console.log(index, i)
         this.setState({
            firstStart: index,
            firstEnd: i,
        })
    }

    mouseUp = (index, i) => {
        console.log('Mouse UP')
        //console.log(index, i)
        this.setState({
            secondStart: index,
            secondEnd: i,
            move: true,
        })
    }
    sendMove = () => {
        console.log("sending");
        console.log(this.state.firstStart, this.state.firstEnd);
        console.log(this.state.secondStart, this.state.secondEnd);
        this.setState({
            move: false,
            //board[][]: 4,
        })

    }

    selectAMove = () => {
        alert("Please select a move")
    }

    render(){
        return(
            <div className="board-container" >

                <div className="player1">One</div>
                <div className="player2">Two</div>
                <button onClick={this.state.move ? this.sendMove : this.selectAMove}  >Send Move</button>

                <div className="board">
                    {this.state.board.map((row, index) => row.map((square, i) => {
                        if (square === 0){
                            return <div key={index + " " + i} id={index + " " + i} className="red" onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}></div>
                        } else {
                            if (square === 1) {
                                return <div key={index + " " + i + "square"} className="black" onMouseDown={(e)=> this.mouseDown(index, i, e)}><div key={index + " " + i} onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)} className="player1"></div></div>
                            } else if (square === 2){
                                return <div key={index + " " + i + "square"} className="black" onMouseDown={(e)=> this.mouseDown(index, i, e)}><div key={index + " " + i} onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)} className="player2"></div></div>
                            }
                            return <div key={index + " " + i + "square"} onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)} className="black"></div>
                        }

                    }))}
                </div>
            </div>
        )
    }
}
