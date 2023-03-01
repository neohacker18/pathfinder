import React, { useState, useEffect } from "react";
import { GridItem, Button } from "@chakra-ui/react";
const Box = ({
  keyVal,
  start,
  end,
  wall,
  gridMatrix,
  setGridMatrix,
  colourMatrix,
  setColourMatrix,
  pathTaken,
  setPathTaken,
  nodesVisited,
  setNodesVisited,
}) => {
  const i = keyVal.split("-")[0];
  const j = keyVal.split("-")[1];
  const [bgColor, setBgColor] = useState("");
  useEffect(() => {
    for (let x = 1; x < nodesVisited.length - 1; x++) {
      const i = nodesVisited[x].split(",")[0];
      const j = nodesVisited[x].split(",")[1];
      //for gradient you can use distance = sqrt ((i-starti)^2 + (j-startj)^2) and add that in the rgb 
      if (colourMatrix[i][j] !== "#0C3446")
        colourMatrix[i][j] = `rgb(126,223,217)`;
    }
    setColourMatrix(colourMatrix);
    for (let x = 1; x < pathTaken.length - 1; x++) {
      const i = pathTaken[x].split(",")[0];
      const j = pathTaken[x].split(",")[1];
      colourMatrix[i][j] = `rgb(239,130,0)`;
    }
    setColourMatrix(colourMatrix);
  }, [pathTaken]);

  useEffect(() => {
    if (start) {
      setBgColor("#69D18B");
      colourMatrix[i][j] = "#69D18B";
    } else if (end) {
      setBgColor("#F02E4B");
      colourMatrix[i][j] = "#F02E4B";
    }
    setColourMatrix(colourMatrix);
  }, []);

  useEffect(() => {
    setColourMatrix(colourMatrix);
  }, [colourMatrix]);
  const handleClick = (e) => {
    if (start || end) return;

    gridMatrix[i][j] = Infinity; //weight of the node
    setGridMatrix(gridMatrix);
    setBgColor(bgColor === `#0C3446` ? `` : `#0C3446`);
    colourMatrix[i][j] = bgColor === `#0C3446` ? `` : `#0C3446`;
    setColourMatrix(colourMatrix);
  };
  return (
    <GridItem
      style={{
        height: "25.1px",
        width: "25.8px",
        border: `0.01px solid #B0E6F7`,
        backgroundColor: `${colourMatrix[i][j]}`,
        padding: 0,
        margin: 0,
      }}
      onClick={handleClick}
      borderRadius={0}
    />
  );
};

export default Box;
