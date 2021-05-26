import './App.css';
import React, { Component } from 'react'

const gameBoard = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0]
];

const boardColors = [
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
]

export default class Board extends Component {
    constructor(props){
        super(props)
            this.state= {
                board: true,
                size: 8,
            }
        }

    fillboard = () => {
        return <div onClick={this.chosePiece} className="player1"></div>
    }

    fillPlayer2 = () => {
        return <div onClick={this.chosePiece} className="player2"></div>
    }



    render(){
        return(
            <div className="board-container" >

                <div className="player1">One</div>
                <div className="player2">Two</div>

            <div className="board">
                {boardColors.map(row => row.map(square => {
                    if (square != 0){
                        return <div className="red"></div>
                    } else {
                        return <div className="black"></div>
                    }
                }))}
            </div>



            </div>
        )
    }
}
