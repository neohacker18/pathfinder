export default function dijkstras(grid, startNode, endNode) {
  const distances = {};
  const visited = {};
  const visNodes = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      const node = `${i},${j}`;
      distances[node] = Infinity;
      visited[node] = false;
    }
  }

  distances[startNode] = 0;
  const queue = [startNode];
  while (queue.length > 0) {
    const currentNode = queue.shift();
    visNodes.push(currentNode);
    if (currentNode === endNode) {
      console.log(distances);
      const path = [currentNode];
      let prevNode = currentNode;
      while (prevNode !== startNode && prevNode && !visited[prevNode]) {
        const neighbors = getNeighbors(prevNode, grid.length, grid[0].length);
        if (neighbors.length === 0) break;
        let shortestNeighbor;
        let shortestDistance = Infinity;
        for (const neighbor of neighbors) {
          if (distances[neighbor] < shortestDistance) {
            shortestNeighbor = neighbor;
            shortestDistance = distances[neighbor];
          }
        }
        path.unshift(shortestNeighbor);
        prevNode = shortestNeighbor;
      }
      return { path, visNodes };
    }

    const neighbors = getNeighbors(currentNode, grid.length, grid[0].length);
    if (neighbors.length === 0) continue;
    for (const neighbor of neighbors) {
      const [x, y] = neighbor.split(",").map(Number);
      const weight = grid[x][y];

      const distance = distances[currentNode] + (weight >= 1 ? weight : 1);

      if (distance < distances[neighbor]) {
        distances[neighbor] = distance;
        queue.push(neighbor);
      }
    }
  }
  const path=[]
  return { path, visNodes };
}
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
