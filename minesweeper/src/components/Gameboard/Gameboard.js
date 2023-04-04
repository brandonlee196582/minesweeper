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
    var col = 1;
    for(let i = 0; i < boardSize * boardSize; i++) {
      
      var row = Math.floor(i / boardSize) + 1
      var nearCells = [];
      if (row - 1 > 0) {
        if (col - 1 > 0) {
          nearCells.push(`${row - 1}-${col - 1}`)
        }
        nearCells.push(`${row - 1}-${col}`)
        if (col + 1 < boardSize) {
          nearCells.push(`${row - 1}-${col + 1}`)
        }
      }
      if (col - 1 > 0) {
        nearCells.push(`${row}-${col - 1}`)
      }
      if (col + 1 < boardSize) {
        nearCells.push(`${row}-${col + 1}`)
      }
      if (row + 1 < boardSize) {
        if (col - 1 > 0) {
          nearCells.push(`${row + 1}-${col - 1}`)
        }
        nearCells.push(`${row + 1}-${col}`)
        if (col + 1 < boardSize) {
          nearCells.push(`${row + 1}-${col + 1}`)
        }
      }
      console.log(`${row}-${col}`, nearCells)
      outArr.push({className: "grid-item", id: `${row}-${col}`, flaged: false, hasBomb: false, clear: false, nearCells: nearCells})
      fullBoardArr.push(`${row}-${col}`)
      col++
      if (col > boardSize) col = 1;
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
      if (item.id === cellId) {
        if (bombLocs.includes(cellId)) {
          outArr.push({className: "grid-item hasBomb", id: item.id, flaged: false, hasBomb: true, clear: false, nearCells: item.nearCells})
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
            <div key={item.id} className={item.className} id={item.id} onClick={(event) => cellClick(event.target.id)} >{item.id}</div>
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