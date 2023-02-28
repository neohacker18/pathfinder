import { useState, useEffect } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import React from "react";
import Box from "./Box";

const Matrix = () => {
  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  useEffect(() => {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const numRows = Math.floor((height * 0.81) / 25);
    const numCols = Math.floor(width / 25);
    setRows(numRows);
    setCols(numCols);
  }, []);
  const items = [];
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      items.push(<Box key={`${i}-${j}`} keyVal={`${i}-${j}`} start={i==5 && j==6} end={i==(rows-5) && j==(cols-10)}/>);
    }
  }
  return (
    <Grid templateColumns={`repeat(${cols}, 1fr)`} maxHeight={'81vh'} overflow={'hidden'}>
      {items}
    </Grid>
  );
};

export default Matrix;
