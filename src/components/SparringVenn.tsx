import React, { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

const COLORS = {
    orange: "#FF6403",
    violet: "#9C73FF",
    cream: "#FCF8F1",
    navy: "#0E2616",
    white: "#FFFFFF",
    text: "#0E2616",
    muted: "rgba(14, 38, 22, 0.52)",
    border: "rgba(14, 38, 22, 0.10)",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600&display=swap');`

function parseItalic(text: string) {
    return (text || "").split("*").map((part, i) => (
        <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>{part}</span>
    ))
}

// ── Scroll-animated desktop Venn ─────────────────────────────────────────────

export default function SparringVenn(props) {
    const {
        headline,
        subline,
        centerStatement,
        coachingLabel,
        consultingLabel,
        sparringLabel,
        coachingText,
        sparringText,
        consultingText,
        background,
        scrollHeight,
        paddingTop,
        paddingBottom,
    } = props

    const containerRef = useRef<HTMLDivElement | null>(null)
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (isCanvas) return
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })
    const progress = useSpring(scrollYProgress, { stiffness: 72, damping: 30, restDelta: 0.001 })

    // Phase 1 [0 → 0.48]: circles slide from off-screen toward center
    const coachingX = useTransform(progress, [0, 0.48], [-380, -110])
    const consultingX = useTransform(progress, [0, 0.48], [380, 110])

    // Phase 2 [0.38 → 0.64]: Sparring fades + scales in; outer circles dim
    const sparringOpacity = useTransform(progress, [0.38, 0.64], [0, 1])
    const sparringScale = useTransform(progress, [0.38, 0.64], [0.72, 1])
    const outerOpacity = useTransform(progress, [0.38, 0.64], [0.88, 0.26])

    // Phase 3 [0.62 → 0.82]: text below fades in
    const textOpacity = useTransform(progress, [0.62, 0.82], [0, 1])
    const textY = useTransform(progress, [0.62, 0.82], [14, 0])

    const circleSize = 280
    const sparringSize = 220

    // ── Mobile static layout ────────────────────────────────────────────────
    if (isMobile) {
        return (
            <section
                style={{
                    width: "100%",
                    background,
                    padding: `${paddingTop}px 24px ${paddingBottom}px`,
                    boxSizing: "border-box",
                }}
            >
                <style>{FONT_IMPORT}</style>
                <div style={{ maxWidth: 480, margin: "0 auto", textAlign: "center" }}>
                    <h2 style={headlineStyle(36)}>{parseItalic(headline)}</h2>
                    {subline ? <p style={sublineStyle(15)}>{subline}</p> : null}

                    {/* Static Venn: two outline circles, Sparring in center */}
                    <div style={{ position: "relative", height: 260, margin: "40px auto 0", maxWidth: 360 }}>
                        {/* Coaching */}
                        <div style={{ ...circleBaseStyle(180, COLORS.violet, false), position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)" }}>
                            <span style={circleLabelStyle(18)}>{coachingLabel}</span>
                        </div>
                        {/* Consulting */}
                        <div style={{ ...circleBaseStyle(180, COLORS.violet, false), position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)" }}>
                            <span style={circleLabelStyle(18)}>{consultingLabel}</span>
                        </div>
                        {/* Sparring */}
                        <div style={{ ...circleBaseStyle(160, COLORS.violet, true), position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
                            <span style={{ ...circleLabelStyle(20), color: COLORS.white }}>{sparringLabel}</span>
                        </div>
                    </div>

                    {centerStatement ? (
                        <p style={{ ...sublineStyle(16), marginTop: 28, fontStyle: "italic" }}>{centerStatement}</p>
                    ) : null}

                    <p style={{ ...sublineStyle(14), marginTop: 16, color: COLORS.muted }}>{sparringText}</p>
                </div>
            </section>
        )
    }

    // ── Canvas static layout ────────────────────────────────────────────────
    if (isCanvas) {
        return (
            <section
                style={{
                    width: "100%",
                    background,
                    padding: `${paddingTop}px 80px ${paddingBottom}px`,
                    boxSizing: "border-box",
                }}
            >
                <style>{FONT_IMPORT}</style>
                <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center" }}>
                    <h2 style={headlineStyle(56)}>{parseItalic(headline)}</h2>
                    {subline ? <p style={sublineStyle(18)}>{subline}</p> : null}
                    <div style={{ position: "relative", height: 380, marginTop: 48 }}>
                        <CircleEl size={circleSize} x={-110} color={COLORS.violet} solid={false} label={coachingLabel} opacity={0.3} />
                        <CircleEl size={circleSize} x={110} color={COLORS.violet} solid={false} label={consultingLabel} opacity={0.3} />
                        <CircleEl size={sparringSize} x={0} color={COLORS.violet} solid={true} label={sparringLabel} opacity={1} />
                    </div>
                    {centerStatement ? <p style={{ ...sublineStyle(18), marginTop: 32, fontStyle: "italic" }}>{centerStatement}</p> : null}
                    <p style={{ ...sublineStyle(17), marginTop: 12, color: COLORS.muted, maxWidth: 560, margin: "12px auto 0" }}>{sparringText}</p>
                </div>
            </section>
        )
    }

    // ── Desktop scroll-driven layout ────────────────────────────────────────
    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: `${scrollHeight}vh`, position: "relative", background }}
        >
            <style>{FONT_IMPORT}</style>
            <section
                style={{
                    width: "100%",
                    height: "100svh",
                    position: "sticky",
                    top: 0,
                    background,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    padding: `${paddingTop}px 80px ${paddingBottom}px`,
                    boxSizing: "border-box",
                }}
            >
                {/* Headline — always visible */}
                <div style={{ textAlign: "center", marginBottom: 40, zIndex: 2, position: "relative" }}>
                    <h2 style={headlineStyle(56)}>{parseItalic(headline)}</h2>
                    {subline ? <p style={sublineStyle(18)}>{subline}</p> : null}
                </div>

                {/* Venn stage */}
                <div
                    style={{
                        position: "relative",
                        width: "100%",
                        maxWidth: 700,
                        height: circleSize + 40,
                        flexShrink: 0,
                    }}
                >
                    {/* Coaching — slides in from left */}
                    <motion.div
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            marginLeft: -circleSize / 2,
                            marginTop: -circleSize / 2,
                            x: coachingX,
                            opacity: outerOpacity,
                        }}
                    >
                        <div style={circleBaseStyle(circleSize, COLORS.violet, false)}>
                            <span style={circleLabelStyle(32)}>{coachingLabel}</span>
                        </div>
                    </motion.div>

                    {/* Consulting — slides in from right */}
                    <motion.div
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            marginLeft: -circleSize / 2,
                            marginTop: -circleSize / 2,
                            x: consultingX,
                            opacity: outerOpacity,
                        }}
                    >
                        <div style={circleBaseStyle(circleSize, COLORS.violet, false)}>
                            <span style={circleLabelStyle(32)}>{consultingLabel}</span>
                        </div>
                    </motion.div>

                    {/* Sparring — fades in at the intersection */}
                    <motion.div
                        style={{
                            position: "absolute",
                            left: "50%",
                            top: "50%",
                            marginLeft: -sparringSize / 2,
                            marginTop: -sparringSize / 2,
                            opacity: sparringOpacity,
                            scale: sparringScale,
                            zIndex: 3,
                        }}
                    >
                        <div style={circleBaseStyle(sparringSize, COLORS.violet, true)}>
                            <span style={{ ...circleLabelStyle(34), color: COLORS.white }}>{sparringLabel}</span>
                        </div>
                    </motion.div>
                </div>

                {/* Text below — fades in at end of scroll */}
                <motion.div
                    style={{
                        opacity: textOpacity,
                        y: textY,
                        textAlign: "center",
                        marginTop: 36,
                        maxWidth: 560,
                        zIndex: 2,
                        position: "relative",
                    }}
                >
                    {centerStatement ? (
                        <p style={{ ...sublineStyle(18), fontStyle: "italic", marginBottom: 12 }}>
                            {centerStatement}
                        </p>
                    ) : null}
                    <p style={{ ...sublineStyle(16), color: COLORS.muted }}>{sparringText}</p>
                </motion.div>
            </section>
        </div>
    )
}

