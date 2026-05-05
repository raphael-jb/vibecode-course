import { addPropertyControls, ControlType, motion, RenderTarget } from "framer"

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
    animate       = true,
    animationStart = "first",
    stagger       = 0.08,
    delay         = 0.05,
    blur          = 10,
    offsetY       = 20,
    stiffness     = 150,
    damping       = 40,
    mass          = 1,
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
    animate?: boolean
    animationStart?: "first" | "middle" | "last"
    stagger?: number
    delay?: number
    blur?: number
    offsetY?: number
    stiffness?: number
    damping?: number
    mass?: number
}) {
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const shouldAnimate = animate && !isCanvas
    const shadowValue = showShadow 
        ? `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowColor}` 
        : "none"

    const base: React.CSSProperties = {
        fontFamily: "'Instrument Serif', serif",
        fontWeight: 400,
        fontSize: fontSize,
        lineHeight: 1.08,
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

    const words = [
        ...splitWords(before).map((word) => ({ word, isHighlight: false })),
        ...splitWords(highlight).map((word) => ({ word, isHighlight: true })),
        ...splitWords(after).map((word) => ({ word, isHighlight: false })),
    ]

    const revealRanks = getRevealRanks(words.length, animationStart)

    const wordVariant = {
        hidden: { y: offsetY, opacity: 0, filter: `blur(${blur}px)` },
        visible: (rank: number) => ({
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: {
                type: "spring",
                stiffness,
                damping,
                mass,
                delay: delay + rank * stagger,
            },
        }),
    }

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

            <motion.p
                style={base}
                initial={shouldAnimate ? "hidden" : false}
                animate={!shouldAnimate ? "visible" : undefined}
                whileInView={shouldAnimate ? "visible" : undefined}
                viewport={{ once: true, amount: 0.7 }}
            >
                {words.map((item, i) => (
                    <span key={`${item.word}-${i}`} style={{ display: "inline-block", overflow: "visible", verticalAlign: "top" }}>
                        <motion.span
                            variants={animate ? wordVariant : undefined}
                            custom={revealRanks[i]}
                            className={item.isHighlight ? "rb-gh-highlight" : undefined}
                            style={{
                                display: "inline-block",
                                whiteSpace: "pre",
                                fontStyle: item.isHighlight && italic ? "italic" : "normal",
                            }}
                        >
                            {item.word}{i < words.length - 1 ? " " : ""}
                        </motion.span>
                    </span>
                ))}
            </motion.p>
        </>
    )
}

function splitWords(text?: string) {
    return (text || "").trim().split(/\s+/).filter(Boolean)
}

function getRevealRanks(count: number, start: "first" | "middle" | "last") {
    const indices = Array.from({ length: count }, (_, i) => i)

    if (start === "last") {
        return indices.map((i) => count - 1 - i)
    }

    if (start === "middle") {
        const center = (count - 1) / 2
        const ordered = [...indices].sort((a, b) => {
            const distanceA = Math.abs(a - center)
            const distanceB = Math.abs(b - center)
            if (distanceA === distanceB) return a - b
            return distanceA - distanceB
        })
        return indices.map((i) => ordered.indexOf(i))
    }

    return indices
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
    animate: {
        type: ControlType.Boolean,
        title: "Wort-Animation",
        defaultValue: true,
        enabledTitle: "An",
        disabledTitle: "Aus",
    },
    animationStart: {
        type: ControlType.Enum,
        title: "Start",
        options: ["first", "middle", "last"],
        optionTitles: ["First", "Middle", "Last"],
        defaultValue: "first",
        hidden: (props) => !props.animate,
    },
    stagger: {
        type: ControlType.Number,
        title: "Stagger",
        defaultValue: 0.08,
        min: 0,
        max: 0.3,
        step: 0.01,
        hidden: (props) => !props.animate,
    },
    delay: {
        type: ControlType.Number,
        title: "Delay",
        defaultValue: 0.05,
        min: 0,
        max: 2,
        step: 0.05,
        hidden: (props) => !props.animate,
    },
    blur: {
        type: ControlType.Number,
        title: "Blur",
        defaultValue: 10,
        min: 0,
        max: 30,
        step: 1,
        hidden: (props) => !props.animate,
    },
    offsetY: {
        type: ControlType.Number,
        title: "Offset Y",
        defaultValue: 20,
        min: -80,
        max: 80,
        step: 1,
        hidden: (props) => !props.animate,
    },
    stiffness: {
        type: ControlType.Number,
        title: "Stiffness",
        defaultValue: 150,
        min: 20,
        max: 500,
        step: 10,
        hidden: (props) => !props.animate,
    },
    damping: {
        type: ControlType.Number,
        title: "Damping",
        defaultValue: 40,
        min: 1,
        max: 100,
        step: 1,
        hidden: (props) => !props.animate,
    },
    mass: {
        type: ControlType.Number,
        title: "Mass",
        defaultValue: 1,
        min: 0.1,
        max: 5,
        step: 0.1,
        hidden: (props) => !props.animate,
    },
})
