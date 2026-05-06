import React from "react"
import { addPropertyControls, ControlType } from "framer"

const COLORS = {
    cream: "#FCF8F1",
    orange: "#FF6403",
    navy: "#0E2616",
    white: "#FFFFFF",
    muted: "rgba(14, 38, 22, 0.64)",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Display:wght@300;400;500;600&display=swap');`

function parseItalic(text: string) {
    return (text || "").split("*").map((part, i) => (
        <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>
            {part}
        </span>
    ))
}

export default function KontaktFAQCards(props) {
    const {
        headline,
        faqs,
        background,
        cardBackground,
        accentColor,
        paddingTop,
        paddingBottom,
        paddingX,
        cardHeight,
        showGlow,
    } = props

    const safeFaqs = Array.isArray(faqs) ? faqs : []
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
                fontFamily: "'Inter Display', Inter, sans-serif",
                WebkitFontSmoothing: "antialiased",
                overflow: "hidden",
            }}
        >
            <style>{FONT_IMPORT}</style>
            <div style={{ width: "100%", maxWidth: 1120, margin: "0 auto" }}>
                {headline ? (
                    <h2
                        style={{
                            margin: "0 0 38px 0",
                            color: COLORS.navy,
                            fontFamily: "'Instrument Serif', Georgia, serif",
                            fontSize: "clamp(38px, 4.6vw, 58px)",
                            fontWeight: 400,
                            lineHeight: 1,
                        }}
                    >
                        {parseItalic(headline)}
                    </h2>
                ) : null}

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                        gap: 18,
                    }}
                >
                    {safeFaqs.map((item, i) => {
                        const itemAccent = item.accentColor || accentColor
                        return (
                            <article
                                key={i}
                                style={{
                                    minHeight: cardHeight,
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                    gap: 28,
                                    padding: 28,
                                    borderRadius: 15,
                                    border: `1px solid ${itemAccent}66`,
                                    backgroundColor: item.background || cardBackground,
                                    boxShadow: showGlow ? `0 18px 60px ${itemAccent}1F, 0 2px 10px rgba(0,0,0,0.03)` : glow,
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
                                    <span
                                        style={{
                                            width: 8,
                                            height: 8,
                                            borderRadius: 999,
                                            backgroundColor: itemAccent,
                                            flexShrink: 0,
                                        }}
                                    />
                                    <span
                                        style={{
                                            color: COLORS.muted,
                                            fontSize: 12,
                                            fontWeight: 300,
                                            letterSpacing: "0.08em",
                                            textTransform: "uppercase",
                                        }}
                                    >
                                        {item.label || `Frage 0${i + 1}`}
                                    </span>
                                </div>

                                <div>
                                    <h3
                                        style={{
                                            margin: "0 0 18px 0",
                                            color: COLORS.navy,
                                            fontFamily: "'Instrument Serif', Georgia, serif",
                                            fontSize: 31,
                                            fontWeight: 400,
                                            lineHeight: 1.08,
                                        }}
                                    >
                                        {item.question}
                                    </h3>
                                    <p
                                        style={{
                                            margin: 0,
                                            color: COLORS.muted,
                                            fontSize: 16,
                                            fontWeight: 300,
                                            lineHeight: 1.55,
                                        }}
                                    >
                                        {item.answer}
                                    </p>
                                </div>
                            </article>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

const DEFAULT_FAQS = [
    {
        label: "Frage 01",
        question: "Kostet das erste Gespräch etwas?",
        answer: "Nein. Das erste Gespräch ist kostenlos und unverbindlich.",
        accentColor: COLORS.orange,
        background: COLORS.white,
    },
    {
        label: "Frage 02",
        question: "Muss ich mich vorbereiten?",
        answer: "Nein. Bring mit, was gerade bei Dir liegt. Ein paar Sätze reichen.",
        accentColor: COLORS.orange,
        background: COLORS.white,
    },
    {
        label: "Frage 03",
        question: "Wie schnell meldest Du Dich?",
        answer: "Persönlich, in der Regel innerhalb von 1-2 Werktagen.",
        accentColor: COLORS.orange,
        background: COLORS.white,
    },
]

KontaktFAQCards.defaultProps = {
    headline: "Kurze *Fragen.*",
    faqs: DEFAULT_FAQS,
    background: COLORS.cream,
    cardBackground: COLORS.white,
    accentColor: COLORS.orange,
    paddingTop: 88,
    paddingBottom: 112,
    paddingX: 40,
    cardHeight: 260,
    showGlow: true,
}

addPropertyControls(KontaktFAQCards, {
    headline: { type: ControlType.String, title: "Headline (*italic*)", displayTextArea: true, defaultValue: "Kurze *Fragen.*" },
    background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.cream },
    cardBackground: { type: ControlType.Color, title: "Card BG", defaultValue: COLORS.white },
    accentColor: { type: ControlType.Color, title: "Accent", defaultValue: COLORS.orange },
    paddingTop: { type: ControlType.Number, title: "Padding Top", defaultValue: 88, min: 0, max: 240, step: 8 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", defaultValue: 112, min: 0, max: 240, step: 8 },
    paddingX: { type: ControlType.Number, title: "Padding X", defaultValue: 40, min: 16, max: 120, step: 4 },
    cardHeight: { type: ControlType.Number, title: "Card Height", defaultValue: 260, min: 200, max: 460, step: 8 },
    showGlow: { type: ControlType.Boolean, title: "Glow", defaultValue: true },
    faqs: {
        type: ControlType.Array,
        title: "FAQ Cards",
        control: {
            type: ControlType.Object,
            controls: {
                label: { type: ControlType.String, title: "Label", defaultValue: "Frage 01" },
                question: { type: ControlType.String, title: "Question", defaultValue: "Kostet das erste Gespräch etwas?" },
                answer: { type: ControlType.String, title: "Answer", displayTextArea: true, defaultValue: "Nein. Das erste Gespräch ist kostenlos und unverbindlich." },
                accentColor: { type: ControlType.Color, title: "Accent", defaultValue: COLORS.orange },
                background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.white },
            },
        },
        defaultValue: DEFAULT_FAQS,
        maxCount: 4,
    },
})