// ── Shared circle helpers ─────────────────────────────────────────────────────

function CircleEl({ size, x, color, solid, label, opacity }: {
    size: number
    x: number
    color: string
    solid: boolean
    label: string
    opacity: number
}) {
    return (
        <div style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            marginLeft: -size / 2 + x,
            marginTop: -size / 2,
            opacity,
            ...circleBaseStyle(size, color, solid),
        }}>
            <span style={{ ...circleLabelStyle(solid ? 30 : 28), color: solid ? COLORS.white : COLORS.text }}>
                {label}
            </span>
        </div>
    )
}

function circleBaseStyle(size: number, color: string, solid: boolean): React.CSSProperties {
    return {
        width: size,
        height: size,
        borderRadius: "50%",
        border: `1.5px solid ${color}`,
        backgroundColor: solid ? color : `${color}14`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxSizing: "border-box",
    }
}

function circleLabelStyle(fontSize: number): React.CSSProperties {
    return {
        fontFamily: "'Instrument Serif', serif",
        fontSize,
        fontWeight: 400,
        lineHeight: 1,
        color: COLORS.text,
        textAlign: "center",
    }
}

function headlineStyle(fontSize: number): React.CSSProperties {
    return {
        fontFamily: "'Instrument Serif', serif",
        fontSize,
        fontWeight: 400,
        lineHeight: 1.0,
        color: COLORS.text,
        margin: 0,
    }
}

