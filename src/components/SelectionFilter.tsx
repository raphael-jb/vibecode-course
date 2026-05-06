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
                flexWrap: "wrap",
                gap: 48,
                alignItems: "start",
            }}>

                {/* Left column — stacks below 760px */}
                <div style={{
                    flex: "1 1 300px",
                    minWidth: 0,
                    position: isMobile ? "relative" : "sticky",
                    top: isMobile ? 0 : 100,
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                }}>
                    <div style={{
                        width: 40,
                        height: 2,
                        background: accentColor,
                        marginBottom: 8,
                    }} />
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
                        }}>
                            {subline}
                        </p>
                    )}
                </div>

                {/* Right column */}
                <motion.div
                    style={{
                        flex: "2 1 400px",
                        minWidth: 0,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
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
                            whileHover={{ x: 10 }}
                            style={{
                                backgroundColor: cardBackground,
                                borderRadius: 24,
                                padding: "28px 36px",
                                border: "1px solid rgba(0,0,0,0.04)",
                                display: "flex",
                                alignItems: "start",
                                gap: 20,
                                transition: "background-color 0.3s ease",
                            }}
                        >
                            {showXIcon && (
                                <div style={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: "50%",
                                    border: `1.5px solid ${accentColor}`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    marginTop: 4,
                                }}>
                                    <span style={{
                                        color: accentColor,
                                        fontSize: 16,
                                        fontWeight: 600,
                                        lineHeight: 1,
                                        transform: "translateY(-1px)",
                                    }}>×</span>
                                </div>
                            )}
                            <p style={{
                                fontSize: "clamp(16px, 1.8vw, 22px)",
                                fontWeight: 400,
                                lineHeight: 1.35,
                                color: COLORS.textPrimary,
                                margin: 0,
                            }}>
                                {item.text}
                            </p>
                        </motion.div>
                    ))}

                    <motion.div
                        variants={itemVariants}
                        style={{
                            marginTop: 24,
                            padding: "0 32px",
                            borderLeft: `2px solid ${accentColor}`,
                        }}
                    >
                        <p style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontSize: 24,
                            fontStyle: "italic",
                            color: COLORS.textSecondary,
                            margin: 0,
                        }}>
                            „Klarheit beginnt mit dem Mut, Nein zu sagen."
                        </p>
                    </motion.div>
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
        { text: "Du suchst eine klassische Unternehmensberatung mit 100-seitigen Powerpoint-Decks." },
        { text: "Du möchtest jemanden, der Dir sagt, was Du tun sollst, anstatt Deine eigene Urteilskraft zu schärfen." },
        { text: "Du bist nicht bereit, Dein eigenes Handeln kritisch zu hinterfragen und in den Spiegel zu schauen." },
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
