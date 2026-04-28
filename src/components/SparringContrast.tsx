import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

const COLORS = {
    brand01: "#9C73FF",
    brand02: "#FF6403",
    textPrimary: "#000000",
    textSecondary: "#767676",
}

const PASTELS = {
    purple: "rgba(156, 115, 255, 0.08)",
    orange: "rgba(255, 100, 3, 0.08)",
    yellow: "rgba(255, 200, 87, 0.08)",
    teal:   "rgba(125, 183, 159, 0.08)",
    blue:   "rgba(0, 168, 232, 0.08)",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500&display=swap');`

function hexToRgba(hex: string, alpha: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return `rgba(0,0,0,${alpha})`
    return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
}

function parseItalic(text: string) {
    return text.split("*").map((part, i) => (
        <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>{part}</span>
    ))
}

export default function SparringContrast(props) {
    const {
        eyebrow,
        headline,
        leadText,
        items,
        pullQuote,
        pullQuoteAlign,
        pullQuoteFontSize,
        accentColor,
        background,
        paddingTop,
        paddingBottom,
    } = props

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (isCanvas) return
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    const hPad = isMobile ? 24 : 80

    return (
        <div style={{
            width: "100%",
            backgroundColor: background,
            borderRadius: 15,
            paddingTop,
            paddingBottom,
            paddingLeft: hPad,
            paddingRight: hPad,
            boxSizing: "border-box",
        }}>
            <style>{FONT_IMPORT}</style>

            <div style={{ maxWidth: 960, margin: "0 auto" }}>

                {/* Eyebrow — centered */}
                {eyebrow ? (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        marginBottom: 24,
                    }}>
                        <div style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: accentColor,
                            flexShrink: 0,
                        }} />
                        <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontSize: 13,
                            fontWeight: 500,
                            letterSpacing: "0.04em",
                            color: accentColor,
                        }}>
                            {eyebrow}
                        </span>
                    </div>
                ) : null}

                {/* Headline — centered */}
                <h2 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? 36 : 52,
                    fontWeight: 400,
                    lineHeight: 1.0,
                    color: COLORS.textPrimary,
                    margin: "0 auto 56px auto",
                    maxWidth: 680,
                    textAlign: "center",
                }}>
                    {parseItalic(headline)}
                </h2>

                {/* Lead Text */}
                {leadText ? (
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: isMobile ? 16 : 19,
                        fontWeight: 300,
                        lineHeight: 1.6,
                        color: COLORS.textSecondary,
                        margin: "0 0 48px 0",
                        maxWidth: 640,
                    }}>
                        {parseItalic(leadText)}
                    </p>
                ) : null}

                {/* Column headers — desktop only */}
                {!isMobile && (
                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 56px 1fr",
                        paddingBottom: 12,
                        borderBottom: "1px solid rgba(0,0,0,0.08)",
                    }}>
                        <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase" as const,
                            color: COLORS.textSecondary,
                        }}>
                            Nicht
                        </span>
                        <span />
                        <span style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase" as const,
                            color: accentColor,
                        }}>
                            Sondern
                        </span>
                    </div>
                )}

                {/* Contrast rows */}
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: isMobile ? 12 : 0,
                }}>
                    {items.map((item, i) => (
                        isMobile ? (
                            // Mobile: stacked card per pair
                            <div key={i} style={{
                                padding: 20,
                                borderRadius: 16,
                                backgroundColor: "rgba(255,255,255,0.7)",
                                display: "flex",
                                flexDirection: "column",
                                gap: 10,
                            }}>
                                <span style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontSize: 15,
                                    fontWeight: 300,
                                    color: COLORS.textSecondary,
                                    textDecoration: "line-through",
                                    textDecorationColor: "rgba(0,0,0,0.2)",
                                }}>
                                    {item.nicht}
                                </span>
                                <div style={{
                                    width: 24,
                                    height: 1,
                                    backgroundColor: accentColor,
                                    opacity: 0.5,
                                }} />
                                <span style={{
                                    fontFamily: "'Instrument Serif', serif",
                                    fontSize: 22,
                                    fontWeight: 400,
                                    lineHeight: 1.15,
                                    color: COLORS.textPrimary,
                                }}>
                                    {parseItalic(item.sondern)}
                                </span>
                            </div>
                        ) : (
                            // Desktop: two-column row
                            <div key={i} style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 56px 1fr",
                                alignItems: "center",
                                paddingTop: 22,
                                paddingBottom: 22,
                                borderBottom: "1px solid rgba(0,0,0,0.06)",
                            }}>
                                <span style={{
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontSize: 17,
                                    fontWeight: 300,
                                    color: COLORS.textSecondary,
                                    textDecoration: "line-through",
                                    textDecorationColor: "rgba(0,0,0,0.2)",
                                }}>
                                    {item.nicht}
                                </span>
                                <div style={{ display: "flex", justifyContent: "center" }}>
                                    <span style={{
                                        fontSize: 14,
                                        color: accentColor,
                                        opacity: 0.4,
                                    }}>
                                        →
                                    </span>
                                </div>
                                <span style={{
                                    fontFamily: "'Instrument Serif', serif",
                                    fontSize: 24,
                                    fontWeight: 400,
                                    lineHeight: 1.1,
                                    color: COLORS.textPrimary,
                                }}>
                                    {parseItalic(item.sondern)}
                                </span>
                            </div>
                        )
                    ))}
                </div>

                {/* Pull Quote — styled as ThoughtCard */}
                {pullQuote ? (
                    <div style={{
                        marginTop: 56,
                        padding: 24,
                        borderRadius: 16,
                        border: `1px solid ${accentColor}`,
                        backgroundColor: "#FFFFFF",
                        boxShadow: `0 8px 32px ${hexToRgba(accentColor, 0.18)}, 0 2px 8px ${hexToRgba(accentColor, 0.10)}`,
                        boxSizing: "border-box",
                    }}>
                        {pullQuote.split("\n").filter(Boolean).map((para, i, arr) => (
                            <p key={i} style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: pullQuoteFontSize,
                                fontWeight: 400,
                                lineHeight: 1.35,
                                color: COLORS.textPrimary,
                                textAlign: pullQuoteAlign as any,
                                margin: i < arr.length - 1 ? "0 0 16px 0" : 0,
                            }}>
                                {parseItalic(para)}
                            </p>
                        ))}
                    </div>
                ) : null}

            </div>
        </div>
    )
}

