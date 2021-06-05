const gameBoard = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0]
]

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
// board movement

//   00, 01, 02, 03, 04, 05, 06, 07
//   10, 11, 12, 13, 14, 15, 16, 17
//   20, 21, 22, 23, 24, 25, 26, 27
//   30, 31, 32, 33, 34, 35, 36, 37
//   40, 41, 42, 43, 44, 45, 46, 47
//   50, 51, 52, 53, 54, 55, 56, 57
//   60, 61, 62, 63, 64, 65, 66, 67
//   70, 71, 72, 73, 74, 75, 76, 77

const gameBoard2 = [
  [0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 1, 0, 1, 0, 1, 0],
  [0, 1, 0, 1, 0, 1, 0, 1],
  [3, 0, 3, 0, 3, 0, 3, 0],
  [0, 3, 0, 3, 0, 3, 0, 3],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
]

const fillPieces = () => {
    gameBoard2.forEach((row, index) => row.map((square, i) => {
        console.log(index, i);
    }))
}




const getNextMove = (index, i) => {
    let x
    if (index < 7){
        x = index + 1
    } else {
        x = index
    }
    console.log(index + " after the return");
    let y = i -1
    let z = i +1
    if (z > 7) {
        console.log('outside of array')
        z = y
    }
    console.log(x,y,z);
}

getNextMove(7,7)


// {
//     this.state.board.map((row, index) => row.map((square, i) => {
//     if (square === 0){
//         return     <div key={index + " " + i} className={this.state.colors ? "NEWred" :"red"}   onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}></div>
//     } else {
//         if (square === 1) {
//             return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}><div key={index + " " + i} onMouseDown={()=> this.mouseDown(index, i)} onMouseUp={(e)=> this.mouseUp(index, i, e)} className={this.state.colors ? "NEWplayer1" :"player1"}>x</div></div>
//         } else if (square === 2) {
//             return <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}><div key={index + " " + i} onMouseDown={()=> this.mouseDown(index, i)} onMouseUp={(e)=> this.mouseUp(index, i, e)} className={this.state.colors ? "NEWplayer2" :"player2"}>y</div></div>
//         } else {
//         return     <div key={index + " " + i} className={this.state.colors ? "NEWblack" :"black"} onMouseDown={(e)=> this.mouseDown(index, i, e)} onMouseUp={()=> this.mouseUp(index, i)}></div>
//         }
//     }
// }))}
