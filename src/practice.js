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

gameBoard2[0].forEach(square => {
    if (square === 5){
         console.log('Five')
    }
})


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

//getNextMove(7,7)


// mouseUp = (index, i) => {
//     console.log(`${index}, ${i}, end pos`)
//     // saves values to state
//     this.setState({
//         secondStart: index,
//         secondEnd: i,
//     })
//     // this choses the color
//     if (this.state.player) { // player 1 turn - red
//         if (this.state.board[index][i] === 2) { // there is oponent on square
//             if (this.state.secondEnd === this.state.firstEnd + 1) {// player is moving right
//                 if(this.state.board[index + 1 ][i + 1] !== 2 && this.state.board[index + 1 ][i + 1] !== 1) {// if jump possible
//                     console.log("allowed jump to the right")
//                     let copyBoard = [...this.state.board]
//                     copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // previous position clear square
//                     copyBoard[this.state.secondStart][this.state.secondEnd] = 4
//                     copyBoard[index+1][i+1] = 1 // ending position to the right
//                     this.setState({
//                         board: copyBoard
//                     })
//                 } else {
//                     // keep player turn
//                     return alert("Cannot jump that piece")
//                 }
//             } else { // player is moving left
//                 if (this.state.secondEnd === this.state.firstEnd - 1) {// player is moving left
//                     if(this.state.board[index + 1 ][i - 1] !== 2 && this.state.board[index + 1 ][i - 1] !== 1) {// if jump possible
//                         console.log("allowed jump to the right")
//                         let copyBoard = [...this.state.board]
//                         copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // previous position clear square
//                         copyBoard[this.state.secondStart][this.state.secondEnd] = 4
//                         copyBoard[index+1][i-1] = 1 // ending pos after jump
//                         this.setState({
//                             board:copyBoard
//                         })
//                     } else {
//                         // keep player turn
//                         return alert("Cannot jump that piece")
//                     }
//                 }
//             }
//         } else { // square is empty player can move there
//             let copyBoard = [...this.state.board]
//             copyBoard[this.state.firstStart][this.state.firstEnd] = 4
//             copyBoard[index][i] = 1
//             this.setState({
//                 board: copyBoard
//             })
//         }
//
//     } else { // player 2 logic 222222222222222222222222222222222222222222222
//         if (this.state.player === false) {// player 2
//             if (this.state.board[index][i] === 1) { // if lands on player
//                 if (this.state.secondEnd === this.state.firstEnd - 1) {// player is moving left
//                     if(this.state.board[index - 1 ][i - 1] !== 2 && this.state.board[index - 1 ][i - 1] !== 1) {// if jump possible
//                         console.log("allowed jump to the left")
//                         let copyBoard = [...this.state.board]
//                         copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // previous position clear square
//                         copyBoard[this.state.secondStart][this.state.secondEnd] = 4 // player removed
//                         copyBoard[index-1][i-1] = 2 // ending position to the left player 2
//                         this.setState({
//                             board: copyBoard
//                         })
//                     } else {
//                         // keep player turn
//                         return alert("Cannot jump that piece")
//                     }
//                 } else {// moving to the right
//                     if(this.state.board[index - 1 ][i + 1] !== 2 && this.state.board[index - 1 ][i + 1] !== 1) {// if jump possible
//                         console.log("allowed jump to the right")
//                         let copyBoard = [...this.state.board]
//                         copyBoard[this.state.firstStart][this.state.firstEnd] = 4 // previous position clear square
//                         copyBoard[this.state.secondStart][this.state.secondEnd] = 4
//                         copyBoard[index - 1][i + 1] = 2 // ending pos after jump
//                         this.setState({
//                             board:copyBoard
//                         })
//                     }
//
//                 }
//             } else { // no player on square
//                 let copyBoard = [...this.state.board]
//                 copyBoard[this.state.firstStart][this.state.firstEnd] = 4
//                 copyBoard[index][i] = 2
//                 this.setState({
//                     board: copyBoard
//                 })
//             }
//         }
//     }
// }
