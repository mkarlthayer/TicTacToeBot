import React, { useState, useEffect } from 'react';
import './Game.css'

const Game = () => {
    const [gameboard, setGameboard] = useState(Array(9).fill("_"))
    const [depth, setDepth] = useState(0)
    
    const checkWinner = (board) => {
        const winPatterns = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];
        for (const pattern of winPatterns) {
          const [a, b, c] = pattern;
          if (board[a] == "X" && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
          }
          if (board[a] == "O" && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
          }
        }
        if (!board.includes("_")) return 'Draw'
      };

    const gameOver = (board) => {
        if (checkWinner(board) || checkWinner(board)) {
            return true
        }
        for (let i=0; i < board.length; i++) {
            if (board[i] === "_") {
                return false
            }
        }
        return true
    }

    
    const minimax = (board, depth) => {
        const newBoard = board
        let best_score
        let score

        if (gameOver(newBoard)) {
            if (checkWinner(newBoard) === "X") {
                return 10 - depth
            } 
            else if (checkWinner(newBoard) === "O") {
                return depth - 10
            }
            else {
                return 0
            }
        }

        /* if depth is even its the players turn (maximize), otherwise its the bot's turn (minimize)
        for each turn save the best score out of all possible moves */
        if (depth % 2 === 0) {
            best_score = -20
            for (let i = 0; i < newBoard.length; i++) {
                 if (newBoard[i] === "_") {
                    newBoard[i] = "X"
                    score = minimax(newBoard, depth + 1)
                    newBoard[i] = "_" 
                    if (score > best_score) {
                        best_score = score
                    }
                }
            }
        } else {
            best_score = 20
            for (let i = 0; i < newBoard.length; i++) {
                if (newBoard[i] === "_") {
                    newBoard[i] = "O"
                    score = minimax(newBoard, depth + 1)
                    newBoard[i] = "_"
                    if (score < best_score) {
                        best_score = score
                    }
                }
            }
        }
        return best_score
    } 

    /* Determines bots best move */
    const bestMove = (board, depth) => {
        let best_score = Infinity
        let best_move
        let score
        for (let i = 0; i < board.length; i++) {
            if (board[i] === "_") {
                board[i] = "O"
                score = minimax(board, depth + 1)
                board[i] = "_"
                if (score < best_score) {
                    best_score = score
                    best_move = i
                }
            }
        }
        return best_move
    } 


    const computerMove = (board, depth) => {
        let best_move = bestMove(board, depth)
        const newBoard = board
        newBoard[best_move] = "O"
        setGameboard(newBoard)
    }

    const handleClick = (board, index) => {
        if (board[index] !== "_") {return} /* if not player or square is taken turn nothing happens */
        const newBoard = board
        if (depth % 2 == 0) {
            newBoard[index] = "X"
        }    else {
            newBoard[index] = "O"
        }
        
        setGameboard(newBoard)
        setDepth(depth + 1)
    }

    useEffect(() => {
        const gameIsOver = gameOver(gameboard);
        if (gameIsOver) {
          setTimeout(() => {
            const winner = checkWinner(gameboard)
            alert(winner === 'Draw' ? "It's a draw!" : `${winner} wins!`);
            setGameboard(Array(9).fill("_"));
            setDepth(0);
          }, 100);
          return;
        }
        if (depth % 2 !== 0) {
            computerMove(gameboard, depth)
            setDepth(depth + 1)
        }
    }, [gameboard, depth])

    /*const renderCell = (index) => {
        return (
          <div className="cell" onClick={() => handleClick(index)}>
            {board[index]}
          </div>
        );
      }; */

    return (
        <div className="game">
          <h1>Tic Tac Toe</h1>
          <div className="board">
            <div className="cell" onClick={() => handleClick(gameboard, 0)}>
                {gameboard[0]}
            </div> 
            <div className="cell" onClick={() => handleClick(gameboard, 1)}>
                {gameboard[1]}
            </div> 
            <div className="cell" onClick={() => handleClick(gameboard, 2)}>
                {gameboard[2]}
            </div>
            <div className="cell" onClick={() => handleClick(gameboard, 3)}>
                {gameboard[3]}
            </div> 
            <div className="cell" onClick={() => handleClick(gameboard, 4)}>
                {gameboard[4]}
            </div> 
            <div className="cell" onClick={() => handleClick(gameboard, 5)}>
                {gameboard[5]}
            </div> 
            <div className="cell" onClick={() => handleClick(gameboard, 6)}>
                {gameboard[6]}
            </div> 
            <div className="cell" onClick={() => handleClick(gameboard, 7)}>
                {gameboard[7]}
            </div> 
            <div className="cell" onClick={() => handleClick(gameboard, 8)}>
                {gameboard[8]}
            </div> 
          </div>
          <button onClick={() => setDepth(0) & setGameboard(Array(9).fill("_"))}>Reset</button>
        
        </div>
    );
}

export default Game;