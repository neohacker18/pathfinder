import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Logbar from "./components/Logbar";
import Matrix from "./components/Matrix";

function App() {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [gridMatrix, setGridMatrix] = useState([]);
  const [colourMatrix, setColourMatrix] = useState([]);
  const [pathTaken, setPathTaken] = useState([]);
  const [nodesVisited, setNodesVisited] = useState([]);
  const [nodeType, setNodeType] = useState("Wall");
  const [log, setLog] = useState("");
  useEffect(() => {
    if (colourMatrix.length===0) return ;
    if (nodesVisited.length > 0)
      setLog(
        `Nodes travelled = ${nodesVisited.length} and Path length = ${pathTaken.length} units`
      );
    setTimeout(() => {
      for (let x = 1; x < nodesVisited.length - 1; x++) {
        setTimeout(() => {
          const i = nodesVisited[x].split(",")[0];
          const j = nodesVisited[x].split(",")[1];
          //for gradient you can use distance = sqrt ((i-starti)^2 + (j-startj)^2) and add that in the rgb
          if (i >= 0 && j >= 0 && i < rows && j < cols) {
            let colour = `rgb(126,223,217)`;
            colourMatrix[i][j] = colour;
            setColourMatrix((prevMatrix) => {
              const newMatrix = [...prevMatrix];
              const i1 = start.split("-")[0],
                j1 = start.split("-")[1];
              const i2 = end.split("-")[0],
                j2 = end.split("-")[1];
              newMatrix[i1][j1] = "green";
              newMatrix[i2][j2] = "red";
              newMatrix[i][j] = colourMatrix[i][j];
              return newMatrix;
            });
          }
        }, 100);
      }
      setTimeout(() => {
        setColourMatrix((prevMatrix) => {
          const newMatrix = [...prevMatrix];
          return newMatrix;
        });
        for (let x = 1; x < pathTaken.length - 1; x++) {
          setTimeout(() => {
            const i = pathTaken[x].split(",")[0];
            const j = pathTaken[x].split(",")[1];
            //for gradient you can use distance = sqrt ((i-starti)^2 + (j-startj)^2) and add that in the rgb
            if (i >= 0 && j >= 0 && i < rows && j < cols) {
              let colour = `rgb(239,130,0)`;
              colourMatrix[i][j] = colour;
              setColourMatrix((prevMatrix) => {
                const newMatrix = [...prevMatrix];
                newMatrix[i][j] = colourMatrix[i][j];
                return newMatrix;
              });
            }
          }, 100);
        }
        const i1 = start.split("-")[0],
          j1 = start.split("-")[1];
        const i2 = end.split("-")[0],
          j2 = end.split("-")[1];

        if (colourMatrix.length > 0) {
          colourMatrix[i1][j1] = "green";
          colourMatrix[i2][j2] = "red";

          setColourMatrix(colourMatrix);
        }
      }, 1000);
    }, 2000);
  }, [pathTaken]);
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
        nodeType={nodeType}
        setNodeType={setNodeType}
      />
      <Logbar log={log} />
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
        nodeType={nodeType}
        setNodeType={setNodeType}
      />
    </div>
  );
}

export default App;
