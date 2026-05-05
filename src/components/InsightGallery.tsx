import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType, motion, AnimatePresence, RenderTarget } from "framer"

/**
 * InsightGallery
 * ──────────────
 * An interactive gallery of cards that reveal details on hover (Desktop) or tap (Mobile).
 * Optimized for Raphael Baruch with fixed dimensions and precise brand pastel tints.
 */

const COLORS = {
    brand01: "#9C73FF", // Purple
    brand02: "#FF6403", // Orange
    brand03: "#FFC857", // Yellow
    brand05: "#7DB79F", // Teal
    brand06: "#00A8E8", // Blue
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
}

// Precise 8% Opacity Derivatives for the Raphael Baruch Pastel Palette
const PASTELS = {
    purple: "rgba(156, 115, 255, 0.08)",
    orange: "rgba(255, 100, 3, 0.08)",
    yellow: "rgba(255, 200, 87, 0.08)",
    teal:   "rgba(125, 183, 159, 0.08)",
    blue:   "rgba(0, 168, 232, 0.08)",
}

const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500&display=swap');
    
    .rb-insight-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px;
        width: 100%;
        padding: 24px;
        box-sizing: border-box;
    }

    @media (max-width: 1024px) {
        .rb-insight-grid { grid-template-columns: repeat(2, 1fr); }
    }

    @media (max-width: 768px) {
        .rb-insight-grid { 
            grid-template-columns: 1fr; 
            padding: 16px;
        }
    }
