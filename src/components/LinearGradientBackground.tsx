import { addPropertyControls, ControlType } from "framer"

/**
 * LinearGradientBackground
 * ────────────────────────
 * A utility component to create precise three-color linear gradients.
 * Control the exact angle (0-360°) and color stops from the Framer sidebar.
 */
export default function LinearGradientBackground(props) {
    const { 
        angle, 
        color1, 
        color2, 
        color3, 
        stop1, 
        stop2, 
        stop3,
        borderRadius 
    } = props

    const gradientStyle: React.CSSProperties = {
        width: "100%",
        height: "100%",
        background: `linear-gradient(${angle}deg, ${color1} ${stop1}%, ${color2} ${stop2}%, ${color3} ${stop3}%)`,
        borderRadius: borderRadius,
    }

    return <div style={gradientStyle} />
}

LinearGradientBackground.defaultProps = {
    angle: 90,
    color1: "#0E2616", // Navy (Brand)
    stop1: 0,
    color2: "#FF6403", // Action Orange (Brand)
    stop2: 50,
    color3: "#FCF8F1", // Warm Cream (Brand)
    stop3: 100,
    borderRadius: 0,
}

addPropertyControls(LinearGradientBackground, {
    angle: {
        type: ControlType.Number,
        title: "Angle",
        defaultValue: 90,
        min: 0,
        max: 360,
        step: 1,
        unit: "°",
        displayStepper: true,
    },
    color1: {
        type: ControlType.Color,
        title: "Color 1",
        defaultValue: "#0E2616",
    },
    stop1: {
        type: ControlType.Number,
        title: "Stop 1",
        defaultValue: 0,
        min: 0,
        max: 100,
        unit: "%",
    },
    color2: {
        type: ControlType.Color,
        title: "Color 2",
        defaultValue: "#FF6403",
    },
    stop2: {
        type: ControlType.Number,
        title: "Stop 2",
        defaultValue: 50,
        min: 0,
        max: 100,
        unit: "%",
    },
    color3: {
        type: ControlType.Color,
        title: "Color 3",
        defaultValue: "#FCF8F1",
    },
    stop3: {
        type: ControlType.Number,
        title: "Stop 3",
        defaultValue: 100,
        min: 0,
        max: 100,
        unit: "%",
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Radius",
        defaultValue: 0,
        min: 0,
        max: 500,
    },
})
