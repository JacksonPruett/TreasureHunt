import React, { useState, useEffect, useRef } from "react";
import Square from "./components/Square";
import "./App.css";

const App = () => {
  const initialBoard = ["?", "?", "?", "?", "?", "?", "?", "?", "?"];

  const [board, setBoard] = useState([...initialBoard]);
  const [guess, setGuess] = useState(5);
  const [treasureLocation, setTreasureLocation] = useState(null);
  const [bombLocation, setBombLocation] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const alertShownRef = useRef(false);

  useEffect(() => {
    setTreasureLocation(Math.floor(Math.random() * initialBoard.length));
    setBombLocation(Math.floor(Math.random() * initialBoard.length));
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  useEffect(() => {
    if (guess === 0 && !alertShownRef.current) {
      setGameOver(true);
      alert("Game over! Click 'Play again?' to reset.");
      alertShownRef.current = true;
    }
  }, [guess]);

  const handleSquareClick = (clickedSquareIndex) => {
    if (!gameOver) {
      let updatedBoard = [...board];

      if (clickedSquareIndex === treasureLocation) {
        updatedBoard[clickedSquareIndex] = "💎";
        alert("Congratulations! You won!");
        setBoard([...initialBoard]);
        setGuess(5);
        setTreasureLocation(Math.floor(Math.random() * initialBoard.length));
        setBombLocation(Math.floor(Math.random() * initialBoard.length));
        setGameOver(true); // Disable further moves after winning
      } else if (clickedSquareIndex === bombLocation) {
        updatedBoard[clickedSquareIndex] = "💣";
        alert("Oops! You lost.");
        setBoard([...initialBoard]);
        setGuess(5);
        setTreasureLocation(Math.floor(Math.random() * initialBoard.length));
        setBombLocation(Math.floor(Math.random() * initialBoard.length));
        setGameOver(true); // Disable further moves after losing
      } else {
        updatedBoard[clickedSquareIndex] = "👾";
        setGuess(guess - 1);
      }

      setBoard(updatedBoard);
    } else {
      alert("Game over! Click 'Play again?' to reset.");
    }
  };

  const refresh = () => {
    setBoard([...initialBoard]);
    setGuess(5);
    setGameOver(false);
    alertShownRef.current = false;
    setTreasureLocation(Math.floor(Math.random() * initialBoard.length));
    setBombLocation(Math.floor(Math.random() * initialBoard.length));
  };

  return (
    <>
      <h1>Alien Invasion</h1>
      <div className="outer-box">
        <div className="board">
          {board.map((value, index) => (
            <Square
              key={index}
              value={value}
              index={index}
              handleSquareClick={handleSquareClick}
            />
          ))}
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
