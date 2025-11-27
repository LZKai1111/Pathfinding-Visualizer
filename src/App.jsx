import { useEffect, useState } from "react"
import './App.css'
import { Grid } from "./Components/grid/Grid.jsx";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegCircleDot } from "react-icons/fa6";
import { dijkstra, getNodesInShortestPathOrder } from "./Algorithms/dijkstra";
import { generateMaze } from "./Algorithms/maze.js";


function App() {
    const [grid, setGrid] = useState([]);
    const [startNode, setStartNode] = useState({row: 10, col: 5});
    const [endNode, setEndNode] = useState({row: 10, col: 25});
    const [isMousePressed, setIsMousePressed] = useState(false);
    const [clearBtnClicked, setClearBtnClicked] = useState(false);
    const [selectedAlgo, setSelectedAlgo] = useState('djikstra');

    useEffect(()=> {
        const newGrid = createGrid();
        setGrid(newGrid);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clearBtnClicked]);


    const createGrid = () => {
        const rows = [];
        for (let row = 0; row < 20; row++) {
            const currentRow = [];
            for (let col = 0; col < 30; col++) {
                currentRow.push({
                    row,
                    col,
                    isStart: row === startNode.row && col === startNode.col,
                    isEnd: row === endNode.row && col === endNode.col,
                    isWall: false,
                    distance: Infinity,
                    visited: false,
                    previousNode: null,
                    // aStar algorithm

                });
            }
            rows.push(currentRow);
        }
        return rows;
    }


    const runAlgorithm = () => {
        visualizeDijkstra();
    }


    const visualizeDijkstra = () => {
        const newGrid = [...grid];  
        const start = newGrid[startNode.row][startNode.col];
        const end = newGrid[endNode.row][endNode.col];
        const visitedNodesInOrder = dijkstra(newGrid, start, end);
        const shortestPathOrder = getNodesInShortestPathOrder(end);
        animateVisitedNodesInOrder(visitedNodesInOrder, shortestPathOrder);
    }



    const animateVisitedNodesInOrder = (visitedNodes, shortestPathOrder) => {
        for (let i = 0; i <= visitedNodes.length; i++){
            if (i === visitedNodes.length) {
                setTimeout(()=> {
                    animateShortestPath(shortestPathOrder);
                }, 10 * i);
                return;
            }
            setTimeout(()=> {
                const node = visitedNodes[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 
                'node node-visited';
            }, 10 * i);
        }
    }

    
    const animateShortestPath = (shortestPathOrder) => {
        for (let i = 0; i < shortestPathOrder.length; i++){
            setTimeout(()=> {
                const node = shortestPathOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).className = 
                "node node-path";
            }, 50 * i)
        }
    }

    const animateMaze = (mazeOrder) => {
        const wallGrid = fillMaze();
        for (let i = 0; i < mazeOrder.length; i++) {
            setTimeout(()=> {
                const node = mazeOrder[i];
                document.getElementById(`node-${node.row}-${node.col}`).classList.remove("node-wall")
                wallGrid[node.row][node.col].isWall = false;
            }, 5 * i)
        }
        setGrid(wallGrid)
    }

    const fillMaze = () => {
        const newGrid = [...grid];
        for (let r = 0; r < newGrid.length; r++) {
            for (let c = 0; c < newGrid[0].length; c++) {
                // const node = newGrid[r][c];
                // node.isStart ? '' : node.isEnd ? '' : document.getElementById(`node-${node.row}-${node.col}`).classList.add("node-wall")

                // Instead of adding node-wall class, set the isWall property then replace the grid with the newGrid
                const node = newGrid[r][c];
                node.isStart ? '' : node.isEnd ? '' : node.isWall = true;
                newGrid[r][c] = node;
            }
        }
        setGrid(newGrid);
        return newGrid;
    }

    const handleMouseDown = (row, col) => {
        const newGrid = getNodeWallToggle(grid, row, col);
        setGrid(newGrid);
        setIsMousePressed(true);
    }

    const handleMouseEnter = (row, col) => {
        if (!isMousePressed) return;
        const newGrid = getNodeWallToggle(grid, row, col);
        setGrid(newGrid);
    }

    const handleMouseUp = () => {
        setIsMousePressed(false);
    }


    const clearGrid = () => {
        removeWalls()
        setClearBtnClicked(!clearBtnClicked)
    }

    const removeWalls = () => {
        const newGrid = [...grid]
        for (let r = 0; r < newGrid.length; r++) {
            for (let c = 0; c < newGrid[0].length; c++) {
                const node = newGrid[r][c];
                node.isStart ? '' : node.isEnd ? '' : document.getElementById(`node-${node.row}-${node.col}`).classList.remove("node-wall")
            }
        }
        setGrid(newGrid);
    }

    const onClickMaze = () => {
        const mazeOrder = generateMaze(createGrid());
        animateMaze(mazeOrder)
    }

    const handleSelectAlgo = () => {
        setSelectedAlgo(event.target.value)
    }

    return (
        <>
            <div className="top-nav">
                <p>Pathfinding Visualizer</p>
                <div className="select-algo">
                    <select value={selectedAlgo} onChange={handleSelectAlgo}>
                        <option value="dijkstra">Dijkstra</option>
                    </select>
                </div>
                <button onClick={onClickMaze}>Maze</button>
                <button onClick={runAlgorithm}>Run it!</button>
                <button onClick={clearGrid}>Clear Grid</button>
            </div>
            <div className="legend-box">
                <div><IoIosArrowForward/>Start Node</div>
                <div><FaRegCircleDot />End Node</div>
                <div><div className="legend-visited"/>Visited Node</div>
                <div><div className="legened-path"/>Path Node</div>
                <div><div className="legend-wall-node"/>Wall Node</div>
            </div>
            <div className="grid-box">
                    <Grid 
                        grid={grid} 
                        isMousePressed={isMousePressed}
                        handleMouseDown={handleMouseDown}
                        handleMouseEnter={handleMouseEnter}
                        handleMouseUp={handleMouseUp}
                    />
            </div>
            <div className="comment">
                <p>Click on a node to create Wall</p>
            </div>
        </>
    )
}

export default App


const getNodeWallToggle = (grid, row, col) => {
    const newGrid = grid.map(row => row.slice());
    const node = newGrid[row][col];
    if (node.isStart || node.isEnd) return newGrid;
    // const newNode = {...node, isWall: node.isWall ? false : true };
    const newNode = {...node, isWall: true };
    newGrid[row][col] = newNode;
    return newGrid;
}