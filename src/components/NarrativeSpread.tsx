import React, { useState, useEffect, useRef } from "react"
import { addPropertyControls, ControlType, motion, RenderTarget } from "framer"

/**
 * NarrativeSpread
 * ───────────────
 * A high-end magazine-style layout for grounded storytelling.
 * Focuses on relatable messaging for leaders without the "coaching cheese".
 * Supports silent video loops (MP4) or high-quality editorial images.
 */

const COLORS = {
    brand01: "#9C73FF", 
    brand02: "#FF6403",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500&display=swap');`

// ── Animation Variants ─────────────────────────────────────────────────────
const swiftySpring = { type: "spring", stiffness: 300, damping: 36 }

const headlineContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}

const wordVariant = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    visible: { y: 0, opacity: 1, filter: "blur(0px)", transition: swiftySpring },
}

/**
 * AnimatedText
 * Splits text by lines and then by words to apply stagger animations.
 * Preserves *italic* formatting.
 */
function AnimatedText({ text }: { text: string }) {
    if (!text) return null
    const lines = text.split(/\\n|\r?\n/)
    
    return lines.map((line, i) => (
        <span key={i} style={{ display: "block" }}>
            {line.split("*").map((part, j) => {
                const isItalic = j % 2 !== 0
                const words = part.split(" ")
                return words.map((word, k) => (
                    <span key={`${j}-${k}`} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
                        <motion.span
                            variants={wordVariant}
                            style={{ 
                                display: "inline-block", 
                                whiteSpace: "pre",
                                fontStyle: isItalic ? "italic" : "normal"
                            }}
                        >
                            {word}{k < words.length - 1 ? " " : ""}
                        </motion.span>
                    </span>
                ))
            })}
        </span>
    ))
}

