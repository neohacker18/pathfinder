import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Logbar from "./components/Logbar";
import Matrix from "./components/Matrix";

function App() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [gridMatrix, setGridMatrix] = useState([]);
  const [colourMatrix, setColourMatrix] = useState([]);
  const [pathTaken,setPathTaken]=useState([])
  const [nodesVisited,setNodesVisited]=useState([])
  useEffect(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const numRows = Math.floor((height * 0.81) / 25);
    const numCols = Math.floor(width / 25);
    setRows(numRows);
    setCols(numCols);
    setGridMatrix(
      Array(numRows)
        .fill()
        .map(() => Array(numCols).fill(0))
    );
    setEnd(`${numRows - 5}-${numCols - 10}`);
    setColourMatrix(
      Array(numRows)
        .fill()
        .map(() => Array(numCols).fill(""))
    );
    setEnd(`${numRows - 5}-${numCols - 10}`);
  }, []);
  const [start, setStart] = useState("4-6");
  const [end, setEnd] = useState("4-6");
  return (
    <div>
      <Navbar
        rows={rows}
        cols={cols}
        start={start}
        end={end}
        gridMatrix={gridMatrix}
        setGridMatrix={setGridMatrix}
        colourMatrix={colourMatrix}
        setColourMatrix={setColourMatrix}
        nodesVisited={nodesVisited}
        setNodesVisited={setNodesVisited}
        pathTaken={pathTaken}
        setPathTaken={setPathTaken}
      />
      <Logbar />
      <Matrix
        rows={rows}
        cols={cols}
        gridMatrix={gridMatrix}
        setGridMatrix={setGridMatrix}
        start={start}
        end={end}
        colourMatrix={colourMatrix}
        setColourMatrix={setColourMatrix}
        nodesVisited={nodesVisited}
        setNodesVisited={setNodesVisited}
        pathTaken={pathTaken}
        setPathTaken={setPathTaken}
      />
    </div>
  );
}

export default App;
