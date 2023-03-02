export default function bfs(grid, startNode, endNode) {
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
  const queue = [startNode];
  const visited = new Set();
  const visNodes = [];
  const cameFrom = new Map();
  visited.add(startNode);
  visNodes.push(startNode);

  while (queue.length > 0) {
    const currentNode = queue.shift();

    if (currentNode === endNode) {
      // Build and return the path
      const path = [];
      let current = endNode;
      while (cameFrom.get(current)) {
        path.unshift(current);
        current = cameFrom.get(current);
      }
      path.unshift(startNode);
      return { path, visNodes };
    }

    const neighbors = getNeighbors(currentNode, grid.length, grid[0].length);
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        visNodes.push(neighbor);
        cameFrom.set(neighbor, currentNode);
        queue.push(neighbor);
      }
    }
  }
  return { path, visNodes };
}
