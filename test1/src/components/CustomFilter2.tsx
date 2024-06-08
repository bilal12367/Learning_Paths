import { useGridFilter } from "ag-grid-react";
import { useCallback } from "react";

const CustomFilter2 = ({ model, onModelChange, getValue }: any) => {
    const doesFilterPass = useCallback(({ node }: any) => {
        // filtering logic
        console.log("Node: ",node);
        return getValue(node).contains(model);
    }, [model]);

    // register filter callbacks with the grid
    useGridFilter({ doesFilterPass });

    return (
        <div>
            <input
                type="text"
                value={model || ''}
                onChange={({ target: { value } }) => onModelChange(value === '' ? null : value)}
            />
        </div>
    );
}

export default CustomFilter2