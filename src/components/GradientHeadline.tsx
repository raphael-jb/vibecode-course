import { addPropertyControls, ControlType } from "framer"

/**
 * GradientHeadline
 * ─────────────────
 * A headline with one highlighted word that renders as a brand gradient.
 * Drop into any Framer frame and set the three text parts via the Property Panel.
 *
 * Props
 *   before      → text before the highlight word
 *   highlight   → the word that gets the gradient
 *   after       → text after the highlight word
 *   fontSize    → number (px)
 *   color       → base text color
 *   italic      → whether the highlight word is italic (default: true)
 *   gradientFrom / gradientMid / gradientTo → gradient colors (mid is optional)
 */
export default function GradientHeadline({
    before        = "Wer ist für",
    highlight     = "Dich",
    after         = "da.",
    fontSize      = 80,
    color         = "#000000",
    italic        = true,
    textAlign     = "left",
    showShadow    = false,
    shadowColor   = "rgba(0,0,0,0.1)",
    shadowBlur    = 10,
    shadowX       = 0,
    shadowY       = 4,
    gradientFrom  = "#FF6403",
    useMid        = false,
    gradientMid   = "#00A8E8",
    gradientTo    = "#9C73FF",
}: {
    before?: string
    highlight?: string
    after?: string
    fontSize?: number
    color?: string
    italic?: boolean
    textAlign?: "left" | "center" | "right"
    showShadow?: boolean
    shadowColor?: string
    shadowBlur?: number
    shadowX?: number
    shadowY?: number
    gradientFrom?: string
    useMid?: boolean
    gradientMid?: string
    gradientTo?: string
}) {
    const shadowValue = showShadow 
        ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}` 
        : "none"

    const base: React.CSSProperties = {
        fontFamily: "'Instrument Serif', serif",
        fontWeight: 400,
        fontSize: fontSize,
        lineHeight: 1.0,
        color: color,
        textAlign: textAlign,
        textShadow: shadowValue,
        margin: 0,
        padding: 0,
        width: "100%",
    }

    const gradientValue = useMid
        ? `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientMid} 50%, ${gradientTo} 100%)`
        : `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 100%)`

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');
                .rb-gh-highlight {
                    display: inline-block;
                    padding-bottom: 0.05em;
                    background-image: ${gradientValue};
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    color: transparent;
                }
            `}</style>

            <p style={base}>
                {before && <>{before}&nbsp;</>}
                <span
                    className="rb-gh-highlight"
                    style={{ fontStyle: italic ? "italic" : "normal" }}
                >
                    {highlight}
                </span>
                {after && <>&nbsp;{after}</>}
            </p>
        </>
    )
}

addPropertyControls(GradientHeadline, {
    before: {
        type: ControlType.String,
        title: "Text davor",
        defaultValue: "Wer ist für",
    },
    highlight: {
        type: ControlType.String,
        title: "Highlight-Wort",
        defaultValue: "Dich",
    },
    after: {
        type: ControlType.String,
        title: "Text danach",
        defaultValue: "da.",
    },
    fontSize: {
        type: ControlType.Number,
        title: "Schriftgröße",
        defaultValue: 80,
        min: 12,
        max: 200,
        step: 1,
        displayStepper: true,
    },
    color: {
        type: ControlType.Color,
        title: "Textfarbe",
        defaultValue: "#000000",
    },
    textAlign: {
        type: ControlType.Enum,
        title: "Ausrichtung",
        options: ["left", "center", "right"],
        optionTitles: ["Links", "Mitte", "Rechts"],
        defaultValue: "left",
        displaySegmentedControl: true,
    },
    showShadow: {
        type: ControlType.Boolean,
        title: "Schatten",
        defaultValue: false,
    },
    shadowColor: {
        type: ControlType.Color,
        title: "Schattenfarbe",
        defaultValue: "rgba(0,0,0,0.1)",
        hidden: (props) => !props.showShadow,
    },
    shadowX: {
        type: ControlType.Number,
        title: "Schatten X",
        defaultValue: 0,
        hidden: (props) => !props.showShadow,
    },
    shadowY: {
        type: ControlType.Number,
        title: "Schatten Y",
        defaultValue: 4,
        hidden: (props) => !props.showShadow,
    },
    shadowBlur: {
        type: ControlType.Number,
        title: "Schatten Blur",
        defaultValue: 10,
        hidden: (props) => !props.showShadow,
    },
    italic: {
        type: ControlType.Boolean,
        title: "Highlight kursiv",
        defaultValue: true,
        enabledTitle: "Ja",
        disabledTitle: "Nein",
    },
    gradientFrom: {
        type: ControlType.Color,
        title: "Gradient — Start",
        defaultValue: "#FF6403",
    },
    useMid: {
        type: ControlType.Boolean,
        title: "Mittelfarbe",
        defaultValue: false,
        enabledTitle: "An",
        disabledTitle: "Aus",
    },
    gradientMid: {
        type: ControlType.Color,
        title: "Gradient — Mitte",
        defaultValue: "#00A8E8",
        hidden: (props) => !props.useMid,
    },
    gradientTo: {
        type: ControlType.Color,
        title: "Gradient — Ende",
        defaultValue: "#9C73FF",
    },
})
