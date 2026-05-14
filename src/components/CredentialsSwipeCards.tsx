import React from "react"
import { addPropertyControls, ControlType } from "framer"

const COLORS = {
    cream: "#FCF8F1",
    orange: "#FF6403",
    navy: "#0E2616",
    white: "#FFFFFF",
    textMuted: "rgba(14, 38, 22, 0.62)",
    border: "rgba(14, 38, 22, 0.14)",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Display:wght@300;400;500;600&display=swap');`

const STYLES = `
    .rb-credentials {
        width: 100%;
        box-sizing: border-box;
        font-family: 'Inter Display', Inter, sans-serif;
        -webkit-font-smoothing: antialiased;
        overflow: hidden;
    }

    .rb-credentials__inner {
        width: 100%;
        max-width: 1180px;
        margin: 0 auto;
    }

    .rb-credentials__header {
        display: grid;
        grid-template-columns: minmax(0, 0.78fr) minmax(320px, 0.62fr);
        gap: 64px;
        align-items: end;
        margin-bottom: 52px;
    }

    .rb-credentials h2 {
        margin: 0;
        max-width: 720px;
        font-family: 'Instrument Serif', Georgia, serif;
        font-size: clamp(44px, 5.2vw, 72px);
        font-weight: 400;
        line-height: 0.98;
        letter-spacing: 0;
        color: ${COLORS.navy};
    }

    .rb-credentials h2 em {
        color: ${COLORS.orange};
        font-style: italic;
    }

    .rb-credentials__intro {
        margin: 0;
        color: ${COLORS.textMuted};
        font-size: 18px;
        font-weight: 300;
        line-height: 1.58;
    }

    .rb-credentials__rail {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: minmax(320px, 390px);
        gap: 18px;
        overflow-x: auto;
        overflow-y: hidden;
        scroll-snap-type: x mandatory;
        padding: 6px 0 24px;
        scrollbar-width: thin;
        scrollbar-color: ${COLORS.orange} transparent;
    }

    .rb-credentials__rail::-webkit-scrollbar {
        height: 6px;
    }

    .rb-credentials__rail::-webkit-scrollbar-track {
        background: transparent;
    }

    .rb-credentials__rail::-webkit-scrollbar-thumb {
        background: rgba(255, 100, 3, 0.42);
        border-radius: 999px;
    }

    .rb-credentials__card {
        min-height: 430px;
        scroll-snap-align: start;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 36px;
        padding: 30px;
        border-radius: 15px;
        border: 1px solid ${COLORS.border};
        background: ${COLORS.white};
        overflow: hidden;
        box-sizing: border-box;
    }

    .rb-credentials__year {
        position: relative;
        z-index: 1;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: fit-content;
        min-width: 68px;
        height: 34px;
        padding: 0 14px;
        border-radius: 999px;
        background: ${COLORS.cream};
        color: ${COLORS.orange};
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.02em;
    }

    .rb-credentials__top {
        min-height: 238px;
    }

    .rb-credentials__title {
        position: relative;
        z-index: 1;
        margin: 0;
        font-family: 'Instrument Serif', Georgia, serif;
        font-size: 36px;
        font-weight: 400;
        line-height: 1.02;
        color: ${COLORS.navy};
        min-height: calc(36px * 1.02 * 3);
    }

    .rb-credentials__meta {
        position: relative;
        z-index: 1;
        display: grid;
        gap: 10px;
        margin-top: 18px;
    }

    .rb-credentials__logo {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        overflow: hidden;
        flex: 0 0 auto;
        margin-left: 0;
        margin-right: auto;
    }

    .rb-credentials__logo img {
        width: 100%;
        height: 100%;
        display: block;
        object-position: left center;
    }

    .rb-credentials__institution {
        color: ${COLORS.navy};
        font-size: 15px;
        font-weight: 500;
        line-height: 1.4;
    }

    .rb-credentials__degree {
        color: ${COLORS.textMuted};
        font-size: 15px;
        font-weight: 300;
        line-height: 1.45;
    }

    .rb-credentials__bullets {
        position: relative;
        z-index: 1;
        display: grid;
        gap: 10px;
        margin: 0;
        padding: 0;
        list-style: none;
    }

    .rb-credentials__bullet {
        display: grid;
        grid-template-columns: 8px minmax(0, 1fr);
        gap: 10px;
        align-items: start;
        color: ${COLORS.textMuted};
        font-size: 14px;
        font-weight: 300;
        line-height: 1.45;
    }

    .rb-credentials__bullet::before {
        content: "";
        width: 6px;
        height: 6px;
        margin-top: 7px;
        border-radius: 999px;
        background: ${COLORS.orange};
    }

    .rb-credentials__hint {
        display: none;
        margin: 16px 0 0;
        color: ${COLORS.textMuted};
        font-size: 13px;
        font-weight: 300;
    }

    @media (max-width: 900px) {
        .rb-credentials__header {
            grid-template-columns: 1fr;
            gap: 28px;
            margin-bottom: 40px;
        }

        .rb-credentials__intro {
            max-width: 640px;
        }
    }

    @media (max-width: 560px) {
        .rb-credentials__rail {
            grid-auto-columns: minmax(282px, 84vw);
            gap: 14px;
            padding-bottom: 18px;
        }

        .rb-credentials__card {
            min-height: 400px;
            padding: 24px;
        }

        .rb-credentials__title {
            font-size: 32px;
            min-height: calc(32px * 1.02 * 3);
        }

        .rb-credentials__hint {
            display: block;
        }
    }
`

function parseItalic(text: string) {
    return (text || "").split("*").map((part, i) => (
        <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>{part}</span>
    ))
}

function splitBullets(text: string) {
    return (text || "")
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean)
}

