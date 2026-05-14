import React, { useState, useEffect, useRef } from "react"
import { addPropertyControls, ControlType, motion, RenderTarget } from "framer"

const COLORS = {
    brand01: "#9C73FF",
    brand03: "#FFC857",
    brand06: "#00A8E8",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
}

// Brand gradient: Sofort-Impuls (purple) → Clarity (blue) → Transformation (yellow)
const SPECTRUM_GRADIENT = `linear-gradient(90deg, ${COLORS.brand01} 0%, ${COLORS.brand06} 50%, ${COLORS.brand03} 100%)`

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

function SliderRow({ dimension, isMobile, animated, rowIndex }) {
    const { label, minLabel, maxLabel } = dimension
    const TRACK_HEIGHT = 6

    return (
        <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "160px 1fr",
            gap: isMobile ? 8 : 32,
            alignItems: "center",
            paddingTop: 24,
            paddingBottom: 24,
            borderBottom: "1px solid rgba(0,0,0,0.06)",
        }}>
            {/* Dimension label */}
            <span style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.08em",
                textTransform: "uppercase" as const,
                color: COLORS.textSecondary,
            }}>
                {label}
            </span>

            {/* Track + labels */}
            <div>
                {/* Track */}
                <div style={{
                    position: "relative",
                    height: TRACK_HEIGHT,
                    borderRadius: TRACK_HEIGHT,
                    backgroundColor: "rgba(0,0,0,0.06)",
                    overflow: "hidden",
                }}>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: animated ? 1 : 0 }}
                        transition={{
                            duration: 0.9,
                            ease: "easeOut",
                            delay: rowIndex * 0.3,
                        }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: SPECTRUM_GRADIENT,
                            transformOrigin: "left center",
                            borderRadius: TRACK_HEIGHT,
                        }}
                    />
                </div>

                {/* Min / Max labels below track */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: 8,
                }}>
                    <span style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: 11,
                        fontWeight: 300,
                        color: COLORS.textSecondary,
                        opacity: 0.6,
                    }}>
                        {minLabel}
                    </span>
                    <span style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: 11,
                        fontWeight: 300,
                        color: COLORS.textSecondary,
                        opacity: 0.6,
                    }}>
                        {maxLabel}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default function ProcessSpectrum(props) {
    const {
        headline,
        subline,
        product1Name,
        product2Name,
        product3Name,
        dimensions,
        showQuizCta,
        quizCtaText,
        quizCtaLink,
        accentColor,
        background,
        padding,
        paddingTop,
        paddingBottom,
    } = props

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)
    const [animated, setAnimated] = useState(isCanvas)
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isCanvas) return
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    useEffect(() => {
        if (isCanvas) return
        if (typeof IntersectionObserver === "undefined") {
            setAnimated(true)
            return
        }
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries.some((entry) => entry.isIntersecting)) {
                    setAnimated(true)
                    observer.disconnect()
                }
            },
            {
                threshold: 0.35,
                rootMargin: "0px 0px -10% 0px",
            }
        )
        if (containerRef.current) observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [isCanvas])

    const sectionPadding = {
        top: padding?.top ?? paddingTop ?? 96,
        right: padding?.right ?? 80,
        bottom: padding?.bottom ?? paddingBottom ?? 96,
        left: padding?.left ?? 80,
    }

    const legend = [
        { color: COLORS.brand01, name: product1Name },
        { color: COLORS.brand06, name: product2Name },
        { color: COLORS.brand03, name: product3Name },
    ]

    return (
        <div ref={containerRef} style={{
            width: "100%",
            backgroundColor: background,
            borderRadius: 15,
            paddingTop: sectionPadding.top,
            paddingRight: sectionPadding.right,
            paddingBottom: sectionPadding.bottom,
            paddingLeft: sectionPadding.left,
            boxSizing: "border-box",
        }}>
            <style>{FONT_IMPORT}</style>

            <div style={{ maxWidth: 960, margin: "0 auto" }}>

                {/* Headline */}
                <h2 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? 36 : 52,
                    fontWeight: 400,
                    lineHeight: 1.0,
                    color: COLORS.textPrimary,
                    margin: "0 auto 20px auto",
                    maxWidth: 680,
                    textAlign: "center",
                }}>
                    {parseItalic(headline)}
                </h2>

                {/* Subline */}
                {subline ? (
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: isMobile ? 16 : 18,
                        fontWeight: 300,
                        lineHeight: 1.55,
                        color: COLORS.textSecondary,
                        margin: "0 auto 56px auto",
                        maxWidth: 560,
                        textAlign: "center",
                    }}>
                        {subline}
                    </p>
                ) : (
                    <div style={{ height: 56 }} />
                )}

                {/* Slider rows */}
                <div>
                    {dimensions.map((dim, i) => (
                        <SliderRow
                            key={i}
                            dimension={dim}
                            isMobile={isMobile}
                            animated={animated}
                            rowIndex={i}
                        />
                    ))}
                </div>

                {/* Color legend */}
                <div style={{
                    display: "flex",
                    gap: isMobile ? 20 : 40,
                    marginTop: 28,
                    flexWrap: "wrap" as const,
                    alignItems: "center",
                }}>
                    {legend.map((item, i) => (
                        <div key={i} style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                        }}>
                            <div style={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                backgroundColor: item.color,
                                flexShrink: 0,
                            }} />
                            <span style={{
                                fontFamily: "'Inter Tight', sans-serif",
                                fontSize: 13,
                                fontWeight: 400,
                                color: COLORS.textSecondary,
                            }}>
                                {item.name}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Quiz CTA */}
                {showQuizCta && quizCtaText ? (
                    <div style={{
                        marginTop: 56,
                        padding: isMobile ? 24 : 32,
                        borderRadius: 16,
                        border: `1px solid ${accentColor}`,
                        backgroundColor: "#FFFFFF",
                        boxShadow: `0 8px 32px ${hexToRgba(accentColor, 0.12)}, 0 2px 8px ${hexToRgba(accentColor, 0.08)}`,
                        display: "flex",
                        flexDirection: isMobile ? "column" : "row",
                        alignItems: isMobile ? "flex-start" : "center",
                        justifyContent: "space-between",
                        gap: 20,
                    }}>
                        <p style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontSize: isMobile ? 20 : 24,
                            fontWeight: 400,
                            lineHeight: 1.3,
                            color: COLORS.textPrimary,
                            margin: 0,
                        }}>
                            {parseItalic(quizCtaText)}
                        </p>
                        <a
                            href={isCanvas ? undefined : quizCtaLink}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 8,
                                paddingTop: 12,
                                paddingBottom: 12,
                                paddingLeft: 24,
                                paddingRight: 24,
                                borderRadius: 9999,
                                backgroundColor: accentColor,
                                color: "#ffffff",
                                fontFamily: "'Inter Tight', sans-serif",
                                fontSize: 14,
                                fontWeight: 500,
                                textDecoration: "none",
                                whiteSpace: "nowrap" as const,
                                flexShrink: 0,
                                cursor: "pointer",
                            }}
                        >
                            Herausfinden →
                        </a>
                    </div>
                ) : null}

            </div>
        </div>
    )
}

