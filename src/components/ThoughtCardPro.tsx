import { addPropertyControls, ControlType } from "framer"

/**
 * ThoughtCardPro
 * ──────────────
 * High-end editorial content card with full responsive flexibility.
 * Follows the Raphael Baruch design system:
 * - Fonts: Instrument Serif (H4), Inter Display (Caption)
 * - Borders: Selectable dashed/solid brand accents
 * - Sizing: Fully responsive (drag handles in Framer)
 */

const COLORS = {
    brandOrange: "#FF6403",
    brandPurple: "#9C73FF",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
    borderPrimary: "#E5E5E5",
}

export default function ThoughtCardPro(props) {
    const {
        text,
        label,
        icon,
        accentColor,
        borderStyle,
        backgroundColor,
        textColor,
        fontSize,
        padding,
        borderRadius,
        showIcon,
        italicAccent,
        shadowColor,
        shadowX,
        shadowY,
        shadowBlur,
        shadowSpread,
    } = props

    const shadowStyle = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`

    return (
        <div style={{
            width: "100%",
            height: "100%",
            backgroundColor: backgroundColor,
            border: `1px ${borderStyle} ${accentColor}`,
            borderRadius: borderRadius,
            padding: padding,
            boxShadow: shadowStyle,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxSizing: "border-box",
            fontFamily: "'Inter Display', sans-serif",
            WebkitFontSmoothing: "antialiased",
            position: "relative",
            overflow: "hidden",
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Display:wght@300;400&display=swap');
            `}</style>

            {/* Header / Label Area */}
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                zIndex: 2,
            }}>
                {showIcon && (
                    <span style={{ fontSize: 18, color: accentColor }}>
                        {icon}
                    </span>
                )}
                <span style={{
                    fontFamily: "'Inter Display', sans-serif",
                    fontWeight: 300,
                    fontSize: 12,
                    color: COLORS.textSecondary,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                }}>
                    {label}
                </span>
            </div>

            {/* Main Thought Text */}
            <p style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: fontSize,
                lineHeight: 1.1,
                color: textColor,
                margin: 0,
                marginTop: 32,
                zIndex: 2,
                fontStyle: italicAccent ? "italic" : "normal",
            }}>
                {text}
            </p>

            {/* Decorative Subtle Accent (Doodle-like) */}
            <div style={{
                position: "absolute",
                bottom: -20,
                right: -20,
                width: 100,
                height: 100,
                borderRadius: "50%",
                background: accentColor,
                opacity: 0.03,
                zIndex: 1,
            }} />
        </div>
    )
}

ThoughtCardPro.defaultProps = {
    text: "Ich treffe jeden Tag Entscheidungen, aber nicht jede aus freien Stücken.",
    label: "Gedanke",
    icon: "💭",
    accentColor: COLORS.brandPurple,
    borderStyle: "dashed",
    backgroundColor: "#FFFFFF",
    textColor: COLORS.textPrimary,
    fontSize: 32,
    padding: 32,
    borderRadius: 16,
    showIcon: true,
    italicAccent: false,
    shadowColor: "rgba(0,0,0,0.08)",
    shadowX: 0,
    shadowY: 4,
    shadowBlur: 16,
    shadowSpread: 0,
}

addPropertyControls(ThoughtCardPro, {
    text: {
        type: ControlType.String,
        title: "Text",
        defaultValue: ThoughtCardPro.defaultProps.text,
        displayTextArea: true,
    },
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: ThoughtCardPro.defaultProps.label,
    },
    icon: {
        type: ControlType.String,
        title: "Icon",
        defaultValue: ThoughtCardPro.defaultProps.icon,
        hidden: (props) => !props.showIcon,
    },
    showIcon: {
        type: ControlType.Boolean,
        title: "Icon zeigen",
        defaultValue: true,
    },
    accentColor: {
        type: ControlType.Color,
        title: "Akzentfarbe",
        defaultValue: COLORS.brandPurple,
    },
    borderStyle: {
        type: ControlType.Enum,
        title: "Rahmen",
        options: ["dashed", "solid", "none"],
        optionTitles: ["Gestrichelt", "Durchgezogen", "Keiner"],
        defaultValue: "dashed",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Hintergrund",
        defaultValue: "#FFFFFF",
    },
    textColor: {
        type: ControlType.Color,
        title: "Textfarbe",
        defaultValue: COLORS.textPrimary,
    },
    fontSize: {
        type: ControlType.Number,
        title: "Schriftgröße",
        defaultValue: 32,
        min: 16,
        max: 64,
        step: 1,
    },
    padding: {
        type: ControlType.Number,
        title: "Padding",
        defaultValue: 32,
        min: 16,
        max: 80,
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Radius",
        defaultValue: 16,
        min: 0,
        max: 64,
    },
    italicAccent: {
        type: ControlType.Boolean,
        title: "Kursiv",
        defaultValue: false,
    },
    shadowColor: {
        type: ControlType.Color,
        title: "Schatten Farbe",
        defaultValue: "rgba(0,0,0,0.08)",
    },
    shadowX: {
        type: ControlType.Number,
        title: "Schatten X",
        defaultValue: 0,
        min: -50,
        max: 50,
    },
    shadowY: {
        type: ControlType.Number,
        title: "Schatten Y",
        defaultValue: 4,
        min: -50,
        max: 50,
    },
    shadowBlur: {
        type: ControlType.Number,
        title: "Schatten Blur",
        defaultValue: 16,
        min: 0,
        max: 100,
    },
    shadowSpread: {
        type: ControlType.Number,
        title: "Schatten Spread",
        defaultValue: 0,
        min: -50,
        max: 50,
    },
})
