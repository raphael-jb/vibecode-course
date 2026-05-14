import React, { useState, useEffect } from "react"
import { addPropertyControls, ControlType, motion, AnimatePresence } from "framer"

/**
 * CaseBriefIntake
 * ───────────────
 * High-end editorial intake overlay.
 * Follows the Raphael Baruch design system:
 * - Aesthetics: ThoughtCardPro (Glow, Typography)
 * - Layout: Fixed Header/Footer, Scrollable Body, 9:16 Portrait
 * - Voice: First-person ("Ich")
 */

const COLORS = {
    orange: "#FF6403",
    cream: "#FCF8F1",
    white: "#FFFFFF",
    textPrimary: "#000000",
    textSecondary: "#767676",
    borderPrimary: "#E5E5E5",
    error: "#B23A1A",
}

const FONTS = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Display:wght@300;400&display=swap');
`

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type StepKey =
    | "welcome"
    | "name"
    | "email"
    | "konkreter_anlass"
    | "entscheidung_oder_spannung"
    | "beteiligte"
    | "bisher_versucht"
    | "gutes_ergebnis"
    | "optional"
    | "session_mode"
    | "address"
    | "consent"
    | "submitting"
    | "success"

type StepDef = {
    key: StepKey
    title: string
    question?: string
    placeholder?: string
    optional?: boolean
}

const STEPS: StepDef[] = [
    {
        key: "welcome",
        title: "Dein *Case* — ein klarer Denkraum.",
        question:
            "Zehn Minuten, neun Fragen. Genug Kontext, damit wir die 90 Minuten nicht mit Informationssammlung verbrennen.",
    },
    { key: "name", title: "Wie heißt Du?", placeholder: "Dein Name" },
    { key: "email", title: "Wohin darf ich Dir antworten?", placeholder: "deine@email.de" },
    {
        key: "konkreter_anlass",
        title: "Der *konkrete Anlass.*",
        question: "Was ist passiert oder steht bevor?",
        placeholder: "Beschreib in 3–5 Sätzen die Situation (mind. 30 Zeichen).",
    },
    {
        key: "entscheidung_oder_spannung",
        title: "Die *Entscheidung* oder *Spannung.*",
        question: "Welche Entscheidung oder Spannung steht im Raum?",
        placeholder: "Was ist die Frage, die Du gerade nicht alleine sortiert bekommst? (mind. 30 Zeichen)",
    },
    {
        key: "beteiligte",
        title: "Wer ist *beteiligt*?",
        question: "Direkt oder indirekt — Rollen reichen, keine Namen nötig.",
        placeholder: "z. B. Mitgründer:in, Vorstand, Team-Lead Vertrieb … (mind. 3 Zeichen)",
    },
    {
        key: "bisher_versucht",
        title: "Was hast Du *bisher versucht*?",
        question: "Was hast Du schon angetestet, gedacht, beobachtet?",
        placeholder: "Stichworte reichen. (mind. 3 Zeichen)",
    },
    {
        key: "gutes_ergebnis",
        title: "Was wäre ein *gutes Ergebnis*?",
        question: "Womit würdest Du nach 90 Minuten aus der Session gehen wollen?",
        placeholder: "z. B. eine klare Entscheidungslogik, ein nächster Schritt, eine Sortierung. (mind. 3 Zeichen)",
    },
    {
        key: "optional",
        title: "Wenn Du willst: *etwas mehr Kontext.*",
        question: "Alle Felder optional. Lass leer, was nicht passt.",
        optional: true,
    },
    { key: "session_mode", title: "Wie wollen wir uns *treffen*?" },
    {
        key: "address",
        title: "Wo *treffen* wir uns?",
        question: "Bitte gib die Adresse für unser Live-Sparring an.",
        placeholder: "Straße, Hausnummer, PLZ, Stadt",
    },
    { key: "consent", title: "Eine *kurze Zustimmung.*" },
    { key: "submitting", title: "Einen Moment …" },
    { key: "success", title: "Dein *Case* liegt bei mir." },
]

type Answers = {
    name: string
    email: string
    konkreter_anlass: string
    entscheidung_oder_spannung: string
    beteiligte: string
    bisher_versucht: string
    gutes_ergebnis: string
    dringlichkeit: string
    constraints: string
    aktuelle_hypothese: string
    optionaler_kontext: string
    session_mode: "live" | "online" | ""
    address: string
    consent_data_processing: boolean
    consent_marketing: boolean
}

const EMPTY: Answers = {
    name: "",
    email: "",
    konkreter_anlass: "",
    entscheidung_oder_spannung: "",
    beteiligte: "",
    bisher_versucht: "",
    gutes_ergebnis: "",
    dringlichkeit: "",
    constraints: "",
    aktuelle_hypothese: "",
    optionaler_kontext: "",
    session_mode: "",
    address: "",
    consent_data_processing: false,
    consent_marketing: false,
}

export default function CaseBriefIntake(props) {
    const {
        webhookUrl,
        successCtaLabel,
        successCtaUrl,
        privacyUrl,
        backLabel,
        nextLabel,
        submitLabel,
        submittingLabel,
        errorFallback,
        accentColor,
        backgroundColor,
        cardBorderStyle,
        borderRadius,
        buttonText,
        showButton,
        triggerHash,
        height,
    } = props

    const [isOpen, setIsOpen] = useState(false)
    const [stepIndex, setStepIndex] = useState(0)
    const [answers, setAnswers] = useState<Answers>(EMPTY)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [serverError, setServerError] = useState<string | null>(null)

    const targetHash = `#${triggerHash || "intake"}`

    useEffect(() => {
        if (typeof window === "undefined") return
        const openFromHash = () => {
            if (window.location.hash === targetHash) setIsOpen(true)
        }
        openFromHash()
        window.addEventListener("hashchange", openFromHash)
        return () => window.removeEventListener("hashchange", openFromHash)
    }, [targetHash])

    const step = STEPS[stepIndex]
    const totalStepsForProgress = STEPS.length - 2
    const progress = Math.min((stepIndex / totalStepsForProgress) * 100, 100)

    const set = <K extends keyof Answers>(key: K, value: Answers[K]) => {
        setAnswers((prev) => ({ ...prev, [key]: value }))
        if (errorMessage) setErrorMessage(null)
    }

    const reset = () => {
        setIsOpen(false)
        setStepIndex(0)
        setAnswers(EMPTY)
        setErrorMessage(null)
        setServerError(null)
        if (typeof window !== "undefined" && window.location.hash === targetHash) {
            window.history.replaceState(null, "", window.location.pathname + window.location.search)
        }
    }

    const validateCurrentStep = (): string | null => {
        const val = (key: keyof Answers) => (answers[key] as string).trim()

        switch (step.key) {
            case "name":
                if (val("name").length < 2) return "Bitte nenne mir Deinen Namen (mind. 2 Zeichen)."
                return null
            case "email":
                if (!EMAIL_REGEX.test(val("email")))
                    return "Bitte gib eine gültige E-Mail-Adresse an."
                return null
            case "konkreter_anlass":
                if (val("konkreter_anlass").length < 30)
                    return "Bitte beschreibe den Anlass ausführlicher (mind. 30 Zeichen)."
                return null
            case "entscheidung_oder_spannung":
                if (val("entscheidung_oder_spannung").length < 30)
                    return "Bitte präzisiere das Thema etwas mehr (mind. 30 Zeichen)."
                return null
            case "beteiligte":
                if (val("beteiligte").length < 3)
                    return "Bitte nenne die Beteiligten (mind. 3 Zeichen)."
                return null
            case "bisher_versucht":
                if (val("bisher_versucht").length < 3)
                    return "Bitte beschreibe kurz Deine Versuche (mind. 3 Zeichen)."
                return null
            case "gutes_ergebnis":
                if (val("gutes_ergebnis").length < 3)
                    return "Bitte nenne ein Wunsch-Ergebnis (mind. 3 Zeichen)."
                return null
            case "session_mode":
                if (!answers.session_mode) return "Bitte wähle ein Format aus."
                return null
            case "address":
                if (answers.session_mode === "live" && val("address").length < 10)
                    return "Bitte gib eine vollständige Adresse an (mind. 10 Zeichen)."
                return null
            case "consent":
                if (!answers.consent_data_processing)
                    return "Deine Zustimmung zur Datenverarbeitung ist notwendig."
                return null
            default:
                return null
        }
    }

    const buildPayload = () => {
        const contextParts = []
        if (answers.optionaler_kontext.trim()) contextParts.push(answers.optionaler_kontext.trim())
        if (answers.session_mode === "live" && answers.address.trim()) {
            contextParts.push(`Treffpunkt (Live): ${answers.address.trim()}`)
        }

        return {
            client: {
                name: answers.name.trim(),
                email: answers.email.trim().toLowerCase(),
            },
            case_brief: {
                konkreter_anlass: answers.konkreter_anlass.trim(),
                entscheidung_oder_spannung: answers.entscheidung_oder_spannung.trim(),
                beteiligte: answers.beteiligte.trim(),
                bisher_versucht: answers.bisher_versucht.trim(),
                gutes_ergebnis: answers.gutes_ergebnis.trim(),
                dringlichkeit: answers.dringlichkeit.trim() || null,
                constraints: answers.constraints.trim() || null,
                aktuelle_hypothese: answers.aktuelle_hypothese.trim() || null,
                optionaler_kontext: contextParts.join("\n\n") || null,
            },
            session_mode: answers.session_mode,
            consent: {
                data_processing: answers.consent_data_processing,
                marketing: answers.consent_marketing,
            },
            submitted_at: new Date().toISOString(),
        }
    }

    const submit = async () => {
        if (!webhookUrl) {
            setServerError("Kein Webhook konfiguriert. Bitte schreibe mir direkt an raphael@…")
            setStepIndex(STEPS.findIndex((s) => s.key === "consent"))
            return
        }
        setStepIndex(STEPS.findIndex((s) => s.key === "submitting"))
        try {
            const res = await fetch(webhookUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(buildPayload()),
            })
            if (res.ok) {
                setStepIndex(STEPS.findIndex((s) => s.key === "success"))
                return
            }
            if (res.status === 409) {
                const data = await res.json().catch(() => ({}))
                setServerError(
                    data?.message ||
                        "Es gibt bereits einen offenen Case für diese E-Mail."
                )
            } else if (res.status === 400) {
                setServerError(
                    "Die Validierung ist fehlgeschlagen. Bitte prüfe die Textlängen Deiner Angaben."
                )
            } else {
                setServerError(errorFallback)
            }
            setStepIndex(STEPS.findIndex((s) => s.key === "consent"))
        } catch {
            setServerError(errorFallback)
            setStepIndex(STEPS.findIndex((s) => s.key === "consent"))
        }
    }

    const goNext = () => {
        const validation = validateCurrentStep()
        if (validation) {
            setErrorMessage(validation)
            return
        }
        if (step.key === "consent") {
            submit()
            return
        }
        
        // Skip address step if online
        if (step.key === "session_mode" && answers.session_mode === "online") {
            setStepIndex(STEPS.findIndex(s => s.key === "consent"))
            return
        }

        if (stepIndex < STEPS.length - 1) setStepIndex(stepIndex + 1)
    }

    const goBack = () => {
        if (stepIndex > 0 && step.key !== "submitting" && step.key !== "success") {
            // Skip address step when going back from consent if online
            if (step.key === "consent" && answers.session_mode === "online") {
                setStepIndex(STEPS.findIndex(s => s.key === "session_mode"))
                return
            }
            setStepIndex(stepIndex - 1)
            setErrorMessage(null)
        }
    }

    const renderHeading = (text: string) => {
        const parts = text.split("*")
        return (
            <h2 style={styles.heading}>
                {parts.map((part, i) => (
                    <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>
                        {part}
                    </span>
                ))}
            </h2>
        )
    }

    const glowShadow = `0 10px 40px -10px ${accentColor}44`
    const buttonGlow = `0 4px 20px ${COLORS.orange}66`

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <style>{FONTS}</style>

            {showButton && (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        ...styles.primaryButton,
                        backgroundColor: COLORS.orange,
                        boxShadow: buttonGlow,
                    }}
                >
                    {buttonText}
                </button>
            )}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={styles.overlay}
                        onClick={reset}
                    >
                        <motion.div
                            initial={{ y: 20, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            exit={{ y: 20, opacity: 0, scale: 0.98 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            style={{
                                ...styles.shell,
                                height,
                                backgroundColor,
                                borderRadius,
                                border: `1px ${cardBorderStyle} ${accentColor}`,
                                boxShadow: glowShadow,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div style={{ ...styles.decorativeCircle, background: accentColor }} />

                            {/* Fixed Header */}
                            <div style={styles.header}>
                                {step.key !== "submitting" && step.key !== "success" && (
                                    <div style={styles.progressTrack}>
                                        <motion.div
                                            animate={{ width: `${progress}%` }}
                                            transition={{ duration: 0.3 }}
                                            style={{ ...styles.progressFill, background: accentColor }}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Scrollable Body */}
                            <div style={styles.scrollContainer}>
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={step.key}
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        transition={{ duration: 0.2 }}
                                        style={styles.card}
                                    >
                                        {renderHeading(step.title)}
                                        {step.question && <p style={styles.question}>{step.question}</p>}

                                        <div style={styles.contentArea}>
                                            {step.key === "welcome" && (
                                                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                                                    <p style={styles.bodyText}>
                                                        Session ist ein 90-Minuten-Raum für einen konkreten Case.
                                                        Was Du hier teilst, lese nur ich.
                                                    </p>
                                                    <p style={styles.bodyText}>
                                                        Nutze die Zeit der Vorbereitung, um Dich selbst mental zu
                                                        sammeln. Deine Session beginnt bereits jetzt.
                                                    </p>
                                                </div>
                                            )}

                                            {step.key === "name" && (
                                                <input
                                                    type="text"
                                                    placeholder={step.placeholder}
                                                    value={answers.name}
                                                    onChange={(e) => set("name", e.target.value)}
                                                    style={styles.input}
                                                    autoFocus
                                                />
                                            )}

                                            {step.key === "email" && (
                                                <input
                                                    type="email"
                                                    placeholder={step.placeholder}
                                                    value={answers.email}
                                                    onChange={(e) => set("email", e.target.value)}
                                                    style={styles.input}
                                                    autoFocus
                                                />
                                            )}

                                            {(step.key === "konkreter_anlass" ||
                                                step.key === "entscheidung_oder_spannung" ||
                                                step.key === "beteiligte" ||
                                                step.key === "bisher_versucht" ||
                                                step.key === "gutes_ergebnis") && (
                                                <textarea
                                                    placeholder={step.placeholder}
                                                    value={answers[step.key] as string}
                                                    onChange={(e) =>
                                                        set(step.key as keyof Answers, e.target.value as any)
                                                    }
                                                    style={styles.textarea}
                                                    rows={5}
                                                />
                                            )}

                                            {step.key === "optional" && (
                                                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                                    <LabeledTextarea
                                                        label="Dringlichkeit — warum jetzt?"
                                                        value={answers.dringlichkeit}
                                                        onChange={(v) => set("dringlichkeit", v)}
                                                    />
                                                    <LabeledTextarea
                                                        label="Constraints — was kann realistisch nicht verändert werden?"
                                                        value={answers.constraints}
                                                        onChange={(v) => set("constraints", v)}
                                                    />
                                                    <LabeledTextarea
                                                        label="Deine aktuelle Hypothese — worum könnte es gehen?"
                                                        value={answers.aktuelle_hypothese}
                                                        onChange={(v) => set("aktuelle_hypothese", v)}
                                                    />
                                                    <LabeledTextarea
                                                        label="Optionaler Kontext — Links oder Stichworte, nur wenn hilfreich"
                                                        value={answers.optionaler_kontext}
                                                        onChange={(v) => set("optionaler_kontext", v)}
                                                    />
                                                </div>
                                            )}

                                            {step.key === "session_mode" && (
                                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                                    {(
                                                        [
                                                            { value: "online", label: "Online — per Videocall" },
                                                            { value: "live", label: "Live — in Präsenz (nur nach Absprache)" },
                                                        ] as const
                                                    ).map((opt) => (
                                                        <button
                                                            key={opt.value}
                                                            onClick={() => set("session_mode", opt.value)}
                                                            style={{
                                                                ...styles.option,
                                                                borderColor:
                                                                    answers.session_mode === opt.value
                                                                        ? accentColor
                                                                        : COLORS.borderPrimary,
                                                                color:
                                                                    answers.session_mode === opt.value
                                                                        ? accentColor
                                                                        : COLORS.textPrimary,
                                                                backgroundColor:
                                                                    answers.session_mode === opt.value
                                                                        ? COLORS.white
                                                                        : "transparent",
                                                                boxShadow:
                                                                    answers.session_mode === opt.value
                                                                        ? "0 4px 12px rgba(0,0,0,0.05)"
                                                                        : "none",
                                                            }}
                                                        >
                                                            {opt.label}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {step.key === "address" && (
                                                <input
                                                    type="text"
                                                    placeholder={step.placeholder}
                                                    value={answers.address}
                                                    onChange={(e) => set("address", e.target.value)}
                                                    style={styles.input}
                                                    autoFocus
                                                />
                                            )}

                                            {step.key === "consent" && (
                                                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                                    <ConsentRow
                                                        checked={answers.consent_data_processing}
                                                        onChange={(v) => set("consent_data_processing", v)}
                                                        accentColor={accentColor}
                                                        label={
                                                            <>
                                                                Ich willige ein, dass meine Angaben verarbeitet werden.
                                                                {privacyUrl && (
                                                                    <>
                                                                        {" "}
                                                                        <a
                                                                            href={privacyUrl}
                                                                            target="_blank"
                                                                            rel="noopener noreferrer"
                                                                            style={{ ...styles.link, color: accentColor }}
                                                                        >
                                                                            Datenschutz
                                                                        </a>
                                                                    </>
                                                                )}
                                                                .
                                                            </>
                                                        }
                                                        required
                                                    />
                                                    <ConsentRow
                                                        checked={answers.consent_marketing}
                                                        onChange={(v) => set("consent_marketing", v)}
                                                        accentColor={accentColor}
                                                        label="Optional: Ich möchte gelegentlich Gedanken per E-Mail erhalten."
                                                    />
                                                    {serverError && <div style={styles.serverError}>{serverError}</div>}
                                                </div>
                                            )}

                                            {step.key === "submitting" && (
                                                <p style={styles.bodyText}>{submittingLabel}</p>
                                            )}

                                            {step.key === "success" && (
                                                <>
                                                    <p style={styles.bodyText}>
                                                        Ich lese Deinen Case und melde mich in Kürze bei Dir.
                                                    </p>
                                                    <p style={{ ...styles.bodyText, marginTop: 12 }}>
                                                        Du bekommst gleich eine Bestätigung per Mail.
                                                    </p>
                                                    {successCtaUrl && (
                                                        <a
                                                            href={successCtaUrl}
                                                            style={{
                                                                ...styles.primaryButton,
                                                                backgroundColor: COLORS.orange,
                                                                boxShadow: buttonGlow,
                                                                textDecoration: "none",
                                                                marginTop: 28,
                                                            }}
                                                        >
                                                            {successCtaLabel}
                                                        </a>
                                                    )}
                                                </>
                                            )}
                                        </div>

                                        {/* Safety Bar for content overlap */}
                                        <div style={{ height: 100, flexShrink: 0 }} />
                                    </motion.div>
                                </AnimatePresence>
                            </div>

                            {/* Fixed Footer */}
                            <div style={styles.footer}>
                                {errorMessage && <div style={styles.fieldError}>{errorMessage}</div>}
                                {step.key !== "submitting" && step.key !== "success" && (
                                    <div style={styles.actions}>
                                        {stepIndex > 0 && (
                                            <button onClick={goBack} style={styles.secondaryButton}>
                                                {backLabel}
                                            </button>
                                        )}
                                        <button
                                            onClick={goNext}
                                            style={{
                                                ...styles.primaryButton,
                                                backgroundColor: COLORS.orange,
                                                boxShadow: buttonGlow,
                                            }}
                                        >
                                            {step.key === "consent" ? submitLabel : nextLabel}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

function LabeledTextarea(props: { label: string; value: string; onChange: (value: string) => void }) {
    return (
        <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={styles.optionalLabel}>{props.label}</span>
            <textarea
                value={props.value}
                onChange={(e) => props.onChange(e.target.value)}
                style={{ ...styles.textarea, minHeight: 60 }}
                rows={2}
            />
        </label>
    )
}

function ConsentRow(props: {
    checked: boolean
    onChange: (v: boolean) => void
    label: React.ReactNode
    required?: boolean
    accentColor: string
}) {
    return (
        <label style={{ display: "flex", gap: 12, alignItems: "flex-start", cursor: "pointer" }}>
            <input
                type="checkbox"
                checked={props.checked}
                onChange={(e) => props.onChange(e.target.checked)}
                style={{ marginTop: 4 }}
            />
            <span style={styles.bodyText}>
                {props.label}
                {props.required && <span style={{ color: props.accentColor }}> *</span>}
            </span>
        </label>
    )
}

const styles: Record<string, React.CSSProperties> = {
    overlay: {
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(252, 248, 241, 0.4)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        padding: 20,
    },
    shell: {
        width: 368,
        boxSizing: "border-box",
        fontFamily: "'Inter Display', sans-serif",
        WebkitFontSmoothing: "antialiased",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
    },
    header: {
        padding: "32px 32px 0 32px",
        zIndex: 10,
    },
    footer: {
        padding: "0 32px 32px 32px",
        zIndex: 10,
        background: "transparent",
        marginTop: "auto",
    },
    scrollContainer: {
        width: "100%",
        flex: 1,
        overflowY: "auto",
        padding: "24px 32px 0 32px",
        boxSizing: "border-box",
        zIndex: 2,
        scrollbarWidth: "none",
        msOverflowStyle: "none",
    },
    decorativeCircle: {
        position: "absolute",
        bottom: -20,
        right: -20,
        width: 140,
        height: 140,
        borderRadius: "50%",
        opacity: 0.04,
        zIndex: 1,
        pointerEvents: "none",
    },
    progressTrack: {
        width: "100%",
        height: 3,
        backgroundColor: "rgba(0,0,0,0.05)",
        borderRadius: 2,
        overflow: "hidden",
    },
    progressFill: {
        height: "100%",
    },
    card: {
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
    },
    heading: {
        fontFamily: "'Instrument Serif', serif",
        fontSize: 34,
        lineHeight: 1.05,
        margin: "0 0 12px 0",
        fontWeight: 400,
        color: COLORS.textPrimary,
    },
    question: {
        fontFamily: "'Inter Display', sans-serif",
        fontSize: 16,
        color: COLORS.textSecondary,
        margin: "0 0 24px 0",
        fontWeight: 300,
        lineHeight: 1.45,
    },
    contentArea: {
        flex: 1,
    },
    bodyText: {
        fontFamily: "'Inter Display', sans-serif",
        fontSize: 15,
        lineHeight: 1.55,
        color: COLORS.textPrimary,
        margin: 0,
        fontWeight: 300,
    },
    input: {
        width: "100%",
        padding: 16,
        borderRadius: 14,
        border: `1px solid ${COLORS.borderPrimary}`,
        backgroundColor: COLORS.white,
        fontFamily: "'Inter Display', sans-serif",
        fontSize: 16,
        outline: "none",
        color: COLORS.textPrimary,
        boxSizing: "border-box",
    },
    textarea: {
        width: "100%",
        padding: 16,
        borderRadius: 14,
        border: `1px solid ${COLORS.borderPrimary}`,
        backgroundColor: COLORS.white,
        fontFamily: "'Inter Display', sans-serif",
        fontSize: 16,
        outline: "none",
        color: COLORS.textPrimary,
        resize: "none",
        minHeight: 120,
        lineHeight: 1.5,
        boxSizing: "border-box",
    },
    option: {
        padding: 16,
        borderRadius: 14,
        border: "1px solid",
        fontFamily: "'Inter Display', sans-serif",
        fontSize: 16,
        textAlign: "left",
        cursor: "pointer",
        transition: "all 0.2s ease",
        width: "100%",
        boxSizing: "border-box",
    },
    optionalLabel: {
        fontFamily: "'Inter Display', sans-serif",
        fontSize: 13,
        color: COLORS.textSecondary,
        fontWeight: 400,
    },
    actions: {
        display: "flex",
        gap: 12,
        justifyContent: "flex-end",
        marginTop: 16,
    },
    primaryButton: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 28px",
        minHeight: 52,
        borderRadius: 9999,
        border: "1px solid rgba(255,255,255,0.2)",
        color: COLORS.white,
        fontFamily: "'Inter Display', sans-serif",
        fontWeight: 400,
        cursor: "pointer",
        fontSize: 16,
        lineHeight: 1,
        whiteSpace: "nowrap",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
    },
    secondaryButton: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "14px 28px",
        minHeight: 52,
        borderRadius: 9999,
        border: `1px solid ${COLORS.borderPrimary}`,
        background: COLORS.white,
        color: COLORS.textPrimary,
        fontFamily: "'Inter Display', sans-serif",
        fontWeight: 400,
        cursor: "pointer",
        fontSize: 16,
        lineHeight: 1,
        whiteSpace: "nowrap",
    },
    fieldError: {
        marginBottom: 16,
        color: COLORS.error,
        fontFamily: "'Inter Display', sans-serif",
        fontSize: 14,
        textAlign: "right",
    },
    serverError: {
        marginTop: 8,
        color: COLORS.error,
        fontFamily: "'Inter Display', sans-serif",
        fontSize: 14,
        backgroundColor: "rgba(178,58,26,0.05)",
        padding: 12,
        borderRadius: 12,
    },
    link: {
        textDecoration: "underline",
    },
}

CaseBriefIntake.defaultProps = {
    webhookUrl: "",
    successCtaLabel: "Zur Startseite",
    successCtaUrl: "/",
    privacyUrl: "/datenschutz",
    backLabel: "Zurück",
    nextLabel: "Weiter",
    submitLabel: "Case einreichen",
    submittingLabel: "Wird übermittelt …",
    errorFallback: "Bitte versuche es gleich noch einmal.",
    accentColor: "#FF6403",
    backgroundColor: "#FFFFFF",
    cardBorderStyle: "solid",
    borderRadius: 24,
    buttonText: "Case vorbereiten",
    showButton: true,
    triggerHash: "intake",
    height: 640,
}

addPropertyControls(CaseBriefIntake, {
    buttonText: { type: ControlType.String, title: "Button Text", defaultValue: "Case vorbereiten" },
    showButton: { type: ControlType.Boolean, title: "Button zeigen", defaultValue: true },
    triggerHash: { type: ControlType.String, title: "URL Hash", defaultValue: "intake" },
    height: { type: ControlType.Number, title: "Höhe", defaultValue: 640, min: 400, max: 900 },
    webhookUrl: {
        type: ControlType.String,
        title: "Webhook URL",
        placeholder: "https://n8n...",
    },
    accentColor: {
        type: ControlType.Color,
        title: "Akzentfarbe",
        defaultValue: "#FF6403",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Hintergrund",
        defaultValue: "#FFFFFF",
    },
    cardBorderStyle: {
        type: ControlType.Enum,
        title: "Rahmen",
        options: ["solid", "dashed", "none"],
        optionTitles: ["Solid", "Dashed", "None"],
        defaultValue: "solid",
    },
    borderRadius: {
        type: ControlType.Number,
        title: "Radius",
        defaultValue: 24,
        min: 0,
        max: 64,
    },
    successCtaLabel: { type: ControlType.String, title: "Success CTA", defaultValue: "Zur Startseite" },
    successCtaUrl: { type: ControlType.Link, title: "Success URL" },
    privacyUrl: { type: ControlType.Link, title: "Privacy URL" },
})
