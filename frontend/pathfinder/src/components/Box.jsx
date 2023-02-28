import React, { useState, useEffect } from "react";
import { GridItem, Button } from "@chakra-ui/react";
const Box = ({ keyVal, start, end ,wall,gridMatrix,setGridMatrix}) => {
  const [bgColor, setBgColor] = useState(``);
  useEffect(() => {
    if (start) {
      setBgColor("#69D18B");
    } else if (end) {
      setBgColor("#F02E4B");
    }
  }, []);

  const handleClick = (e) => {
    if (start || end) return;
    const arr=keyVal.split('-')
    const i=arr[0],j=arr[1];
    gridMatrix[i][j]=1;
    setGridMatrix(gridMatrix)
    // console.log(gridMatrix)
    setBgColor(bgColor === `#0C3446` ? `` : `#0C3446`);
    console.log(keyVal);
  };
  return (
    <GridItem
      style={{
        height: "25.1px",
        width: "25.8px",
        border: `0.01px solid #B0E6F7`,
        backgroundColor: `${bgColor}`,
        padding: 0,
        margin:0
      }}
      onClick={handleClick}
      borderRadius={0}
    />
  );
};

export default Box;