function sublineStyle(fontSize: number): React.CSSProperties {
    return {
        fontFamily: "'Inter Tight', sans-serif",
        fontSize,
        fontWeight: 300,
        lineHeight: 1.5,
        color: COLORS.muted,
        margin: "18px auto 0",
        maxWidth: 560,
    }
}

// ── Defaults & controls ───────────────────────────────────────────────────────

SparringVenn.defaultProps = {
    headline: "Wo *Sparring* seinen Platz hat.",
    subline: "Coaching, Consulting und Sparring beantworten unterschiedliche Situationen.",
    centerStatement: "Sparring ist der Sweetspot fuer alle, die an sich selbst und am Unternehmen arbeiten.",
    coachingLabel: "Coaching",
    consultingLabel: "Consulting",
    sparringLabel: "Sparring",
    coachingText: "Coaching oeffnet Reflexion, Muster und Selbstfuehrung. Wertvoll, wenn die innere Dynamik im Vordergrund steht.",
    sparringText: "Sparring haelt die konkrete Fuehrungslage im Raum: Rolle, Verantwortung, Entscheidung, System und eigene Linie.",
    consultingText: "Consulting bringt Analyse, Erfahrung und unternehmerischen Blick. Wertvoll, wenn ein fachliches Problem geloest werden soll.",
    background: COLORS.cream,
    scrollHeight: 280,
    paddingTop: 120,
    paddingBottom: 48,
}

addPropertyControls(SparringVenn, {
    headline: { type: ControlType.String, title: "Headline (*italic*)", displayTextArea: true },
    subline: { type: ControlType.String, title: "Subline", displayTextArea: true },
    centerStatement: { type: ControlType.String, title: "Center Statement", displayTextArea: true },
    coachingLabel: { type: ControlType.String, title: "Coaching Label", defaultValue: "Coaching" },
    consultingLabel: { type: ControlType.String, title: "Consulting Label", defaultValue: "Consulting" },
    sparringLabel: { type: ControlType.String, title: "Sparring Label", defaultValue: "Sparring" },
    coachingText: { type: ControlType.String, title: "Coaching Text", displayTextArea: true },
    sparringText: { type: ControlType.String, title: "Sparring Text", displayTextArea: true },
    consultingText: { type: ControlType.String, title: "Consulting Text", displayTextArea: true },
    background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.cream },
    scrollHeight: {
        type: ControlType.Number,
        title: "Scroll VH",
        defaultValue: 280,
        min: 150,
        max: 450,
        step: 10,
    },
    paddingTop: { type: ControlType.Number, title: "Padding Top", defaultValue: 80, min: 0, max: 200, step: 8 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", defaultValue: 80, min: 0, max: 200, step: 8 },
})
