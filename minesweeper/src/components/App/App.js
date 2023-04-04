import './App.css';
import { Gameboard } from '../Gameboard/Gameboard.js';
import { GameSetup } from '../GameSetup/GameSetup';
import { useState, createContext, useEffect } from 'react';

export const gameGlobal = createContext();

export const App = () => {

  const [boardSize, setBoardSize] = useState();
  const [bombQty, setBombQty] = useState();
  const [gameClicke, setGameClicks] = useState();
  const [windowView, setWindowView] = useState();

  useEffect(() => {
    setWindowView(
      <GameSetup />
    )
  }, [])

  return (
    <gameGlobal.Provider value={{boardSize, setBoardSize, bombQty, setBombQty, gameClicke, setGameClicks, windowView, setWindowView}}>
      <div className="App">
        {windowView}
      </div>
    </gameGlobal.Provider>
  );
}
