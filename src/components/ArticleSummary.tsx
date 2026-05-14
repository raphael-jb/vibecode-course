import React from "react"
import { addPropertyControls, ControlType } from "framer"

/**
 * ArticleSummaryClean
 * ───────────────────
 * Hybrid TL;DR-Box: Prose-Block (zitierfähig für LLMs) + Bullet-Liste (scanbar für Menschen).
 * Design: raphaelbaruch-style.md — solid borders only, Inter Display Light, Instrument Serif italic.
 *
 * GEO/SEO: <section aria-label>, <h2>, <p>, <ul>/<li> — vollständig im initialen HTML.
 */

const FONT_IMPORT = "@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Display:wght@300;400&display=swap');"

export default function ArticleSummaryClean(props) {
    const {
        label,
        showProse,
        prose,
        proseFontSize,
        proseLineHeight,
        proseColor,
        proseMaxWidth,
        items,
        accentColor,
        backgroundColor,
        borderColor,
        borderStyle,
        borderWidth,
        borderRadius,
        padding,
        shadowColor,
        shadowX,
        shadowY,
        shadowBlur,
        shadowSpread,
    } = props

    const hasBullets = items && items.length > 0
    const showDivider = showProse && prose && hasBullets
    const borderValue =
        borderStyle === "none" ? "none" : `${borderWidth}px ${borderStyle} ${borderColor}`
    const shadowValue =
        shadowBlur === 0 && shadowSpread === 0
            ? "none"
            : `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`

    return (
        <section
            aria-label={label}
            style={{
                width: "100%",
                height: "100%",
                backgroundColor,
                border: borderValue,
                borderRadius,
                boxShadow: shadowValue,
                padding,
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
                gap: 20,
                fontFamily: "'Inter Display', sans-serif",
                WebkitFontSmoothing: "antialiased",
            }}
        >
            <style>{FONT_IMPORT}</style>

            {/* Prose block — zitierfähige Einheit für LLMs und AI Overviews */}
            {showProse && prose && (
                <p style={{
                    fontSize: proseFontSize,
                    fontWeight: 300,
                    lineHeight: proseLineHeight,
                    color: proseColor,
                    maxWidth: proseMaxWidth,
                    margin: 0,
                }}>
                    {prose}
                </p>
            )}

            {/* Divider zwischen Prose und Bullets */}
            {showDivider && (
                <div style={{ height: 1, backgroundColor: "#E5E5E5" }} />
            )}

            {/* Key points — semantische Liste für strukturiertes Scannen */}
            {hasBullets && (
                <ul style={{
                    margin: 0,
                    padding: 0,
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                }}>
                    {items.map((item, i) => (
                        <li
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 14,
                            }}
                        >
                            <span style={{
                                flexShrink: 0,
                                width: 5,
                                height: 5,
                                borderRadius: "50%",
                                backgroundColor: accentColor,
                                marginTop: 8,
                            }} />
                            <span style={{
                                fontSize: 15,
                                fontWeight: 300,
                                lineHeight: 1.55,
                                color: "#767676",
                            }}>
                                {item.text}
                            </span>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    )
}

ArticleSummaryClean.defaultProps = {
    label: "Zusammenfassung",
    showProse: true,
    prose: "Klarheit entsteht nicht durch mehr Information, sondern durch das Aussprechen der richtigen Spannung. Wer einen externen Resonanzraum nutzt, beschleunigt nicht die Entscheidung – sondern den Weg zur eigenen Urteilskraft.",
    proseFontSize: 16,
    proseLineHeight: 1.65,
    proseColor: "#000000",
    proseMaxWidth: "100%",
    items: [
        { text: "Die meisten Entscheidungsprobleme sind in Wirklichkeit Haltungsprobleme." },
        { text: "Ein externer Gesprächspartner hilft nicht durch Antworten, sondern durch das Halten des Raums." },
        { text: "Klarheit entsteht laut, unfertig und ohne sofortiges Urteil – nicht im Stillen." },
    ],
    accentColor: "#FF6403",
    backgroundColor: "#FCF8F1",
    borderColor: "#E5E5E5",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 16,
    padding: 32,
    shadowColor: "rgba(0,0,0,0.08)",
    shadowX: 0,
    shadowY: 4,
    shadowBlur: 16,
    shadowSpread: 0,
}

addPropertyControls(ArticleSummaryClean, {
    label: {
        type: ControlType.String,
        title: "Label",
        defaultValue: "Zusammenfassung",
    },
    showProse: {
        type: ControlType.Boolean,
        title: "Prosa-Block",
        defaultValue: true,
    },
    prose: {
        type: ControlType.String,
        title: "Prosa",
        displayTextArea: true,
        defaultValue: "Klarheit entsteht nicht durch mehr Information, sondern durch das Aussprechen der richtigen Spannung.",
        hidden: (props) => !props.showProse,
    },
    proseFontSize: {
        type: ControlType.Number,
        title: "Prosa Größe",
        defaultValue: 16,
        min: 12,
        max: 30,
        step: 1,
        hidden: (props) => !props.showProse,
    },
    proseLineHeight: {
        type: ControlType.Number,
        title: "Prosa Zeile",
        defaultValue: 1.65,
        min: 1,
        max: 2.4,
        step: 0.05,
        hidden: (props) => !props.showProse,
    },
    proseColor: {
        type: ControlType.Color,
        title: "Prosa Farbe",
        defaultValue: "#000000",
        hidden: (props) => !props.showProse,
    },
    proseMaxWidth: {
        type: ControlType.String,
        title: "Prosa Breite",
        defaultValue: "100%",
        placeholder: "100%, 640px, 42rem",
        hidden: (props) => !props.showProse,
    },
    items: {
        type: ControlType.Array,
        title: "Kernpunkte",
        control: {
            type: ControlType.Object,
            controls: {
                text: {
                    type: ControlType.String,
                    title: "Punkt",
                    displayTextArea: true,
                },
            },
        },
    },
    accentColor: {
        type: ControlType.Color,
        title: "Akzentfarbe",
        defaultValue: "#FF6403",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Hintergrund",
        defaultValue: "#FCF8F1",
    },
    borderStyle: {
        type: ControlType.Enum,
        title: "Rahmen",
        options: ["solid", "dashed", "none"],
        optionTitles: ["Durchgezogen", "Gestrichelt", "Keiner"],
        defaultValue: "solid",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Rahmenfarbe",
        defaultValue: "#E5E5E5",
        hidden: (props) => props.borderStyle === "none",
    },
    borderWidth: {
        type: ControlType.Number,
        title: "Rahmenbreite",
        defaultValue: 1,
        min: 0,
        max: 8,
        step: 1,
        hidden: (props) => props.borderStyle === "none",
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Radius",
        defaultValue: 16,
        min: 0,
        max: 48,
    },
    padding: {
        type: ControlType.Number,
        title: "Padding",
        defaultValue: 32,
        min: 16,
        max: 80,
    },
    shadowColor: {
        type: ControlType.Color,
        title: "Schattenfarbe",
        defaultValue: "rgba(0,0,0,0.08)",
    },
    shadowX: {
        type: ControlType.Number,
        title: "Schatten X",
        defaultValue: 0,
        min: -80,
        max: 80,
        step: 1,
    },
    shadowY: {
        type: ControlType.Number,
        title: "Schatten Y",
        defaultValue: 4,
        min: -80,
        max: 80,
        step: 1,
    },
    shadowBlur: {
        type: ControlType.Number,
        title: "Schatten Blur",
        defaultValue: 16,
        min: 0,
        max: 120,
        step: 1,
    },
    shadowSpread: {
        type: ControlType.Number,
        title: "Schatten Spread",
        defaultValue: 0,
        min: -40,
        max: 80,
        step: 1,
    },
})
