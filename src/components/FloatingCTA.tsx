import React from "react"
import { addPropertyControls, ControlType, motion } from "framer"

/**
 * FloatingCTA
 * ───────────
 * A persistent, branded action button that floats with the user.
 * Inspired by high-end coaching sites (kasiasiwosz.com).
 * - Fixed position
 * - Branded orange glow
 * - Smooth entrance and hover effects
 */

const COLORS = {
    orange: "#FF6403",
    white: "#FFFFFF",
}

export default function FloatingCTA(props) {
    const { text, link, show, accentColor, glowIntensity } = props

    if (!show) return null

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
                type: "spring", 
                damping: 20, 
                stiffness: 300,
                delay: 1.5 // Wait for hero animations
            }}
            style={{
                position: "fixed",
                bottom: 40,
                right: 40,
                zIndex: 9999,
            }}
        >
            <motion.a
                href={link}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "16px 32px",
                    backgroundColor: COLORS.orange,
                    color: COLORS.white,
                    borderRadius: 999,
                    fontFamily: "'Inter Display', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: `0 12px 32px -4px ${COLORS.orange}${Math.round(glowIntensity * 255).toString(16).padStart(2, '0')}`,
                    border: "1px solid rgba(255,255,255,0.1)",
                    whiteSpace: "nowrap",
                    cursor: "pointer",
                }}
            >
                {text}
                <ArrowIcon />
            </motion.a>
        </motion.div>
    )
}

function ArrowIcon() {
    return (
        <svg 
            width="12" 
            height="12" 
            viewBox="0 0 14 14" 
            fill="none" 
            style={{ marginLeft: 10, display: "block" }}
        >
            <path
                d="M4 10L10 4M10 4H4.75M10 4V9.25"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

FloatingCTA.defaultProps = {
    text: "Case besprechen",
    link: "#intake",
    show: true,
    accentColor: COLORS.orange,
    glowIntensity: 0.4,
}

addPropertyControls(FloatingCTA, {
    text: { type: ControlType.String, title: "Label", defaultValue: "Case besprechen" },
    link: { type: ControlType.String, title: "Link / Hash", defaultValue: "#intake" },
    show: { type: ControlType.Boolean, title: "Sichtbar", defaultValue: true },
    glowIntensity: {
        type: ControlType.Number,
        title: "Glow",
        defaultValue: 0.4,
        min: 0,
        max: 1,
        step: 0.1,
        displayStepper: true,
    },
})
