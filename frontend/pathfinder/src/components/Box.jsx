import React, { useState, useEffect } from "react";
import { GridItem, Button } from "@chakra-ui/react";
import 'animate.css';
const Box = ({
  keyVal,
  start,
  end,
  gridMatrix,
  setGridMatrix,
  colourMatrix,
  setColourMatrix,
  nodeType,
}) => {
  const i = keyVal.split("-")[0];
  const j = keyVal.split("-")[1];
  const [bgColor, setBgColor] = useState("");
  const [flag,setFlag]=useState(0);
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
  function valueOfNode(nodeType) {
    if (nodeType === "Wall") return Infinity;
    else if (nodeType === "Air") return 1;
    else if (nodeType === "Grass") return 5;
    else if (nodeType === "Sand") return 7;
    else if (nodeType === "Water") return 50;
    else if (nodeType === "Granite") return 50;
    else if (nodeType === "Snow") return 75;
    else if (nodeType === "Deep-Water") return 100;
    return Infinity;
  }
  function colourOfNode(nodeType) {
    if (nodeType === "Wall") return "#0C3446";
    else if (nodeType === "Air") return "#AFC9FB";
    else if (nodeType === "Grass") return "#809F75";
    else if (nodeType === "Sand") return "#C2AE7D";
    else if (nodeType === "Water") return "#016EFE";
    else if (nodeType === "Granite") return "#8C8D8D";
    else if (nodeType === "Snow") return "#C8D7E1";
    else if (nodeType === "Deep-Water") return "#014197";
    return "#0C3446";
  }
  const handleClick = (e) => {
    setFlag(1-flag)
    if (start || end) return;

    gridMatrix[i][j] = valueOfNode(nodeType); //weight of the node
    setGridMatrix(gridMatrix);
    const colour = colourOfNode(nodeType);
    setBgColor(colour);
    colourMatrix[i][j] = colour;
    setColourMatrix(colourMatrix);
  };

  return (flag?
    <GridItem
    className={`animate__animated animate__bounceIn`}
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
    />:
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