export default function CredentialsSwipeCards(props) {
    const {
        headline,
        intro,
        credentials,
        background,
        paddingTop,
        paddingBottom,
        paddingX,
        showSwipeHint,
    } = props

    const safeCredentials = Array.isArray(credentials) ? credentials : []

    return (
        <section
            className="rb-credentials"
            style={{
                backgroundColor: background,
                paddingTop,
                paddingBottom,
                paddingLeft: paddingX,
                paddingRight: paddingX,
            }}
        >
            <style>{FONT_IMPORT}</style>
            <style>{STYLES}</style>

            <div className="rb-credentials__inner">
                <div className="rb-credentials__header">
                    <div>
                        <h2>{parseItalic(headline)}</h2>
                    </div>

                    {intro ? <p className="rb-credentials__intro">{intro}</p> : null}
                </div>

                <div className="rb-credentials__rail" aria-label="Credentials">
                    {safeCredentials.map((item, i) => {
                        const bullets = splitBullets(item.bullets)
                        return (
                            <article className="rb-credentials__card" key={i}>
                                <div className="rb-credentials__top">
                                    <span className="rb-credentials__year">{item.year}</span>
                                    <h3 className="rb-credentials__title">{item.title}</h3>
                                    <div className="rb-credentials__meta">
                                        {item.icon ? (
                                            <div
                                                className="rb-credentials__logo"
                                                aria-label={item.institution || "Institution logo"}
                                                style={{
                                                    width: item.iconWidth || 120,
                                                    height: item.iconHeight || 34,
                                                    borderRadius: item.iconRadius ?? 15,
                                                }}
                                            >
                                                <img
                                                    src={item.icon}
                                                    alt={item.institution || ""}
                                                    style={{
                                                        objectFit: item.iconFit || "contain",
                                                        objectPosition: `${(item.iconFocalPoint?.x ?? 0) * 100}% ${(item.iconFocalPoint?.y ?? 0.5) * 100}%`,
                                                    }}
                                                />
                                            </div>
                                        ) : item.institution ? (
                                            <div className="rb-credentials__institution">{item.institution}</div>
                                        ) : null}
                                        {item.degree ? (
                                            <div className="rb-credentials__degree">{item.degree}</div>
                                        ) : null}
                                    </div>
                                </div>

                                {bullets.length ? (
                                    <ul className="rb-credentials__bullets">
                                        {bullets.slice(0, 2).map((bullet) => (
                                            <li className="rb-credentials__bullet" key={bullet}>
                                                {bullet}
                                            </li>
                                        ))}
                                    </ul>
                                ) : null}
                            </article>
                        )
                    })}
                </div>

                {showSwipeHint ? <p className="rb-credentials__hint">Seitlich wischen</p> : null}
            </div>
        </section>
    )
}

const DEFAULT_CREDENTIALS = [
    {
        title: "Angewandte Medien",
        institution: "",
        degree: "PR und Kommunikationsmanagement · Bachelor of Arts",
        year: "2015",
        icon: "",
        iconFit: "contain",
        iconFocalPoint: { x: 0, y: 0.5 },
        iconWidth: 120,
        iconHeight: 34,
        iconRadius: 15,
        bullets: "Medienlogik, Öffentlichkeit und klare Kommunikation als Fundament.\nStrategisches Erzählen ohne Inszenierungsnebel.",
    },
    {
        title: "Business Coach",
        institution: "IHK",
        degree: "Zertifizierung",
        year: "2018",
        icon: "",
        iconFit: "contain",
        iconFocalPoint: { x: 0, y: 0.5 },
        iconWidth: 82,
        iconHeight: 34,
        iconRadius: 15,
        bullets: "Professioneller Rahmen für Coaching, Reflexion und Gesprächsführung.\nFokus auf Klarheit, Eigenverantwortung und Entscheidungsfähigkeit.",
    },
    {
        title: "Fachkraft für Stressmanagement",
        institution: "IHK",
        degree: "Zertifizierung",
        year: "2021",
        icon: "",
        iconFit: "contain",
        iconFocalPoint: { x: 0, y: 0.5 },
        iconWidth: 82,
        iconHeight: 34,
        iconRadius: 15,
        bullets: "Verständnis für Belastung, Druck und Selbststeuerung in Verantwortung.\nRelevant für Führungssituationen, in denen Tempo und Klarheit zusammenkommen müssen.",
    },
    {
        title: "Fachkraft für Diversity Management",
        institution: "IHK",
        degree: "Zertifizierung",
        year: "2022",
        icon: "",
        iconFit: "contain",
        iconFocalPoint: { x: 0, y: 0.5 },
        iconWidth: 82,
        iconHeight: 34,
        iconRadius: 15,
        bullets: "Blick für unterschiedliche Perspektiven, Rollen und Systemdynamiken.\nNützlich, wenn Führung nicht nur individuell, sondern kulturell wirkt.",
    },
    {
        title: "Certified AI Product Manager",
        institution: "",
        degree: "Certification",
        year: "2025",
        icon: "",
        iconFit: "contain",
        iconFocalPoint: { x: 0, y: 0.5 },
        iconWidth: 120,
        iconHeight: 34,
        iconRadius: 15,
        bullets: "Produktdenken an der Schnittstelle von Strategie, Nutzerwert und KI.\nHilft, technologische Möglichkeiten in entscheidbare Optionen zu übersetzen.",
    },
    {
        title: "Certified AT Product Strategy Leader",
        institution: "",
        degree: "Certification",
        year: "2026",
        icon: "",
        iconFit: "contain",
        iconFocalPoint: { x: 0, y: 0.5 },
        iconWidth: 120,
        iconHeight: 34,
        iconRadius: 15,
        bullets: "Strategische Produktführung mit Fokus auf Positionierung, Priorisierung und Umsetzung.\nBrücke zwischen Marktlogik, Führung und Entscheidungsarchitektur.",
    },
]

