export default function generateMaze(rows, cols) {
    // Initialize the maze as a 2D array of walls
    const maze = Array(rows).fill().map(() => Array(cols).fill(1));
    
    // Create a starting cell
    const startX = Math.floor(Math.random() * rows);
    const startY = Math.floor(Math.random() * cols);
    maze[startX][startY] = 0;
    
    // Call the DFS function starting from the starting cell
    dfs(maze, startX, startY, new Set([`${startX},${startY}`]));
    
    return maze;
  }
  
  function dfs(maze, x, y, visited) {
    // Define the directions (up, right, down, left)
    const directions = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    
    // Randomize the order of the directions
    shuffle(directions);
    
    // Loop through each direction
    for (const direction of directions) {
      const [dx, dy] = direction;
      const newX = x + dx;
      const newY = y + dy;
      
      // Check if the new cell is within the maze and is a wall and has not been visited before
      if (newX >= 0 && newX < maze.length && newY >= 0 && newY < maze[0].length && maze[newX][newY] === 1 && !visited.has(`${newX},${newY}`)) {
        // Remove the wall between the current cell and the new cell
        if (dx === -1) maze[x][y] &= 0b1000; // Remove top wall of current cell
        if (dx === 1) maze[x][y] &= 0b0010; // Remove bottom wall of current cell
        if (dy === 1) maze[x][y] &= 0b0001; // Remove right wall of current cell
        if (dy === -1) maze[x][y] &= 0b0100; // Remove left wall of current cell
        
        if (dx === -1) maze[newX][newY] &= 0b0010; // Remove bottom wall of new cell
        if (dx === 1) maze[newX][newY] &= 0b1000; // Remove top wall of new cell
        if (dy === 1) maze[newX][newY] &= 0b0100; // Remove left wall of new cell
        if (dy === -1) maze[newX][newY] &= 0b0001; // Remove right wall of new cell
        
        // Add the new cell to the visited set
        visited.add(`${newX},${newY}`);
        
        // Recursively call the DFS function on the new cell
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
  