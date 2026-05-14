import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType, motion, RenderTarget } from "framer"

/**
 * StoryBridge (REDESIGNED)
 * ───────────
 * A high-impact transition component for the "About" page.
 * Bridges the personal story with the current professional offering.
 * Features: High-end editorial typography, solid frame, and subtle background visual.
 */

const COLORS = {
    brand01: "#9C73FF", 
    brand02: "#FF6403",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
}

const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600&display=swap');"

function parseText(text: string) {
    if (!text) return ""
    return text.split("*").map((part, j) => (
        <span key={j} style={{ fontStyle: j % 2 !== 0 ? "italic" : "normal" }}>{part}</span>
    ))
}

export default function StoryBridge(props) {
    const {
        text,
        ctaLabel,
        ctaLink,
        subline,
        showSubline,
        doodle,
        accentColor,
        background,
        paddingTop,
        paddingBottom,
    } = props

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (isCanvas) return
        const check = () => setIsMobile(window.innerWidth < 810)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    const hPad = isMobile ? 24 : 80

    return (
        <section style={{
            width: "100%",
            backgroundColor: background,
            paddingTop,
            paddingBottom,
            paddingLeft: hPad,
            paddingRight: hPad,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            fontFamily: "'Inter Tight', sans-serif",
            WebkitFontSmoothing: "antialiased",
            position: "relative",
            overflow: "hidden",
        }}>
            <style>{FONT_IMPORT}</style>

            <div style={{
                maxWidth: 1100,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}>
                
                {/* Main Content Box */}
                <motion.div
                    initial={isCanvas ? { opacity: 1 } : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                        width: "100%",
                        padding: isMobile ? "48px 32px" : "80px 100px",
                        borderRadius: 40,
                        border: `1.5px solid ${accentColor}33`,
                        backgroundColor: "#FFFFFF",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: 40,
                        position: "relative",
                        zIndex: 1,
                    }}
                >
                    {/* Bridge Text */}
                    <h2 style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: isMobile ? 32 : 52,
                        fontWeight: 400,
                        lineHeight: 1.15,
                        color: COLORS.textPrimary,
                        margin: 0,
                        maxWidth: 800,
                    }}>
                        {parseText(text)}
                    </h2>

                    {/* Integrated CTA */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                        {ctaLabel && (
                            <motion.a
                                href={ctaLink}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "20px 48px",
                                    borderRadius: 9999,
                                    backgroundColor: accentColor,
                                    color: "#FFFFFF",
                                    fontSize: 16,
                                    fontWeight: 500,
                                    textDecoration: "none",
                                    boxShadow: `0 20px 40px ${accentColor}33`,
                                }}
                            >
                                {ctaLabel}
                                <span style={{ fontSize: 18 }}>→</span>
                            </motion.a>
                        )}
                        {showSubline && subline && (
                            <span style={{
                                fontSize: 12,
                                color: COLORS.textSecondary,
                                fontStyle: "italic",
                                opacity: 0.8
                            }}>
                                {subline}
                            </span>
                        )}
                    </div>

                    {/* Optional Doodle Watermark */}
                    {doodle && (
                        <div style={{
                            position: "absolute",
                            bottom: 20,
                            right: 20,
                            width: isMobile ? 60 : 100,
                            height: isMobile ? 60 : 100,
                            opacity: 0.1,
                            pointerEvents: "none",
                        }}>
                            <img src={doodle} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </div>
                    )}
                </motion.div>

            </div>
        </section>
    )
}

StoryBridge.defaultProps = {
    text: "Heute biete ich genau diesen *Raum* an, den ich mir damals selbst gewünscht hätte: Ein Sparring auf Augenhöhe, das keine Antworten vorgibt, sondern die eigene Klarheit befreit.",
    ctaLabel: "Den ersten Case besprechen",
    ctaLink: "#",
    subline: "Kein Verkaufsgespräch. Ein erster Impuls.",
    showSubline: true,
    accentColor: COLORS.brand02,
    background: COLORS.backgroundAlt,
    paddingTop: 160,
    paddingBottom: 200,
}

addPropertyControls(StoryBridge, {
    text: { type: ControlType.String, title: "Bridge Text", displayTextArea: true, defaultValue: StoryBridge.defaultProps.text },
    ctaLabel: { type: ControlType.String, title: "CTA Label", defaultValue: "Den ersten Case besprechen" },
    ctaLink: { type: ControlType.String, title: "CTA Link" },
    showSubline: { type: ControlType.Boolean, title: "Show Subline", defaultValue: true },
    subline: { type: ControlType.String, title: "Subline", defaultValue: "Kein Verkaufsgespräch. Ein erster Impuls.", hidden: (props) => !props.showSubline },
    doodle: { type: ControlType.Image, title: "Background Doodle" },
    accentColor: { type: ControlType.Color, title: "Accent Color", defaultValue: COLORS.brand02 },
    background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.backgroundAlt },
    paddingTop: { type: ControlType.Number, title: "Padding Top", min: 0, max: 320, step: 8, defaultValue: 160 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", min: 0, max: 320, step: 8, defaultValue: 200 },
})