CredentialsSwipeCards.defaultProps = {
    headline: "Erfahrung ist gut. *Einordnung* ist besser.",
    intro: "Ausbildungen und Zertifizierungen, die meine Arbeit nicht ersetzen, aber den Denkraum dahinter sichtbar machen.",
    background: COLORS.cream,
    paddingTop: 112,
    paddingBottom: 112,
    paddingX: 40,
    showSwipeHint: true,
    credentials: DEFAULT_CREDENTIALS,
}

addPropertyControls(CredentialsSwipeCards, {
    headline: {
        type: ControlType.String,
        title: "Headline (*italic*)",
        displayTextArea: true,
        defaultValue: CredentialsSwipeCards.defaultProps.headline,
    },
    intro: {
        type: ControlType.String,
        title: "Intro",
        displayTextArea: true,
        defaultValue: CredentialsSwipeCards.defaultProps.intro,
    },
    background: { type: ControlType.Color, title: "Background", defaultValue: COLORS.cream },
    paddingTop: { type: ControlType.Number, title: "Padding Top", defaultValue: 112, min: 0, max: 240, step: 8 },
    paddingBottom: { type: ControlType.Number, title: "Padding Bottom", defaultValue: 112, min: 0, max: 240, step: 8 },
    paddingX: { type: ControlType.Number, title: "Padding X", defaultValue: 40, min: 16, max: 120, step: 4 },
    showSwipeHint: { type: ControlType.Boolean, title: "Swipe Hint", defaultValue: true },
    credentials: {
        type: ControlType.Array,
        title: "Credentials",
        control: {
            type: ControlType.Object,
            controls: {
                title: { type: ControlType.String, title: "Title", defaultValue: "Credential" },
                institution: { type: ControlType.String, title: "Institution", defaultValue: "IHK" },
                degree: { type: ControlType.String, title: "Degree / Type", defaultValue: "Zertifizierung" },
                year: { type: ControlType.String, title: "Year", defaultValue: "2026" },
                icon: { type: ControlType.Image, title: "Logo / Icon" },
                iconFit: {
                    type: ControlType.Enum,
                    title: "Logo Fit",
                    options: ["contain", "cover", "fill", "scale-down"],
                    optionTitles: ["Contain", "Cover", "Fill", "Scale Down"],
                    defaultValue: "contain",
                    hidden: (p) => !p.icon,
                },
                iconFocalPoint: {
                    type: ControlType.FusedNumber,
                    title: "Logo Position",
                    defaultValue: { x: 0, y: 0.5 },
                    hidden: (p) => !p.icon,
                },
                iconWidth: {
                    type: ControlType.Number,
                    title: "Logo Width",
                    defaultValue: 120,
                    min: 32,
                    max: 240,
                    step: 2,
                    hidden: (p) => !p.icon,
                },
                iconHeight: {
                    type: ControlType.Number,
                    title: "Logo Height",
                    defaultValue: 34,
                    min: 16,
                    max: 120,
                    step: 2,
                    hidden: (p) => !p.icon,
                },
                iconRadius: {
                    type: ControlType.Number,
                    title: "Logo Radius",
                    defaultValue: 15,
                    min: 0,
                    max: 60,
                    step: 1,
                    hidden: (p) => !p.icon,
                },
                bullets: {
                    type: ControlType.String,
                    title: "Bullets",
                    displayTextArea: true,
                    defaultValue: "Ein inhaltlicher Punkt pro Zeile.\nMaximal zwei werden angezeigt.",
                },
            },
        },
        defaultValue: DEFAULT_CREDENTIALS,
    },
})
