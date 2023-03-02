// const generateMaze = () => {
//     const newGrid = [...grid];
//     const stack = [];
//     const startCell = newGrid[startRow][startCol];
//     const endCell = newGrid[endRow][endCol];
//     startCell.start = true;
//     endCell.end = true;
//     stack.push(startCell);
//     while (stack.length > 0) {
//       const cell = stack.pop();
//       cell.visited = true;
//       const neighbors = getNeighbors(cell, newGrid);
//       if (neighbors.length > 0) {
//         stack.push(cell);
//         const randNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
//         removeWall(cell, randNeighbor, newGrid);
//         stack.push(randNeighbor);
//       }
//     }
//     setGrid(newGrid);
//   };
