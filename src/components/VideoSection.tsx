import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

const COLORS = {
    brand02: "#FF6403",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
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

function getEmbedUrl(url: string): { type: "iframe" | "video" | null; src: string } {
    if (!url) return { type: null, src: "" }

    const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (yt) return { type: "iframe", src: `https://www.youtube.com/embed/${yt[1]}?autoplay=1&rel=0` }

    const vimeo = url.match(/vimeo\.com\/(\d+)/)
    if (vimeo) return { type: "iframe", src: `https://player.vimeo.com/video/${vimeo[1]}?autoplay=1` }

    if (/\.(mp4|webm|ogg)$/i.test(url)) return { type: "video", src: url }

    return { type: null, src: "" }
}

// Play icon as inline SVG — no emoji, consistent across platforms
function PlayIcon({ size = 28 }: { size?: number }) {
    return (
        <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
            <polygon points="8,4 24,14 8,24" fill="white" />
        </svg>
    )
}

export default function VideoSection(props) {
    const {
        eyebrow,
        headline,
        subline,
        videoUrl,
        thumbnailImage,
        fallbackText,
        accentColor,
        background,
        paddingTop,
        paddingBottom,
    } = props

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isHoveringPlay, setIsHoveringPlay] = useState(false)

    useEffect(() => {
        if (isCanvas) return
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    // Reset player when videoUrl changes (canvas editing)
    useEffect(() => { setIsPlaying(false) }, [videoUrl])

    const embed = getEmbedUrl(videoUrl)
    const canPlay = embed.type !== null

    const videoRadius = isMobile ? 16 : 24
    const maxVideoWidth = 760

    return (
        <div style={{
            width: "100%",
            backgroundColor: background,
            paddingTop,
            paddingBottom,
            paddingLeft: isMobile ? 24 : 48,
            paddingRight: isMobile ? 24 : 48,
            boxSizing: "border-box",
        }}>
            <style>{FONT_IMPORT}</style>

            <div style={{
                maxWidth: 960,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
            }}>

                {/* Eyebrow */}
                {eyebrow ? (
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        marginBottom: 20,
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

                {/* Headline */}
                <h2 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? 36 : 52,
                    fontWeight: 400,
                    lineHeight: 1.0,
                    color: COLORS.textPrimary,
                    margin: "0 0 16px 0",
                    textAlign: "center",
                    maxWidth: 640,
                }}>
                    {parseItalic(headline)}
                </h2>

                {/* Subline */}
                {subline ? (
                    <p style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: isMobile ? 16 : 18,
                        fontWeight: 300,
                        lineHeight: 1.5,
                        color: COLORS.textSecondary,
                        margin: "0 0 48px 0",
                        textAlign: "center",
                        maxWidth: 520,
                    }}>
                        {subline}
                    </p>
                ) : (
                    <div style={{ height: 48 }} />
                )}

                {/* Video container */}
                <div style={{
                    width: "100%",
                    maxWidth: maxVideoWidth,
                    position: "relative",
                    borderRadius: videoRadius,
                    overflow: "hidden",
                    border: `1px solid rgba(0,0,0,0.08)`,
                    boxShadow: `0 24px 64px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)`,
                    aspectRatio: "16 / 9",
                    backgroundColor: "#0e0a08",
                    cursor: canPlay && !isPlaying ? "pointer" : "default",
                }}
                    onClick={() => { if (canPlay && !isPlaying) setIsPlaying(true) }}
                >
                    {/* Thumbnail + play button */}
                    {(!isPlaying || !canPlay) && (
                        <>
                            {/* Thumbnail image */}
                            {thumbnailImage ? (
                                <img
                                    src={thumbnailImage}
                                    alt=""
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        display: "block",
                                    }}
                                />
                            ) : (
                                // Placeholder when no thumbnail is set
                                <div style={{
                                    width: "100%",
                                    height: "100%",
                                    background: `linear-gradient(135deg, ${hexToRgba(accentColor, 0.15)} 0%, rgba(14,10,8,1) 100%)`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <span style={{
                                        fontFamily: "'Inter Tight', sans-serif",
                                        fontSize: 13,
                                        color: "rgba(255,255,255,0.3)",
                                        letterSpacing: "0.04em",
                                    }}>
                                        Thumbnail hinzufügen
                                    </span>
                                </div>
                            )}

                            {/* Dark overlay for contrast */}
                            <div style={{
                                position: "absolute",
                                inset: 0,
                                background: "rgba(0,0,0,0.25)",
                            }} />

                            {/* Play button */}
                            {canPlay && (
                                <div style={{
                                    position: "absolute",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}>
                                    <div
                                        onMouseEnter={() => setIsHoveringPlay(true)}
                                        onMouseLeave={() => setIsHoveringPlay(false)}
                                        style={{
                                            width: 72,
                                            height: 72,
                                            borderRadius: "50%",
                                            backgroundColor: accentColor,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            boxShadow: `0 8px 32px ${hexToRgba(accentColor, 0.45)}, 0 2px 8px ${hexToRgba(accentColor, 0.25)}`,
                                            transform: isHoveringPlay ? "scale(1.08)" : "scale(1)",
                                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                            paddingLeft: 4, // optical center for play triangle
                                        }}
                                    >
                                        <PlayIcon size={28} />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {/* Active player */}
                    {isPlaying && canPlay && (
                        embed.type === "iframe" ? (
                            <iframe
                                src={embed.src}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    border: "none",
                                }}
                                allow="autoplay; fullscreen; picture-in-picture"
                                allowFullScreen
                            />
                        ) : (
                            <video
                                src={embed.src}
                                autoPlay
                                controls
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                }}
                            />
                        )
                    )}
                </div>

                {/* Fallback text */}
                {fallbackText ? (
                    <p style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: isMobile ? 18 : 22,
                        fontWeight: 400,
                        lineHeight: 1.45,
                        color: COLORS.textSecondary,
                        margin: "40px 0 0 0",
                        textAlign: "center",
                        maxWidth: 600,
                    }}>
                        {parseItalic(fallbackText)}
                    </p>
                ) : null}

            </div>
        </div>
    )
}