SparringContrast.defaultProps = {
    eyebrow: "Ansatz",
    headline: "Dein Fall bestimmt den Ansatz. *Nicht umgekehrt.*",
    leadText: "Vom Sofort-Impuls bei einer akuten Führungsfrage bis zum belastbaren Transformationsplan für strategische Schwergewichte — das Format folgt immer Deiner Situation. Nicht meiner Methode.",
    pullQuote: "Ob akute Führungsfrage oder strategischer Systemwandel — *wir starten immer mit Deinem Fall, nicht mit meiner Methode.*",
    pullQuoteAlign: "left",
    pullQuoteFontSize: 28,
    accentColor: COLORS.brand02,
    background: PASTELS.purple,
    paddingTop: 96,
    paddingBottom: 96,
    items: [
        { nicht: "Standardlösung, die auf jeden passt", sondern: "Das Format, das Dein Case braucht" },
        { nicht: "Methode zuerst, Deine Situation irgendwann", sondern: "Deine Realität als Ausgangspunkt" },
        { nicht: "Nur Fragen, keine Orientierung", sondern: "Sparring auf Augenhöhe — mit Substanz" },
        { nicht: "Abhängigkeit vom externen Experten", sondern: "Deine Entscheidungsstärke wächst" },
    ],
}

addPropertyControls(SparringContrast, {
    eyebrow: {
        type: ControlType.String,
        title: "Eyebrow",
        defaultValue: "Ansatz",
    },
    headline: {
        type: ControlType.String,
        title: "Headline (*italic*)",
        displayTextArea: true,
        defaultValue: "Dein Fall bestimmt den Ansatz. *Nicht umgekehrt.*",
    },
    leadText: {
        type: ControlType.String,
        title: "Lead Text (*italic*)",
        displayTextArea: true,
        defaultValue: "Vom Sofort-Impuls bei einer akuten Führungsfrage bis zum belastbaren Transformationsplan für strategische Schwergewichte — das Format folgt immer Deiner Situation. Nicht meiner Methode.",
    },
    pullQuote: {
        type: ControlType.String,
        title: "Pull Quote (*italic*)",
        displayTextArea: true,
        defaultValue: "Ob akute Führungsfrage oder strategischer Systemwandel — *wir starten immer mit Deinem Fall, nicht mit meiner Methode.*",
    },
    pullQuoteAlign: {
        type: ControlType.Enum,
        title: "Quote Align",
        options: ["left", "center", "right"],
        optionTitles: ["Left", "Center", "Right"],
        defaultValue: "left",
        hidden: (p) => !p.pullQuote,
    },
    pullQuoteFontSize: {
        type: ControlType.Number,
        title: "Quote Size",
        defaultValue: 28,
        min: 14,
        max: 56,
        step: 1,
        hidden: (p) => !p.pullQuote,
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: COLORS.brand02,
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: PASTELS.purple,
    },
    paddingTop: {
        type: ControlType.Number,
        title: "Padding Top",
        defaultValue: 96,
        min: 0,
        max: 200,
        step: 8,
    },
    paddingBottom: {
        type: ControlType.Number,
        title: "Padding Bottom",
        defaultValue: 96,
        min: 0,
        max: 200,
        step: 8,
    },
    items: {
        type: ControlType.Array,
        title: "Contrast Pairs",
        control: {
            type: ControlType.Object,
            controls: {
                nicht: {
                    type: ControlType.String,
                    title: "Nicht",
                    defaultValue: "Fertige Antworten",
                },
                sondern: {
                    type: ControlType.String,
                    title: "Sondern (*italic*)",
                    defaultValue: "Deine eigene Klarheit",
                },
            },
        },
        maxCount: 8,
    },
})
