exports.matrixToGraph = (req, res, next) => {
  const matrix = JSON.parse(req.body.gridMatrix);
  const graph = {};
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      const node = `${i},${j}`;

      // Create a new node in the graph for each 0 in the matrix
      graph[node] = {};

      // Add neighbors to the node based on adjacent 0s in the matrix
      if (i > 0 && matrix[i - 1][j] === 0) {
        graph[node][`${i - 1},${j}`] = 1;
      }
      if (j > 0 && matrix[i][j - 1] === 0) {
        graph[node][`${i},${j - 1}`] = 1;
      }
      if (i < matrix.length - 1 && matrix[i + 1][j] === 0) {
        graph[node][`${i + 1},${j}`] = 1;
      }
      if (j < matrix[i].length - 1 && matrix[i][j + 1] === 0) {
        graph[node][`${i},${j + 1}`] = 1;
      }
    }
  }
  console.log(graph);
  res.status(200).send({ graph: graph });
};
exports.getDijkstra = (req, res, next) => {
  const { start, end, graph } = req.body;
  const distances = {};
  const visited = {};
  const previous = {};

  for (let node in graph) {
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

  // Backtrack from end node to start node to get the path
  let node = endNode;
  const path = [node];

  while (node !== startNode) {
    node = previous[node];
    path.unshift(node);
  }

  setPath(path);
};

exports.getAStar = (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests",
  });
};

exports.getBFS = (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests",
  });
};

exports.getDFS = (req, res, next) => {
  res.status(200).json({
    message: "Handling GET requests",
  });
};
