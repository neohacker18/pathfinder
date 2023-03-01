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
}) => {
  const i = keyVal.split("-")[0];
  const j = keyVal.split("-")[1];
  const [bgColor, setBgColor] = useState("");
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
  useEffect(()=>{
    setColourMatrix(colourMatrix)
  },[colourMatrix])
  const handleClick = (e) => {
    if (start || end) return;

    gridMatrix[i][j] = Infinity; //weight of the node
    setGridMatrix(gridMatrix);
    setBgColor(bgColor === `#0C3446` ? `` : `#0C3446`);
    colourMatrix[i][j] = bgColor === `#0C3446` ? `` : `#0C3446`;
    setColourMatrix(colourMatrix);
    console.log(keyVal);
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
