// Node Constructor
var Node = exports.Node = function (opt) {
    var opt = opt || {};
    this.x = opt.x;
    this.y = opt.y;
    this.i = opt.i;
    this.walkable = opt.walkable === undefined ? true : opt.walkable;
    this.ti = opt.ti || 0; // tile index used to skin the tile
};

// Main Grid Constructor
var Grid = exports.Grid = function (opt) {
    opt = opt || {};
    this.w = opt.w || 8;
    this.h = opt.h || 6;
    this.nodes = [];
    this.buildCleanNodes();
};

// FromMatrix static method can be used to clone a Grid
Grid.fromMatrix = function (matrix) {
    var grid = new Grid({
            w: matrix[0].length,
            h: matrix.length
        });
    var y = 0,
    x,
    m;
    while (y < grid.h) {
        x = 0;
        while (x < grid.w) {
            m = matrix[y][x];
            grid.nodes[y][x] = new Node({
                    x: x,
                    y: y,
                    i: y * grid.w + x,
                    walkable: m.walkable,
                    ti: m.ti || 0
                });
            x += 1;
        }
        y += 1;
    }
    return grid;
};

// just build a clean array of nodes for the gird
Grid.prototype.buildCleanNodes = function (ti) {
    this.nodes = [];
    var y = 0,
    x,
    row;
    ti = ti === undefined ? 0 : ti;
    while (y < this.h) {
        x = 0;
        row = [];
        while (x < this.w) {
            row.push(new Node({
                    x: x,
                    y: y,
                    i: y * this.w + x,
                    walkable: true,
                    ti: ti
                }));
            x += 1;
        }
        this.nodes.push(row);
        y += 1;
    }
    return this.nodes;
};

// return true if the given x and y position is in bounds
Grid.prototype.isInBounds = function (x, y) {
    return (x >= 0 && x < this.w) && (y >= 0 && y < this.h);
};

Grid.prototype.isWalkable = function (x, y) {
    if (this.isInBounds(x, y)) {
        return this.nodes[y][x].walkable;
    }
    return false;
};

// get the four Neighbors of a node
Grid.prototype.getNeighbors = function (node) {
    var x = node.x,
    y = node.y,
    neighbors = [];
    if (this.isWalkable(x, y - 1)) {
        neighbors.push(this.nodes[y - 1][x]);
    }
    if (this.isWalkable(x, y + 1)) {
        neighbors.push(this.nodes[y + 1][x]);
    }
    if (this.isWalkable(x - 1, y)) {
        neighbors.push(this.nodes[y][x - 1]);
    }
    if (this.isWalkable(x + 1, y)) {
        neighbors.push(this.nodes[y][x + 1]);
    }
    return neighbors;
};
