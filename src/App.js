import React, { useState } from "react";

import Square from "./components/Square";

import "./App.css";

const App = () => {
  const [board, setBoard] = useState([
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
    "?",
  ]);

  const [guess, setGuess] = useState(5);
  const [treasureLocation, setTreasureLocation] = useState(
    Math.floor(Math.random() * board.length)
  );
  const [BombLocation, setBombLocation] = useState(
    Math.floor(Math.random() * board.length)
  );

  const refresh = () => {
    window.location.reload();
  };
  const handleSquareClick = (clickedSquareIndex) => {
    // variable holding copy of current state
    let updatedBoard = [...board];
    // set condition for if treasure location is same as the clicked square's index show a treasure
    if (clickedSquareIndex === treasureLocation) {
      // then reassign state value at that index to treasure emoji
      updatedBoard[clickedSquareIndex] = "💎";
      alert("Winner!")
      // setBoard(updatedBoard)
    } else if (clickedSquareIndex === BombLocation) {
      updatedBoard[clickedSquareIndex] = "💣";
      alert("Loser!")
      // return window.location.reload()
      // setBoard[updatedBoard]
    } else {
      // use index from clickedSquareIndex to update the clicked square's value with emoji using bracket notation
      updatedBoard[clickedSquareIndex] = "👾";
      setGuess(guess - 1);
      // update state with the new board
      // setBoard(updatedBoard)
    }
    setBoard(updatedBoard);
  };

  return (
    <>
      <h1>Alien Invasion</h1>
      <div className="outer-box">  
        <div className="board">
        {/* Map over array and return a square for each element */}
        {board.map((value, index) => {
          console.log(value, index);
          return (
            <Square
              value={value}
              index={index}
              handleSquareClick={handleSquareClick}
            />
          );
        })}
      </div>
      <div className="restart">
        <button onClick={refresh}>Play again?</button>
      </div>
      <p className="guess-box">Galactic Currency Remaining: {guess}</p>
    </div>    
    </>
  );
};

export default App;
