import useMousePosition from "../functions/windowSize";

export default function Test() {
    const { x, y } = useMousePosition;

    // const hasMovedCursor = typeof x === "number" && typeof y === "number";

    return (
        <div className="App">
            <h1>
                {x}
            </h1>
        </div>
    );
}