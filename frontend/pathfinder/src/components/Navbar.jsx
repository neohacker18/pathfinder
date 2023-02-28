import { Flex, Spacer, Link, Text, Select, Button } from "@chakra-ui/react";

function Navbar() {
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
      <Select placeholder="Algorithms" size={"md"} width={"150px"}>
        <option value="Dijkstra">Dijksta's Algorithm</option>
        <option value="A*">Dijksta's Algorithm</option>
        <option value="BFS">Breadth First Search</option>
        <option value="DFS">Depth First Search</option>
      </Select>
      <Select placeholder="Terrain" size={"md"} width={"150px"}>
        <option value="Recursive-Maze">Recursive Maze</option>
        <option value="Simplex-Terrain">Simplex Terrain</option>
        <option value="Random-Terrain">Random Terrain</option>
      </Select>
      <Select placeholder="Reset" size={"md"} width={"150px"}>
        <option value="Clear-Path">Clear Path</option>
        <option value="Clear-Board">Clear Board</option>
        <option value="Reset-Board">Reset Board</option>
      </Select>
      <Select placeholder="Node Type" size={"md"} width={"150px"}  >
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
      <Button size={"md"} variant={"outline"}>
        Settings
      </Button>
    </Flex>
  );
}

export default Navbar;
