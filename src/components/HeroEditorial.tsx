import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType, motion, RenderTarget } from "framer"

/**
 * HeroEditorial
 * ─────────────
 * A high-impact, editorial-style hero component with cinematic background and overlay.
 * Features: Ken Burns effect, bi-directional overlays, and flexible 2D alignment.
 */

const COLORS = {
    brand02: "#FF6403", 
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500&display=swap');`

function parseText(text: string) {
    if (!text) return ""
    
    // 1. Handle literal "\n" strings (user typing '\' and 'n') 
    // 2. Handle actual newline characters (user pressing Enter in text area)
    const lines = text.split(/\\n|\r?\n/)
    
    return lines.map((line, i) => (
        <React.Fragment key={i}>
            {line.split("*").map((part, j) => (
                <span key={j} style={{ fontStyle: j % 2 !== 0 ? "italic" : "normal" }}>{part}</span>
            ))}
            {i < lines.length - 1 && <br />}
        </React.Fragment>
    ))
}

export default function HeroEditorial(props) {
    const {
        headline,
        subline,
        image,
        contentHAlign,
        contentVAlign,
        accentColor,
        background,
        paddingTop,
        paddingBottom,
        showCta,
        ctaLabel,
        ctaLink,
        overlayBias, // -1 (dark) to 1 (light)
        minHeight,
        headlineColor,
        sublineColor,
        kenBurns,
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
    
    // 2D Alignment Logic
    const justifyContent = contentHAlign === "left" ? "flex-start" : contentHAlign === "right" ? "flex-end" : "center"
    const alignItems = contentVAlign === "top" ? "flex-start" : contentVAlign === "bottom" ? "flex-end" : "center"
    const textAlign = contentHAlign as any

    // Bi-directional Overlay Logic
    const isDarkening = overlayBias < 0
    const overlayColor = isDarkening ? "#000000" : background
    const finalOpacity = Math.abs(overlayBias)

    return (
        <div style={{
            width: "100%",
            minHeight: isMobile ? 500 : minHeight,
            backgroundColor: background,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: alignItems, // Vertical align
            paddingTop,
            paddingBottom,
            boxSizing: "border-box",
        }}>
            <style>{FONT_IMPORT}</style>

            {/* Background Image Layer */}
            <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
                {image ? (
                    <motion.div
                        initial={isCanvas ? false : { scale: 1 }}
                        animate={kenBurns && !isCanvas ? { scale: 1.15 } : { scale: 1 }}
                        transition={{ 
                            duration: 20, 
                            ease: "linear", 
                            repeat: Infinity, 
                            repeatType: "reverse" 
                        }}
                        style={{
                            width: "100%",
                            height: "100%",
                            backgroundImage: `url(${image})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                ) : (
                    <div style={{ width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.05)" }} />
                )}

                {/* Intelligent Overlay Layer */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: contentHAlign === "left" 
                        ? `linear-gradient(90deg, ${hexToRgba(overlayColor, finalOpacity)} 0%, ${hexToRgba(overlayColor, finalOpacity * 0.4)} 60%, transparent 100%)`
                        : contentHAlign === "right"
                        ? `linear-gradient(270deg, ${hexToRgba(overlayColor, finalOpacity)} 0%, ${hexToRgba(overlayColor, finalOpacity * 0.4)} 60%, transparent 100%)`
                        : `radial-gradient(circle, ${hexToRgba(overlayColor, finalOpacity)} 0%, ${hexToRgba(overlayColor, finalOpacity * 0.6)} 100%)`,
                    pointerEvents: "none",
                }} />
            </div>

            {/* Content Container */}
            <div style={{
                maxWidth: 1280,
                width: "100%",
                margin: "0 auto",
                paddingLeft: hPad,
                paddingRight: hPad,
                position: "relative",
                zIndex: 2,
                display: "flex",
                justifyContent: justifyContent, // Horizontal align
            }}>
                <div style={{ 
                    maxWidth: 720,
                    textAlign: textAlign,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: contentHAlign === "left" ? "flex-start" : contentHAlign === "right" ? "flex-end" : "center",
                }}>
                    {/* Headline - supports \n for manual breaks */}
                    <motion.h1 
                        initial={isCanvas ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontSize: isMobile ? "clamp(42px, 10vw, 56px)" : "clamp(64px, 6.5vw, 100px)",
                            fontWeight: 400,
                            lineHeight: 0.95,
                            color: headlineColor,
                            margin: "0 0 32px 0",
                            letterSpacing: "-0.02em",
                        }}
                    >
                        {parseText(headline)}
                    </motion.h1>

                    {/* Subline */}
                    <motion.p 
                        initial={isCanvas ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontSize: isMobile ? 18 : 24,
                            fontWeight: 300,
                            lineHeight: 1.5,
                            color: sublineColor,
                            margin: "0 0 48px 0",
                            maxWidth: 520,
                        }}
                    >
                        {parseText(subline)}
                    </motion.p>

                    {/* CTA */}
                    {showCta && ctaLabel && (
                        <motion.div
                            initial={isCanvas ? false : { opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <a
                                href={isCanvas ? undefined : ctaLink}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 12,
                                    padding: "18px 40px",
                                    borderRadius: 9999,
                                    backgroundColor: accentColor,
                                    color: "#FFFFFF",
                                    fontFamily: "'Inter Tight', sans-serif",
                                    fontSize: 16,
                                    fontWeight: 500,
                                    textDecoration: "none",
                                    transition: "transform 0.2s ease",
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                            >
                                {ctaLabel}
                                <span style={{ fontSize: 18 }}>→</span>
                            </a>
                        </motion.div>
                    )}
                </div>
            </div>
        </div>
    )
}

function hexToRgba(hex: string, alpha: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return `rgba(0,0,0,${alpha})`
    return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
}

HeroEditorial.defaultProps = {
    headline: "Du trägst es leise.\n*Ich kenne das.*",
    subline: "Hinter jeder strategischen Entscheidung steht ein Mensch, der sie allein verantwortet. Ich war dieser Mensch.",
    contentHAlign: "left",
    contentVAlign: "center",
    accentColor: COLORS.brand02,
    background: COLORS.backgroundAlt,
    headlineColor: COLORS.textPrimary,
    sublineColor: COLORS.textSecondary,
    paddingTop: 120,
    paddingBottom: 120,
    showCta: true,
    ctaLabel: "Case besprechen",
    ctaLink: "#erstgespraech",
    overlayBias: -0.4,
    minHeight: 800,
    kenBurns: true,
}

addPropertyControls(HeroEditorial, {
    headline: { type: ControlType.String, title: "Headline (*italic*)", displayTextArea: true },
    subline: { type: ControlType.String, title: "Subline", displayTextArea: true },
    image: { type: ControlType.Image, title: "Background Image" },
    kenBurns: { type: ControlType.Boolean, title: "Ken Burns Effect", defaultValue: true },
    contentHAlign: {
        type: ControlType.Enum,
        title: "Horizontal Align",
        options: ["left", "center", "right"],
        defaultValue: "left",
    },
    contentVAlign: {
        type: ControlType.Enum,
        title: "Vertical Align",
        options: ["top", "center", "bottom"],
        defaultValue: "center",
    },
    overlayBias: {
        type: ControlType.Number,
        title: "Overlay (Dark < 0 > Light)",
        min: -1,
        max: 1,
        step: 0.05,
        defaultValue: -0.4,
        displayStepper: true,
    },
    minHeight: { type: ControlType.Number, title: "Min Height", min: 400, max: 1200, defaultValue: 800 },
    headlineColor: { type: ControlType.Color, title: "Headline Color", defaultValue: COLORS.textPrimary },
    sublineColor: { type: ControlType.Color, title: "Subline Color", defaultValue: COLORS.textSecondary },
    accentColor: { type: ControlType.Color, title: "Accent Color", defaultValue: COLORS.brand02 },
    background: { type: ControlType.Color, title: "Base Color (Light Overlay)", defaultValue: COLORS.backgroundAlt },
    paddingTop: { type: ControlType.Number, title: "Padding Top", min: 0, max: 400, step: 8 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", min: 0, max: 400, step: 8 },
    showCta: { type: ControlType.Boolean, title: "Show CTA" },
    ctaLabel: { type: ControlType.String, title: "CTA Label", hidden: (p) => !p.showCta },
    ctaLink: { type: ControlType.String, title: "CTA Link", hidden: (p) => !p.showCta },
})
