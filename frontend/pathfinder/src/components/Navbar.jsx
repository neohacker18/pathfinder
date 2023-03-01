import { useState } from "react";
import { Flex, Spacer, Link, Text, Select, Button } from "@chakra-ui/react";
import axios from "axios";
import "../App.css";

export default function Navbar({ start, end, gridMatrix, setGridMatrix }) {
  const [path, setPath] = useState([]);
  const [graph, setGraph] = useState({});
  const [algo, setAlgo] = useState("Dijkstra");
  const handlePlay = () => {
    console.log(algo);
    if (algo === "Dijkstra") {
      handleDijkstra();
    }
  };
  const handleAlgorithms = (e) => {
    console.log(e.target.value);
    setAlgo(e.target.value);
  };
  const handleDijkstra = () => {
    axios
      .post(
        "http://localhost:3000/matrixToGraph",
        {
          gridMatrix: JSON.stringify(gridMatrix),
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        const graph = res.data.graph; // Set the graph state variable from the response data
        const startNode = start.split("-")[0] + "," + start.split("-")[1];
        const endNode = end.split("-")[0] + "," + end.split("-")[1];
        const distances = {};
        const visited = {};
        const previous = {};

        for (let node in graph) {
          console.log(node==startNode)
          distances[node] = Infinity;
          visited[node] = false;
          previous[node] = null;
        }

        distances[startNode] = 0;
        while (true) {
          let currentNode = null;
          let shortestDistance = Infinity;

          for (let node in graph) {
            if (!visited[node] && distances[node] < shortestDistance) {
              currentNode = node;
              shortestDistance = distances[node];
            }
          }
          if (currentNode === null) {
            break;
          }

          visited[currentNode] = true;
          for (let neighbor in graph[currentNode]) {
            let distance = graph[currentNode][neighbor];
            let totalDistance = distances[currentNode] + distance;

            if (totalDistance < distances[neighbor]) {
              distances[neighbor] = totalDistance;
              previous[neighbor] = currentNode;
            }
          }
        }
        console.log(previous)
        // Backtrack from end node to start node to get the path
        let node = endNode;
        const path = [node];

        while (node !== startNode) {
          node = previous[node];
          path.unshift(node);
        }

        setPath(path);
        console.log(path);
      })
      .catch((err) => console.log(err));
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
