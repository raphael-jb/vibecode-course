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

    .rb-privacy {
        width: 100%;
        min-height: 100vh;
        background: ${COLORS.white};
        color: ${COLORS.navy};
        box-sizing: border-box;
        padding: 172px 100px;
        font-family: 'Inter Display', Inter, sans-serif;
        -webkit-font-smoothing: antialiased;
    }

    .rb-privacy__wrap {
        width: 100%;
        max-width: 1120px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: minmax(0, 0.82fr) minmax(420px, 1.18fr);
        gap: 88px;
        align-items: start;
    }

    .rb-privacy__header {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        position: sticky;
        top: 96px;
    }

    .rb-privacy h1 {
        margin: 0 0 72px;
        font-family: 'Instrument Serif', Georgia, serif;
        font-size: clamp(52px, 7.5vw, 98px);
        font-weight: 400;
        line-height: 1.05;
        letter-spacing: 0;
    }

    .rb-privacy h1 em {
        color: ${COLORS.orange};
        font-style: italic;
    }

    .rb-privacy__intro {
        max-width: 420px;
        margin: 0;
        color: ${COLORS.textMuted};
        font-size: 19px;
        font-weight: 300;
        line-height: 1.65;
    }

    .rb-privacy__panel {
        background: ${COLORS.white};
        border: 1px solid ${COLORS.orange};
        border-radius: 16px;
        box-shadow: 0 2px 14px rgba(255, 100, 3, 0.25);
        overflow: hidden;
    }

    .rb-privacy__section {
        padding: 34px 36px;
        border-bottom: 1px solid ${COLORS.border};
    }

    .rb-privacy__section:last-child {
        border-bottom: 0;
    }

    .rb-privacy h2 {
        margin: 0 0 18px;
        font-family: 'Instrument Serif', Georgia, serif;
        font-size: 31px;
        font-weight: 400;
        line-height: 1.08;
        letter-spacing: 0;
    }

    .rb-privacy p,
    .rb-privacy li {
        color: ${COLORS.textMuted};
        font-size: 16px;
        font-weight: 300;
        line-height: 1.62;
    }

    .rb-privacy p {
        margin: 0;
    }

    .rb-privacy p + p {
        margin-top: 14px;
    }

    .rb-privacy ul {
        margin: 14px 0 0;
        padding-left: 18px;
    }

    .rb-privacy li + li {
        margin-top: 7px;
    }

    .rb-privacy strong {
        color: ${COLORS.navy};
        font-weight: 500;
    }

    .rb-privacy a {
        color: ${COLORS.navy};
        text-decoration-color: ${COLORS.orange};
        text-decoration-thickness: 1px;
        text-underline-offset: 4px;
    }

    .rb-privacy__meta {
        display: grid;
        gap: 12px;
    }

    .rb-privacy__line {
        display: grid;
        grid-template-columns: 140px minmax(0, 1fr);
        gap: 20px;
        align-items: start;
        padding: 0 0 12px;
        border-bottom: 1px solid rgba(14, 38, 22, 0.08);
    }

    .rb-privacy__line:last-child {
        border-bottom: 0;
        padding-bottom: 0;
    }

    .rb-privacy__label {
        color: ${COLORS.orange};
        font-size: 13px;
        font-weight: 600;
        letter-spacing: 0.04em;
        text-transform: uppercase;
    }

    .rb-privacy__value {
        color: ${COLORS.navy};
        font-size: 16px;
        font-weight: 300;
        line-height: 1.55;
        overflow-wrap: anywhere;
    }

    .rb-privacy__note {
        margin-top: 24px;
        padding-top: 18px;
        border-top: 1px solid rgba(14, 38, 22, 0.1);
        color: rgba(14, 38, 22, 0.52);
        font-size: 13px;
        line-height: 1.5;
    }

    @media (max-width: 900px) {
        .rb-privacy {
            padding: 132px 84px;
        }

        .rb-privacy__wrap {
            grid-template-columns: 1fr;
            gap: 48px;
        }

        .rb-privacy__header {
            position: static;
        }

        .rb-privacy__intro {
            max-width: 620px;
        }
    }

    @media (max-width: 560px) {
        .rb-privacy {
            padding: 96px 14px;
        }

        .rb-privacy__section {
            padding: 28px 18px;
        }

        .rb-privacy__line {
            grid-template-columns: 1fr;
            gap: 6px;
        }
    }
