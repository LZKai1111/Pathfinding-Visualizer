import { Node } from "../nodes/Node"
import "./Grid.css"

export const Grid = ({ grid, isMousePressed, handleMouseDown, handleMouseEnter, handleMouseUp }) => {
    return (
            <div className="grid">
                {grid.map((row, rowId) => (
                    <div key={rowId} className="row">
                        {row.map((node, nodeId)=> {
                            return (
                                <Node 
                                    key={nodeId} 
                                    node={node}
                                    isMousePressed={isMousePressed}
                                    handleMouseDown={handleMouseDown}
                                    handleMouseEnter={handleMouseEnter}
                                    handleMouseUp={handleMouseUp}
                                />
                            )
                        })}
                    </div>
                ))}
            </div>
    )
}