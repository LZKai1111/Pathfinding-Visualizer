

export const dijkstra = (grid, startNode, endNode) => {
    const visitedNodesInOrder = [];
    startNode.distance = 0;
    // storing all nodes into array from top left to bottom right
    const unvisitedNodes = getAllNodes(grid); 

    // iterate through all nodes in array
    while (unvisitedNodes.length) {
        // sort in ascending order by distance
        // meaning nodes with shortest distance is at the front
        // currently all nodes except for startNode dist is infinite, with startNode.dist at 0
        unvisitedNodes.sort((a, b) => a.distance - b.distance);
        // shift() removes first element from array and returns the removed element
        const closestNode = unvisitedNodes.shift();

        if (closestNode.isWall) continue;
        if (closestNode.distance === Infinity) return visitedNodesInOrder;

        closestNode.visited = true;
        visitedNodesInOrder.push(closestNode);

        if (closestNode.visited === endNode.visited) return visitedNodesInOrder;

        updateUnvisitedNeighbors(closestNode, grid)
    }

    return visitedNodesInOrder;

}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}


function updateUnvisitedNeighbors(node, grid) {
  const neighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid) {
  const { row, col } = node;
  const neighbors = [];
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(n => !n.visited);
}

export const getNodesInShortestPathOrder = (endNode) => {
    const nodesInShortestPathOrder = [];
    let currentNode = endNode;
    while (currentNode !== null) {
        // unshift() adds element to beginning of array and returns length of new array
        nodesInShortestPathOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
}