function parseText(text: string) {
    if (!text) return ""
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

export default function NarrativeSpread(props) {
    const {
        mediaType,
        image,
        video,
        mediaSide,
        mediaWidth,
        mediaAspectRatio,
        headline,
        body,
        pullQuote,
        showDoodle,
        doodleImage,
        accentColor,
        background,
        paddingTop,
        paddingBottom,
        mediaBorderColor,
        mediaShadowX,
        mediaShadowY,
        mediaShadowBlur,
        mediaShadowSpread,
        mediaShadowColor,
    } = props

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (isCanvas) return
        const check = () => setIsMobile(window.innerWidth < 1024)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    const isMediaLeft = mediaSide === "left"
    const hPad = isMobile ? 24 : 80

    const initial = isCanvas ? "visible" : "hidden"
    const animate = "visible"

    const shadowStyle = `${mediaShadowX}px ${mediaShadowY}px ${mediaShadowBlur}px ${mediaShadowSpread}px ${mediaShadowColor}`

    return (
        <div style={{
            width: "100%",
            backgroundColor: background,
            paddingTop,
            paddingBottom,
            paddingLeft: hPad,
            paddingRight: hPad,
            boxSizing: "border-box",
            display: "flex",
            justifyContent: "center",
        }}>
            <style>{FONT_IMPORT}</style>

            <div style={{
                maxWidth: 1280,
                width: "100%",
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : isMediaLeft ? `${mediaWidth}% 1fr` : `1fr ${mediaWidth}%`,
                gap: isMobile ? 48 : 100,
                alignItems: "flex-start",
            }}>
                
                {/* Media Section (Image or Video) */}
                <div style={{
                    order: (isMobile || isMediaLeft) ? 0 : 1,
                    position: "relative",
                    width: "100%",
                    aspectRatio: mediaAspectRatio,
                    borderRadius: 24,
                    overflow: "hidden",
                    backgroundColor: "rgba(0,0,0,0.03)",
                    border: `1px solid ${mediaBorderColor}`,
                    boxShadow: shadowStyle,
                }}>
                    {mediaType === "video" && video ? (
                        <video
                            ref={videoRef}
                            src={video}
                            autoPlay
                            loop
                            muted
                            playsInline
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                        />
                    ) : image ? (
                        <img 
                            src={image} 
                            alt="" 
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                    ) : null}

                    {/* Subtle Doodle Overlay */}
                    {showDoodle && doodleImage && (
                        <div style={{
                            position: "absolute",
                            bottom: 20,
                            right: isMediaLeft ? 20 : "auto",
                            left: !isMediaLeft ? 20 : "auto",
                            width: 100,
                            height: 100,
                            zIndex: 2,
                        }}>
                            <img src={doodleImage} alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div style={{
                    paddingTop: isMobile ? 0 : 40,
                    display: "flex",
                    flexDirection: "column",
                    gap: 32,
                }}>
                    {/* Headline */}
                    {headline && (
                        <motion.h2 
                            style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: isMobile ? 36 : 52,
                                fontWeight: 400,
                                lineHeight: 1.15,
                                color: COLORS.textPrimary,
                                margin: 0,
                            }}
                            variants={headlineContainer}
                            initial={initial}
                            whileInView={animate}
                            viewport={{ once: true, margin: "-100px" }}
                        >
                            <AnimatedText text={headline} />
                        </motion.h2>
                    )}

                    {/* Body Text */}
                    {body && (
                        <p style={{
                            fontFamily: "'Inter Tight', sans-serif",
                            fontSize: isMobile ? 17 : 19,
                            fontWeight: 300,
                            lineHeight: 1.6,
                            color: COLORS.textSecondary,
                            margin: 0,
                            maxWidth: 540,
                        }}>
                            {parseText(body)}
                        </p>
                    )}

                    {/* Pull Quote - The "Resonanz-Moment" */}
                    {pullQuote && (
                        <div style={{
                            marginTop: 16,
                            paddingLeft: 24,
                            borderLeft: `2px solid ${accentColor}`,
                        }}>
                            <blockquote style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: isMobile ? 24 : 32,
                                fontStyle: "italic",
                                fontWeight: 400,
                                lineHeight: 1.2,
                                color: COLORS.textPrimary,
                                margin: 0,
                            }}>
                                {parseText(pullQuote)}
                            </blockquote>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

NarrativeSpread.defaultProps = {
    mediaType: "image",
    mediaSide: "left",
    mediaWidth: 50,
    mediaAspectRatio: "1/1.2",
    headline: "Der Moment, wenn die Tür zugeht.",
    body: "Draußen feiert das Team. Man hat geliefert. Aber in Deinem Kopf dreht sich die Frage, die Du niemandem dort stellen kannst. Nicht, weil Du es nicht willst, sondern weil Deine Rolle es nicht erlaubt.\n\nGute Führung ist oft die Kunst, das Unausgesprochene auszuhalten, während man nach außen Richtung gibt.",
    pullQuote: "*„Ich dachte immer, ich müsste die Antwort schon haben. Heute weiß ich: Ich muss nur den Raum haben, sie zu finden.“*",
    accentColor: COLORS.brand01,
    background: "#FFFFFF",
    paddingTop: 120,
    paddingBottom: 120,
    showDoodle: false,
    mediaBorderColor: "rgba(156, 115, 255, 0.2)",
    mediaShadowX: 0,
    mediaShadowY: 4,
    mediaShadowBlur: 24,
    mediaShadowSpread: -4,
    mediaShadowColor: "rgba(156, 115, 255, 0.3)",
}

addPropertyControls(NarrativeSpread, {
    mediaType: {
        type: ControlType.Enum,
        title: "Media Type",
        options: ["image", "video"],
        defaultValue: "image",
    },
    image: { 
        type: ControlType.Image, 
        title: "Image", 
        hidden: (p) => p.mediaType !== "image" 
    },
    video: { 
        type: ControlType.File, 
        title: "Video (MP4 Loop)", 
        allowedFileTypes: ["mp4"],
        hidden: (p) => p.mediaType !== "video" 
    },
    mediaSide: {
        type: ControlType.Enum,
        title: "Media Side",
        options: ["left", "right"],
        defaultValue: "left",
    },
    mediaWidth: {
        type: ControlType.Number,
        title: "Media Width (%)",
        min: 30,
        max: 70,
        defaultValue: 50,
        unit: "%",
        step: 5,
    },
    mediaAspectRatio: {
        type: ControlType.String,
        title: "Aspect Ratio",
        defaultValue: "1/1.2",
    },
    headline: { type: ControlType.String, title: "Headline", displayTextArea: true },
    body: { type: ControlType.String, title: "Body Text", displayTextArea: true },
    pullQuote: { type: ControlType.String, title: "Pull Quote (*italic*)", displayTextArea: true },
    showDoodle: { type: ControlType.Boolean, title: "Show Doodle", defaultValue: false },
    doodleImage: { 
        type: ControlType.Image, 
        title: "Doodle", 
        hidden: (p) => !p.showDoodle 
    },
    accentColor: { type: ControlType.Color, title: "Accent Color (Line)", defaultValue: COLORS.brand01 },
    mediaBorderColor: { type: ControlType.Color, title: "Media Border", defaultValue: "rgba(156, 115, 255, 0.2)" },
    
    mediaShadowColor: { type: ControlType.Color, title: "Glow Color", defaultValue: "rgba(156, 115, 255, 0.3)" },
    mediaShadowX: { type: ControlType.Number, title: "Glow X", defaultValue: 0, min: -100, max: 100 },
    mediaShadowY: { type: ControlType.Number, title: "Glow Y", defaultValue: 4, min: -100, max: 100 },
    mediaShadowBlur: { type: ControlType.Number, title: "Glow Blur", defaultValue: 24, min: 0, max: 100 },
    mediaShadowSpread: { type: ControlType.Number, title: "Glow Spread", defaultValue: -4, min: -100, max: 100 },

    background: { type: ControlType.Color, title: "Background", defaultValue: "#FFFFFF" },
    paddingTop: { type: ControlType.Number, title: "Padding Top", min: 0, max: 240, step: 8, defaultValue: 120 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", min: 0, max: 240, step: 8, defaultValue: 120 },
})
