export default function dfs(grid, startNode, endNode) {
  function getNeighbors(node, GRID_ROWS, GRID_COLS) {
    if (!node || !GRID_ROWS || !GRID_COLS) return [];
    const [x, y] = node.split(",").map(Number);
    const neighbors = [];
    if (x > 0) neighbors.push(`${x - 1},${y}`);
    if (y > 0) neighbors.push(`${x},${y - 1}`);
    if (x < GRID_ROWS - 1) neighbors.push(`${x + 1},${y}`);
    if (y < GRID_COLS - 1) neighbors.push(`${x},${y + 1}`);
    return neighbors;
  }
  const stack = [startNode];
  const visNodes = [];
  const visited = new Set();
  visNodes.push(startNode);
  visited.add(startNode);
  const path = [];
  let currentNode = startNode;
  let cameFrom = new Map();

  while (stack.length > 0) {
    currentNode = stack.pop();
    visNodes.push(currentNode);
    visited.add(currentNode);

    if (currentNode === endNode) {
      while (cameFrom.get(currentNode)) {
        path.unshift(currentNode);
        currentNode = cameFrom.get(currentNode);
      }
      path.unshift(startNode);
      break;
    }

    const neighbors = getNeighbors(currentNode, grid.length, grid[0].length);
    for (let neighbor of neighbors) {
      if (
        !visited.has(neighbor) &&
        grid[neighbor.split(",")[0]][neighbor.split(",")[1]] !== Infinity
      ) {
        cameFrom.set(neighbor, currentNode);
        stack.push(neighbor);
      }
    }
  }
  console.log(path);
  return { path, visNodes};
}
