import React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * StickyScrollMobile (Standalone)
 * ──────────────────────────────
 * - Pure Vertical Stacking.
 * - Optimized for mobile viewports.
 * - Raphael Baruch Style.
 */

const FONTS = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');
`

const COLORS = {
    brand01: "#9C73FF",
    brand02: "#FF6403",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
}

export default function StickyScrollMobile(props) {
    const { items, overline, tagline, accentColor, background, paddingTop, paddingBottom } = props

    return (
        <div style={{ 
            width: "100%", 
            backgroundColor: background, 
            paddingTop: paddingTop, 
            paddingBottom: paddingBottom, 
            paddingLeft: 24, 
            paddingRight: 24, 
            boxSizing: "border-box" 
        }}>
            <style>{FONTS}</style>
            
            <div style={{ marginBottom: 64 }}>
                <h4 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 32, margin: 0, lineHeight: 1.1, color: COLORS.textPrimary }}>
                    {overline} <br/>
                    <span style={{ fontStyle: "italic", color: accentColor }}>{tagline}</span>
                </h4>
            </div>

            {items.map((item, i) => (
                <div key={i} style={{ marginBottom: 80, display: "flex", flexDirection: "column" }}>
                    <div style={{ 
                        width: "100%", 
                        aspectRatio: "1/1", 
                        backgroundColor: item.panelColor || COLORS.backgroundAlt, 
                        borderRadius: 32, 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        marginBottom: 32,
                        overflow: "hidden"
                    }}>
                        <div style={{ 
                            width: "85%", 
                            aspectRatio: "1/1", // Force square
                            backgroundColor: item.imageBgColor || "#FFFFFF", 
                            borderRadius: 15, // Fixed 15px radius
                            display: "flex", 
                            alignItems: "center", 
                            justifyContent: "center",
                            boxShadow: "0 20px 40px rgba(0,0,0,0.04)",
                            overflow: "hidden",
                            position: "relative"
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
                                        objectFit: "cover", 
                                        objectPosition: item.focalPoint 
                                            ? `${item.focalPoint.x * 100}% ${item.focalPoint.y * 100}%` 
                                            : "center",
                                    }} 
                                />
                            ) : (
                                <span style={{ fontSize: 12, color: accentColor, opacity: 0.3 }}>Visual Placeholder</span>
                            )}
                        </div>
                    </div>
                    
                    <span style={{ display: "block", fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: accentColor, marginBottom: 12 }}>
                        0{i + 1} · {item.label}
                    </span>
                    <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 36, fontWeight: 400, lineHeight: 1.1, color: COLORS.textPrimary, margin: "0 0 16px" }}>
                        {item.headline.split("*").map((p, idx) => (
                            <span key={idx} style={{ fontStyle: idx % 2 !== 0 ? "italic" : "normal" }}>{p}</span>
                        ))}
                    </h2>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, fontWeight: 300, lineHeight: 1.6, color: COLORS.textSecondary, margin: 0 }}>
                        {item.body}
                    </p>
                </div>
            ))}
        </div>
    )
}

StickyScrollMobile.defaultProps = {
    overline: "Next Level Thinking.",
    tagline: "Mit Raphael Baruch.",
    accentColor: COLORS.brand01,
    background: "#FFFFFF",
    paddingTop: 60,
    paddingBottom: 60,
    items: [
        { label: "Power Skills", headline: "Identify what *really* matters.", body: "Analyse skill gaps in your organisation and provide direct learning paths to close them.", image: "", video: "", focalPoint: { x: 0.5, y: 0.5 }, panelColor: COLORS.backgroundAlt, imageBgColor: "#FFFFFF" },
        { label: "Great Courses", headline: "Cinema-quality *learning.*", body: "High-end video productions with industry experts ensure maximum engagement.", image: "", video: "", focalPoint: { x: 0.5, y: 0.5 }, panelColor: COLORS.backgroundAlt, imageBgColor: "#FFFFFF" },
        { label: "Individualization", headline: "Your brand, *your* content.", body: "Customise the experience to match your identity and upload your own SCORM files.", image: "", video: "", focalPoint: { x: 0.5, y: 0.5 }, panelColor: COLORS.backgroundAlt, imageBgColor: "#FFFFFF" },
    ]
}

addPropertyControls(StickyScrollMobile, {
    overline: { type: ControlType.String, title: "Overline" },
    tagline: { type: ControlType.String, title: "Tagline" },
    accentColor: { type: ControlType.Color, title: "Accent Color" },
    background: { type: ControlType.Color, title: "Background" },
    paddingTop: { type: ControlType.Number, title: "Padding Top", min: 0, max: 200, defaultValue: 60 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", min: 0, max: 200, defaultValue: 60 },
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