VideoSection.defaultProps = {
    eyebrow: "18:00 Uhr",
    headline: "Es ist Sonntag, *18 Uhr.*",
    subline: "Du bist nicht ausgebrannt. Du trägst es nur. Leise. Wieder.",
    videoUrl: "",
    thumbnailImage: "",
    fallbackText: "Das Einzige, was Du wirklich brauchst: kein Konzept, keine Strategie — *ein Gespräch mit jemandem, der Kontext hat.*",
    accentColor: COLORS.brand02,
    background: COLORS.backgroundAlt,
    paddingTop: 96,
    paddingBottom: 96,
}

addPropertyControls(VideoSection, {
    eyebrow: {
        type: ControlType.String,
        title: "Eyebrow",
        defaultValue: "18:00 Uhr",
    },
    headline: {
        type: ControlType.String,
        title: "Headline (*italic*)",
        displayTextArea: true,
        defaultValue: "Es ist Sonntag, *18 Uhr.*",
    },
    subline: {
        type: ControlType.String,
        title: "Subline",
        displayTextArea: true,
        defaultValue: "Du bist nicht ausgebrannt. Du trägst es nur. Leise. Wieder.",
    },
    videoUrl: {
        type: ControlType.String,
        title: "Video URL",
        defaultValue: "",
    },
    thumbnailImage: {
        type: ControlType.Image,
        title: "Thumbnail",
    },
    fallbackText: {
        type: ControlType.String,
        title: "Fallback Text (*italic*)",
        displayTextArea: true,
        defaultValue: "Das Einzige, was Du wirklich brauchst: kein Konzept, keine Strategie — *ein Gespräch mit jemandem, der Kontext hat.*",
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
})
