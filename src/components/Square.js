import React from "react"

const Square = ({value, index, handleSquareClick}) => {

  const handleClick = () => {
    handleSquareClick(index)
  }
  return (
    <>
      <div className="square" onClick={handleClick}>{value}</div>
    </>
  )
}
export default Square
