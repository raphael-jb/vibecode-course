import React from "react"
import { addPropertyControls, ControlType } from "framer"

const COLORS = {
    cream: "#FCF8F1",
    orange: "#FF6403",
    navy: "#0E2616",
    textMuted: "rgba(14, 38, 22, 0.64)",
    border: "rgba(14, 38, 22, 0.14)",
    white: "#FFFFFF",
}

const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Display:wght@300;400;500;600&display=swap');

    .rb-impressum {
        width: 100%;
        min-height: 100vh;
        background: ${COLORS.cream};
        color: ${COLORS.navy};
        box-sizing: border-box;
        padding: 172px 100px;
        font-family: 'Inter Display', Inter, sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    .rb-impressum__wrap {
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(0, 0.82fr) minmax(420px, 1.18fr);
        gap: 88px;
        align-items: start;
    }

    .rb-impressum__header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    .rb-impressum__kicker {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        margin: 0 0 28px;
        color: ${COLORS.orange};
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-transform: uppercase;
    }

    .rb-impressum h1 {
        margin: 0 0 72px;
        font-family: 'Instrument Serif', Georgia, serif;
        font-size: clamp(56px, 8vw, 104px);
        font-weight: 400;
        line-height: 1.05;
        letter-spacing: 0;
    }

    .rb-impressum h1 em {
        color: ${COLORS.orange};
        font-style: italic;
    }

    .rb-impressum__dot {
        width: 9px;
        height: 9px;
        border-radius: 999px;
        background: ${COLORS.orange};
    }

    .rb-impressum__intro {
        max-width: 420px;
        margin: 0;
        color: ${COLORS.textMuted};
        font-size: 19px;
        font-weight: 300;
        line-height: 1.65;
    }

    .rb-impressum__panel {
        background: ${COLORS.white};
        border: 1px solid ${COLORS.border};
        border-radius: 15px;
        overflow: hidden;
    }

    .rb-impressum__section {
        padding: 34px 36px;
        border-bottom: 1px solid ${COLORS.border};
    }

    .rb-impressum__section:last-child {
        border-bottom: 0;
    }

    .rb-impressum h2 {
        margin: 0 0 18px;
        font-family: 'Instrument Serif', Georgia, serif;
        font-size: 31px;
        font-weight: 400;
        line-height: 1.08;
        letter-spacing: 0;
    }

    .rb-impressum p {
        margin: 0;
        color: ${COLORS.textMuted};
        font-size: 16px;
        font-weight: 300;
        line-height: 1.62;
    }

    .rb-impressum p + p {
        margin-top: 14px;
    }

    .rb-impressum strong {
        color: ${COLORS.navy};
        font-weight: 500;
    }

    .rb-impressum a {
        color: ${COLORS.navy};
        text-decoration-color: ${COLORS.orange};
        text-decoration-thickness: 1px;
        text-underline-offset: 4px;
    }

    .rb-impressum__meta {
        display: grid;
        gap: 12px;
    }

    .rb-impressum__line {
        display: grid;
        grid-template-columns: 140px minmax(0, 1fr);
        gap: 20px;
        align-items: start;
        padding: 0 0 12px;
        border-bottom: 1px solid rgba(14, 38, 22, 0.08);
    }

    .rb-impressum__line:last-child {
        border-bottom: 0;
        padding-bottom: 0;
    }

    .rb-impressum__label {
        color: ${COLORS.orange};
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .rb-impressum__value {
        color: ${COLORS.navy};
        font-size: 16px;
        font-weight: 300;
        line-height: 1.55;
        overflow-wrap: anywhere;
    }

    .rb-impressum__note {
        margin-top: 24px;
        padding-top: 18px;
        border-top: 1px solid rgba(14, 38, 22, 0.1);
        color: rgba(14, 38, 22, 0.52);
        font-size: 13px;
        line-height: 1.5;
    }

    @media (max-width: 900px) {
        .rb-impressum {
            padding: 132px 84px;
        }

        .rb-impressum__wrap {
            grid-template-columns: 1fr;
            gap: 48px;
        }

        .rb-impressum__intro {
            max-width: 620px;
        }
    }

    @media (max-width: 560px) {
        .rb-impressum {
            padding: 116px 80px;
        }

        .rb-impressum__section {
            padding: 28px 22px;
        }

        .rb-impressum__line {
            grid-template-columns: 1fr;
            gap: 6px;
        }
    }
`

export default function Impressum(props) {
    const {
        ownerName,
        street,
        city,
        email,
        phone,
        vatNotice,
        disputeNotice,
        contentResponsibleNotice,
        legalIntro,
    } = props

    const phoneHref = phone.replace(/[^\d+]/g, "")

    return (
        <main className="rb-impressum">
            <style>{STYLES}</style>

            <div className="rb-impressum__wrap">
                <header className="rb-impressum__header">
                    <div className="rb-impressum__kicker">
                        <span className="rb-impressum__dot" />
                        Rechtliches
                    </div>
                    <h1>Impressum</h1>
                    <p className="rb-impressum__intro">{legalIntro}</p>
                </header>

                <article className="rb-impressum__panel" aria-label="Impressum">
                    <section className="rb-impressum__section">
                        <h2>Angaben gemäß § 5 DDG</h2>
                        <div className="rb-impressum__meta">
                            <div className="rb-impressum__line">
                                <div className="rb-impressum__label">Anbieter</div>
                                <div className="rb-impressum__value">
                                    <strong>{ownerName}</strong>
                                    <br />
                                    Einzelunternehmer
                                </div>
                            </div>
                            <div className="rb-impressum__line">
                                <div className="rb-impressum__label">Anschrift</div>
                                <div className="rb-impressum__value">
                                    {street}
                                    <br />
                                    {city}
                                    <br />
                                    Deutschland
                                </div>
                            </div>
                            <div className="rb-impressum__line">
                                <div className="rb-impressum__label">Kontakt</div>
                                <div className="rb-impressum__value">
                                    E-Mail: <a href={`mailto:${email}`}>{email}</a>
                                    <br />
                                    Telefon: <a href={`tel:${phoneHref}`}>{phone}</a>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="rb-impressum__section">
                        <h2>Umsatzsteuer</h2>
                        <p>{vatNotice}</p>
                    </section>

                    <section className="rb-impressum__section">
                        <h2>Redaktionell verantwortlich</h2>
                        <p>{contentResponsibleNotice}</p>
                    </section>

                    <section className="rb-impressum__section">
                        <h2>Verbraucherstreitbeilegung</h2>
                        <p>{disputeNotice}</p>
                    </section>

                    <section className="rb-impressum__section">
                        <h2>Haftung für Inhalte</h2>
                        <p>
                            Als Diensteanbieter bin ich für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
                            Für fremde Informationen, die ich übermittle oder speichere, gelten die gesetzlichen Regelungen des Digitale-Dienste-Gesetzes.
                        </p>
                        <p className="rb-impressum__note">
                            Die normale Steuernummer wird nicht im Impressum veröffentlicht. Eine Umsatzsteuer-Identifikationsnummer oder Wirtschafts-Identifikationsnummer wird nur angegeben, wenn sie vorhanden ist.
                        </p>
                    </section>
                </article>
            </div>
        </main>
    )
}

Impressum.defaultProps = {
    ownerName: "Raphael Baruch",
    street: "Gubener Straße 30",
    city: "10243 Berlin",
    email: "rb@raphaelbaruch.com",
    phone: "+49 1711 02 07 92",
    legalIntro: "Pflichtangaben für raphaelbaruch.com. Klar, erreichbar, ohne juristische Staffage.",
    vatNotice: "Es wird Umsatzsteuer nach dem Regelsteuersatz ausgewiesen. Eine Umsatzsteuer-Identifikationsnummer nach § 27a UStG besteht nicht.",
    contentResponsibleNotice: "Verantwortlich i. S. d. § 18 Abs. 2 MStV: Raphael Baruch, Gubener Straße 30, 10243 Berlin.",
    disputeNotice: "Ich bin nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
}

addPropertyControls(Impressum, {
    ownerName: { type: ControlType.String, title: "Name", defaultValue: "Raphael Baruch" },
    street: { type: ControlType.String, title: "Street", defaultValue: "Gubener Straße 30" },
    city: { type: ControlType.String, title: "City", defaultValue: "10243 Berlin" },
    email: { type: ControlType.String, title: "Email", defaultValue: "rb@raphaelbaruch.com" },
    phone: { type: ControlType.String, title: "Phone", defaultValue: "+49 1711 02 07 92" },
    legalIntro: {
        type: ControlType.String,
        title: "Intro",
        displayTextArea: true,
        defaultValue: "Pflichtangaben für raphaelbaruch.com. Klar, erreichbar, ohne juristische Staffage.",
    },
    vatNotice: {
        type: ControlType.String,
        title: "VAT",
        displayTextArea: true,
        defaultValue: "Es wird Umsatzsteuer nach dem Regelsteuersatz ausgewiesen. Eine Umsatzsteuer-Identifikationsnummer nach § 27a UStG besteht nicht.",
    },
    contentResponsibleNotice: {
        type: ControlType.String,
        title: "MStV",
        displayTextArea: true,
        defaultValue: "Verantwortlich i. S. d. § 18 Abs. 2 MStV: Raphael Baruch, Gubener Straße 30, 10243 Berlin.",
    },
    disputeNotice: {
        type: ControlType.String,
        title: "Dispute",
        displayTextArea: true,
        defaultValue: "Ich bin nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    },
})
