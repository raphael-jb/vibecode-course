import React, { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { motion, useScroll, useSpring, useTransform } from "framer-motion"

const COLORS = {
    cream: "#FCF8F1",
    orange: "#FF6403",
    navy: "#0E2616",
    secondary: "rgba(14, 38, 22, 0.62)",
    border: "rgba(14, 38, 22, 0.14)",
    white: "#FFFFFF",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500;600&display=swap');`

function parseText(text: string) {
    if (!text) return null

    return text.split(/\\n|\r?\n/).map((line, lineIndex, lines) => (
        <React.Fragment key={`${line}-${lineIndex}`}>
            {line.split("*").map((part, partIndex) => (
                <span
                    key={`${part}-${partIndex}`}
                    style={{ fontStyle: partIndex % 2 === 1 ? "italic" : "normal" }}
                >
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

export default function SessionHero(props) {
    const {
        headlineOne,
        headlineTwo,
        headlineThree,
        subline,
        heroImage,
        ctaLabel,
        ctaHref,
        detailOne,
        detailTwo,
        detailThree,
        background,
        accentColor,
        imageWidth,
        scrollHeight,
        topPadding,
        bottomPadding,
        borderRadius,
    } = props

    const containerRef = useRef<HTMLElement | null>(null)
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)
    const [isTablet, setIsTablet] = useState(false)

    useEffect(() => {
        if (isCanvas) return

        const checkViewport = () => {
            setIsMobile(window.innerWidth < 720)
            setIsTablet(window.innerWidth >= 720 && window.innerWidth < 1024)
        }

        checkViewport()
        window.addEventListener("resize", checkViewport)
        return () => window.removeEventListener("resize", checkViewport)
    }, [isCanvas])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const progress = useSpring(scrollYProgress, {
        stiffness: 64,
        damping: 30,
        restDelta: 0.001,
    })

    const h1Y = useTransform(progress, [0, 0.42], [0, -150])
    const h1Opacity = useTransform(progress, [0.14, 0.36], [1, 0])
    const h1Blur = useTransform(progress, [0.14, 0.4], ["blur(0px)", "blur(18px)"])

    const h2Y = useTransform(progress, [0.24, 0.5], [58, 0])
    const h2Opacity = useTransform(progress, [0.18, 0.4], [0, 1])

    const supportOpacity = useTransform(progress, [0.62, 0.8], [0, 1])
    const supportY = useTransform(progress, [0.62, 0.8], [10, 0])

    const detailItems = [detailOne, detailTwo, detailThree].filter(Boolean)
    const activeImageWidth = isMobile ? "min(64vw, 260px)" : isTablet ? "min(36vw, 330px)" : `min(24vw, ${imageWidth}px)`
    const activeScrollHeight = isMobile ? Math.min(scrollHeight, 190) : isTablet ? Math.min(scrollHeight, 260) : scrollHeight
    const headlineSize = isMobile
        ? "clamp(44px, 13vw, 70px)"
        : isTablet
          ? "clamp(58px, 8vw, 88px)"
          : "clamp(64px, 7.2vw, 112px)"
    const textSlotHeight = isTablet ? 240 : 270

    if (isCanvas || isMobile) {
        return (
            <section
                ref={containerRef}
                style={{
                    ...staticSectionStyle(background),
                    minHeight: isMobile ? "auto" : 760,
                    padding: isMobile
                        ? `${topPadding}px 24px ${bottomPadding}px`
                        : `${topPadding}px 32px ${bottomPadding}px`,
                }}
            >
                <style>{FONT_IMPORT}</style>
                <div style={{ width: activeImageWidth, maxWidth: "100%" }}>
                    <div style={imageShellStyle(borderRadius)}>
                        <img src={heroImage} alt="" style={imageStyle} />
                    </div>
                </div>

                <h1 style={{ ...headlineStyle(headlineSize), color: COLORS.navy, marginTop: 22 }}>
                    {parseText(headlineOne)}
                </h1>
                <h2 style={{ ...headlineStyle(headlineSize), color: COLORS.navy, marginTop: 10 }}>
                    {parseText(headlineTwo)}
                </h2>
                {headlineThree ? (
                    <p style={{ ...smallHeadlineStyle(accentColor), marginTop: 12 }}>
                        {parseText(headlineThree)}
                    </p>
                ) : null}
                {renderSupport(subline, detailItems, ctaLabel, ctaHref, accentColor, isCanvas)}
            </section>
        )
    }

    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: `${activeScrollHeight}vh`,
                position: "relative",
                background,
            }}
        >
            <style>{FONT_IMPORT}</style>
            <section
                style={{
                    width: "100%",
                    height: "100svh",
                    position: "sticky",
                    top: 0,
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background,
                    boxSizing: "border-box",
                    padding: `${topPadding}px 24px ${bottomPadding}px`,
                }}
            >
                <motion.div
                    style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            width: activeImageWidth,
                            position: "relative",
                            zIndex: 20,
                        }}
                    >
                        <div style={imageShellStyle(borderRadius)}>
                            <img src={heroImage} alt="" style={imageStyle} />
                        </div>

                        <motion.h2
                            style={{
                                ...headlineStyle(headlineSize),
                                color: COLORS.navy,
                                position: "absolute",
                                left: "50%",
                                bottom: 0,
                                width: "100vw",
                                zIndex: 34,
                                x: "-50%",
                                y: h2Y,
                                opacity: h2Opacity,
                                pointerEvents: "none",
                            }}
                        >
                            {parseText(headlineTwo)}
                        </motion.h2>
                    </div>

                    <div
                        style={{
                            width: "100%",
                            height: textSlotHeight,
                            position: "relative",
                            marginTop: 18,
                        }}
                    >
                        <motion.h1
                            style={{
                                ...headlineStyle(headlineSize),
                                color: COLORS.navy,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                zIndex: 8,
                                y: h1Y,
                                opacity: h1Opacity,
                                filter: h1Blur,
                                pointerEvents: "none",
                            }}
                        >
                            {parseText(headlineOne)}
                        </motion.h1>

                        {headlineThree ? (
                            <motion.p
                                style={{
                                    ...smallHeadlineStyle(accentColor),
                                    position: "absolute",
                                    top: isTablet ? 40 : 48,
                                    left: 0,
                                    right: 0,
                                    opacity: supportOpacity,
                                    y: supportY,
                                }}
                            >
                                {parseText(headlineThree)}
                            </motion.p>
                        ) : null}

                        <motion.div
                            style={{
                                position: "absolute",
                                top: isTablet ? 76 : 88,
                                left: 0,
                                right: 0,
                                zIndex: 32,
                                opacity: supportOpacity,
                                y: supportY,
                                pointerEvents: "auto",
                            }}
                        >
                            {renderSupport(subline, detailItems, ctaLabel, ctaHref, accentColor, false)}
                        </motion.div>
                    </div>
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
    isCanvas: boolean
) {
    return (
        <div
            style={{
                width: "100%",
                maxWidth: 600,
                margin: isCanvas ? "22px auto 0" : "0 auto",
                textAlign: "center",
                pointerEvents: "auto",
            }}
        >
            <p
                style={{
                    fontFamily: "'Inter Tight', sans-serif",
                    fontSize: 18,
                    lineHeight: 1.42,
                    fontWeight: 300,
                    color: COLORS.secondary,
                    margin: "0 auto",
                    maxWidth: 520,
                }}
            >
                {parseText(subline)}
            </p>

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
                            border: `1px solid ${COLORS.border}`,
                            borderRadius: 999,
                            background: "rgba(255, 255, 255, 0.58)",
                            color: COLORS.navy,
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

            <a
                href={isCanvas ? undefined : ctaHref}
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
                    boxShadow: "0 14px 32px rgba(255, 100, 3, 0.2)",
                    whiteSpace: "nowrap",
                }}
            >
                {ctaLabel}
                <ArrowIcon />
            </a>
        </div>
    )
}

function staticSectionStyle(background: string): React.CSSProperties {
    return {
        width: "100%",
        background,
        boxSizing: "border-box",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
    }
}

function headlineStyle(fontSize: string): React.CSSProperties {
    return {
        fontFamily: "'Instrument Serif', serif",
        fontSize,
        lineHeight: 0.92,
        fontWeight: 400,
        letterSpacing: 0,
        margin: 0,
        maxWidth: 1280,
        padding: "0 24px",
        textAlign: "center",
    }
}

function smallHeadlineStyle(color: string): React.CSSProperties {
    return {
        fontFamily: "'Inter Tight', sans-serif",
        fontSize: 18,
        lineHeight: 1.25,
        fontWeight: 500,
        letterSpacing: 0,
        color,
        margin: "14px auto 0",
        maxWidth: 520,
        textAlign: "center",
    }
}

function imageShellStyle(borderRadius: number): React.CSSProperties {
    return {
        width: "100%",
        aspectRatio: "4 / 5",
        borderRadius,
        overflow: "hidden",
        background: COLORS.white,
        border: "1px solid rgba(255, 255, 255, 0.72)",
        boxShadow: "0 26px 80px rgba(14, 38, 22, 0.16)",
    }
}

const imageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    display: "block",
    objectFit: "cover",
}

