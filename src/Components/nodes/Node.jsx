import './Node.css'
import { IoIosArrowForward } from "react-icons/io";
import { FaRegCircleDot } from "react-icons/fa6";

export const Node = ({ node, handleMouseDown, handleMouseEnter, handleMouseUp }) => {
    const {row, col, isStart, isEnd, isWall, distance, visited, previousNode } = node;
    
    const extraClassName = 
    isWall ? 'node-wall' 
    : visited ? 'node-visited'
    : '';

    // const extraClassName = 
    // visited ? 'node-visited'
    // : '';

    return(
        <div
            id={`node-${row}-${col}`}
            className={`node ${extraClassName}`}
            onMouseDown={() => handleMouseDown(row, col)}
            onMouseEnter={() => handleMouseEnter(row, col)}
            onMouseUp={() => handleMouseUp()}
        >
        {isStart ? <IoIosArrowForward/> : isEnd ? <FaRegCircleDot /> : null}

        </div>
    )
}   