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




export default class Board extends Component {
    constructor(props){
        super(props)
            this.state= {
                board: true,
                size: 8,

            }
        }

    chosePiece = () => {
        console.log("clicked")
    }

    fillboard = () => {
        gameBoard.map()

        return <div onClick={this.chosePiece} className="player1"></div>
    }





    fillPlayer2 = () => {
        return <div onClick={this.chosePiece} className="player2"></div>
    }

    gameReady = () => {
        // clear board
        // fill pieces on board.
        // add function to each peice.
    }

    choseSquare = () => {
        console.log();
    }


    render(){
        return(
            <div className="board-container" >

                <div className="player1">Pone</div>
                <div className="player2">Ptwo</div>




            <div className="extra" >
                <div className="inside-extra" >
                <div className="row">
                    <div className="black" >{this.fillboard()}</div><div className="white" ></div><div className="black" >{this.fillboard()}</div><div className="white" ></div>
                    <div className="black" >{this.fillboard()}</div><div className="white" ></div><div className="black" >{this.fillboard()}</div><div className="white" ></div>
                </div>
                <div className="row">
                    <div className="white" ></div><div className="black" >{this.fillboard()}</div><div className="white" ></div><div className="black" >{this.fillboard()}</div>
                    <div className="white" ></div><div className="black" >{this.fillboard()}</div><div className="white" ></div><div className="black" >{this.fillboard()}</div>
                </div>
                <div className="row">
                    <div className="black" >{this.fillboard()}</div><div className="white" ></div><div className="black" >{this.fillboard()}</div><div className="white" ></div>
                    <div className="black" >{this.fillboard()}</div><div className="white" ></div><div className="black" >{this.fillboard()}</div><div className="white" ></div>
                </div>
                <div className="row">
                    <div className="white" ></div><div className="black" ></div><div className="white" ></div><div className="black" ></div>
                    <div className="white" ></div><div className="black" ></div><div className="white" ></div><div className="black" ></div>
                </div>
                <div className="row">
                    <div className="black" ></div><div className="white" ></div><div className="black" ></div><div className="white" ></div>
                    <div className="black" ></div><div className="white" ></div><div className="black" ></div><div className="white" ></div>
                </div>
                <div className="row">
                    <div className="white" ></div><div className="black" >{this.fillPlayer2()}</div><div className="white" ></div><div className="black" >{this.fillPlayer2()}</div>
                    <div className="white" ></div><div className="black" >{this.fillPlayer2()}</div><div className="white" ></div><div className="black" >{this.fillPlayer2()}</div>
                </div>
                <div className="row">
                    <div className="black" >{this.fillPlayer2()}</div><div className="white" ></div><div className="black" >{this.fillPlayer2()}</div><div className="white" ></div>
                    <div className="black" >{this.fillPlayer2()}</div><div className="white" ></div><div className="black" >{this.fillPlayer2()}</div><div className="white" ></div>
                </div>
                <div className="row">
                    <div className="white" ></div><div className="black" >{this.fillPlayer2()}</div><div className="white" ></div><div className="black" >{this.fillPlayer2()}</div>
                    <div className="white" ></div><div className="black" >{this.fillPlayer2()}</div><div className="white" ></div><div className="black" >{this.fillPlayer2()}</div>
                </div>
            </div>
            </div>
            </div>
        )
    }
}