SessionHero.defaultProps = {
    headlineOne: "Die *drueckende* Frage.",
    headlineTwo: "Die *tragende* Entscheidung.",
    headlineThree: "Mehr Linie. Weniger Rauschen.",
    subline:
        "90 Minuten Executive Sparring fuer eine konkrete Fuehrungsfrage. Vertraulich, praezise und auf den naechsten tragfaehigen Schritt ausgerichtet.",
    heroImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2000",
    ctaLabel: "Case besprechen",
    ctaHref: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    detailOne: "90 Minuten",
    detailTwo: "Ein konkreter Case",
    detailThree: "Summary nach Review",
    background: COLORS.cream,
    accentColor: COLORS.orange,
    imageWidth: 340,
    scrollHeight: 330,
    topPadding: 112,
    bottomPadding: 112,
    borderRadius: 15,
}

addPropertyControls(SessionHero, {
    headlineOne: {
        type: ControlType.String,
        title: "Headline 1",
        displayTextArea: true,
        defaultValue: SessionHero.defaultProps.headlineOne,
    },
    headlineTwo: {
        type: ControlType.String,
        title: "Headline 2",
        displayTextArea: true,
        defaultValue: SessionHero.defaultProps.headlineTwo,
    },
    headlineThree: {
        type: ControlType.String,
        title: "Headline 3",
        displayTextArea: true,
        defaultValue: SessionHero.defaultProps.headlineThree,
    },
    subline: {
        type: ControlType.String,
        title: "Subline",
        displayTextArea: true,
        defaultValue: SessionHero.defaultProps.subline,
    },
    heroImage: {
        type: ControlType.Image,
        title: "Hero Image",
    },
    ctaLabel: {
        type: ControlType.String,
        title: "CTA Label",
        defaultValue: SessionHero.defaultProps.ctaLabel,
    },
    ctaHref: {
        type: ControlType.String,
        title: "CTA Link",
        defaultValue: SessionHero.defaultProps.ctaHref,
    },
    detailOne: {
        type: ControlType.String,
        title: "Detail 1",
        defaultValue: SessionHero.defaultProps.detailOne,
    },
    detailTwo: {
        type: ControlType.String,
        title: "Detail 2",
        defaultValue: SessionHero.defaultProps.detailTwo,
    },
    detailThree: {
        type: ControlType.String,
        title: "Detail 3",
        defaultValue: SessionHero.defaultProps.detailThree,
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: COLORS.cream,
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent",
        defaultValue: COLORS.orange,
    },
    imageWidth: {
        type: ControlType.Number,
        title: "Image Width",
        defaultValue: SessionHero.defaultProps.imageWidth,
        min: 240,
        max: 620,
        step: 10,
    },
    scrollHeight: {
        type: ControlType.Number,
        title: "Scroll VH",
        defaultValue: SessionHero.defaultProps.scrollHeight,
        min: 180,
        max: 460,
        step: 10,
    },
    topPadding: {
        type: ControlType.Number,
        title: "Padding Top",
        defaultValue: SessionHero.defaultProps.topPadding,
        min: 0,
        max: 220,
        step: 8,
    },
    bottomPadding: {
        type: ControlType.Number,
        title: "Padding Bottom",
        defaultValue: SessionHero.defaultProps.bottomPadding,
        min: 0,
        max: 260,
        step: 8,
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Radius",
        defaultValue: SessionHero.defaultProps.borderRadius,
        min: 0,
        max: 40,
        step: 1,
    },
})
