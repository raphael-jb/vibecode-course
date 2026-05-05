import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

const COLORS = {
    brand02: "#FF6403",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
}

// Brand gradient — Warm Spectrum 315°
const GRADIENT_LINE = "linear-gradient(90deg, #FFC857, #00A8E8, #9C73FF)"

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500&display=swap');`

function parseItalic(text: string) {
    return text.split("*").map((part, i) => (
        <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>{part}</span>
    ))
}

export default function PageHeader(props) {
    const {
        eyebrow,
        headline,
        subline,
        showCta,
        ctaLabel,
        ctaHref,
        accentColor,
        background,
        paddingTop,
        paddingBottom,
    } = props

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)
    const [isHovering, setIsHovering] = useState(false)

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
            paddingTop,
            paddingBottom,
            paddingLeft: hPad,
            paddingRight: hPad,
            boxSizing: "border-box",
            position: "relative",
        }}>
            <style>{FONT_IMPORT}</style>

            <div style={{ maxWidth: 960, margin: "0 auto" }}>

                {/* Eyebrow */}
                {eyebrow ? (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        marginBottom: 28,
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

                {/* Headline — the visual hero of this header */}
                <h1 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? "clamp(40px, 10vw, 56px)" : "clamp(56px, 6.5vw, 80px)",
                    fontWeight: 400,
                    lineHeight: 1.0,
                    color: COLORS.textPrimary,
                    margin: "0 0 32px 0",
                    maxWidth: 760,
                    letterSpacing: "-0.01em",
                }}>
                    {parseItalic(headline)}
                </h1>

                {/* Subline + CTA row */}
                <div style={{
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "flex-end",
                    gap: isMobile ? 24 : 48,
                }}>
                    {/* Subline */}
                    {subline ? (
                        <p style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontSize: isMobile ? 16 : 19,
                            fontWeight: 300,
                            lineHeight: 1.55,
                            color: COLORS.textSecondary,
                            margin: 0,
                            maxWidth: 480,
                            flexShrink: 0,
                        }}>
                            {subline}
                        </p>
                    ) : null}

                    {/* CTA Button */}
                    {showCta && ctaLabel ? (
                        <a
                            href={isCanvas ? undefined : ctaHref}
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                paddingTop: 14,
                                paddingBottom: 14,
                                paddingLeft: 28,
                                paddingRight: 28,
                                borderRadius: 9999,
                                backgroundColor: accentColor,
                                color: "#ffffff",
                                fontFamily: "'Inter Tight', sans-serif",
                                fontSize: 15,
                                fontWeight: 500,
                                textDecoration: "none",
                                whiteSpace: "nowrap" as const,
                                flexShrink: 0,
                                transform: isHovering ? "translateY(-1px)" : "translateY(0)",
                                transition: "transform 0.15s ease, opacity 0.15s ease",
                                opacity: isHovering ? 0.9 : 1,
                                cursor: "pointer",
                            }}
                        >
                            {ctaLabel}
                            <span style={{ fontSize: 14, opacity: 0.8 }}>↗</span>
                        </a>
                    ) : null}
                </div>

            </div>

            {/* Gradient rule at the bottom — brand Warm Spectrum */}
            <div style={{
                position: "absolute",
                bottom: 0,
                left: hPad,
                right: hPad,
                height: 2,
                background: GRADIENT_LINE,
                borderRadius: 2,
                opacity: 0.6,
            }} />
        </div>
    )
}

PageHeader.defaultProps = {
    eyebrow: "Sparring",
    headline: "Nicht Antworten. *Klarheit.*",
    subline: "Kein Framework, kein Coaching-Programm — ein Gespräch auf Augenhöhe für Führungskräfte, die wissen was sie tun wollen, aber einen Raum brauchen um es zu finden.",
    showCta: true,
    ctaLabel: "Erstgespräch vereinbaren",
    ctaHref: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    accentColor: COLORS.brand02,
    background: COLORS.backgroundAlt,
    paddingTop: 80,
    paddingBottom: 80,
}

addPropertyControls(PageHeader, {
    eyebrow: {
        type: ControlType.String,
        title: "Eyebrow",
        defaultValue: "Sparring",
    },
    headline: {
        type: ControlType.String,
        title: "Headline (*italic*)",
        displayTextArea: true,
        defaultValue: "Nicht Antworten. *Klarheit.*",
    },
    subline: {
        type: ControlType.String,
        title: "Subline",
        displayTextArea: true,
        defaultValue: "Kein Framework, kein Coaching-Programm — ein Gespräch auf Augenhöhe für Führungskräfte, die wissen was sie tun wollen, aber einen Raum brauchen um es zu finden.",
    },
    showCta: {
        type: ControlType.Boolean,
        title: "CTA anzeigen",
        defaultValue: true,
    },
    ctaLabel: {
        type: ControlType.String,
        title: "CTA Label",
        defaultValue: "Erstgespräch vereinbaren",
        hidden: (props) => !props.showCta,
    },
    ctaHref: {
        type: ControlType.String,
        title: "CTA Link",
        defaultValue: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
        hidden: (props) => !props.showCta,
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: COLORS.brand02,
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: COLORS.backgroundAlt,
    },
    paddingTop: {
        type: ControlType.Number,
        title: "Padding Top",
        defaultValue: 80,
        min: 0,
        max: 200,
        step: 8,
    },
    paddingBottom: {
        type: ControlType.Number,
        title: "Padding Bottom",
        defaultValue: 80,
        min: 0,
        max: 200,
        step: 8,
    },
})
