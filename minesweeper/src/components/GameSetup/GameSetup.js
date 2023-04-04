import { useContext, useEffect, useState } from 'react'
import { gameGlobal } from "../App/App"
import './GameSetup.css'
import { Gameboard } from '../Gameboard/Gameboard'

export const GameSetup = () => {

  const { boardSize, setBoardSize, setBombQty, setWindowView } = useContext(gameGlobal);
  const [numCount, setNumCount] = useState(1);
  const [minBomb, setMinBomb] = useState(6);
  const [maxBomb, setMaxBomb] = useState(15);

  const minus = () => {
    if (numCount > minBomb) {
      setNumCount(numCount - 1)
    }
  }

  const plus = () => {
    if (numCount < maxBomb) {
      setNumCount(numCount + 1)
    }
  }

  const gameStart = () => {
    if (boardSize === undefined) setBoardSize(5);
    setBombQty(numCount);
    setWindowView(<Gameboard />);
  }

  useEffect(() => {
    boardSize === '20' ? setMaxBomb(240) :
    boardSize === '15' ? setMaxBomb(135) :
    boardSize === '10' ? setMaxBomb(60) :
    setMaxBomb(15)

    boardSize === '20' ? setMinBomb(100) :
    boardSize === '15' ? setMinBomb(60) :
    boardSize === '10' ? setMinBomb(25) :
    setMinBomb(6)
  },[boardSize])

  useEffect(() => {
    setNumCount(minBomb);
  },[minBomb])
  
  return(
    <div className='setupGameDiv'>
      <label>Gameboard Size </label>
      <select id='boardSize' onChange={(event) => setBoardSize(event.target.value)}>
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='15'>15</option>
        <option value='20'>20</option>
      </select>
      <br/>
      <span>Number of Bombs </span>
      <div className='numCounterDiv'>
        <button className='controlBtn controlBtnMinus' type='button' onClick={() => minus()}>-</button>
        <span className='numSpace'>{numCount}</span>
        <button className='controlBtn controlBtnPlus' type='button' onClick={() => plus()}>+</button>
      </div>
      <br/>
      <button onClick={() => gameStart()}>Start Game</button>
    </div>
  )
}