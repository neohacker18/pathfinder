export default function AStar(grid, start, end) {
    function heuristic(a, b) {
      const row1 = a.split(",")[0],
        col1 = a.split(",")[1];
      const row2 = b.split(",")[0],
        col2 = b.split(",")[1];

      const dx = Math.abs(col1 - col2);
      const dy = Math.abs(row1 - row2);

      let heuristic = Math.max(dx, dy) + 1.4 * Math.min(dx, dy);
      return heuristic;
    }
    let openSet = [start];
    let closedSet = new Set();
    let cameFrom = new Map();
    const visNodes=[]

    let gScore = new Map();
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[0].length; y++) {
        gScore.set(`${x},${y}`, Infinity);
      }
    }
    gScore.set(start, 0);

    let fScore = new Map();
    for (let x = 0; x < grid.length; x++) {
      for (let y = 0; y < grid[0].length; y++) {
        fScore.set(`${x},${y}`, Infinity);
      }
    }
    fScore.set(start, heuristic(start, end));
    while (openSet.length > 0) {
      let lowestFScore = 0;
      for (let i = 1; i < openSet.length; i++) {
        if (fScore.get(openSet[i]) < fScore.get(openSet[lowestFScore])) {
          lowestFScore = i;
        }
      }
      let current = openSet[lowestFScore];
      visNodes.push(current);
      if (current === end) {
        let path = [];
        while (cameFrom.get(current)) {
          path.unshift(current);
          current = cameFrom.get(current);
        }
        path.unshift(0);
        return {path,visNodes};
      }
      openSet.splice(lowestFScore, 1);
      closedSet.add(current);

      for (let neighbor of getNeighbors(current, grid.length, grid[0].length)) {
        const weight = grid[neighbor.split(",")[0]][neighbor.split(",")[1]];
        if (weight === Infinity || closedSet.has(neighbor)) continue;

        let tentativeGScore = gScore.get(current) + (weight >= 1 ? weight : 1);
        if (tentativeGScore < gScore.get(neighbor)) {
          cameFrom.set(neighbor, current);
          gScore.set(neighbor, tentativeGScore);
          fScore.set(neighbor, tentativeGScore + heuristic(neighbor, end));
        }
        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }
      }
    }
    let path=[]
    return {path,visNodes};
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