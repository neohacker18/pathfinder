export default function generateMaze(rows, cols) {
  const maze = Array(rows)
    .fill()
    .map(() => Array(cols).fill(1));

  const startX = Math.floor(Math.random() * rows);
  const startY = Math.floor(Math.random() * cols);
  maze[startX][startY] = 0;

  dfs(maze, startX, startY, new Set([`${startX},${startY}`]));

  return maze;
}

function dfs(maze, x, y, visited) {
  const directions = [
    [-1, 0],
    [0, 1],
    [1, 0],
    [0, -1],
  ];

  shuffle(directions);

  for (const direction of directions) {
    const [dx, dy] = direction;
    const newX = x + dx;
    const newY = y + dy;

    if (
      newX >= 0 &&
      newX < maze.length &&
      newY >= 0 &&
      newY < maze[0].length &&
      maze[newX][newY] === 1 &&
      !visited.has(`${newX},${newY}`)
    ) {
      if (dx === -1) maze[x][y] &= 0b1000; // Remove top wall of current cell
      if (dx === 1) maze[x][y] &= 0b0010; // Remove bottom wall of current cell
      if (dy === 1) maze[x][y] &= 0b0001; // Remove right wall of current cell
      if (dy === -1) maze[x][y] &= 0b0100; // Remove left wall of current cell

      if (dx === -1) maze[newX][newY] &= 0b0010; // Remove bottom wall of new cell
      if (dx === 1) maze[newX][newY] &= 0b1000; // Remove top wall of new cell
      if (dy === 1) maze[newX][newY] &= 0b0100; // Remove left wall of new cell
      if (dy === -1) maze[newX][newY] &= 0b0001; // Remove right wall of new cell

      visited.add(`${newX},${newY}`);

      dfs(maze, newX, newY, visited);
    }
  }
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
