let Grid = require('./grid.js').Grid;

// sort a list of open nodes
var sortOpen = function (open) {
    return open.sort(function (nodeA, nodeB) {
        if (nodeA.weight < nodeB.weight) {
            return 1;
        }
        if (nodeA.weight > nodeB.weight) {
            return -1;
        }
        return 0;
    });
};

// set weight for a node
var setWeight = function (endNode, neighbor) {
    return Math.sqrt(Math.pow(endNode.x - neighbor.x, 2) + Math.pow(endNode.y - neighbor.y, 2))
};

// build a path based an parent property
var buildPath = function (node) {
    var path = [];
    while (node.parent) {
        path.push([node.x, node.y]);
        node = node.parent;
    }
    path.push([node.x, node.y]);
    return path;

};

// for Each Neighbor for the given grid, node, and open list
var forNeighbors = function (grid, node, open) {
    var neighbors = grid.getNeighbors(node);
    var ni = 0,
    nl = neighbors.length;
    while (ni < nl) {
        var neighbor = neighbors[ni];
        // if the neighbor is closed continue looping
        if (neighbor.closed) {
            ni += 1;
            continue;
        }
        // set weight for the neighbor
        neighbor.weight = setWeight(endNode, neighbor);
        // if the node is not opened
        if (!neighbor.opened) {
            neighbor.parent = node;
            open.push(neighbor);
            neighbor.opened = true;
        }
        ni += 1;
    }
};

// Find path from start node to end node
module.exports = function (givenGrid, sx, sy, ex, ey) {
    // copy the given grid
    var grid = Grid.fromMatrix(givenGrid.nodes),
    path = [],
    open = [],
    node;
    // set startNode and End Node to copy of grid
    var startNode = grid.nodes[sy][sx];
    endNode = grid.nodes[ey][ex];
    // push start Node to open list
    open.push(startNode);
    startNode.opened = true;
    startNode.weight = 0;
    // start walking
    while (open.length > 0) {
        // pop out next Node from open list
        node = open.pop();
        node.closed = true;
        // if the node is the end node
        if (node === endNode) {
            return buildPath(node);
        }
        // loop current neighbors
        forNeighbors(grid, node, open);
        // sort the list of nodes be weight value to end node
        sortOpen(open);
    }
    // return an empty array if we get here (can not get to end node)
    return [];
};
