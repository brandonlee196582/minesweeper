import { useEffect, useState, useContext } from 'react';
import './Gameboard.css'
import { gameGlobal } from "../App/App"

export const Gameboard = () => {

  const { boardSize, bombQty, setWindowView } = useContext(gameGlobal);
  const [board, setBoard] = useState("");
  const [tableItems, setTableItems] = useState([]);
  const [cols, setCols] = useState('auto ');
  const [bombLocs, setBombLocs] = useState();
  const [gameStatus, setGameStatus] = useState();

  useEffect(() => {

    var outArr = []
    var outCols = 'auto '
    var fullBoardArr = []
    var outBombs = []

    for(let i = 1; i < boardSize; i++) {
      outCols = outCols + 'auto '
    }
    setCols(outCols);
    for(let i = 0; i < boardSize * boardSize; i++) {
      outArr.push({className: "grid-item", id: i, flaged: false, hasBomb: false, clear: false})
      fullBoardArr.push(i)
    }

    setTableItems(outArr);

    for(let i = 0; i < bombQty; i++) {
      var bombLocIndex = (Math.floor(Math.random() * (fullBoardArr.length - 1)))
      outBombs.push(fullBoardArr[bombLocIndex])
      fullBoardArr.splice(bombLocIndex, 1)
    }
    setBombLocs(outBombs);

  }, [])

  const cellClick = (cellId) => {
    var outArr = [];
    tableItems.map(item => {
      if (item.id === parseInt(cellId)) {
        if (bombLocs.includes(parseInt(cellId))) {
          outArr.push({className: "grid-item hasBomb", id: item.id, flaged: false, hasBomb: true, clear: false})
          setGameStatus('over')
        } else {
          outArr.push({className: "grid-item isClear", id: item.id, flaged: false, hasBomb: true, clear: true})
        }
      } else {
        outArr.push(item)
      }
    })
    setTableItems(outArr);
  }

  useEffect(() => {
    setBoard(
      gameStatus === 'over' ? 
        <div className="grid-container-end" style={{gridTemplateColumns: cols}}>
          {tableItems.map(item => {
            return(
              gameStatus === 'over' ? <div key={item.id} className={item.className} id={item.id} ></div> :
              <div key={item.id} className={item.className} id={item.id} onClick={(event) => cellClick(event.target.id)} ></div>
            )
          })}
        </div> :
        <div className="grid-container" style={{gridTemplateColumns: cols}}>
        {tableItems.map(item => {
          return(
            gameStatus === 'over' ? <div key={item.id} className={item.className} id={item.id} ></div> :
            <div key={item.id} className={item.className} id={item.id} onClick={(event) => cellClick(event.target.id)} ></div>
          )
        })}
      </div>
    )
  },[tableItems])
  
  return (
    <div>
      {board}
    </div>
  );
}