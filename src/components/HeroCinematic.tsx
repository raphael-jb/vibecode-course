import React, { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

const COLORS = {
    cream: "#FCF8F1",
    orange: "#FF6403",
    navy: "#0E2616",
    white: "#FFFFFF",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600&display=swap');`

function parseText(text: string) {
    if (!text) return null
    return text.split(/\\n|\r?\n/).map((line, lineIndex, lines) => (
        <React.Fragment key={`${line}-${lineIndex}`}>
            {line.split("*").map((part, partIndex) => (
                <span key={`${part}-${partIndex}`} style={{ fontStyle: partIndex % 2 === 1 ? "italic" : "normal" }}>
                    {part}
                </span>
            ))}
            {lineIndex < lines.length - 1 ? <br /> : null}
        </React.Fragment>
    ))
}

function ArrowIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
                d="M4 10L10 4M10 4H4.75M10 4V9.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
            />
        </svg>
    )
}

function hexToRgba(hex: string, alpha: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return `rgba(0,0,0,${alpha})`
    return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
}

export default function HeroCinematic(props) {
    const {
        headlineOne,
        headlineTwo,
        subline,
        backgroundImage,
        kenBurns,
        overlayBias,
        background,
        productName,
        headlinePosition,
        mobileAlign,
        ctaLabel,
        ctaHref,
        detailOne,
        detailTwo,
        detailThree,
        accentColor,
        headlineColor,
        sublineColor,
        scrollHeight,
        topPadding,
        bottomPadding,
    } = props

    const containerRef = useRef<HTMLDivElement | null>(null)
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)

    useEffect(() => {
        if (isCanvas) return
        const check = () => {
            setIsMobile(window.innerWidth < 720)
            setIsTablet(window.innerWidth >= 720 && window.innerWidth < 1024)
        }
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const progress = useSpring(scrollYProgress, { stiffness: 64, damping: 30, restDelta: 0.001 })

    const h1Y = useTransform(progress, [0, 0.42], [0, -150])
    const h1Opacity = useTransform(progress, [0.14, 0.36], [1, 0])
    const h1Blur = useTransform(progress, [0.14, 0.4], ["blur(0px)", "blur(18px)"])

    const h2Y = useTransform(progress, [0.24, 0.5], [58, 0])
    const h2Opacity = useTransform(progress, [0.18, 0.4], [0, 1])

    const supportOpacity = useTransform(progress, [0.24, 0.48], [0, 1])
    const supportY = useTransform(progress, [0.24, 0.48], [10, 0])

    const isDarkening = overlayBias < 0
    const overlayColor = isDarkening ? "#000000" : background
    const finalOpacity = Math.abs(overlayBias)
    const overlayGradient = `radial-gradient(ellipse at center, ${hexToRgba(overlayColor, finalOpacity)} 0%, ${hexToRgba(overlayColor, finalOpacity * 0.4)} 100%)`

    const detailItems = [detailOne, detailTwo, detailThree].filter(Boolean)

    const headlineSize = isMobile
        ? "clamp(44px, 13vw, 70px)"
        : isTablet
        ? "clamp(58px, 8vw, 88px)"
        : "clamp(64px, 7.2vw, 112px)"

    const sublineSize = isMobile ? 14 : isTablet ? 16 : 18

    const subHeadlineSize = isMobile
        ? "clamp(28px, 8.5vw, 48px)"
        : isTablet
        ? "clamp(36px, 5vw, 60px)"
        : "clamp(44px, 4.8vw, 76px)"

    const activeScrollHeight = isMobile
        ? Math.min(scrollHeight, 190)
        : isTablet
        ? Math.min(scrollHeight, 260)
        : scrollHeight

    const headlineSlotHeight = isTablet ? 160 : 190

    const bgLayer = (
        <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden" }}>
            {backgroundImage ? (
                <motion.div
                    initial={{ scale: 1 }}
                    animate={kenBurns && !isCanvas ? { scale: 1.08 } : { scale: 1 }}
                    transition={{ duration: 24, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
                    style={{
                        width: "100%",
                        height: "100%",
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            ) : null}
            <div style={{ position: "absolute", inset: 0, background: overlayGradient, pointerEvents: "none" }} />
        </div>
    )

    // Static / mobile / canvas
    if (isCanvas || isMobile) {
        return (
            <section
                style={{
                    width: "100%",
                    minHeight: isMobile ? "100svh" : 760,
                    background,
                    position: "relative",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: mobileAlign === "bottom" ? "flex-end" : "center",
                    textAlign: "center",
                    padding: `${topPadding}px 24px ${bottomPadding}px`,
                    boxSizing: "border-box",
                    gap: 12,
                }}
            >
                <style>{FONT_IMPORT}</style>
                {bgLayer}
                <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 920 }}>
                    {productName ? (
                        <p style={{ ...headlineStyle(headlineSize), color: headlineColor, margin: "0 0 12px", textShadow: "0 0 48px rgba(255, 100, 3, 0.55), 0 0 120px rgba(255, 100, 3, 0.25)" }}>
                            {productName}
                        </p>
                    ) : null}
                    <h1 style={{ ...headlineStyle(subHeadlineSize), color: headlineColor }}>
                        {parseText(headlineOne)}
                    </h1>
                    <h2 style={{ ...headlineStyle(subHeadlineSize), color: headlineColor, marginTop: 8 }}>
                        {parseText(headlineTwo)}
                    </h2>
                    <div style={{ marginTop: 32 }}>
                        {renderSupport(subline, detailItems, ctaLabel, ctaHref, accentColor, sublineColor, sublineSize, true)}
                    </div>
                </div>
            </section>
        )
    }

    // Desktop — sticky scroll with split layout:
    // product name floats in upper half (absolute), animated headlines anchor to bottom
    return (
        <div
            ref={containerRef}
            style={{ width: "100%", height: `${activeScrollHeight}vh`, position: "relative", background }}
        >
            <style>{FONT_IMPORT}</style>
            <section
                style={{
                    width: "100%",
                    height: "100svh",
                    position: "sticky",
                    top: 0,
                    overflow: "visible",
                    background,
                    boxSizing: "border-box",
                }}
            >
                {bgLayer}

                {/* Product name — static, upper area */}
                {productName ? (
                    <div
                        style={{
                            position: "absolute",
                            top: "28%",
                            left: 0,
                            right: 0,
                            transform: "translateY(-50%)",
                            textAlign: "center",
                            zIndex: 2,
                            padding: "0 24px",
                            pointerEvents: "none",
                        }}
                    >
                        <p style={{ ...headlineStyle(headlineSize), color: headlineColor, margin: 0, textShadow: "0 0 48px rgba(255, 100, 3, 0.55), 0 0 120px rgba(255, 100, 3, 0.25)" }}>
                            {productName}
                        </p>
                    </div>
                ) : null}

                {/* Headline block — only h1/h2, positioned at headlinePosition% from top */}
                <div
                    style={{
                        position: "absolute",
                        top: `${headlinePosition}%`,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        padding: "0 24px",
                        boxSizing: "border-box",
                    }}
                >
                    <div style={{ width: "100%", height: headlineSlotHeight, position: "relative", maxWidth: 1000, margin: "0 auto" }}>
                        <motion.h1
                            style={{
                                ...headlineStyle(subHeadlineSize),
                                color: headlineColor,
                                position: "absolute",
                                inset: 0,
                                y: h1Y,
                                opacity: h1Opacity,
                                filter: h1Blur,
                                pointerEvents: "none",
                            }}
                        >
                            {parseText(headlineOne)}
                        </motion.h1>

                        <motion.h2
                            style={{
                                ...headlineStyle(subHeadlineSize),
                                color: headlineColor,
                                position: "absolute",
                                inset: 0,
                                y: h2Y,
                                opacity: h2Opacity,
                                pointerEvents: "none",
                            }}
                        >
                            {parseText(headlineTwo)}
                        </motion.h2>
                    </div>
                </div>

                {/* Support block — independently anchored to bottom, always on-screen */}
                <motion.div
                    style={{
                        position: "absolute",
                        bottom: bottomPadding,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        padding: "0 24px",
                        boxSizing: "border-box",
                        opacity: supportOpacity,
                        y: supportY,
                        pointerEvents: "auto",
                    }}
                >
                    {renderSupport(subline, detailItems, ctaLabel, ctaHref, accentColor, sublineColor, sublineSize, false)}
                </motion.div>
            </section>
        </div>
    )
}

function renderSupport(
    subline: string,
    detailItems: string[],
    ctaLabel: string,
    ctaHref: string,
    accentColor: string,
    sublineColor: string,
    sublineSize: number,
    isStatic: boolean
) {
    return (
        <div style={{ width: "100%", maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
            <p
                style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: sublineSize,
                    lineHeight: 1.42,
                    fontWeight: 300,
                    color: sublineColor,
                    margin: "0 auto",
                    maxWidth: 520,
                }}
            >
                {parseText(subline)}
            </p>

            {detailItems.length > 0 ? (
                <div
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        justifyContent: "center",
                        gap: 10,
                        marginTop: 14,
                    }}
                >
                    {detailItems.map((item, index) => (
                        <div
                            key={`${item}-${index}`}
                            style={{
                                border: "1px solid rgba(255, 255, 255, 0.22)",
                                borderRadius: 999,
                                background: "rgba(255, 255, 255, 0.10)",
                                color: COLORS.white,
                                fontFamily: "'Inter Tight', sans-serif",
                                fontSize: 13,
                                fontWeight: 500,
                                lineHeight: 1,
                                padding: "9px 12px",
                            }}
                        >
                            {item}
                        </div>
                    ))}
                </div>
            ) : null}

            <a
                href={isStatic ? undefined : ctaHref}
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    minHeight: 50,
                    marginTop: 18,
                    padding: "0 28px",
                    borderRadius: 999,
                    backgroundColor: accentColor,
                    color: COLORS.white,
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    textDecoration: "none",
                    boxShadow: "0 0 24px rgba(255, 100, 3, 0.5), 0 14px 40px rgba(255, 100, 3, 0.35)",
                    whiteSpace: "nowrap",
                }}
            >
                {ctaLabel}
                <ArrowIcon />
            </a>
        </div>
    )
}

