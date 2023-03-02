import { useState } from "react";
import { Flex, Spacer, Text, Select, Button } from "@chakra-ui/react";
import "../App.css";
import dfs from "../utils/dfs";
import bfs from "../utils/bfs";

export default function Navbar({
  start,
  end,
  gridMatrix,
  setGridMatrix,
  colourMatrix,
  setColourMatrix,
  pathTaken,
  setPathTaken,
  nodesVisited,
  setNodesVisited,
  nodeType,
  setNodeType,
}) {
  const [algo, setAlgo] = useState("Dijkstra");
  const [copyPath, setCopyPath] = useState([]);
  const handlePlay = () => {
    console.log(algo);
    if (algo === "Dijkstra") {
      handleDijkstra();
    } else if (algo === "A*") {
      handleAStar();
    } else if (algo === "DFS") {
      handleDFS();
    } else if (algo === "BFS") {
      handleBFS();
    }
  };
  const handleAlgorithms = (e) => {
    setAlgo(e.target.value);
  };

  function dijkstra(grid, startNode, endNode) {
    const distances = {};
    const visited = {};
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
      nodesVisited.push(currentNode);
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
        return path;
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
    return null;
  }
  function AStar(grid, start, end) {
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

    setNodesVisited([]);

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
      nodesVisited.push(current);
      if (current === end) {
        let path = [];
        while (cameFrom.get(current)) {
          path.unshift(current);
          current = cameFrom.get(current);
        }
        path.unshift(0);
        return path;
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
    return null;
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
  const handleDijkstra = () => {
    setColourMatrix(colourMatrix);
    const startNode = start.split("-")[0] + "," + start.split("-")[1];
    const endNode = end.split("-")[0] + "," + end.split("-")[1];
    const response = dijkstra(gridMatrix, startNode, endNode);
    if (response && response.length > 1) {
      setPathTaken(response);
      setNodesVisited(nodesVisited);
    } else {
      setPathTaken([]);
      setNodesVisited(nodesVisited);
      console.log(`Couldn't find a path `);
      return;
    }
  };
  const handleDFS = () => {
    setColourMatrix(colourMatrix);
    const startNode = start.split("-")[0] + "," + start.split("-")[1];
    const endNode = end.split("-")[0] + "," + end.split("-")[1];
    const { path, visNodes } = dfs(gridMatrix, startNode, endNode);
    if (path && path.length > 1) {
      setPathTaken(path);
      setNodesVisited(visNodes);
    } else {
      setPathTaken([]);
      setNodesVisited(visNodes);
      console.log(`Couldn't find a path `);
      return;
    }
  };
  const handleBFS = () => {
    setColourMatrix(colourMatrix);
    const startNode = start.split("-")[0] + "," + start.split("-")[1];
    const endNode = end.split("-")[0] + "," + end.split("-")[1];
    const { path, visNodes } = bfs(gridMatrix, startNode, endNode);
    if (path && path.length > 1) {
      setPathTaken(path);
      setNodesVisited(visNodes);
    } else {
      setPathTaken([]);
      setNodesVisited(visNodes);
      console.log(`Couldn't find a path `);
      return;
    }
  };
  const handleAStar = () => {
    setColourMatrix(colourMatrix);
    const startNode = start.split("-")[0] + "," + start.split("-")[1];
    const endNode = end.split("-")[0] + "," + end.split("-")[1];
    const response = AStar(gridMatrix, startNode, endNode);
    if (response && response.length > 1) {
      setPathTaken(response);
      setNodesVisited(nodesVisited);
    } else {
      setPathTaken([]);
      setNodesVisited(nodesVisited);
      console.log(`Couldn't find a path `);
      return;
    }
  };

  const handleReset = (e) => {
    if (e.target.value === "Clear-Board") {
      console.log("Clear board algo here!");
    }
  };
  const handleNodeType = (e) => {
    setNodeType(e.target.value);
  };
  return (
    <Flex
      as="nav"
      align="center"
      justifyContent={"space-between"}
      padding="3rem"
      bg="#194B4B"
      color="white"
      height={"13vh"}
    >
      <Text fontSize="xl" fontWeight="bold">
        Pathfinding Visualiser
      </Text>
      <Spacer />
      <Button bg={"red"} variant={"outline"} marginX={"3"} onClick={handlePlay}>
        Play
      </Button>
      <Select
        placeholder="Algorithms"
        size={"md"}
        width={"150px"}
        onChange={handleAlgorithms}
        className={"select-menu"}
      >
        <option value="Dijkstra">Dijksta's Algorithm</option>
        <option value="A*">A* Search</option>
        <option value="BFS">Breadth First Search</option>
        <option value="DFS">Depth First Search</option>
      </Select>
      <Select
        placeholder="Terrain"
        size={"md"}
        width={"150px"}
        className={"select-menu"}
      >
        <option value="Recursive-Maze">Recursive Maze</option>
        <option value="Simplex-Terrain">Simplex Terrain</option>
        <option value="Random-Terrain">Random Terrain</option>
      </Select>
      <Select
        placeholder="Reset"
        size={"md"}
        width={"150px"}
        className={"select-menu"}
        onChange={handleReset}
      >
        <option value="Clear-Path">Clear Path</option>
        <option value="Clear-Board">Clear Board</option>
        <option value="Reset-Board">Reset Board</option>
      </Select>
      <Select
        placeholder="Node Type"
        size={"md"}
        width={"150px"}
        className={"select-menu"}
        onChange={handleNodeType}
        defaultValue={"Wall"}
      >
        <option value="Wall">[Infinity] Wall</option>
        <option value="Grass">[5] Grass</option>
        <option value="Sand">[7] Sand</option>
        <option value="Granite">[50] Granite</option>
        <option value="Water">[50] Water</option>
        <option value="Snow">[75] Snow</option>
        <option value="Deep-Water">[100] Deep Water</option>
      </Select>
      <Button size={"md"} variant={"outline"} id={"settings-btn"}>
        Settings
      </Button>
    </Flex>
  );
}
