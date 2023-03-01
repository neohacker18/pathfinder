import { useState } from "react";
import { Flex, Spacer, Link, Text, Select, Button } from "@chakra-ui/react";
import axios from "axios";
import "../App.css";

export default function Navbar({
  start,
  end,
  gridMatrix,
  setGridMatrix,
  colourMatrix,
  setColourMatrix,
}) {
  const [algo, setAlgo] = useState("Dijkstra");
  const [copyPath, setCopyPath] = useState([]);
  const handlePlay = () => {
    console.log(algo);
    if (algo === "Dijkstra") {
      handleDijkstra();
    }
  };
  const handleAlgorithms = (e) => {
    setAlgo(e.target.value);
  };
  const nodesVisited = [];
  function dijkstra(grid, startNode, endNode) {
    // Initialize distances of all nodes to Infinity
    const distances = {};
    const visited = {};
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        const node = `${i},${j}`;
        distances[node] = Infinity;
        visited[node] = false;
      }
    }

    // Set distance of start node to 0
    distances[startNode] = 0;
    // Initialize priority queue with start node
    const queue = [startNode];
    while (queue.length > 0) {
      // Get node with minimum distance from start
      const currentNode = queue.shift();
      nodesVisited.push(currentNode);
      // If we have reached the end node, return the shortest path
      if (currentNode === endNode) {
        console.log(distances);
        const path = [currentNode];
        let prevNode = currentNode;
        let x = 1000;
        while (
          prevNode !== startNode &&
          prevNode &&
          !visited[prevNode] &&
          x--
        ) {
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

      // Explore neighbors of current node
      const neighbors = getNeighbors(currentNode, grid.length, grid[0].length);
      if (neighbors.length === 0) continue;
      for (const neighbor of neighbors) {
        const [x, y] = neighbor.split(",").map(Number);
        const weight = grid[x][y];

        // Calculate new distance from start to neighbor
        const distance = distances[currentNode] + (weight >= 1 ? weight : 1);

        // Update distance if it's shorter than current distance
        if (distance < distances[neighbor]) {
          distances[neighbor] = distance;
          queue.push(neighbor);
        }
      }
    }
    // If we reach here, there is no path from start to end
    return null;
  }

  function getNeighbors(node, GRID_ROWS, GRID_COLS) {
    if (!node || !GRID_ROWS || !GRID_COLS) return [];
    const [x, y] = node.split(",").map(Number);
    const neighbors = [];
    if (x < GRID_ROWS - 1) neighbors.push(`${x + 1},${y}`);
    if (y < GRID_COLS - 1) neighbors.push(`${x},${y + 1}`);
    if (x > 0) neighbors.push(`${x - 1},${y}`);
    if (y > 0) neighbors.push(`${x},${y - 1}`);

    return neighbors;
  }
  const handleDijkstra = () => {
    const startNode = start.split("-")[0] + "," + start.split("-")[1];
    const endNode = end.split("-")[0] + "," + end.split("-")[1];
    const response = dijkstra(gridMatrix, startNode, endNode);
    // console.log(response);
    console.log(nodesVisited)
    for(let x=1;x<nodesVisited.length-1;x++){
      const i = nodesVisited[x].split(",")[0];
      const j = nodesVisited[x].split(",")[1];
      colourMatrix[i][j] = "#7EDFEC";
    }
    setColourMatrix(colourMatrix)
    console.log(colourMatrix)
    //till response.length-1 because we dont want to change the colour of the end node
    for (let x = 1; x < response.length - 1; x++) {
      const i = response[x].split(",")[0];
      const j = response[x].split(",")[1];
      colourMatrix[i][j] = "#EF8200";
      setColourMatrix(colourMatrix);
    }
    console.log(colourMatrix);
    // })
    // .catch((err) => console.log(err));
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
      >
        <option value="Air">[1] Air</option>
        <option value="Wall">[Infinite] Wall</option>
        <option value="Start">[1] Start</option>
        <option value="Finish">[1] Finish</option>
        <option value="Granite">[50] Granite</option>
        <option value="Grass">[5] Grass</option>
        <option value="Sand">[7] Sand</option>
        <option value="Snow">[75] Snow</option>
        <option value="Stone">[25] Stone</option>
        <option value="Water">[50] Water</option>
        <option value="Deep-Water">[100] Deep Water</option>
      </Select>
      <Button size={"md"} variant={"outline"} id={"settings-btn"}>
        Settings
      </Button>
    </Flex>
  );
}