`

export default function InsightGallery(props) {
    const { items, background, mobileFrontCtaLabel, mobileBackCtaLabel } = props
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    return (
        <div style={{ width: "100%", backgroundColor: background }}>
            <style>{STYLES}</style>
            <div className="rb-insight-grid">
                {items.map((item, i) => (
                    <InsightCard
                        key={i}
                        {...item}
                        mobileFrontCtaLabel={mobileFrontCtaLabel}
                        mobileBackCtaLabel={mobileBackCtaLabel}
                    />
                ))}
            </div>
        </div>
    )
}

function InsightCard({ 
    title, 
    frontImage, 
    backEyebrow, 
    backHeadline, 
    backParagraph, 
    backExample, 
    tintColor,
    mobileFrontCtaLabel,
    mobileBackCtaLabel,
}) {
    const [isFlipped, setIsFlipped] = useState(false)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 810)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [])

    const spring = { type: "spring", stiffness: 300, damping: 30 }

    return (
        <motion.div
            style={{
                position: "relative",
                width: "100%",
                height: 520, // Slightly increased height for richer content
                borderRadius: 32,
                backgroundColor: tintColor || COLORS.backgroundAlt,
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 10px 30px rgba(0,0,0,0.02)",
                display: "flex",
            }}
            onMouseEnter={() => !isMobile && setIsFlipped(true)}
            onMouseLeave={() => !isMobile && setIsFlipped(false)}
            onClick={() => isMobile && setIsFlipped(!isFlipped)}
            whileHover={{ y: -5 }}
            transition={spring}
        >
            <AnimatePresence initial={false} mode="wait">
                {!isFlipped ? (
                    <motion.div
                        key="front"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: "100%",
                            height: "100%",
                            padding: 40,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxSizing: "border-box",
                        }}
                    >
                        <div>
                            <h2 style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: 32,
                                fontWeight: 400,
                                lineHeight: 1.1,
                                color: COLORS.textPrimary,
                                margin: 0,
                            }}>
                                {title.split("*").map((part, i) => (
                                    <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>{part}</span>
                                ))}
                            </h2>
                        </div>

                        <div style={{
                            flex: 1,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            position: "relative",
                        }}>
                            <div style={{
                                position: "absolute",
                                width: "140%",
                                height: "140%",
                                background: `radial-gradient(circle, ${tintColor || COLORS.brand01} 0%, transparent 70%)`,
                                opacity: 0.5,
                                filter: "blur(60px)",
                                zIndex: 0,
                            }} />
                            
                            {frontImage && (
                                <img
                                    src={frontImage}
                                    alt=""
                                    style={{
                                        maxWidth: "85%",
                                        maxHeight: "85%",
                                        objectFit: "contain",
                                        position: "relative",
                                        zIndex: 1,
                                        filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.06))",
                                    }}
                                />
                            )}
                        </div>

                        {isMobile && (
                            <motion.div
                                initial={{ y: 4, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.25, duration: 0.25 }}
                                style={mobilePillStyle}
                            >
                                <span>{mobileFrontCtaLabel}</span>
                                <span style={{ color: COLORS.brand02, fontSize: 18, lineHeight: 1 }}>+</span>
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="back"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        style={{
                            width: "100%",
                            height: "100%",
                            padding: 32,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "flex-start",
                            boxSizing: "border-box",
                            backgroundColor: "white",
                            gap: 16,
                        }}
                    >
                        {backEyebrow && (
                            <span style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontSize: 12,
                                fontWeight: 500,
                                textTransform: "uppercase",
                                letterSpacing: "0.05em",
                                color: COLORS.brand02,
                            }}>
                                {backEyebrow}
                            </span>
                        )}

                        {backHeadline && (
                            <h3 style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: 28,
                                fontWeight: 400,
                                lineHeight: 1.1,
                                color: COLORS.textPrimary,
                                margin: 0,
                            }}>
                                {backHeadline.split("*").map((part, i) => (
                                    <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>{part}</span>
                                ))}
                            </h3>
                        )}

                        {backParagraph && (
                            <p style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontSize: 16,
                                fontWeight: 300,
                                lineHeight: 1.5,
                                color: COLORS.textSecondary,
                                margin: 0,
                            }}>
                                {backParagraph}
                            </p>
                        )}

                        {backExample && (
                            <div style={{
                                marginTop: "auto",
                                padding: 16,
                                borderRadius: 16,
                                border: `1px dashed ${tintColor || COLORS.brand01}`,
                                backgroundColor: COLORS.backgroundAlt,
                            }}>
                                <span style={{
                                    display: "block",
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontSize: 10,
                                    fontWeight: 500,
                                    textTransform: "uppercase",
                                    color: COLORS.textSecondary,
                                    marginBottom: 4,
                                }}>
                                    Beispiel
                                </span>
                                <p style={{
                                    fontFamily: "'Instrument Serif', serif",
                                    fontSize: 18,
                                    lineHeight: 1.2,
                                    margin: 0,
                                    color: COLORS.textPrimary,
                                }}>
                                    {backExample}
                                </p>
                            </div>
                        )}

                        {isMobile && (
                            <button
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setIsFlipped(false)
                                }}
                                style={{
                                    ...mobilePillStyle,
                                    marginTop: 0,
                                    width: "100%",
                                    borderColor: "rgba(0,0,0,0.08)",
                                }}
                            >
                                <span>{mobileBackCtaLabel}</span>
                                <span style={{ color: COLORS.brand02, fontSize: 18, lineHeight: 1 }}>−</span>
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

InsightGallery.defaultProps = {
    background: "#FFFFFF",
    mobileFrontCtaLabel: "Mehr ansehen",
    mobileBackCtaLabel: "Zurück",
    items: [
        { 
            title: "Messbarer *Erfolg*", 
            backEyebrow: "Leadership",
            backHeadline: "Wachstum *verstehen*",
            backParagraph: "Über 90 % der Lernenden auf Masterplan sind nicht nur überdurchschnittlich zufrieden, sondern auch hochmotiviert.",
            backExample: "Führungskräfte nutzen Dashboards zur Team-Entwicklung.",
            tintColor: PASTELS.orange, 
            frontImage: "" 
        },
        { 
            title: "Hohes *Engagement*", 
            backEyebrow: "Community",
            backHeadline: "Aktivität *steigern*",
            backParagraph: "3,7x mehr Lernaktivität als auf anderen Plattformen. Unsere Inhalte fesseln nachhaltig.", 
            backExample: "Mitarbeitende teilen Insights direkt in Slack.",
            tintColor: PASTELS.purple, 
            frontImage: "" 
        },
        { 
            title: "Effiziente *Prozesse*", 
            backEyebrow: "Scale",
            backHeadline: "Zeit *gewinnen*",
            backParagraph: "Sparen Sie bis zu 30 % Zeit in der Personalentwicklung durch automatisierte Zuweisungen.", 
            backExample: "Automatisierte Onboarding-Strecken für neue Leads.",
            tintColor: PASTELS.teal, 
            frontImage: "" 
        },
    ]
}

const mobilePillStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    width: "100%",
    minHeight: 48,
    padding: "13px 18px",
    borderRadius: 9999,
    border: "1px solid rgba(0,0,0,0.08)",
    backgroundColor: "rgba(255,255,255,0.72)",
    color: COLORS.textPrimary,
    fontFamily: "'Inter Tight', sans-serif",
    fontSize: 14,
    fontWeight: 400,
    cursor: "pointer",
    boxSizing: "border-box" as const,
}

addPropertyControls(InsightGallery, {
    background: { type: ControlType.Color, title: "Background" },
    mobileFrontCtaLabel: { type: ControlType.String, title: "Mobile Front CTA", defaultValue: "Mehr ansehen" },
    mobileBackCtaLabel: { type: ControlType.String, title: "Mobile Back CTA", defaultValue: "Zurück" },
    items: {
        type: ControlType.Array,
        title: "Insight Cards",
        control: {
            type: ControlType.Object,
            controls: {
                title: { type: ControlType.String, title: "Headline (Front)", defaultValue: "Titel *hier*" },
                frontImage: { type: ControlType.Image, title: "Visual (Front)" },
                tintColor: { type: ControlType.Color, title: "Card Tint", defaultValue: COLORS.backgroundAlt },
                backEyebrow: { type: ControlType.String, title: "Eyebrow (Back)", defaultValue: "EYEBROW" },
                backHeadline: { type: ControlType.String, title: "Headline (Back)", defaultValue: "Headline *Italic*" },
                backParagraph: { type: ControlType.String, title: "Paragraph (Back)", displayTextArea: true, defaultValue: "Beschreibungstext hier..." },
                backExample: { type: ControlType.String, title: "Example Box (Back)", defaultValue: "Ein konkretes Beispiel..." },
            }
        }
    }
})