`

export default function Datenschutz(props) {
    const {
        ownerName,
        street,
        city,
        email,
        phone,
        siteUrl,
        lastUpdated,
        legalIntro,
        hostingProvider,
        hostingNote,
        analyticsNote,
        cookieNote,
        formProviderNote,
        automationProviderNote,
        aiProviderNote,
        newsletterNote,
        videoEmbedNote,
    } = props

    const phoneHref = phone.replace(/[^\d+]/g, "")

    return (
        <main className="rb-privacy">
            <style>{STYLES}</style>

            <div className="rb-privacy__wrap">
                <header className="rb-privacy__header">
                    <h1>
                        Daten.
                        <br />
                        <em>Klar</em> geregelt.
                    </h1>
                    <p className="rb-privacy__intro">{legalIntro}</p>
                </header>

                <article className="rb-privacy__panel" aria-label="Datenschutzerklärung">
                    <section className="rb-privacy__section">
                        <h2>1. Verantwortlicher</h2>
                        <div className="rb-privacy__meta">
                            <div className="rb-privacy__line">
                                <div className="rb-privacy__label">Anbieter</div>
                                <div className="rb-privacy__value">
                                    <strong>{ownerName}</strong>
                                    <br />
                                    Einzelunternehmer
                                </div>
                            </div>
                            <div className="rb-privacy__line">
                                <div className="rb-privacy__label">Anschrift</div>
                                <div className="rb-privacy__value">
                                    {street}
                                    <br />
                                    {city}
                                    <br />
                                    Deutschland
                                </div>
                            </div>
                            <div className="rb-privacy__line">
                                <div className="rb-privacy__label">Kontakt</div>
                                <div className="rb-privacy__value">
                                    E-Mail: <a href={`mailto:${email}`}>{email}</a>
                                    <br />
                                    Telefon: <a href={`tel:${phoneHref}`}>{phone}</a>
                                </div>
                            </div>
                            <div className="rb-privacy__line">
                                <div className="rb-privacy__label">Website</div>
                                <div className="rb-privacy__value">{siteUrl}</div>
                            </div>
                            <div className="rb-privacy__line">
                                <div className="rb-privacy__label">Stand</div>
                                <div className="rb-privacy__value">{lastUpdated}</div>
                            </div>
                        </div>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>2. Grundsatz</h2>
                        <p>
                            Ich verarbeite personenbezogene Daten nur, soweit dies für den Betrieb dieser Website,
                            die Kommunikation mit Dir, die Vorbereitung und Durchführung von Leistungen oder aufgrund
                            gesetzlicher Pflichten erforderlich ist.
                        </p>
                        <p>
                            Rechtsgrundlagen sind insbesondere Art. 6 Abs. 1 lit. b DSGVO, wenn die Verarbeitung für
                            vorvertragliche oder vertragliche Zwecke erforderlich ist, Art. 6 Abs. 1 lit. f DSGVO bei
                            berechtigten Interessen am sicheren und funktionierenden Betrieb der Website sowie Art. 6
                            Abs. 1 lit. a DSGVO, wenn Du eine Einwilligung gibst.
                        </p>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>3. Server-Logfiles und Hosting</h2>
                        <p>{hostingNote}</p>
                        <p>
                            Beim Aufruf der Website können technisch notwendige Daten verarbeitet werden, etwa IP-Adresse,
                            Datum und Uhrzeit des Abrufs, angeforderte Seite, Referrer-URL, Browsertyp, Betriebssystem
                            und übertragene Datenmenge. Diese Daten dienen dem sicheren und stabilen Betrieb der Website.
                        </p>
                        <p>
                            Hosting / technische Auslieferung: <strong>{hostingProvider}</strong>.
                        </p>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>4. Kontaktaufnahme</h2>
                        <p>
                            Wenn Du mich per E-Mail, Telefon oder über ein Formular kontaktierst, verarbeite ich die von
                            Dir angegebenen Daten zur Bearbeitung Deiner Anfrage. Dazu können Name, E-Mail-Adresse,
                            Telefonnummer, Inhalt der Nachricht und technische Metadaten gehören.
                        </p>
                        <p>
                            Die Verarbeitung erfolgt je nach Kontext auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO oder
                            Art. 6 Abs. 1 lit. f DSGVO.
                        </p>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>5. Case Brief und Sparring-Anfragen</h2>
                        <p>{formProviderNote}</p>
                        <p>
                            Wenn Du einen Case Brief oder eine Sparring-Anfrage einreichst, verarbeite ich die Angaben,
                            die Du freiwillig machst. Dazu können insbesondere Name, E-Mail-Adresse, Führungskontext,
                            konkrete Situation, beteiligte Personen, bisherige Versuche, gewünschtes Ergebnis und
                            optionaler Kontext gehören.
                        </p>
                        <p>
                            Diese Angaben können sensibel sein. Sie werden nur für Vorbereitung, Durchführung,
                            Dokumentation und Nachbereitung des angefragten Formats verarbeitet. Eine Weitergabe an
                            Dritte erfolgt nur, soweit dies technisch für die Verarbeitung erforderlich ist oder Du
                            eingewilligt hast.
                        </p>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>6. Automatisierung, E-Mail und Dokumentation</h2>
                        <p>{automationProviderNote}</p>
                        <p>
                            Für interne Abläufe können Daten an technische Dienstleister übermittelt werden, etwa zur
                            Speicherung in Datenbanken, zur Erstellung privater Dokumente, zur E-Mail-Benachrichtigung
                            oder zur Ablage in geschützten Arbeitsordnern.
                        </p>
                        <p>
                            Die Inhalte werden nicht öffentlich im Git-Repository gespeichert. Operative Kundendaten
                            gehören in private, zugriffsbeschränkte Systeme.
                        </p>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>7. AI-gestützte Verarbeitung</h2>
                        <p>{aiProviderNote}</p>
                        <p>
                            Wenn AI-Systeme zur Vorbereitung, Strukturierung oder Zusammenfassung eingesetzt werden,
                            geschieht dies nur zweckgebunden. AI-Outputs werden vor einer Nutzung gegenüber Kund:innen
                            durch Raphael geprüft. Es erfolgt keine automatische Veröffentlichung von Case-Inhalten.
                        </p>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>8. Cookies, lokale Speicherung und TDDDG</h2>
                        <p>{cookieNote}</p>
                        <p>
                            Soweit Informationen auf Deinem Endgerät gespeichert oder ausgelesen werden, gelten zusätzlich
                            die Vorgaben des Telekommunikation-Digitale-Dienste-Datenschutz-Gesetzes (TDDDG). Technisch
                            notwendige Speicherungen können ohne Einwilligung erfolgen. Für nicht notwendige Cookies oder
                            ähnliche Technologien wird eine Einwilligung eingeholt, sofern sie eingesetzt werden.
                        </p>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>9. Schriftarten und externe Medien</h2>
                        <p>
                            Diese Website kann Schriftarten über Google Fonts laden. Dabei kann Deine IP-Adresse an Google
                            übertragen werden, damit die Schriftdateien an Deinen Browser ausgeliefert werden können.
                        </p>
                        <p>{videoEmbedNote}</p>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>10. Analyse und Marketing</h2>
                        <p>{analyticsNote}</p>
                        <p>{newsletterNote}</p>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>11. Speicherdauer</h2>
                        <p>
                            Personenbezogene Daten werden gelöscht, sobald der Zweck der Verarbeitung entfällt und keine
                            gesetzlichen Aufbewahrungspflichten entgegenstehen. Kommunikationsdaten werden so lange
                            aufbewahrt, wie dies für die Bearbeitung der Anfrage, die Durchführung der Leistung oder die
                            Nachvollziehbarkeit der Geschäftsbeziehung erforderlich ist.
                        </p>
                        <p>
                            Für Session-Quellen wie Aufzeichnungen, Transkripte oder Voice Memos gilt intern eine
                            Standard-Aufbewahrung von 90 Tagen, sofern nichts anderes vereinbart oder rechtlich erforderlich
                            ist.
                        </p>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>12. Deine Rechte</h2>
                        <p>
                            Du hast nach Maßgabe der DSGVO insbesondere das Recht auf Auskunft, Berichtigung, Löschung,
                            Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch gegen bestimmte
                            Verarbeitungen. Eine erteilte Einwilligung kannst Du jederzeit mit Wirkung für die Zukunft
                            widerrufen.
                        </p>
                        <p>
                            Außerdem hast Du das Recht, Dich bei einer Datenschutzaufsichtsbehörde zu beschweren.
                        </p>
                    </section>

                    <section className="rb-privacy__section">
                        <h2>13. Aktualisierung</h2>
                        <p>
                            Diese Datenschutzerklärung kann angepasst werden, wenn sich Website, eingesetzte Dienste oder
                            rechtliche Anforderungen ändern.
                        </p>
                        <p className="rb-privacy__note">
                            Hinweis: Dieser Text ist ein pragmatischer Standardtext für die Website und ersetzt keine
                            anwaltliche Prüfung, insbesondere nicht bei Tracking, Newsletter, Zahlungsabwicklung oder
                            sensiblen Kundendaten.
                        </p>
                    </section>
                </article>
            </div>
        </main>
    )
}

Datenschutz.defaultProps = {
    ownerName: "Raphael Baruch",
    street: "Gubener Straße 30",
    city: "10243 Berlin",
    email: "rb@raphaelbaruch.com",
    phone: "+49 1711 02 07 92",
    siteUrl: "https://www.raphaelbaruch.com",
    lastUpdated: "Mai 2026",
    legalIntro:
        "Klartext darüber, welche Daten auf dieser Website und bei einer Anfrage verarbeitet werden.",
    hostingProvider: "Framer / eingesetzte technische Infrastruktur",
    hostingNote:
        "Diese Website wird über Framer bzw. die dafür eingesetzte technische Infrastruktur bereitgestellt. Dabei werden technisch notwendige Zugriffsdaten verarbeitet, um die Website auszuliefern, abzusichern und stabil zu betreiben.",
    analyticsNote:
        "Aktuell ist kein eigenständiges Analyse- oder Tracking-Setup dokumentiert. Falls später Analyse-Tools wie Google Analytics, Meta Pixel oder ähnliche Dienste eingesetzt werden, muss dieser Abschnitt vor Veröffentlichung konkret ergänzt und gegebenenfalls ein Consent-Banner eingerichtet werden.",
    cookieNote:
        "Die Website nutzt nur technisch notwendige Speicherungen, soweit diese für Betrieb, Darstellung oder Sicherheit erforderlich sind. Ein darüber hinausgehendes Tracking ist in diesem Standardtext nicht als aktiv angenommen.",
    formProviderNote:
        "Für Case Briefs und Anfragen kann ein Formular auf der Website genutzt werden. Die technische Verarbeitung kann über Framer, n8n, Supabase, Google Workspace und E-Mail-Dienstleister erfolgen.",
    automationProviderNote:
        "Für Automatisierung und interne Dokumentation können n8n, Supabase, Google Drive/Docs und Resend oder ein vergleichbarer E-Mail-Dienstleister eingesetzt werden.",
    aiProviderNote:
        "Für interne Vorbereitung und Zusammenfassungen können AI-Dienste wie Anthropic, OpenAI oder vergleichbare Anbieter eingesetzt werden, sofern dies für den jeweiligen Zweck erforderlich ist.",
    newsletterNote:
        "Wenn Du optional in den Erhalt von Gedanken, Einladungen oder ähnlichen E-Mails einwilligst, verarbeite ich Deine E-Mail-Adresse auf Grundlage Deiner Einwilligung. Du kannst diese Einwilligung jederzeit widerrufen.",
    videoEmbedNote:
        "Wenn externe Medien wie YouTube- oder Vimeo-Videos eingebettet werden, können beim Laden des Videos Daten an den jeweiligen Anbieter übertragen werden. Solche Inhalte sollten möglichst erst nach Deiner aktiven Auswahl geladen werden.",
}

addPropertyControls(Datenschutz, {
    ownerName: { type: ControlType.String, title: "Name", defaultValue: "Raphael Baruch" },
    street: { type: ControlType.String, title: "Street", defaultValue: "Gubener Straße 30" },
    city: { type: ControlType.String, title: "City", defaultValue: "10243 Berlin" },
    email: { type: ControlType.String, title: "Email", defaultValue: "rb@raphaelbaruch.com" },
    phone: { type: ControlType.String, title: "Phone", defaultValue: "+49 1711 02 07 92" },
    siteUrl: { type: ControlType.String, title: "Site URL", defaultValue: "https://www.raphaelbaruch.com" },
    lastUpdated: { type: ControlType.String, title: "Updated", defaultValue: "Mai 2026" },
    legalIntro: {
        type: ControlType.String,
        title: "Intro",
        displayTextArea: true,
        defaultValue:
            "Klartext darüber, welche Daten auf dieser Website und bei einer Anfrage verarbeitet werden.",
    },
    hostingProvider: {
        type: ControlType.String,
        title: "Hosting",
        defaultValue: "Framer / eingesetzte technische Infrastruktur",
    },
    hostingNote: {
        type: ControlType.String,
        title: "Hosting Note",
        displayTextArea: true,
        defaultValue:
            "Diese Website wird über Framer bzw. die dafür eingesetzte technische Infrastruktur bereitgestellt. Dabei werden technisch notwendige Zugriffsdaten verarbeitet, um die Website auszuliefern, abzusichern und stabil zu betreiben.",
    },
    analyticsNote: {
        type: ControlType.String,
        title: "Analytics",
        displayTextArea: true,
        defaultValue:
            "Aktuell ist kein eigenständiges Analyse- oder Tracking-Setup dokumentiert. Falls später Analyse-Tools wie Google Analytics, Meta Pixel oder ähnliche Dienste eingesetzt werden, muss dieser Abschnitt vor Veröffentlichung konkret ergänzt und gegebenenfalls ein Consent-Banner eingerichtet werden.",
    },
    cookieNote: {
        type: ControlType.String,
        title: "Cookies",
        displayTextArea: true,
        defaultValue:
            "Die Website nutzt nur technisch notwendige Speicherungen, soweit diese für Betrieb, Darstellung oder Sicherheit erforderlich sind. Ein darüber hinausgehendes Tracking ist in diesem Standardtext nicht als aktiv angenommen.",
    },
    formProviderNote: {
        type: ControlType.String,
        title: "Forms",
        displayTextArea: true,
        defaultValue:
            "Für Case Briefs und Anfragen kann ein Formular auf der Website genutzt werden. Die technische Verarbeitung kann über Framer, n8n, Supabase, Google Workspace und E-Mail-Dienstleister erfolgen.",
    },
    automationProviderNote: {
        type: ControlType.String,
        title: "Automation",
        displayTextArea: true,
        defaultValue:
            "Für Automatisierung und interne Dokumentation können n8n, Supabase, Google Drive/Docs und Resend oder ein vergleichbarer E-Mail-Dienstleister eingesetzt werden.",
    },
    aiProviderNote: {
        type: ControlType.String,
        title: "AI",
        displayTextArea: true,
        defaultValue:
            "Für interne Vorbereitung und Zusammenfassungen können AI-Dienste wie Anthropic, OpenAI oder vergleichbare Anbieter eingesetzt werden, sofern dies für den jeweiligen Zweck erforderlich ist.",
    },
    newsletterNote: {
        type: ControlType.String,
        title: "Newsletter",
        displayTextArea: true,
        defaultValue:
            "Wenn Du optional in den Erhalt von Gedanken, Einladungen oder ähnlichen E-Mails einwilligst, verarbeite ich Deine E-Mail-Adresse auf Grundlage Deiner Einwilligung. Du kannst diese Einwilligung jederzeit widerrufen.",
    },
    videoEmbedNote: {
        type: ControlType.String,
        title: "Embeds",
        displayTextArea: true,
        defaultValue:
            "Wenn externe Medien wie YouTube- oder Vimeo-Videos eingebettet werden, können beim Laden des Videos Daten an den jeweiligen Anbieter übertragen werden. Solche Inhalte sollten möglichst erst nach Deiner aktiven Auswahl geladen werden.",
    },
})
