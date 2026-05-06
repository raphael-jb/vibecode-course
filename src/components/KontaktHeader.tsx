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

export default function KontaktHeader(props) {
    const {
        eyebrow,
        headline,
        lead,
        primaryCtaLabel,
        calendarLink,
        email,
        background,
        accentColor,
        paddingTop,
        paddingBottom,
        paddingX,
    } = props

    return (
        <section
            style={{
                width: "100%",
                backgroundColor: background,
                color: COLORS.navy,
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
                    gap: 72,
                    alignItems: "end",
                }}
            >
                <div>
                    {eyebrow ? (
                        <div
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 10,
                                marginBottom: 28,
                                color: accentColor,
                                fontSize: 13,
                                fontWeight: 600,
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                            }}
                        >
                            <span
                                style={{
                                    width: 9,
                                    height: 9,
                                    borderRadius: 999,
                                    backgroundColor: accentColor,
                                }}
                            />
                            {eyebrow}
                        </div>
                    ) : null}
                    <h1
                        style={{
                            margin: 0,
                            maxWidth: 720,
                            fontFamily: "'Instrument Serif', Georgia, serif",
                            fontSize: "clamp(58px, 8vw, 104px)",
                            fontWeight: 400,
                            lineHeight: 0.96,
                            color: COLORS.navy,
                        }}
                    >
                        {parseItalic(headline)}
                    </h1>
                </div>

                <div>
                    <p
                        style={{
                            margin: 0,
                            color: COLORS.muted,
                            fontSize: 19,
                            fontWeight: 300,
                            lineHeight: 1.58,
                        }}
                    >
                        {lead}
                    </p>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 14,
                            marginTop: 34,
                        }}
                    >
                        <a
                            href={calendarLink}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                justifyContent: "center",
                                minHeight: 50,
                                padding: "0 26px",
                                borderRadius: 999,
                                backgroundColor: accentColor,
                                color: COLORS.white,
                                fontSize: 15,
                                fontWeight: 500,
                                textDecoration: "none",
                                whiteSpace: "nowrap",
                            }}
                        >
                            {primaryCtaLabel}
                        </a>
                        <a
                            href={`mailto:${email}`}
                            style={{
                                display: "inline-flex",
                                alignItems: "center",
                                minHeight: 50,
                                color: COLORS.navy,
                                fontSize: 15,
                                fontWeight: 500,
                                textDecoration: "underline",
                                textDecorationColor: accentColor,
                                textDecorationThickness: 1,
                                textUnderlineOffset: 5,
                                whiteSpace: "nowrap",
                            }}
                        >
                            {email}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

KontaktHeader.defaultProps = {
    eyebrow: "Kontakt",
    headline: "Lass uns *sprechen.*",
    lead: "Wenn Du einen Case, eine Frage oder einen ersten Gedanken hast: Schreib mir kurz. Ich melde mich persönlich.",
    primaryCtaLabel: "Erstgespräch buchen",
    calendarLink: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    email: "rb@raphaelbaruch.com",
    background: COLORS.cream,
    accentColor: COLORS.orange,
    paddingTop: 128,
    paddingBottom: 72,
    paddingX: 40,
}

addPropertyControls(KontaktHeader, {
    eyebrow: { type: ControlType.String, title: "Eyebrow", defaultValue: "Kontakt" },
    headline: { type: ControlType.String, title: "Headline (*italic*)", displayTextArea: true, defaultValue: KontaktHeader.defaultProps.headline },
    lead: { type: ControlType.String, title: "Lead", displayTextArea: true, defaultValue: KontaktHeader.defaultProps.lead },
    primaryCtaLabel: { type: ControlType.String, title: "CTA Label", defaultValue: "Erstgespräch buchen" },
    calendarLink: { type: ControlType.String, title: "Calendar Link", defaultValue: KontaktHeader.defaultProps.calendarLink },
    email: { type: ControlType.String, title: "Email", defaultValue: "rb@raphaelbaruch.com" },
    background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.cream },
    accentColor: { type: ControlType.Color, title: "Accent", defaultValue: COLORS.orange },
    paddingTop: { type: ControlType.Number, title: "Padding Top", defaultValue: 128, min: 0, max: 240, step: 8 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", defaultValue: 72, min: 0, max: 240, step: 8 },
    paddingX: { type: ControlType.Number, title: "Padding X", defaultValue: 40, min: 16, max: 120, step: 4 },
})
