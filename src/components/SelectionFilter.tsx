import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType, motion, RenderTarget } from "framer"

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

export default function SelectionFilter(props) {
    const {
        headline,
        subline,
        items,
        accentColor,
        background,
        cardBackground,
        showXIcon,
        paddingTop,
        paddingBottom,
    } = props

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (isCanvas) return
        const check = () => setIsMobile(window.innerWidth < 760)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    }

    const itemVariants = {
        hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
        visible: {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            transition: { type: "spring", stiffness: 200, damping: 25 },
        },
    }

    return (
        <section style={{
            width: "100%",
            backgroundColor: background,
            borderRadius: 15,
            paddingTop,
            paddingBottom,
            paddingLeft: "clamp(24px, 6vw, 80px)",
            paddingRight: "clamp(24px, 6vw, 80px)",
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
            fontFamily: "'Inter Tight', sans-serif",
            WebkitFontSmoothing: "antialiased",
        }}>
            <style>{FONT_IMPORT}</style>

            <div style={{
                maxWidth: 1200,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                gap: isMobile ? 40 : 56,
                alignItems: "center",
            }}>

                <div style={{
                    maxWidth: 760,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 22,
                    textAlign: "center",
                }}>
                    <h2 style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: "clamp(38px, 4.5vw, 64px)",
                        fontWeight: 400,
                        lineHeight: 1.0,
                        color: COLORS.textPrimary,
                        margin: 0,
                    }}>
                        {parseText(headline)}
                    </h2>
                    {subline && (
                        <p style={{
                            fontSize: 18,
                            fontWeight: 300,
                            lineHeight: 1.5,
                            color: COLORS.textSecondary,
                            margin: 0,
                            maxWidth: 620,
                        }}>
                            {subline}
                        </p>
                    )}
                </div>

                <motion.div
                    style={{
                        width: "100%",
                        display: "grid",
                        gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
                        gap: 20,
                        alignItems: "stretch",
                    }}
                    variants={containerVariants}
                    initial={isCanvas ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {items.map((item, i) => (
                        <motion.div
                            key={i}
                            variants={itemVariants}
                            whileHover={{ y: -4 }}
                            style={{
                                backgroundColor: cardBackground,
                                borderRadius: 16,
                                padding: 24,
                                minHeight: isMobile ? 220 : 300,
                                border: `1px solid ${accentColor}`,
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                boxSizing: "border-box",
                                transition: "transform 0.2s ease, background-color 0.3s ease",
                            }}
                        >
                            <div style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                            }}>
                                {showXIcon && (
                                    <span style={{
                                        width: 20,
                                        height: 20,
                                        borderRadius: "50%",
                                        border: `1px solid ${accentColor}`,
                                        color: accentColor,
                                        fontSize: 14,
                                        fontWeight: 500,
                                        lineHeight: "18px",
                                        textAlign: "center",
                                        flexShrink: 0,
                                    }}>×</span>
                                )}
                                <span style={{
                                    fontSize: 12,
                                    fontWeight: 300,
                                    color: COLORS.textSecondary,
                                    letterSpacing: "0.01em",
                                }}>
                                    Kein guter Fit
                                </span>
                            </div>

                            <p style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: "clamp(22px, 2.2vw, 30px)",
                                fontWeight: 400,
                                lineHeight: 1.18,
                                color: COLORS.textPrimary,
                                margin: "32px 0 0 0",
                                flexGrow: 1,
                                display: "flex",
                                alignItems: "flex-end",
                            }}>
                                {item.text}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    variants={itemVariants}
                    initial={isCanvas ? "visible" : "hidden"}
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    style={{
                        width: "100%",
                        padding: 24,
                        borderRadius: 16,
                        border: `1px solid ${COLORS.brand02}`,
                        backgroundColor: "#FFFFFF",
                        boxShadow: "0 8px 32px rgba(255, 100, 3, 0.18), 0 2px 8px rgba(255, 100, 3, 0.10)",
                        boxSizing: "border-box",
                    }}
                >
                    <p style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: 28,
                        fontWeight: 400,
                        lineHeight: 1.35,
                        color: COLORS.textPrimary,
                        textAlign: "center",
                        margin: 0,
                    }}>
                        Klarheit beginnt mit dem Mut, Nein zu sagen.
                    </p>
                </motion.div>

            </div>
        </section>
    )
}

SelectionFilter.defaultProps = {
    headline: "Das ist nicht *für Dich*, wenn...",
    subline: "Sparring ist keine Dienstleistung von der Stange. Es braucht die richtige Haltung auf beiden Seiten.",
    accentColor: COLORS.brand02,
    background: COLORS.backgroundAlt,
    cardBackground: "#FFFFFF",
    showXIcon: true,
    paddingTop: 120,
    paddingBottom: 120,
    items: [
        { text: "Du eine klassische Unternehmensberatung mit 100-seitigen Powerpoint-Decks suchst." },
        { text: "Du möchtest, dass Dir jemand sagt, was Du tun sollst, statt Deine eigene Urteilskraft zu schärfen." },
        { text: "Du nicht bereit bist, Dein eigenes Handeln kritisch zu hinterfragen und in den Spiegel zu schauen." },
    ],
}

addPropertyControls(SelectionFilter, {
    headline: { type: ControlType.String, title: "Headline", displayTextArea: true },
    subline: { type: ControlType.String, title: "Subline", displayTextArea: true },
    accentColor: { type: ControlType.Color, title: "Accent Color", defaultValue: COLORS.brand02 },
    background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.backgroundAlt },
    cardBackground: { type: ControlType.Color, title: "Card Background", defaultValue: "#FFFFFF" },
    showXIcon: { type: ControlType.Boolean, title: "Show X Icon", defaultValue: true },
    items: {
        type: ControlType.Array,
        title: "Filter Criteria",
        control: {
            type: ControlType.Object,
            controls: {
                text: { type: ControlType.String, title: "Criterion", displayTextArea: true },
            },
        },
    },
    paddingTop: { type: ControlType.Number, title: "Padding Top", min: 0, max: 240, step: 8, defaultValue: 120 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", min: 0, max: 240, step: 8, defaultValue: 120 },
})
