/* sophisticated_elaborate_code.js */

// This code generates a maze using a randomized Prim's algorithm
// It then solves the maze using a modified version of the A* algorithm

// Initialize constants
const MAZE_SIZE = 20;
const EMPTY_CELL = " ";
const WALL_CELL = "#";
const START_CELL = "@";
const END_CELL = "$";
const VISITED_CELL = ".";
const PATH_CELL = "+";

// Create a 2D array to represent the maze
const maze = new Array(MAZE_SIZE);
for (let i = 0; i < MAZE_SIZE; i++) {
  maze[i] = new Array(MAZE_SIZE);
  for (let j = 0; j < MAZE_SIZE; j++) {
    maze[i][j] = WALL_CELL; // Start with all cells as wall
  }
}

// Helper function to get neighboring cells
function getNeighbors(cell) {
  const { row, column } = cell;
  const neighbors = [];
  if (row >= 2) neighbors.push({ row: row - 2, column });
  if (row <= MAZE_SIZE - 3) neighbors.push({ row: row + 2, column });
  if (column >= 2) neighbors.push({ row, column: column - 2 });
  if (column <= MAZE_SIZE - 3) neighbors.push({ row, column: column + 2 });
  return neighbors;
}

// Randomized Prim's algorithm to generate the maze
function generateMaze() {
  const stack = [];
  const startCell = { row: 1, column: 1 };
  maze[1][1] = EMPTY_CELL;
  stack.push(startCell);

  while (stack.length > 0) {
    const current = stack.pop();
    const neighbors = getNeighbors(current).filter(
      (neighbor) => maze[neighbor.row][neighbor.column] === WALL_CELL
    );
    if (neighbors.length > 0) {
      stack.push(current);

      const randomNeighbor =
        neighbors[Math.floor(Math.random() * neighbors.length)];
      const { row: nRow, column: nColumn } = randomNeighbor;
      const wallRow = (nRow + current.row) / 2;
      const wallColumn = (nColumn + current.column) / 2;

      maze[wallRow][wallColumn] = EMPTY_CELL;
      maze[nRow][nColumn] = EMPTY_CELL;

      stack.push(randomNeighbor);
    }
  }
  maze[startCell.row][startCell.column] = START_CELL;
  maze[MAZE_SIZE - 2][MAZE_SIZE - 2] = END_CELL;
}

// A* algorithm to solve the maze
function solveMaze() {
  const openSet = new Set();
  const start = { row: 1, column: 1 };
  const end = { row: MAZE_SIZE - 2, column: MAZE_SIZE - 2 };
  let current = start;
  const cameFrom = {};

  const calculateHeuristic = (cell) =>
    Math.abs(cell.row - end.row) + Math.abs(cell.column - end.column);

  const gScore = {};
  const fScore = {};
  const infinity = Number.POSITIVE_INFINITY;
  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      const cell = { row: i, column: j };
      gScore[cell] = infinity;
      fScore[cell] = infinity;
    }
  }

  gScore[start] = 0;
  fScore[start] = calculateHeuristic(start);
  openSet.add(start);

  const getLowestFScore = () => {
    let lowest = infinity;
    let lowestCell = null;
    for (const cell of openSet) {
      if (fScore[cell] < lowest) {
        lowest = fScore[cell];
        lowestCell = cell;
      }
    }
    return lowestCell;
  };

  while (openSet.size > 0) {
    current = getLowestFScore();
    if (current === end) break;

    openSet.delete(current);

    const neighbors = getNeighbors(current);
    for (const neighbor of neighbors) {
      const { row, column } = neighbor;
      const tentativeGScore = gScore[current] + 1;

      if (tentativeGScore < gScore[neighbor]) {
        cameFrom[neighbor] = current;
        gScore[neighbor] = tentativeGScore;
        fScore[neighbor] =
          gScore[neighbor] + calculateHeuristic(neighbor);

        if (!openSet.has(neighbor)) openSet.add(neighbor);
      }
    }
  }

  // Construct the path
  let path = [];
  current = end;
  while (current !== start) {
    path.unshift(current);
    current = cameFrom[current];
  }

  // Mark the path and visited cells
  for (const cell of path) {
    const { row, column } = cell;
    maze[row][column] = PATH_CELL;
  }
  for (let i = 0; i < MAZE_SIZE; i++) {
    for (let j = 0; j < MAZE_SIZE; j++) {
      if (maze[i][j] === EMPTY_CELL) maze[i][j] = VISITED_CELL;
    }
  }
}

generateMaze();
solveMaze();

// Print the maze
for (let i = 0; i < MAZE_SIZE; i++) {
  console.log(maze[i].join(""));
}