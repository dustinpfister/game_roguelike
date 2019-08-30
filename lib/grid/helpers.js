let findPath = require('./find-path.js'),
os = require('os');

// print a grid
exports.print = (grid) => {
    var tiles = ['.', '+', 'S', 'E', '#'];
    grid.nodes.forEach((row) => {
        row.forEach((node) => {
            process.stdout.write(tiles[node.ti]);
        });
        process.stdout.write(os.EOL);
    });
};

// set the tile index value for the given path
exports.setTileIndexValuesforPath = (grid, path, ti) => {
    ti = ti === undefined ? 0 : ti;
    path.forEach((pt) => {
        let node = grid.nodes[pt[1]][pt[0]];
        node.ti = ti;
    });
};

// set the start and end point tile locations
exports.setStartEnd = (grid, sx, sy, ex, ey) => {
    let startNode = grid.nodes[sy][sx],
    endNode = grid.nodes[ey][ex],
    //p = grid.findPath(startNode, endNode);
    p = findPath(grid, sx, sy, ex, ey);
    this.setTileIndexValuesforPath(grid, p, 1);
    startNode.ti = 2;
    endNode.ti = 3;
};
