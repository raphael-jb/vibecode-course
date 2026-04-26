import React, { useRef } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

/**
 * MasterplanStickyScroll (DESKTOP GOLD)
 * ──────────────────────────────────────
 * - Architecture: Tall "Track" (scrollY) + Sticky "Stage" (100vh).
 * - Logic: Transforms mapping scroll % to exclusive item states.
 * - Design: Raphael Baruch Style (Instrument Serif + Inter).
 */

const FONTS = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');
`

const COLORS = {
    brand01: "#9C73FF",
    brand02: "#FF6403",
    brand06: "#00A8E8",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
    borderPrimary: "#E5E5E5",
}

export default function MasterplanStickyScroll(props) {
    const { items, overline, tagline, accentColor, background, vhPerItem } = props
    const containerRef = useRef(null)
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })

    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })
    
    const itemCount = items.length
    const totalHeight = isCanvas ? "auto" : `${itemCount * vhPerItem}vh`

    return (
        <div 
            ref={containerRef}
            style={{ 
                width: "100%", 
                height: totalHeight,
                backgroundColor: background,
                position: "relative",
            }}
        >
            <style>{FONTS}</style>

            {/* Sticky Stage: This pins to the viewport */}
            <div style={{
                position: isCanvas ? "relative" : "-webkit-sticky",
                // @ts-ignore
                position: isCanvas ? "relative" : "sticky",
                top: 0,
                height: "100vh",
                width: "100%",
                display: "flex",
                flexDirection: "row",
                overflow: "hidden",
                zIndex: 100, // Enforce stacking context
                backgroundColor: background, // Prevent transparency bleed
            }}>
                
                {/* Left Side: Text Narrative */}
                <div style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "0 6% 0 10%",
                    zIndex: 2,
                }}>
                    <div style={{ marginBottom: 60 }}>
                        <h4 style={{ 
                            fontFamily: "'Instrument Serif', serif", 
                            fontSize: 32, 
                            margin: 0, 
                            lineHeight: 1.1,
                            color: COLORS.textPrimary 
                        }}>
                            {overline} <br/>
                            <span style={{ fontStyle: "italic", color: accentColor }}>{tagline}</span>
                        </h4>
                    </div>

                    <div style={{ position: "relative", height: 360 }}>
                        {items.map((item, i) => {
                            const start = i / itemCount
                            const end = (i + 1) / itemCount
                            
                            // Re-bind transforms to ensure they update within this scope
                            const activeOpacity = useTransform(smoothProgress, [start, start + 0.05, end - 0.05, end], [0, 1, 1, 0])
                            const activeY = useTransform(smoothProgress, [start, start + 0.05, end - 0.05, end], [40, 0, 0, -40])

                            return (
                                <motion.div
                                    key={i}
                                    style={{
                                        position: "absolute",
                                        top: 0, left: 0, right: 0,
                                        opacity: isCanvas && i === 0 ? 1 : activeOpacity,
                                        y: isCanvas && i === 0 ? 0 : activeY,
                                        pointerEvents: isCanvas && i === 0 ? "auto" : "none",
                                    }}
                                >
                                    <span style={{ 
                                        display: "block", 
                                        fontFamily: "'Inter', sans-serif", 
                                        fontSize: 11, 
                                        fontWeight: 600, 
                                        letterSpacing: "0.15em", 
                                        textTransform: "uppercase", 
                                        color: accentColor, 
                                        marginBottom: 16 
                                    }}>
                                        0{i + 1} · {item.label}
                                    </span>
                                    <h2 style={{ 
                                        fontFamily: "'Instrument Serif', serif", 
                                        fontSize: "clamp(32px, 4vw, 56px)", 
                                        fontWeight: 400, 
                                        lineHeight: 1.0, 
                                        color: COLORS.textPrimary, 
                                        margin: "0 0 24px",
                                        letterSpacing: "-0.01em"
                                    }}>
                                        {item.headline.split("*").map((p, idx) => (
                                            <span key={idx} style={{ fontStyle: idx % 2 !== 0 ? "italic" : "normal" }}>{p}</span>
                                        ))}
                                    </h2>
                                    <p style={{ 
                                        fontFamily: "'Inter', sans-serif", 
                                        fontSize: 18, 
                                        fontWeight: 300, 
                                        lineHeight: 1.6, 
                                        color: COLORS.textSecondary, 
                                        maxWidth: 440, 
                                        margin: 0 
                                    }}>
                                        {item.body}
                                    </p>
                                </motion.div>
                            )
                        })}
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 60 }}>
                        {items.map((_, i) => {
                            const activeIndex = useTransform(smoothProgress, [0, 1], [0, itemCount - 1])
                            const width = useTransform(activeIndex, [i - 0.5, i, i + 0.5], [12, 48, 12])
                            const opacity = useTransform(activeIndex, [i - 0.5, i, i + 0.5], [0.2, 1, 0.2])
                            return (
                                <motion.div key={i} style={{ height: 4, width: isCanvas && i === 0 ? 48 : width, backgroundColor: accentColor, opacity: isCanvas && i === 0 ? 1 : opacity, borderRadius: 2 }} />
                            )
                        })}
                    </div>
                </div>

                {/* Right Side: Visual Showcase */}
                <div style={{
                    flex: 1.2,
                    position: "relative",
                    backgroundColor: COLORS.backgroundAlt,
                    borderTopLeftRadius: 60,
                    borderBottomLeftRadius: 60,
                    overflow: "hidden",
                    margin: "32px 0",
                    boxShadow: "-20px 0 60px rgba(0,0,0,0.03)",
                }}>
                    {items.map((item, i) => {
                        const start = i / itemCount
                        const end = (i + 1) / itemCount
                        const opacity = useTransform(smoothProgress, [start - 0.1, start, end - 0.1, end], [0, 1, 1, 0])
                        const scale = useTransform(smoothProgress, [start - 0.1, start, end - 0.1, end], [0.9, 1, 1, 1.1])
                        const rotate = useTransform(smoothProgress, [start, end], [0, 2])

                        return (
                            <motion.div
                                key={i}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: item.panelColor || COLORS.backgroundAlt,
                                    opacity: isCanvas && i === 0 ? 1 : opacity,
                                    scale: isCanvas && i === 0 ? 1 : scale,
                                    rotate: isCanvas ? 0 : rotate,
                                }}
                            >
                                <span style={{
                                    position: "absolute",
                                    bottom: 40,
                                    right: 60,
                                    fontFamily: "'Instrument Serif', serif",
                                    fontSize: "15vw",
                                    color: accentColor,
                                    opacity: 0.05,
                                    userSelect: "none",
                                }}>
                                    0{i + 1}
                                </span>

                                <div style={{ 
                                    width: "80%", 
                                    aspectRatio: "1/1", // Force square
                                    display: "flex", 
                                    justifyContent: "center", 
                                    alignItems: "center",
                                    position: "relative",
                                    backgroundColor: item.imageBgColor || "#FFFFFF",
                                    borderRadius: 15, // Requested 15px radius
                                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                                    zIndex: 1,
                                    overflow: "hidden"
                                }}>
                                    {item.video ? (
                                        <video
                                            src={item.video}
                                            autoPlay
                                            loop
                                            muted
                                            playsInline
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "cover",
                                                objectPosition: item.focalPoint 
                                                    ? `${item.focalPoint.x * 100}% ${item.focalPoint.y * 100}%` 
                                                    : "center",
                                            }}
                                        />
                                    ) : item.image ? (
                                        <img 
                                            src={item.image} 
                                            alt="" 
                                            style={{ 
                                                width: "100%", 
                                                height: "100%", 
                                                objectFit: "cover", // Auto-fill and crop (supports GIFs)
                                                objectPosition: item.focalPoint 
                                                    ? `${item.focalPoint.x * 100}% ${item.focalPoint.y * 100}%` 
                                                    : "center",
                                            }} 
                                        />
                                    ) : (
                                        <div style={{ width: "100%", height: "100%", borderRadius: 15, border: `2px dashed ${accentColor}`, opacity: 0.2 }} />
                                    )}
                                </div>
                            </motion.div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}

MasterplanStickyScroll.defaultProps = {
    overline: "Next Level Thinking.",
    tagline: "Mit Raphael Baruch.",
    accentColor: COLORS.brand01,
    background: "#FFFFFF",
    vhPerItem: 120,
    items: [
        { label: "Power Skills", headline: "Identify what *really* matters.", body: "Analyse skill gaps in your organisation and provide direct learning paths to close them.", image: "", video: "", focalPoint: { x: 0.5, y: 0.5 }, panelColor: COLORS.backgroundAlt, imageBgColor: "#FFFFFF" },
        { label: "Great Courses", headline: "Cinema-quality *learning.*", body: "High-end video productions with industry experts ensure maximum engagement.", image: "", video: "", focalPoint: { x: 0.5, y: 0.5 }, panelColor: COLORS.backgroundAlt, imageBgColor: "#FFFFFF" },
        { label: "Individualization", headline: "Your brand, *your* content.", body: "Customise the experience to match your identity and upload your own SCORM files.", image: "", video: "", focalPoint: { x: 0.5, y: 0.5 }, panelColor: COLORS.backgroundAlt, imageBgColor: "#FFFFFF" },
    ]
}

addPropertyControls(MasterplanStickyScroll, {
    overline: { type: ControlType.String, title: "Overline" },
    tagline: { type: ControlType.String, title: "Tagline" },
    accentColor: { type: ControlType.Color, title: "Accent Color" },
    background: { type: ControlType.Color, title: "Background" },
    vhPerItem: { type: ControlType.Number, title: "Scroll Pace", defaultValue: 120, min: 80, max: 300 },
    items: {
        type: ControlType.Array,
        title: "Items",
        control: {
            type: ControlType.Object,
            controls: {
                label: { type: ControlType.String, title: "Label" },
                headline: { type: ControlType.String, title: "Headline (*italic*)" },
                body: { type: ControlType.String, title: "Body", displayTextArea: true },
                image: { type: ControlType.Image, title: "Visual (Image/GIF)" },
                video: { type: ControlType.File, title: "Visual (Video/MP4)", allowedFileTypes: ["mp4"] },
                focalPoint: { type: ControlType.FusedNumber, title: "Focal Point", defaultValue: { x: 0.5, y: 0.5 } },
                panelColor: { type: ControlType.Color, title: "Panel BG", defaultValue: COLORS.backgroundAlt },
                imageBgColor: { type: ControlType.Color, title: "Card BG", defaultValue: "#FFFFFF" },
            }
        }
    }
})