ProcessSpectrum.defaultProps = {
    headline: "Ich denke mit. *Nicht für.*",
    subline: "Das Format folgt Deinem Case — von der Sofort-Reaktion bis zur mehrmonatigen Transformation. Und sie gehen häufig ineinander über — in alle Richtungen. Wir passen uns fluidly and effortlessly an.",
    product1Name: "Sofort-Impuls",
    product2Name: "Clarity Streaming",
    product3Name: "Transformation Teaming",
    accentColor: COLORS.brand01,
    background: COLORS.backgroundAlt,
    padding: { top: 96, right: 80, bottom: 96, left: 80 },
    paddingTop: 96,
    paddingBottom: 96,
    showQuizCta: true,
    quizCtaText: "Nicht sicher, welches Format zu Dir passt? Schreib mir kurz Deinen Fall.",
    quizCtaLink: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    dimensions: [
        { label: "Vorbereitung",    minLabel: "Optional",   maxLabel: "Ausführlich"    },
        { label: "Sessionstruktur", minLabel: "Reaktiv",    maxLabel: "Konzipiert"     },
        { label: "Dauer",           minLabel: "Einmalig",   maxLabel: "Mehrmonatig"    },
        { label: "Nachhalten",      minLabel: "Kurz",       maxLabel: "Kontinuierlich" },
    ],
}

addPropertyControls(ProcessSpectrum, {
    headline: { type: ControlType.String, title: "Headline (*italic*)", displayTextArea: true, defaultValue: "Ich denke mit. *Nicht für.*" },
    subline:  { type: ControlType.String, title: "Subline", displayTextArea: true, defaultValue: "Das Format folgt Deinem Case — von der Sofort-Reaktion bis zur mehrmonatigen Transformation." },
    product1Name: { type: ControlType.String, title: "Format 1 (Lila)",  defaultValue: "Sofort-Impuls" },
    product2Name: { type: ControlType.String, title: "Format 2 (Blau)",  defaultValue: "Clarity Streaming" },
    product3Name: { type: ControlType.String, title: "Format 3 (Gelb)",  defaultValue: "Transformation Teaming" },
    dimensions: {
        type: ControlType.Array,
        title: "Dimensionen",
        control: {
            type: ControlType.Object,
            controls: {
                label:    { type: ControlType.String, title: "Label",     defaultValue: "Dimension" },
                minLabel: { type: ControlType.String, title: "Min Label", defaultValue: "Wenig"     },
                maxLabel: { type: ControlType.String, title: "Max Label", defaultValue: "Viel"      },
            },
        },
        maxCount: 6,
    },
    showQuizCta:  { type: ControlType.Boolean, title: "Quiz CTA", defaultValue: true },
    quizCtaText:  { type: ControlType.String,  title: "Quiz CTA Text", displayTextArea: true, defaultValue: "Nicht sicher, welches Format zu Dir passt? Schreib mir kurz Deinen Fall.", hidden: (p) => !p.showQuizCta },
    quizCtaLink:  { type: ControlType.String,  title: "Quiz CTA Link", defaultValue: "https://calendar.app.google/TxnYmbFXwquFFQKK9", hidden: (p) => !p.showQuizCta },
    accentColor:  { type: ControlType.Color,   title: "Accent Color", defaultValue: COLORS.brand01 },
    background:   { type: ControlType.Color,   title: "Background",   defaultValue: COLORS.backgroundAlt },
    padding: {
        type: ControlType.Object,
        title: "Padding",
        controls: {
            top:    { type: ControlType.Number, title: "Top",    defaultValue: 96, min: 0, max: 240, step: 8 },
            right:  { type: ControlType.Number, title: "Right",  defaultValue: 80, min: 0, max: 240, step: 8 },
            bottom: { type: ControlType.Number, title: "Bottom", defaultValue: 96, min: 0, max: 240, step: 8 },
            left:   { type: ControlType.Number, title: "Left",   defaultValue: 80, min: 0, max: 240, step: 8 },
        },
    },
})
