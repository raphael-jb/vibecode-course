import React, { useEffect, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

const COLORS = {
    orange: "#FF6403",
    cream: "#FCF8F1",
    navy: "#0E2616",
    textPrimary: "#000000",
    textSecondary: "#767676",
    border: "rgba(14,38,22,0.12)",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500&display=swap');`
const UTILITY_FONT = "'Inter Display', 'Inter', sans-serif"

function parseItalic(text: string) {
    return text.split("*").map((part, i) => (
        <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>{part}</span>
    ))
}

export default function ConfidentialitySection(props) {
    const {
        headline,
        subline,
        principles,
        closing,
        background,
        paddingTop,
        paddingBottom,
    } = props

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (isCanvas) return
        const check = () => setIsMobile(window.innerWidth < 820)
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

            <div style={{
                maxWidth: 860,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}>
                <div style={{
                    maxWidth: 720,
                    textAlign: "center",
                    marginBottom: isMobile ? 44 : 56,
                }}>
                    <h2 style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: isMobile ? 42 : 64,
                        fontWeight: 400,
                        lineHeight: 1.02,
                        color: COLORS.textPrimary,
                        margin: "0 auto 28px auto",
                        maxWidth: 680,
                    }}>
                        {parseItalic(headline)}
                    </h2>

                    {subline ? (
                        <p style={{
                            fontFamily: UTILITY_FONT,
                            fontSize: isMobile ? 17 : 19,
                            fontWeight: 300,
                            lineHeight: 1.58,
                            color: COLORS.textSecondary,
                            margin: "0 auto",
                            maxWidth: 540,
                        }}>
                            {subline}
                        </p>
                    ) : null}
                </div>

                <div style={{
                    width: "100%",
                    borderTop: `1px solid ${COLORS.border}`,
                }}>
                    {(principles || []).map((item, i) => (
                        <div key={i} style={{
                            display: "grid",
                            gridTemplateColumns: isMobile ? "1fr" : "minmax(180px, 0.36fr) minmax(0, 1fr)",
                            gap: isMobile ? 10 : 32,
                            alignItems: "center",
                            paddingTop: i === 0 ? 28 : 26,
                            paddingBottom: 26,
                            borderBottom: `1px solid ${COLORS.border}`,
                        }}>
                            <h3 style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: isMobile ? 28 : 32,
                                fontWeight: 400,
                                lineHeight: 1.05,
                                color: COLORS.textPrimary,
                                margin: 0,
                                textAlign: isMobile ? "center" : "right",
                            }}>
                                {parseItalic(item.title)}
                            </h3>
                            <p style={{
                                fontFamily: UTILITY_FONT,
                                fontSize: 16,
                                fontWeight: 300,
                                lineHeight: 1.55,
                                color: COLORS.textSecondary,
                                margin: 0,
                                textAlign: isMobile ? "center" : "left",
                            }}>
                                {item.body}
                            </p>
                        </div>
                    ))}

                    {closing ? (
                        <p style={{
                            fontFamily: "'Instrument Serif', serif",
                            fontSize: isMobile ? 24 : 28,
                            fontWeight: 400,
                            lineHeight: 1.24,
                            color: COLORS.navy,
                            margin: "36px auto 0 auto",
                            maxWidth: 560,
                            textAlign: "center",
                        }}>
                            {parseItalic(closing)}
                        </p>
                    ) : null}
                </div>
            </div>
        </section>
    )
}

const DEFAULT_PRINCIPLES = [
    {
        title: "*Vertraulich*",
        body: "Alles bleibt in diesem Raum. Keine Inhalte werden weitererzählt, zitiert oder verwendet.",
    },
    {
        title: "*Agenda-frei*",
        body: "Du musst hier nichts beweisen, verkaufen oder vertreten. Wir arbeiten an dem, was wirklich da ist.",
    },
    {
        title: "*Konsequenzfrei*",
        body: "Du kannst Gedanken aussprechen, bevor sie fertig sind. Ohne politische, persönliche oder operative Rücksicht.",
    },
]

ConfidentialitySection.defaultProps = {
    headline: "Hier darf alles *ausgesprochen* werden.",
    subline: "Ein Gespräch ohne Bühne, ohne Rolle und ohne spätere Verwendung. Nur Klarheit im Moment.",
    principles: DEFAULT_PRINCIPLES,
    closing: "Sicherheit ist keine Zusatzleistung. Sie ist die Voraussetzung.",
    background: COLORS.cream,
    paddingTop: 96,
    paddingBottom: 96,
}

addPropertyControls(ConfidentialitySection, {
    headline: { type: ControlType.String, title: "Headline (*italic*)", displayTextArea: true, defaultValue: "Hier darf alles *ausgesprochen* werden." },
    subline: { type: ControlType.String, title: "Subline", displayTextArea: true, defaultValue: "Ein Gespräch ohne Bühne, ohne Rolle und ohne spätere Verwendung. Nur Klarheit im Moment." },
    closing: { type: ControlType.String, title: "Closing (*italic*)", displayTextArea: true, defaultValue: "Sicherheit ist keine Zusatzleistung. Sie ist die Voraussetzung." },
    background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.cream },
    paddingTop: { type: ControlType.Number, title: "Padding Top", defaultValue: 96, min: 0, max: 220, step: 8 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", defaultValue: 96, min: 0, max: 220, step: 8 },
    principles: {
        type: ControlType.Array,
        title: "Principles",
        control: {
            type: ControlType.Object,
            controls: {
                title: { type: ControlType.String, title: "Title (*italic*)", defaultValue: "*Agenda-frei*" },
                body: { type: ControlType.String, title: "Body", displayTextArea: true, defaultValue: "Kurzer Trust-Satz." },
            },
        },
        defaultValue: DEFAULT_PRINCIPLES,
        maxCount: 5,
    },
})
