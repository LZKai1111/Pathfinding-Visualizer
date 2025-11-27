// Algorithm from:
// https://www.youtube.com/watch?v=Qfajj84oGUo
//
// Global values

// Grid properties
const grid_height = 20;
const grid_width = 30;

let mazeOrder = []

export function generateMaze(grid) {
    const cloneGrid = createGrid(grid)
    mazeOrder = []

    for (let row = 0; row < cloneGrid.length; row++) {
        for (let col = 0; col < cloneGrid[row].length; col++) {
            cloneGrid[row][col].isStart ? '' : cloneGrid[row][col].isEnd ? '' : cloneGrid[row][col].isWall = true;
        }
    }

    const height = random_int(0, grid_height-1)
    const width = random_int(0, grid_width-1)

    console.log(height, width)

    dig_around(height, width, cloneGrid)

    // console.log(cloneGrid)
    // console.log("maze2.js", mazeOrder)
    return mazeOrder;
}


function dig_around(y, x, cloneGrid) {
    cloneGrid[y][x].isWall = false;
    let neighbours = shuffle([
        {x: x-2, y: y  }, // Left
        {x: x+2, y: y  }, // Right
        {x: x,   y: y-2}, // Up
        {x: x,   y: y+2}  // Down
    ]);


    neighbours.forEach(neighbours => {
        dig_to(neighbours.x, neighbours.y, x, y, cloneGrid);
    })
}

function dig_to(dest_x, dest_y, from_x, from_y, cloneGrid) {
    let mid_x = (dest_x + from_x)/2;
    let mid_y = (dest_y + from_y)/2;

    if(!isWithinMap(dest_x, dest_y)) {
        return;
    }

    let dest = cloneGrid[dest_y][dest_x]
    let mid = cloneGrid[mid_y][mid_x]
    if(dest.isWall == true && mid.isWall == true) {
        cloneGrid[dest_y][dest_x].isWall = false;
        cloneGrid[mid_y][mid_x].isWall = false;

        mazeOrder.push(cloneGrid[mid_y][mid_x])
        mazeOrder.push(cloneGrid[dest_y][dest_x])
        
        dig_around(dest_y, dest_x, cloneGrid)
    }
}

function isWithinMap (x, y) {
    return (x >= 0 && 
        y >= 0 &&
        x < 30 &&
        y < 20
    )
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;  
}

function random_int(min, max) {
    return Math.floor(Math.random() * (max-min) + min)
}

function createGrid(grid) {
  return grid.map(row => row.map(cell => ({ ...cell })));
}
