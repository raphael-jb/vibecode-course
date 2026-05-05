import React, { useEffect, useState } from "react"
import { addPropertyControls, ControlType, motion, RenderTarget } from "framer"

const COLORS = {
    brand01: "#9C73FF",
    brand02: "#FF6403",
    brand03: "#FFC857",
    brand06: "#00A8E8",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
    border: "rgba(0,0,0,0.08)",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500&display=swap');`
const UTILITY_FONT = "'Inter Display', 'Inter', sans-serif"

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

function splitLines(text: string) {
    return (text || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
}

function FormatCard({ item, index, isMobile, headerHeight, expandableDesktop, defaultOpen }) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const accentColor = item.accentColor || COLORS.brand01
    const hasExpandableContent = item.whatHappens || item.takeaway || item.ctaText
    const isExpandable = isMobile || expandableDesktop
    const detailOpen = isExpandable ? isOpen : true

    return (
        <motion.article
            layout
            whileHover={!isMobile ? { y: -4 } : undefined}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={{
                display: "flex",
                flexDirection: "column",
                minHeight: isMobile || expandableDesktop ? "auto" : 620,
                borderRadius: 15,
                border: `1px solid ${hexToRgba(accentColor, 0.28)}`,
                backgroundColor: "#FFFFFF",
                boxShadow: `0 18px 60px ${hexToRgba(accentColor, 0.08)}, 0 2px 10px rgba(0,0,0,0.03)`,
                overflow: "hidden",
            }}
        >
            <div style={{
                height: isMobile ? "auto" : headerHeight,
                minHeight: isMobile ? 190 : headerHeight,
                padding: 28,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: 24,
                backgroundColor: item.tintColor || hexToRgba(accentColor, 0.08),
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 20 }}>
                    <span style={{
                        fontFamily: UTILITY_FONT,
                        fontSize: 12,
                        fontWeight: 500,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: accentColor,
                    }}>
                        {item.eyebrow || `0${index + 1}`}
                    </span>

                    {item.visual ? (
                        <img
                            src={item.visual}
                            alt=""
                            style={{
                                width: 52,
                                height: 52,
                                objectFit: "contain",
                                flexShrink: 0,
                            }}
                        />
                    ) : (
                        <div style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            backgroundColor: accentColor,
                            opacity: 0.9,
                            flexShrink: 0,
                        }} />
                    )}
                </div>

                <div>
                    <h3 style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: isMobile ? 34 : 36,
                        fontWeight: 400,
                        lineHeight: 1.0,
                        color: COLORS.textPrimary,
                        margin: "0 0 14px 0",
                    }}>
                        {parseItalic(item.title)}
                    </h3>
                    <p style={{
                        fontFamily: UTILITY_FONT,
                        fontSize: 16,
                        fontWeight: 300,
                        lineHeight: 1.5,
                        color: COLORS.textSecondary,
                        margin: 0,
                    }}>
                        {item.positioning}
                    </p>
                </div>
            </div>

            <div style={{
                padding: 28,
                display: "flex",
                flexDirection: "column",
                gap: 22,
                flex: 1,
            }}>
                <InfoBlock label={item.bestForLabel || "Passt, wenn"} body={item.bestFor} accentColor={accentColor} />

                {isExpandable && hasExpandableContent ? (
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                            width: "100%",
                            padding: "14px 16px",
                            borderRadius: 9999,
                            border: `1px solid ${COLORS.border}`,
                            backgroundColor: COLORS.backgroundAlt,
                            color: COLORS.textPrimary,
                            fontFamily: UTILITY_FONT,
                            fontSize: 14,
                            fontWeight: 400,
                            cursor: "pointer",
                        }}
                    >
                        <span>{isOpen ? item.closeLabel || "Weniger anzeigen" : item.openLabel || "Mehr anzeigen"}</span>
                        <span style={{ color: accentColor }}>{isOpen ? "−" : "+"}</span>
                    </button>
                ) : null}

                {detailOpen ? (
                    <motion.div
                        initial={isExpandable ? { opacity: 0, height: 0 } : false}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={isExpandable ? { opacity: 0, height: 0 } : undefined}
                        style={{ display: "flex", flexDirection: "column", gap: 22 }}
                    >
                        <InfoBlock label={item.whatHappensLabel || "Was passiert"} body={item.whatHappens} accentColor={accentColor} />
                        <InfoBlock label={item.takeawayLabel || "Du gehst raus mit"} body={item.takeaway} accentColor={accentColor} />

                        {item.ctaText ? (
                            <a
                                href={item.ctaLink}
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    alignSelf: "flex-start",
                                    minHeight: 48,
                                    padding: "13px 22px",
                                    marginTop: "auto",
                                    borderRadius: 9999,
                                    backgroundColor: accentColor,
                                    color: "#FFFFFF",
                                    fontFamily: UTILITY_FONT,
                                    fontSize: 14,
                                    fontWeight: 500,
                                    textDecoration: "none",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {item.ctaText}
                            </a>
                        ) : null}
                    </motion.div>
                ) : null}
            </div>
        </motion.article>
    )
}

