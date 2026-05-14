import React, { useRef } from "react"
import { addPropertyControls, ControlType, motion, useScroll, useTransform } from "framer-motion"

/**
 * HeadlineFade
 * ────────────
 * High-end scroll-driven text reveal effect.
 * As the user scrolls, the text transitions from a subtle grey/transparent 
 * to a full, impactful black (or navy).
 * Inspired by kasiasiwosz.com.
 */

const COLORS = {
    navy: "#0E2616",
    grey: "rgba(14, 38, 22, 0.15)",
}

export default function HeadlineFade(props) {
    const { text, fontSize, maxWidth, padding, italicAccent } = props
    const containerRef = useRef(null)

    // Track scroll progress relative to this element
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end center"] // Start fading when enters viewport, full when at center
    })

    // Map progress (0-1) to color range
    const color = useTransform(
        scrollYProgress,
        [0, 0.8], // Timing: finish transition before it reaches the top
        [COLORS.grey, COLORS.navy]
    )

    // Map progress to slight y-offset for extra smoothness
    const y = useTransform(scrollYProgress, [0, 1], [20, 0])

    const parts = text.split("*")

    return (
        <div 
            ref={containerRef}
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                padding: `${padding}px 24px`,
                boxSizing: "border-box",
            }}
        >
            <motion.h2
                style={{
                    color,
                    y,
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: fontSize,
                    lineHeight: 1.05,
                    fontWeight: 400,
                    textAlign: "center",
                    maxWidth: maxWidth,
                    margin: 0,
                }}
            >
                {parts.map((part, i) => (
                    <span 
                        key={i} 
                        style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}
                    >
                        {part}
                    </span>
                ))}
            </motion.h2>
        </div>
    )
}

HeadlineFade.defaultProps = {
    text: "Manchmal ist das *Problem* nur eine schlecht formulierte *Frage.*",
    fontSize: 72,
    maxWidth: 800,
    padding: 120,
    italicAccent: true,
}

addPropertyControls(HeadlineFade, {
    text: {
        type: ControlType.String,
        title: "Text",
        displayTextArea: true,
        defaultValue: HeadlineFade.defaultProps.text,
    },
    fontSize: {
        type: ControlType.Number,
        title: "Schriftgröße",
        defaultValue: 72,
        min: 32,
        max: 160,
        step: 4,
    },
    maxWidth: {
        type: ControlType.Number,
        title: "Max. Breite",
        defaultValue: 800,
        min: 300,
        max: 1200,
        step: 20,
    },
    padding: {
        type: ControlType.Number,
        title: "Abstand (V)",
        defaultValue: 120,
        min: 40,
        max: 300,
    },
})