function headlineStyle(fontSize: string): React.CSSProperties {
    return {
        fontFamily: "'Instrument Serif', serif",
        fontSize,
        lineHeight: 0.92,
        fontWeight: 400,
        letterSpacing: 0,
        margin: 0,
        textAlign: "center",
    }
}

HeroCinematic.defaultProps = {
    headlineOne: "Die *drueckende* Frage.",
    headlineTwo: "Die *tragende* Entscheidung.",
    subline:
        "90 Minuten Executive Sparring fuer eine konkrete Fuehrungsfrage. Vertraulich, praezise und auf den naechsten tragfaehigen Schritt ausgerichtet.",
    backgroundImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2000",
    productName: "Session",
    headlinePosition: 60,
    mobileAlign: "center",
    kenBurns: true,
    overlayBias: -0.52,
    background: COLORS.navy,
    ctaLabel: "Case besprechen",
    ctaHref: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    detailOne: "90 Minuten",
    detailTwo: "Ein konkreter Case",
    detailThree: "Summary nach Review",
    accentColor: COLORS.orange,
    headlineColor: COLORS.white,
    sublineColor: "rgba(255, 255, 255, 0.72)",
    scrollHeight: 330,
    topPadding: 112,
    bottomPadding: 80,
}

addPropertyControls(HeroCinematic, {
    headlineOne: {
        type: ControlType.String,
        title: "Headline 1",
        displayTextArea: true,
        defaultValue: HeroCinematic.defaultProps.headlineOne,
    },
    headlineTwo: {
        type: ControlType.String,
        title: "Headline 2",
        displayTextArea: true,
        defaultValue: HeroCinematic.defaultProps.headlineTwo,
    },
    subline: {
        type: ControlType.String,
        title: "Subline",
        displayTextArea: true,
        defaultValue: HeroCinematic.defaultProps.subline,
    },
    backgroundImage: {
        type: ControlType.Image,
        title: "Background Image",
    },
    productName: {
        type: ControlType.String,
        title: "Product Name",
        defaultValue: "Session",
    },
    mobileAlign: {
        type: ControlType.Enum,
        title: "Mobile Align",
        options: ["center", "bottom"],
        optionTitles: ["Center", "Bottom"],
        defaultValue: "center",
    },
    headlinePosition: {
        type: ControlType.Number,
        title: "Headline Position %",
        min: 30,
        max: 85,
        step: 1,
        defaultValue: 60,
        displayStepper: true,
    },
    kenBurns: {
        type: ControlType.Boolean,
        title: "Ken Burns",
        defaultValue: true,
    },
    overlayBias: {
        type: ControlType.Number,
        title: "Overlay (Dark < 0 > Light)",
        min: -1,
        max: 1,
        step: 0.05,
        defaultValue: -0.52,
        displayStepper: true,
    },
    background: {
        type: ControlType.Color,
        title: "Fallback BG",
        defaultValue: COLORS.navy,
    },
    ctaLabel: {
        type: ControlType.String,
        title: "CTA Label",
        defaultValue: HeroCinematic.defaultProps.ctaLabel,
    },
    ctaHref: {
        type: ControlType.String,
        title: "CTA Link",
        defaultValue: HeroCinematic.defaultProps.ctaHref,
    },
    detailOne: {
        type: ControlType.String,
        title: "Detail 1",
        defaultValue: HeroCinematic.defaultProps.detailOne,
    },
    detailTwo: {
        type: ControlType.String,
        title: "Detail 2",
        defaultValue: HeroCinematic.defaultProps.detailTwo,
    },
    detailThree: {
        type: ControlType.String,
        title: "Detail 3",
        defaultValue: HeroCinematic.defaultProps.detailThree,
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent",
        defaultValue: COLORS.orange,
    },
    headlineColor: {
        type: ControlType.Color,
        title: "Headline Color",
        defaultValue: COLORS.white,
    },
    sublineColor: {
        type: ControlType.Color,
        title: "Subline Color",
        defaultValue: "rgba(255, 255, 255, 0.72)",
    },
    scrollHeight: {
        type: ControlType.Number,
        title: "Scroll VH",
        min: 180,
        max: 460,
        step: 10,
        defaultValue: HeroCinematic.defaultProps.scrollHeight,
    },
    topPadding: {
        type: ControlType.Number,
        title: "Padding Top",
        min: 0,
        max: 220,
        step: 8,
        defaultValue: HeroCinematic.defaultProps.topPadding,
    },
    bottomPadding: {
        type: ControlType.Number,
        title: "Padding Bottom",
        min: 0,
        max: 260,
        step: 8,
        defaultValue: HeroCinematic.defaultProps.bottomPadding,
    },
})
