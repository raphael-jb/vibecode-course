import { addPropertyControls, ControlType } from "framer"

/**
 * ThoughtCard
 * ───────────
 * Editorial content card with colored dashed border.
 * Based on the Raphael Baruch design system:
 *   - Font: Instrument Serif (body), Inter Tight (label)
 *   - Border: 1px dashed, brand color selectable
 *   - Background: #FFFFFF or background-alt #FCF8F1
 *   - Radius: radius-lg 16px
 */
export default function ThoughtCard({
    text         = "Ich treffe jeden Tag Entscheidungen, aber nicht jede aus freien Stücken.",
    label        = "Thought Card",
    icon         = "💭",
    borderColor  = "#9C73FF",
    borderStyle  = "dashed",
    background   = "#FFFFFF",
    textColor    = "#000000",
    fontSize     = 24,
    width        = 320,
    height       = 380,
}: {
    text?: string
    label?: string
    icon?: string
    borderColor?: string
    borderStyle?: "dashed" | "solid"
    background?: string
    textColor?: string
    fontSize?: number
    width?: number
    height?: number
}) {
    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400&display=swap');
            `}</style>

            <div style={{
                width,
                height,
                background,
                border: `1px ${borderStyle} ${borderColor}`,
                borderRadius: 16,
                padding: 24,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                boxSizing: "border-box",
                fontFamily: "'Inter Tight', sans-serif",
                WebkitFontSmoothing: "antialiased",
                flexShrink: 0,
            }}>

                {/* Header */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                }}>
                    <span style={{
                        fontSize: 16,
                        lineHeight: 1,
                        flexShrink: 0,
                    }}>
                        {icon}
                    </span>
                    <span style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontWeight: 300,
                        fontSize: 12,
                        color: "#767676",
                        letterSpacing: "0.01em",
                    }}>
                        {label}
                    </span>
                </div>

                {/* Body text */}
                <p style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontWeight: 400,
                    fontSize,
                    lineHeight: 1.2,
                    color: textColor,
                    margin: 0,
                    marginTop: 24,
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "flex-end",
                }}>
                    {text}
                </p>

            </div>
        </>
    )
}

addPropertyControls(ThoughtCard, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: "Ich treffe jeden Tag Entscheidungen, aber nicht jede aus freien Stücken.",
        displayTextArea: true,
    },
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "Thought Card",
    },
    icon: {
        type: ControlType.String,
        title: "Icon (Emoji)",
        defaultValue: "💭",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Rahmenfarbe",
        defaultValue: "#9C73FF",
    },
    borderStyle: {
        type: ControlType.Enum,
        title: "Rahmenstil",
        options: ["dashed", "solid"],
        optionTitles: ["Gestrichelt", "Durchgezogen"],
        defaultValue: "dashed",
    },
    background: {
        type: ControlType.Color,
        title: "Hintergrund",
        defaultValue: "#FFFFFF",
    },
    textColor: {
        type: ControlType.Color,
        title: "Textfarbe",
        defaultValue: "#000000",
    },
    fontSize: {
        type: ControlType.Number,
        title: "Schriftgröße",
        defaultValue: 24,
        min: 14,
        max: 48,
        step: 1,
        displayStepper: true,
    },
    width: {
        type: ControlType.Number,
        title: "Breite",
        defaultValue: 320,
        min: 200,
        max: 600,
        step: 4,
    },
    height: {
        type: ControlType.Number,
        title: "Höhe",
        defaultValue: 380,
        min: 200,
        max: 700,
        step: 4,
    },
})
