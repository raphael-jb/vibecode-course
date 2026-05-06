import React from "react"
import { addPropertyControls, ControlType } from "framer"

const COLORS = {
    cream: "#FCF8F1",
    orange: "#FF6403",
    navy: "#0E2616",
    white: "#FFFFFF",
    muted: "rgba(14, 38, 22, 0.64)",
    border: "rgba(14, 38, 22, 0.14)",
    soft: "rgba(14, 38, 22, 0.08)",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Display:wght@300;400;500;600&display=swap');`

function parseItalic(text: string) {
    return (text || "").split("*").map((part, i) => (
        <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>
            {part}
        </span>
    ))
}

function letterFor(index: number) {
    return String.fromCharCode(65 + index)
}

export default function KontaktPromptList(props) {
    const {
        headline,
        prompts,
        markerMode,
        background,
        accentColor,
        paddingTop,
        paddingBottom,
        paddingX,
        circleBackground,
    } = props

    const safePrompts = Array.isArray(prompts) ? prompts : []

    return (
        <section
            style={{
                width: "100%",
                backgroundColor: background,
                boxSizing: "border-box",
                paddingTop,
                paddingBottom,
                paddingLeft: paddingX,
                paddingRight: paddingX,
                fontFamily: "'Inter Display', Inter, sans-serif",
                WebkitFontSmoothing: "antialiased",
            }}
        >
            <style>{FONT_IMPORT}</style>
            <div
                style={{
                    width: "100%",
                    maxWidth: 1120,
                    margin: "0 auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
                    gap: 56,
                    alignItems: "start",
                }}
            >
                <h2
                    style={{
                        margin: 0,
                        color: COLORS.navy,
                        fontFamily: "'Instrument Serif', Georgia, serif",
                        fontSize: "clamp(38px, 4.6vw, 58px)",
                        fontWeight: 400,
                        lineHeight: 1,
                    }}
                >
                    {parseItalic(headline)}
                </h2>

                <div style={{ display: "grid", gap: 0 }}>
                    {safePrompts.map((item, i) => {
                        const itemAccent = item.accentColor || accentColor
                        const markerText =
                            markerMode === "letters"
                                ? letterFor(i)
                                : markerMode === "custom"
                                  ? item.marker || `0${i + 1}`
                                  : `0${i + 1}`

                        return (
                            <div
                                key={i}
                                style={{
                                    display: "grid",
                                    gridTemplateColumns: "42px minmax(0, 1fr)",
                                    gap: 16,
                                    alignItems: "start",
                                    paddingTop: 18,
                                    paddingBottom: 18,
                                    borderBottom: i < safePrompts.length - 1 ? `1px solid ${COLORS.soft}` : "none",
                                }}
                            >
                                <span
                                    style={{
                                        width: 42,
                                        height: 42,
                                        display: "inline-flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        borderRadius: 999,
                                        backgroundColor: circleBackground,
                                        border: `1px solid ${itemAccent}`,
                                        color: itemAccent,
                                        fontSize: markerMode === "icons" ? 0 : 13,
                                        fontWeight: 600,
                                        overflow: "hidden",
                                    }}
                                >
                                    {markerMode === "icons" && item.icon ? (
                                        <img
                                            src={item.icon}
                                            alt=""
                                            style={{
                                                width: "58%",
                                                height: "58%",
                                                objectFit: item.iconFit || "contain",
                                                objectPosition: `${(item.iconFocalPoint?.x ?? 0.5) * 100}% ${(item.iconFocalPoint?.y ?? 0.5) * 100}%`,
                                            }}
                                        />
                                    ) : (
                                        markerText
                                    )}
                                </span>
                                <p
                                    style={{
                                        margin: 0,
                                        paddingTop: 7,
                                        color: COLORS.navy,
                                        fontSize: 18,
                                        fontWeight: 300,
                                        lineHeight: 1.38,
                                    }}
                                >
                                    {item.text}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

const DEFAULT_PROMPTS = [
    { text: "Was liegt gerade bei Dir?", marker: "A", icon: "", accentColor: COLORS.orange },
    { text: "Was soll sich klären?", marker: "B", icon: "", accentColor: COLORS.orange },
    { text: "Was wäre ein gutes erstes Ergebnis?", marker: "C", icon: "", accentColor: COLORS.orange },
]

KontaktPromptList.defaultProps = {
    headline: "Du musst es nicht *perfekt* formulieren.",
    prompts: DEFAULT_PROMPTS,
    markerMode: "numbers",
    background: COLORS.white,
    accentColor: COLORS.orange,
    circleBackground: COLORS.cream,
    paddingTop: 88,
    paddingBottom: 88,
    paddingX: 40,
}

addPropertyControls(KontaktPromptList, {
    headline: { type: ControlType.String, title: "Headline (*italic*)", displayTextArea: true, defaultValue: KontaktPromptList.defaultProps.headline },
    markerMode: {
        type: ControlType.Enum,
        title: "Marker",
        options: ["numbers", "letters", "custom", "icons"],
        optionTitles: ["Numbers", "Letters", "Custom", "Icons"],
        defaultValue: "numbers",
    },
    background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.white },
    accentColor: { type: ControlType.Color, title: "Accent", defaultValue: COLORS.orange },
    circleBackground: { type: ControlType.Color, title: "Circle BG", defaultValue: COLORS.cream },
    paddingTop: { type: ControlType.Number, title: "Padding Top", defaultValue: 88, min: 0, max: 240, step: 8 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", defaultValue: 88, min: 0, max: 240, step: 8 },
    paddingX: { type: ControlType.Number, title: "Padding X", defaultValue: 40, min: 16, max: 120, step: 4 },
    prompts: {
        type: ControlType.Array,
        title: "Items",
        control: {
            type: ControlType.Object,
            controls: {
                text: { type: ControlType.String, title: "Text", defaultValue: "Was liegt gerade bei Dir?" },
                marker: { type: ControlType.String, title: "Custom Marker", defaultValue: "A" },
                icon: { type: ControlType.Image, title: "Icon" },
                iconFit: {
                    type: ControlType.Enum,
                    title: "Icon Fit",
                    options: ["contain", "cover", "fill", "scale-down"],
                    optionTitles: ["Contain", "Cover", "Fill", "Scale Down"],
                    defaultValue: "contain",
                    hidden: (p) => !p.icon,
                },
                iconFocalPoint: {
                    type: ControlType.FusedNumber,
                    title: "Icon Position",
                    defaultValue: { x: 0.5, y: 0.5 },
                    hidden: (p) => !p.icon,
                },
                accentColor: { type: ControlType.Color, title: "Highlight", defaultValue: COLORS.orange },
            },
        },
        defaultValue: DEFAULT_PROMPTS,
        maxCount: 5,
    },
})