function InfoBlock({ label, body, accentColor }) {
    const lines = splitLines(body)
    if (!lines.length) return null

    return (
        <div>
            <div style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 8,
            }}>
                <div style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: accentColor,
                    flexShrink: 0,
                }} />
                <span style={{
                    fontFamily: UTILITY_FONT,
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: COLORS.textSecondary,
                }}>
                    {label}
                </span>
            </div>

            {lines.length === 1 ? (
                <p style={{
                    fontFamily: UTILITY_FONT,
                    fontSize: 15,
                    fontWeight: 300,
                    lineHeight: 1.5,
                    color: COLORS.textSecondary,
                    margin: 0,
                }}>
                    {lines[0]}
                </p>
            ) : (
                <ul style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                    padding: 0,
                    margin: 0,
                    listStyle: "none",
                }}>
                    {lines.map((line, i) => (
                        <li key={i} style={{
                            display: "flex",
                            gap: 9,
                            fontFamily: UTILITY_FONT,
                            fontSize: 15,
                            fontWeight: 300,
                            lineHeight: 1.45,
                            color: COLORS.textSecondary,
                        }}>
                            <span style={{ color: accentColor, flexShrink: 0 }}>•</span>
                            <span>{line}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default function FormatGallery(props) {
    const {
        eyebrow,
        headline,
        subline,
        items,
        background,
        accentColor,
        paddingTop,
        paddingBottom,
        headerHeight,
        expandableDesktop,
        defaultOpen,
    } = props

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (isCanvas) return
        const check = () => setIsMobile(window.innerWidth < 900)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    const hPad = isMobile ? 24 : 80

    return (
        <section style={{
            width: "100%",
            backgroundColor: background,
            paddingTop,
            paddingBottom,
            paddingLeft: hPad,
            paddingRight: hPad,
            boxSizing: "border-box",
        }}>
            <style>{FONT_IMPORT}</style>

            <div style={{ maxWidth: 1180, margin: "0 auto" }}>
                <div style={{ maxWidth: 760, marginBottom: isMobile ? 40 : 56 }}>
                    {eyebrow ? (
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            marginBottom: 24,
                        }}>
                            <div style={{
                                width: 8,
                                height: 8,
                                borderRadius: "50%",
                                backgroundColor: accentColor,
                                flexShrink: 0,
                            }} />
                            <span style={{
                                fontFamily: UTILITY_FONT,
                                fontSize: 13,
                                fontWeight: 500,
                                letterSpacing: "0.04em",
                                color: accentColor,
                            }}>
                                {eyebrow}
                            </span>
                        </div>
                    ) : null}

                    <h2 style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: isMobile ? 38 : 56,
                        fontWeight: 400,
                        lineHeight: 1.0,
                        color: COLORS.textPrimary,
                        margin: "0 0 22px 0",
                    }}>
                        {parseItalic(headline)}
                    </h2>

                    {subline ? (
                        <p style={{
                            fontFamily: UTILITY_FONT,
                            fontSize: isMobile ? 16 : 19,
                            fontWeight: 300,
                            lineHeight: 1.55,
                            color: COLORS.textSecondary,
                            margin: 0,
                            maxWidth: 660,
                        }}>
                            {subline}
                        </p>
                    ) : null}
                </div>

                <div style={{
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
                    gap: 24,
                    alignItems: "stretch",
                }}>
                    {(items || []).map((item, i) => (
                        <FormatCard
                            key={i}
                            item={item}
                            index={i}
                            isMobile={isMobile}
                            headerHeight={headerHeight}
                            expandableDesktop={expandableDesktop}
                            defaultOpen={defaultOpen}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

const DEFAULT_ITEMS = [
    {
        eyebrow: "01 / Peer Sparring",
        title: "Peer *Sparring*",
        positioning: "Dein fester Denkraum für laufende Führungsfragen.",
        bestFor: "Du willst Entscheidungen, Spannungen und Gedanken regelmäßig sortieren, ohne jedes Mal bei null anzufangen.",
        whatHappens: "Wiederkehrende 1:1-Sessions\nDu bringst mit, was gerade Energie bindet\nWir sortieren, spiegeln und schärfen",
        takeaway: "Mehr innere Linie\nBessere Entscheidungen\nWeniger mentales Alleintragen",
        accentColor: COLORS.brand01,
        tintColor: "rgba(156, 115, 255, 0.08)",
        visual: "",
        ctaText: "",
        ctaLink: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    },
    {
        eyebrow: "02 / Clarity Streaming",
        title: "Clarity *Streaming*",
        positioning: "Für ein konkretes Thema, das mehr als einen Impuls braucht.",
        bestFor: "Du stehst vor einer Entscheidung oder Frage, die zu viel Gewicht hat, um sie zwischen Meetings mitzudenken.",
        whatHappens: "Mehrere fokussierte Sessions mit rotem Faden\nWir bleiben an einem Thema, bis es wirklich klar wird\nZwischen den Gesprächen darf die Erkenntnis arbeiten",
        takeaway: "Eine belastbare Entscheidungslogik\nKlarheit über Optionen und Konsequenzen\nEin nächster Schritt, der sich stimmig anfühlt",
        accentColor: COLORS.brand06,
        tintColor: "rgba(0, 168, 232, 0.08)",
        visual: "",
        ctaText: "",
        ctaLink: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    },
    {
        eyebrow: "03 / Transformation Teaming",
        title: "Transformation *Teaming*",
        positioning: "Wenn nicht nur Du, sondern Dein Führungssystem neue Ausrichtung braucht.",
        bestFor: "Rollen, Erwartungen, Konflikte oder Veränderung sind nicht mehr sauber in einer Person zu lösen.",
        whatHappens: "Sparring mit Dir und Deinem Führungsteam\nGemeinsame Sprache für das, was wirklich los ist\nStruktur, Rhythmus und Nachhalten über Zeit",
        takeaway: "Geteilte Orientierung\nKlarere Verantwortlichkeiten\nEin Team, das wieder aus derselben Richtung führt",
        accentColor: COLORS.brand03,
        tintColor: "rgba(255, 200, 87, 0.12)",
        visual: "",
        ctaText: "",
        ctaLink: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    },
]

FormatGallery.defaultProps = {
    eyebrow: "Formate",
    headline: "Drei Formate. *Ein Prinzip:* Dein Fall führt.",
    subline: "Manchmal reicht ein einzelnes Gespräch. Manchmal braucht Klarheit Rhythmus. Und manchmal muss nicht nur eine Person, sondern ein Führungsteam neu ausgerichtet werden.",
    background: COLORS.backgroundAlt,
    accentColor: COLORS.brand02,
    paddingTop: 96,
    paddingBottom: 96,
    headerHeight: 300,
    expandableDesktop: true,
    defaultOpen: false,
    items: DEFAULT_ITEMS,
}

addPropertyControls(FormatGallery, {
    eyebrow: { type: ControlType.String, title: "Eyebrow", defaultValue: "Formate" },
    headline: { type: ControlType.String, title: "Headline (*italic*)", displayTextArea: true, defaultValue: "Drei Formate. *Ein Prinzip:* Dein Fall führt." },
    subline: { type: ControlType.String, title: "Subline", displayTextArea: true, defaultValue: "Manchmal reicht ein einzelnes Gespräch. Manchmal braucht Klarheit Rhythmus. Und manchmal muss nicht nur eine Person, sondern ein Führungsteam neu ausgerichtet werden." },
    background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.backgroundAlt },
    accentColor: { type: ControlType.Color, title: "Accent Color", defaultValue: COLORS.brand02 },
    paddingTop: { type: ControlType.Number, title: "Padding Top", defaultValue: 96, min: 0, max: 220, step: 8 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", defaultValue: 96, min: 0, max: 220, step: 8 },
    headerHeight: { type: ControlType.Number, title: "Header Height", defaultValue: 300, min: 190, max: 420, step: 10 },
    expandableDesktop: { type: ControlType.Boolean, title: "Desktop Fold", defaultValue: true },
    defaultOpen: { type: ControlType.Boolean, title: "Default Open", defaultValue: false },
    items: {
        type: ControlType.Array,
        title: "Formats",
        control: {
            type: ControlType.Object,
            controls: {
                eyebrow: { type: ControlType.String, title: "Eyebrow", defaultValue: "01 / Format" },
                title: { type: ControlType.String, title: "Title (*italic*)", defaultValue: "Format *Name*" },
                positioning: { type: ControlType.String, title: "Positioning", displayTextArea: true, defaultValue: "Kurze Einordnung." },
                bestForLabel: { type: ControlType.String, title: "Best For Label", defaultValue: "Passt, wenn" },
                bestFor: { type: ControlType.String, title: "Best For", displayTextArea: true, defaultValue: "Wann dieses Format passt." },
                whatHappensLabel: { type: ControlType.String, title: "Happens Label", defaultValue: "Was passiert" },
                whatHappens: { type: ControlType.String, title: "What Happens", displayTextArea: true, defaultValue: "Ein Punkt pro Zeile." },
                takeawayLabel: { type: ControlType.String, title: "Takeaway Label", defaultValue: "Du gehst raus mit" },
                takeaway: { type: ControlType.String, title: "Takeaway", displayTextArea: true, defaultValue: "Ein Punkt pro Zeile." },
                visual: { type: ControlType.Image, title: "Visual / Icon" },
                accentColor: { type: ControlType.Color, title: "Accent", defaultValue: COLORS.brand01 },
                tintColor: { type: ControlType.Color, title: "Tint", defaultValue: "rgba(156, 115, 255, 0.08)" },
                ctaText: { type: ControlType.String, title: "CTA Text", defaultValue: "" },
                ctaLink: { type: ControlType.String, title: "CTA Link", defaultValue: "https://calendar.app.google/TxnYmbFXwquFFQKK9" },
                openLabel: { type: ControlType.String, title: "Open Label", defaultValue: "Mehr anzeigen" },
                closeLabel: { type: ControlType.String, title: "Close Label", defaultValue: "Weniger anzeigen" },
            },
        },
        defaultValue: DEFAULT_ITEMS,
        maxCount: 3,
    },
})
