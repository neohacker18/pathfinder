import { useEffect } from "react";
import { Grid } from "@chakra-ui/react";
import React from "react";
import Box from "./Box";

const Matrix = ({ start, end, rows, cols, gridMatrix, setGridMatrix,colourMatrix,setColourMatrix }) => {
  useEffect(() => {

  }, [colourMatrix])
  
  const START = start.split("-");
  const END = end.split("-");
  const items = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const data = (
        <Box
          key={`${i}-${j}`}
          keyVal={`${i}-${j}`}
          start={i == START[0] && j == START[1]}
          end={i == END[0] && j == END[1]}
          gridMatrix={gridMatrix}
          setGridMatrix={setGridMatrix}
          colourMatrix={colourMatrix}
          setColourMatrix={setColourMatrix}
        />
      );
      // if ((START[0] == i && START[1] == j) || (END[0] == i && END[1] == j)) {
      //   gridMatrix[i][j] = 1;
      // }
      items.push(data);
    }
  }
  return (
    <Grid
      templateColumns={`repeat(${cols}, 1fr)`}
      maxHeight={"81vh"}
      overflow={"hidden"}
    >
      {items}
    </Grid>
  );
};

export default Matrix;
