import './App.css';
import React, { Component } from 'react'




export default class Board extends Component {
    constructor(props){
        super(props)
            this.state= {
                board: true,
                size: 8,

            }
        }

    choseSquare = () => {
        console.log();
    }


    render(){
        return(
            <div className="board-container" >
            <div className="extra" >
                <div className="inside-extra" >
                <div className="row">
                    <div className="black" >0</div><div className="white" >1</div><div className="black" >2</div><div className="white" >3</div>
                    <div className="black" >4</div><div className="white" >5</div><div className="black" >6</div><div className="white" >7</div>
                </div>
                <div className="row">
                    <div className="white" >0</div><div className="black" >1</div><div className="white" >2</div><div className="black" >3</div>
                    <div className="white" >4</div><div className="black" >5</div><div className="white" >6</div><div className="black" >7</div>
                </div>
                <div className="row">
                    <div className="black" >0</div><div className="white" >1</div><div className="black" >2</div><div className="white" >3</div>
                    <div className="black" >4</div><div className="white" >5</div><div className="black" >6</div><div className="white" >7</div>
                </div>
                <div className="row">
                    <div className="white" >0</div><div className="black" >1</div><div className="white" >2</div><div className="black" >3</div>
                    <div className="white" >4</div><div className="black" >5</div><div className="white" >6</div><div className="black" >7</div>
                </div>
                <div className="row">
                    <div className="black" >0</div><div className="white" >1</div><div className="black" >2</div><div className="white" >3</div>
                    <div className="black" >4</div><div className="white" >5</div><div className="black" >6</div><div className="white" >7</div>
                </div>
                <div className="row">
                    <div className="white" >0</div><div className="black" >1</div><div className="white" >2</div><div className="black" >3</div>
                    <div className="white" >4</div><div className="black" >5</div><div className="white" >6</div><div className="black" >7</div>
                </div>
                <div className="row">
                    <div className="black" >0</div><div className="white" >1</div><div className="black" >2</div><div className="white" >3</div>
                    <div className="black" >4</div><div className="white" >5</div><div className="black" >6</div><div className="white" >7</div>
                </div>
                <div className="row">
                    <div className="white" >0</div><div className="black" >1</div><div className="white" >2</div><div className="black" >3</div>
                    <div className="white" >4</div><div className="black" >5</div><div className="white" >6</div><div className="black" >7</div>
                </div>
            </div>
            </div>
            </div>
        )
    }
}
