import { useState, useEffect } from "react";
import { Flex, Spacer, Text, Select, Button, grid } from "@chakra-ui/react";
import "../App.css";
import dfs from "../utils/dfs";
import bfs from "../utils/bfs";
import generateMaze from "../utils/mazeGeneration";
import dijkstras from "../utils/dijkstra";
import AStar from "../utils/AStar";
import { useToast } from "@chakra-ui/react";

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
  const toast = useToast();
  const handlePlay = () => {
    handlePlayClear();
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

  const handleDijkstra = () => {
    setColourMatrix(colourMatrix);
    const startNode = start.split("-")[0] + "," + start.split("-")[1];
    const endNode = end.split("-")[0] + "," + end.split("-")[1];
    const { path, visNodes } = dijkstras(gridMatrix, startNode, endNode);
    console.log(path);
    if (path && path.length > 1) {
      setPathTaken(path);
      setNodesVisited(visNodes);
    } else {
      toast({
        title: "Path does not exist",
        description: "Couldn't find a path.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
      setPathTaken([]);
      setNodesVisited(visNodes);
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
    const { path, visNodes } = AStar(gridMatrix, startNode, endNode);
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
  const handlePlayClear = () => {
    for (let i = 0; i < colourMatrix.length; i++) {
      for (let j = 0; j < colourMatrix[0].length; j++) {
        if (
          colourMatrix[i][j] === `rgb(126,223,217)` ||
          colourMatrix[i][j] === `rgb(239,130,0)`
        ) {
          colourMatrix[i][j] = "";
          setColourMatrix(colourMatrix);
        } //either path or visited nodes
      }
    }
  };
  const handleClearBoard = () => {
    const i1 = start.split("-")[0],
      j1 = start.split("-")[1];
    const i2 = end.split("-")[0],
      j2 = end.split("-")[1];
    for (let i = 0; i < colourMatrix.length; i++) {
      for (let j = 0; j < colourMatrix[0].length; j++) {
        setColourMatrix((prevMatrix) => {
          const newMatrix = [...prevMatrix];
          newMatrix[i][j] = "";
          newMatrix[i1][j1] = "green";
          newMatrix[i2][j2] = "red";
          return newMatrix;
        });
      }
    }
    for (let i = 0; i < gridMatrix.length; i++) {
      for (let j = 0; j < gridMatrix[0].length; j++) {
        const i1 = start.split("-")[0],
          j1 = start.split("-")[1];
        const i2 = end.split("-")[0],
          j2 = end.split("-")[1];
        if (!((i == i1 && j == j1) || (i == i2 && j == j2))) {
          setGridMatrix((prev) => {
            const n = [...prev];
            n[i][j] = 0;
            return n;
          });
        }
      }
    }
  };
  const handleReset = (e) => {
    handleClearBoard();
  };
  const handleTerrain = (e) => {
    if (e.target.value === "Recursive-Maze") {
      const maze = generateMaze(gridMatrix.length, gridMatrix[0].length);
      for (let x = 0; x < colourMatrix.length; x++) {
        for (let y = 0; y < colourMatrix[0].length; y++) {
          if (maze[x][y] === 1) {
            colourMatrix[x][y] = "black";
          } else colourMatrix[x][y] = "";
        }
      }
      setColourMatrix(colourMatrix);
      setGridMatrix(maze);
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
      <Text
        fontSize="xl"
        fontWeight="bold"
        className="animate__animated animate__pulse"
      >
        Pathfinding Visualiser
      </Text>
      <Spacer />
      <Button bg={"red"} variant={"outline"} marginX={"5"} onClick={handlePlay}>
        Play
      </Button>
      <Select
        placeholder="Algorithms"
        size={"md"}
        width={"150px"}
        onChange={handleAlgorithms}
        className={"select-menu"}
      >
        <option value="Dijkstra">Dijkstra's Algorithm</option>
        <option value="A*">A* Search</option>
        <option value="BFS">Breadth First Search</option>
        <option value="DFS">Depth First Search</option>
      </Select>
      <Select
        placeholder="Terrain"
        size={"md"}
        width={"150px"}
        marginLeft={5}
        className={"select-menu"}
        onChange={handleTerrain}
      >
        <option value="Recursive-Maze">Recursive Maze</option>
        <option value="Simplex-Terrain">Simplex Terrain</option>
        <option value="Random-Terrain">Random Terrain</option>
      </Select>
      <Button
        size={"md"}
        width={"100px"}
        marginLeft={5}
        marginRight={5}
        onClick={handleReset}
        id={'reset__button'}
      >
        Clear Board
      </Button>
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
      <Button size={"md"} variant={"outline"} id={"settings-btn"}
      marginLeft={5}
      >
        Settings
      </Button>
    </Flex>
  );
}
