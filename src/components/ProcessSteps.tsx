import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType, motion, RenderTarget } from "framer"

/**
 * ProcessSteps
 * ────────────
 * A high-end visual guide for the client onboarding process.
 * Focuses on transparency and reducing friction ("Was passiert nach dem Klick?").
 */

const COLORS = {
    brand01: "#9C73FF", // Purple
    brand03: "#FFC857", // Yellow
    brand06: "#00A8E8", // Blue
    brand02: "#FF6403", // Orange (Accent)
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
}

const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600&display=swap');"

const STYLES = `
    @keyframes gradientFlow {
        0% { background-position: 0% 50%; }
        100% { background-position: 200% 50%; }
    }
`

function parseText(text: string) {
    if (!text) return ""
    return text.split("*").map((part, j) => (
        <span key={j} style={{ fontStyle: j % 2 !== 0 ? "italic" : "normal" }}>{part}</span>
    ))
}

export default function ProcessSteps(props) {
    const {
        headline,
        steps,
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

    // Gradient definition: Purple -> Blue -> Yellow
    const gradient = `linear-gradient(${isMobile ? "180deg" : "90deg"}, ${COLORS.brand01}, ${COLORS.brand06}, ${COLORS.brand03}, ${COLORS.brand01})`

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
        }}>
            <style>{FONT_IMPORT}</style>
            <style>{STYLES}</style>

            <div style={{
                maxWidth: 1200,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 64,
            }}>
                
                {/* Headline Area */}
                {headline && (
                    <h2 style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: isMobile ? 42 : 52,
                        fontWeight: 400,
                        lineHeight: 1.0,
                        color: COLORS.textPrimary,
                        margin: 0,
                        textAlign: isMobile ? "left" : "center",
                    }}>
                        {parseText(headline)}
                    </h2>
                )}

                {/* Steps Container */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                    gap: isMobile ? 48 : 40,
                    position: "relative",
                }}>
                    {/* Animated Connecting Line */}
                    <div style={{
                        position: "absolute",
                        top: isMobile ? 0 : 40,
                        left: isMobile ? 40 : "15%",
                        right: isMobile ? "auto" : "15%",
                        bottom: isMobile ? 0 : "auto",
                        width: isMobile ? 2 : "auto",
                        height: isMobile ? "auto" : 2,
                        background: gradient,
                        backgroundSize: isMobile ? "100% 200%" : "200% 100%",
                        animation: "gradientFlow 4s linear infinite",
                        opacity: 0.4,
                        zIndex: 0,
                    }} />

                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={isCanvas ? { opacity: 1 } : { opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.2, duration: 0.6 }}
                            style={{
                                display: "flex",
                                flexDirection: isMobile ? "row" : "column",
                                alignItems: isMobile ? "start" : "center",
                                textAlign: isMobile ? "left" : "center",
                                gap: 24,
                                position: "relative",
                                zIndex: 1,
                            }}
                        >
                            {/* Number Circle */}
                            <div style={{
                                width: 80,
                                height: 80,
                                borderRadius: "50%",
                                backgroundColor: "#FFFFFF",
                                border: `1px solid ${accentColor}33`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                flexShrink: 0,
                                boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                            }}>
                                <span style={{
                                    fontFamily: "'Instrument Serif', serif",
                                    fontSize: 32,
                                    color: accentColor,
                                }}>{i + 1}</span>
                            </div>

                            {/* Content */}
                            <div style={{ 
                                display: "flex", 
                                flexDirection: "column", 
                                gap: 12,
                                marginTop: isMobile ? 12 : 0 
                            }}>
                                <h4 style={{
                                    fontFamily: "'Instrument Serif', serif",
                                    fontSize: 24,
                                    fontWeight: 400,
                                    lineHeight: 1.2,
                                    color: COLORS.textPrimary,
                                    margin: 0,
                                }}>
                                    {parseText(step.title)}
                                </h4>
                                <p style={{
                                    fontSize: 16,
                                    fontWeight: 300,
                                    lineHeight: 1.5,
                                    color: COLORS.textSecondary,
                                    margin: 0,
                                    maxWidth: isMobile ? "none" : 300,
                                }}>
                                    {step.text}
                                    {step.linkUrl && step.linkLabel && (
                                        <> <a
                                            href={step.linkUrl}
                                            style={{
                                                fontSize: 16,
                                                fontWeight: 300,
                                                color: accentColor,
                                                textDecoration: "none",
                                                borderBottom: `1px solid ${accentColor}`,
                                                paddingBottom: 1,
                                                cursor: "pointer",
                                            }}
                                        >{step.linkLabel}</a></>
                                    )}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    )
}

ProcessSteps.defaultProps = {
    headline: "Der Weg zur *Klarheit*.",
    accentColor: COLORS.brand02,
    background: "#FFFFFF",
    paddingTop: 120,
    paddingBottom: 120,
    steps: [
        {
            title: "30-Minuten-*Case-Call*",
            text: "Wir sprechen über Deine aktuelle Herausforderung und prüfen, ob die Chemie und der Case passen.",
            linkLabel: "",
            linkUrl: "",
        },
        {
            title: "Format-*Check*",
            text: "Gemeinsam wählen wir den Modus, der Dir jetzt am meisten bringt – vom schnellen Impuls bis zur Begleitung.",
            linkLabel: "",
            linkUrl: "",
        },
        {
            title: "*Start*",
            text: "Kein langes Onboarding. Wir steigen direkt in die Arbeit ein, damit Du sofort mit mehr Klarheit rausgehst.",
            linkLabel: "",
            linkUrl: "",
        },
    ],
}

addPropertyControls(ProcessSteps, {
    headline: { type: ControlType.String, title: "Headline", displayTextArea: true },
    accentColor: { type: ControlType.Color, title: "Accent Color", defaultValue: COLORS.brand02 },
    background: { type: ControlType.Color, title: "Background", defaultValue: "#FFFFFF" },
    paddingTop: { type: ControlType.Number, title: "Padding Top", min: 0, max: 240, step: 8, defaultValue: 120 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", min: 0, max: 240, step: 8, defaultValue: 120 },
    steps: {
        type: ControlType.Array,
        title: "Steps",
        control: {
            type: ControlType.Object,
            controls: {
                title: { type: ControlType.String, title: "Step Title" },
                text: { type: ControlType.String, title: "Step Text", displayTextArea: true },
                linkLabel: { type: ControlType.String, title: "Link Label" },
                linkUrl: { type: ControlType.String, title: "Link URL" },
            }
        }
    },
})
