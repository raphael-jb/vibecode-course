import React from "react"
import { addPropertyControls, ControlType } from "framer"

const COLORS = {
    cream: "#FCF8F1",
    orange: "#FF6403",
    navy: "#0E2616",
    white: "#FFFFFF",
    muted: "#767676",
    border: "rgba(14, 38, 22, 0.14)",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Display:wght@300;400;500;600&display=swap');`

export default function KontaktThoughtCards(props) {
    const {
        cards,
        background,
        accentColor,
        cardBackground,
        textColor,
        paddingTop,
        paddingBottom,
        paddingX,
        cardHeight,
        cardMinWidth,
        cardFontSize,
        showGlow,
    } = props

    const safeCards = Array.isArray(cards) ? cards : []
    const glow = showGlow ? `0 18px 60px ${accentColor}1F, 0 2px 10px rgba(0,0,0,0.03)` : "none"

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
                overflow: "hidden",
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
                    gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${cardMinWidth}px), 1fr))`,
                    gap: 18,
                }}
            >
                {safeCards.map((card, i) => (
                    <article
                        key={i}
                        style={{
                            minHeight: cardHeight,
                            minWidth: 0,
                            backgroundColor: card.background || cardBackground,
                            border: `1px solid ${card.accentColor || accentColor}66`,
                            borderRadius: 15,
                            padding: 28,
                            boxShadow: glow,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            boxSizing: "border-box",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                            }}
                        >
                            {card.icon ? (
                                <span
                                    style={{
                                        color: card.accentColor || accentColor,
                                        fontSize: 18,
                                        lineHeight: 1,
                                    }}
                                >
                                    {card.icon}
                                </span>
                            ) : null}
                            <span
                                style={{
                                    color: COLORS.muted,
                                    fontSize: 12,
                                    fontWeight: 300,
                                    letterSpacing: "0.08em",
                                    textTransform: "uppercase",
                                }}
                            >
                                {card.label}
                            </span>
                        </div>

                        <div>
                            <h2
                                style={{
                                    margin: "0 0 16px 0",
                                    color: COLORS.navy,
                                    fontFamily: "'Instrument Serif', Georgia, serif",
                                    fontSize: 38,
                                    fontWeight: 400,
                                    lineHeight: 1.02,
                                }}
                            >
                                {card.title}
                            </h2>
                            <p
                                style={{
                                    margin: 0,
                                    color: textColor,
                                    fontFamily: "'Inter Display', Inter, sans-serif",
                                    fontSize: cardFontSize,
                                    fontWeight: 300,
                                    lineHeight: 1.35,
                                }}
                            >
                                {card.text}
                            </p>
                        </div>

                        <a
                            href={card.href}
                            style={{
                                width: "fit-content",
                                marginTop: 28,
                                color: COLORS.navy,
                                fontSize: 15,
                                fontWeight: 500,
                                textDecoration: "none",
                            }}
                        >
                            {card.cta} <span style={{ color: card.accentColor || accentColor }}>→</span>
                        </a>
                    </article>
                ))}
            </div>
        </section>
    )
}

const DEFAULT_CARDS = [
    {
        label: "Konkreter Case",
        icon: "→",
        title: "Erstgespräch",
        text: "Für Sparring-Anfragen, konkrete Entscheidungssituationen oder die Frage, ob dieses Format zu Dir passt.",
        cta: "Termin auswählen",
        href: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
        accentColor: COLORS.orange,
        background: COLORS.white,
    },
    {
        label: "Direkter Kontakt",
        icon: "↗",
        title: "Nachricht",
        text: "Für Fragen, Presse, Kooperationen oder wenn Du vor einem Termin erst etwas Kontext teilen möchtest.",
        cta: "E-Mail schreiben",
        href: "mailto:rb@raphaelbaruch.com",
        accentColor: COLORS.orange,
        background: COLORS.white,
    },
]

KontaktThoughtCards.defaultProps = {
    cards: DEFAULT_CARDS,
    background: COLORS.cream,
    accentColor: COLORS.orange,
    cardBackground: COLORS.white,
    textColor: COLORS.navy,
    paddingTop: 0,
    paddingBottom: 80,
    paddingX: 40,
    cardHeight: 285,
    cardMinWidth: 320,
    cardFontSize: 25,
    showGlow: true,
}

addPropertyControls(KontaktThoughtCards, {
    background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.cream },
    accentColor: { type: ControlType.Color, title: "Accent", defaultValue: COLORS.orange },
    cardBackground: { type: ControlType.Color, title: "Card BG", defaultValue: COLORS.white },
    textColor: { type: ControlType.Color, title: "Text Color", defaultValue: COLORS.navy },
    paddingTop: { type: ControlType.Number, title: "Padding Top", defaultValue: 0, min: 0, max: 240, step: 8 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", defaultValue: 80, min: 0, max: 240, step: 8 },
    paddingX: { type: ControlType.Number, title: "Padding X", defaultValue: 40, min: 16, max: 120, step: 4 },
    cardHeight: { type: ControlType.Number, title: "Card Height", defaultValue: 285, min: 220, max: 520, step: 8 },
    cardMinWidth: { type: ControlType.Number, title: "Card Min Width", defaultValue: 320, min: 240, max: 520, step: 8 },
    cardFontSize: { type: ControlType.Number, title: "Text Size", defaultValue: 25, min: 16, max: 42, step: 1 },
    showGlow: { type: ControlType.Boolean, title: "Glow", defaultValue: true },
    cards: {
        type: ControlType.Array,
        title: "Cards",
        control: {
            type: ControlType.Object,
            controls: {
                label: { type: ControlType.String, title: "Label", defaultValue: "Konkreter Case" },
                icon: { type: ControlType.String, title: "Icon", defaultValue: "→" },
                title: { type: ControlType.String, title: "Title", defaultValue: "Erstgespräch" },
                text: { type: ControlType.String, title: "Text", displayTextArea: true, defaultValue: "Kurzer Kontakttext." },
                cta: { type: ControlType.String, title: "CTA", defaultValue: "Termin auswählen" },
                href: { type: ControlType.String, title: "Link", defaultValue: "https://calendar.app.google/TxnYmbFXwquFFQKK9" },
                accentColor: { type: ControlType.Color, title: "Accent", defaultValue: COLORS.orange },
                background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.white },
            },
        },
        defaultValue: DEFAULT_CARDS,
        maxCount: 3,
    },
})
