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
    if (start) {
      setBgColor("green");
      colourMatrix[i][j] = "green";
    } else if (end) {
      setBgColor("red");
      colourMatrix[i][j] = "red";
    }
    setColourMatrix(colourMatrix);
  }, []);

  const handleClick = (e) => {
    if (start || end) return;

    gridMatrix[i][j] = Infinity; //weight of the node
    setGridMatrix(gridMatrix);
    setBgColor(`#0C3446`);
    colourMatrix[i][j] = `#0C3446`;
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
