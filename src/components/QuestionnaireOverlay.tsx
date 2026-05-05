import React, { useEffect, useMemo, useState } from "react"
import { addPropertyControls, ControlType, motion, AnimatePresence } from "framer"

/**
 * QuestionnaireOverlay
 * ───────────────────
 * Format-fit quiz for the ProcessSpectrum click-out.
 * - Opens from a direct button click or the configured URL hash.
 * - Scores answers by hidden category values and maps the average to the nearest result page.
 * - Optional lead capture and webhook support for Formspark, Zapier, or Make.
 */

const COLORS = {
    navy: "#0E2616",
    orange: "#FF6403",
    cream: "#FCF8F1",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#0E2616",
    textSecondary: "rgba(14,38,22,0.64)",
    borderPrimary: "rgba(14,38,22,0.14)",
}

const FONTS = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400&display=swap');
`

const SCORE_OPTIONS = ["1", "1.5", "2", "2.5", "3"]
const SCORE_TITLES = [
    "Produkt 1",
    "Zwischen 1/2",
    "Produkt 2",
    "Zwischen 2/3",
    "Produkt 3",
]

const DEFAULT_RESULTS = [
    {
        scoreValue: "1",
        label: "Sofort-Impuls",
        title: "Du brauchst jetzt *Resonanz.*",
        description:
            "Bei Dir geht es nicht um einen langen Prozess, sondern um einen klaren Denkraum für eine konkrete Situation.",
        bullets:
            "Die Entscheidung ist nah genug, dass Tempo zählt.\nDu brauchst kein Konzept, sondern einen guten Spiegel.\nEin Gespräch kann den nächsten Schritt bereits freilegen.",
        image: "",
        ctaText: "Erstgespräch buchen",
        ctaLink: "/erstgespraech",
    },
    {
        scoreValue: "1.5",
        label: "Sofort-Impuls + Clarity Streaming",
        title: "Starte punktuell. *Halte die Spur offen.*",
        description:
            "Dein Thema braucht vermutlich einen schnellen Einstieg, kann aber mehr Tiefe bekommen, sobald die erste Schicht sortiert ist.",
        bullets:
            "Der beste Start ist ein klarer Sofort-Impuls.\nWenn mehr darunterliegt, wird daraus Clarity Streaming.\nSo bleibt der Einstieg leicht, ohne Tiefe zu verlieren.",
        image: "",
        ctaText: "Erstgespräch buchen",
        ctaLink: "/erstgespraech",
    },
    {
        scoreValue: "2",
        label: "Clarity Streaming",
        title: "Du brauchst *Klarheit über Zeit.*",
        description:
            "Dein Thema ist nicht nur akut, sondern vielschichtig. Mehrere fokussierte Denkfenster helfen, aus Druck wieder Orientierung zu machen.",
        bullets:
            "Es gibt mehrere Ebenen, die gleichzeitig wirken.\nDie Entscheidung braucht mehr als eine schnelle Antwort.\nDu willst Deine eigene Logik klarer hören.",
        image: "",
        ctaText: "Erstgespräch buchen",
        ctaLink: "/erstgespraech",
    },
    {
        scoreValue: "2.5",
        label: "Clarity Streaming + Transformation Teaming",
        title: "Beginne bei Dir. *Dann ins System.*",
        description:
            "Die Klärung startet bei Dir, strahlt aber wahrscheinlich ins Team oder in die Organisation aus.",
        bullets:
            "Zuerst braucht es Deine klare Linie.\nDanach kann daraus gemeinsame Ausrichtung entstehen.\nDas Format darf mit dem Thema wachsen.",
        image: "",
        ctaText: "Erstgespräch buchen",
        ctaLink: "/erstgespraech",
    },
    {
        scoreValue: "3",
        label: "Transformation Teaming",
        title: "Du brauchst *Ausrichtung im System.*",
        description:
            "Hier geht es nicht nur um Dich allein. Wenn Team, Organisation oder Veränderungsdynamik mit im Raum sind, braucht es ein gemeinsames Format.",
        bullets:
            "Die Spannung liegt im Zusammenspiel mehrerer Menschen.\nKlarheit muss nicht nur gedacht, sondern geteilt werden.\nDer Prozess braucht Struktur, Rhythmus und gemeinsames Nachhalten.",
        image: "",
        ctaText: "Erstgespräch buchen",
        ctaLink: "/erstgespraech",
    },
]

const DEFAULT_STEPS = [
    {
        title: "Was liegt *gerade* bei Dir?",
        question: "Welche Beschreibung trifft den Kern am besten?",
        type: "select",
        options: [
            { label: "Eine konkrete Entscheidung braucht schnell Resonanz.", scoreValue: "1" },
            { label: "Ein wiederkehrendes Thema bindet zu viel mentale Energie.", scoreValue: "2" },
            { label: "Mein Führungsteam oder meine Organisation braucht neue Ausrichtung.", scoreValue: "3" },
        ],
    },
    {
        title: "Wie viel *Zeitdruck* ist drin?",
        question: "Wann müsste sich etwas spürbar klären?",
        type: "select",
        options: [
            { label: "Sehr bald. Diese Woche wäre gut.", scoreValue: "1" },
            { label: "In den nächsten Wochen, mit etwas Raum zum Denken.", scoreValue: "2" },
            { label: "Über mehrere Monate, weil es größer ist als ein einzelner Moment.", scoreValue: "3" },
        ],
    },
    {
        title: "Wo sitzt der *Druck*?",
        question: "Welche Ebene zieht gerade am stärksten?",
        type: "select",
        options: [
            { label: "In einer akuten Entscheidung, die ich nicht weiter drehen will.", scoreValue: "1" },
            { label: "In mir: zu viele Gedanken, zu wenig echte Sortierung.", scoreValue: "2" },
            { label: "Im System: Team, Rollen, Konflikte oder Veränderung.", scoreValue: "3" },
        ],
    },
    {
        title: "Was wäre ein *gutes Ergebnis*?",
        question: "Womit würdest Du aus dem Format gehen wollen?",
        type: "select",
        options: [
            { label: "Mit einem klaren nächsten Schritt.", scoreValue: "1" },
            { label: "Mit einer stabilen Entscheidungslogik.", scoreValue: "2" },
            { label: "Mit gemeinsamer Ausrichtung und einem tragfähigen Arbeitsmodus.", scoreValue: "3" },
        ],
    },
    {
        title: "Welche Form fühlt sich *richtig* an?",
        question: "Nicht was vernünftig klingt. Was würdest Du wirklich nutzen?",
        type: "select",
        options: [
            { label: "Ein punktueller Denkraum, ohne Prozess drumherum.", scoreValue: "1" },
            { label: "Ein paar fokussierte Sessions mit rotem Faden.", scoreValue: "2" },
            { label: "Ein gemeinsamer Prozess mit meinem Führungsteam.", scoreValue: "3" },
        ],
    },
]

export default function QuestionnaireOverlay(props) {
    const {
        buttonText,
        steps,
        webhookUrl,
        successTitle,
        successMessage,
        quizId,
        anchorId,
        triggerHash,
        bookingLink,
        resultEyebrow,
        resultPages,
        leadTitle,
        leadQuestion,
        leadNamePlaceholder,
        leadEmailPlaceholder,
        backLabel,
        nextLabel,
        submitLabel,
        submittingLabel,
        closeLabel,
        buttonIcon,
        showButton,
    } = props
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const resolvedQuizId = quizId || triggerHash || anchorId || "quiz"
    const targetHash = `#${resolvedQuizId}`

    // Append a Lead Capture step automatically if configured
    const activeSteps = useMemo(() => {
        const configuredSteps = steps?.length ? steps : DEFAULT_STEPS
        const nextSteps = [...configuredSteps]
        if (props.showLeadStep) {
            nextSteps.push({
                title: leadTitle,
                question: leadQuestion,
                type: "lead",
            })
        }
        return nextSteps
    }, [leadQuestion, leadTitle, props.showLeadStep, steps])

    useEffect(() => {
        if (typeof window === "undefined") return
        const openFromHash = () => {
            if (window.location.hash === targetHash) setIsOpen(true)
        }
        openFromHash()
        window.addEventListener("hashchange", openFromHash)
        return () => window.removeEventListener("hashchange", openFromHash)
    }, [targetHash])

    const getOption = (step, optionIndex) => {
        const option = step.options?.[optionIndex]
        if (typeof option === "string") {
            return {
                label: option,
                scoreValue: String(Math.min(optionIndex + 1, 3)),
            }
        }
        return option
    }

    const getResult = () => {
        const configuredResults = resultPages?.length ? resultPages : DEFAULT_RESULTS
        let scoreTotal = 0
        let scoredAnswers = 0

        activeSteps.forEach((step, stepIndex) => {
            if (step.type !== "select") return
            const optionIndex = answers[stepIndex]
            if (optionIndex === undefined) return
            const option = getOption(step, optionIndex)
            const score = Number(option?.scoreValue)
            if (!Number.isFinite(score)) return
            scoreTotal += score
            scoredAnswers += 1
        })

        const averageScore = scoredAnswers ? scoreTotal / scoredAnswers : 2
        const result = configuredResults.reduce((closest, candidate) => {
            const closestDistance = Math.abs(Number(closest.scoreValue) - averageScore)
            const candidateDistance = Math.abs(Number(candidate.scoreValue) - averageScore)
            return candidateDistance < closestDistance ? candidate : closest
        }, configuredResults[0])

        return { ...result, averageScore }
    }

    const totalSteps = activeSteps.length
    const progress = ((currentStep + 1) / totalSteps) * 100
    const result = getResult()
    const resultBullets = (result.bullets || "")
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean)

    const handleSubmit = async () => {
        setIsSubmitting(true)
        
        // Strategy: We send to a webhook (Formspark/Zapier) which triggers the styled email
        if (webhookUrl) {
            try {
                await fetch(webhookUrl, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        form_name: "Questionnaire Results",
                        timestamp: new Date().toISOString(),
                        data: activeSteps.map((step, stepIndex) => {
                            if (step.type === "lead") return null
                            const optionIndex = answers[stepIndex]
                            const option = step.type === "select" ? getOption(step, optionIndex) : null
                            return {
                                question: step.question,
                                answer: option?.label || answers[stepIndex] || "",
                                scoreValue: option?.scoreValue || null,
                            }
                        }).filter(Boolean),
                        result: result.label,
                        score: result.averageScore,
                        lead: {
                            name: answers["lead_name"],
                            email: answers["lead_email"]
                        }
                    }),
                })
            } catch (err) {
                console.error("Submission failed", err)
            }
        } else {
            console.log("No webhook configured. Answers:", answers)
        }

        setIsSubmitting(false)
        setIsSuccess(true)
    }

    const handleNext = () => {
        const step = activeSteps[currentStep]
        const hasAnswer = step.type === "lead"
            ? answers["lead_name"] && answers["lead_email"]
            : answers[currentStep] !== undefined && answers[currentStep] !== ""
        if (!hasAnswer) return

        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1)
        } else {
            handleSubmit()
        }
    }

    const handlePrev = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1)
    }

    const updateAnswer = (key, val) => {
        setAnswers({ ...answers, [key]: val })
    }

    const renderHeading = (text) => {
        const parts = text.split("*")
        return (
            <h2 style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 40,
                lineHeight: 1.0,
                margin: "0 0 16px 0",
                fontWeight: 400,
                color: COLORS.textPrimary,
            }}>
                {parts.map((part, i) => (
                    <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>
                        {part}
                    </span>
                ))}
            </h2>
        )
    }

    const reset = () => {
        setIsOpen(false)
        setCurrentStep(0)
        setAnswers({})
        setIsSuccess(false)
        if (typeof window !== "undefined" && window.location.hash === targetHash) {
            window.history.replaceState(null, "", window.location.pathname + window.location.search)
        }
    }

    return (
        <div id={resolvedQuizId} style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <style>{FONTS}</style>

            {showButton ? (
                <button
                    onClick={() => setIsOpen(true)}
                    style={{
                        backgroundColor: COLORS.orange,
                        color: "white",
                        border: "none",
                        borderRadius: 15,
                        padding: "16px 32px",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: 16,
                        fontWeight: 300,
                        cursor: "pointer",
                    }}
                >
                    {buttonText}
                </button>
            ) : null}

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: "fixed",
                            top: 0, left: 0, right: 0, bottom: 0,
                            backgroundColor: "rgba(0,0,0,0.6)",
                            backdropFilter: "blur(10px)",
                            display: "flex", justifyContent: "center", alignItems: "center",
                            zIndex: 1000, padding: 20,
                        }}
                        onClick={reset}
                    >
                        <motion.div
                            initial={{ y: 50, scale: 0.95, opacity: 0 }}
                            animate={{ y: 0, scale: 1, opacity: 1 }}
                            exit={{ y: 50, scale: 0.95, opacity: 0 }}
                            style={{
                                backgroundColor: COLORS.backgroundAlt,
                                width: "100%", maxWidth: 540,
                                borderRadius: 15, padding: 48,
                                position: "relative",
                                border: `1px solid ${COLORS.borderPrimary}`,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {!isSuccess ? (
                                <>
                                    <div style={{ width: "100%", height: 4, backgroundColor: COLORS.borderPrimary, borderRadius: 2, marginBottom: 40, overflow: "hidden" }}>
                                        <motion.div animate={{ width: `${progress}%` }} style={{ height: "100%", background: COLORS.orange }} />
                                    </div>

                                    <AnimatePresence mode="wait">
                                        <motion.div key={currentStep} initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }}>
                                            {renderHeading(activeSteps[currentStep].title)}
                                            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: COLORS.textSecondary, margin: "0 0 32px 0", fontWeight: 300 }}>
                                                {activeSteps[currentStep].question}
                                            </p>

                                            {activeSteps[currentStep].type === "text" && (
                                                <input
                                                    type="text"
                                                    placeholder={activeSteps[currentStep].placeholder}
                                                    value={answers[currentStep] || ""}
                                                    onChange={(e) => updateAnswer(currentStep, e.target.value)}
                                                    style={inputStyle}
                                                />
                                            )}

                                            {activeSteps[currentStep].type === "select" && (
                                                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                                                    {activeSteps[currentStep].options?.map((rawOption, optionIndex) => {
                                                        const option = getOption(activeSteps[currentStep], optionIndex)
                                                        return (
                                                            <button
                                                                key={`${currentStep}-${optionIndex}`}
                                                                onClick={() => updateAnswer(currentStep, optionIndex)}
                                                                style={{
                                                                    ...optionStyle,
                                                                    borderColor: answers[currentStep] === optionIndex ? COLORS.orange : COLORS.borderPrimary,
                                                                    backgroundColor: answers[currentStep] === optionIndex ? "white" : "transparent",
                                                                    color: answers[currentStep] === optionIndex ? COLORS.orange : COLORS.textPrimary,
                                                                    boxShadow: answers[currentStep] === optionIndex ? "0 4px 12px rgba(255,100,3,0.1)" : "none",
                                                                }}
                                                            >
                                                                {option?.label}
                                                            </button>
                                                        )
                                                    })}
                                                </div>
                                            )}

                                            {activeSteps[currentStep].type === "lead" && (
                                                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                                                    <input type="text" placeholder={leadNamePlaceholder} value={answers["lead_name"] || ""} onChange={(e) => updateAnswer("lead_name", e.target.value)} style={inputStyle} />
                                                    <input type="email" placeholder={leadEmailPlaceholder} value={answers["lead_email"] || ""} onChange={(e) => updateAnswer("lead_email", e.target.value)} style={inputStyle} />
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
                                        {currentStep > 0 && <button onClick={handlePrev} style={secondaryButtonStyle}>{backLabel}</button>}
                                        <button onClick={handleNext} disabled={isSubmitting} style={primaryButtonStyle}>
                                            <span>{isSubmitting ? submittingLabel : currentStep === totalSteps - 1 ? submitLabel : nextLabel}</span>
                                            {buttonIcon ? <img src={buttonIcon} alt="" style={buttonIconStyle} /> : null}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                                    {result.image ? (
                                        <div style={{
                                            width: "100%",
                                            aspectRatio: "16 / 9",
                                            borderRadius: 15,
                                            overflow: "hidden",
                                            marginBottom: 28,
                                            backgroundColor: "white",
                                            border: `1px solid ${COLORS.borderPrimary}`,
                                        }}>
                                            <img
                                                src={result.image}
                                                alt={result.label}
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover",
                                                    display: "block",
                                                }}
                                            />
                                        </div>
                                    ) : null}
                                    <div style={{
                                        fontFamily: "'Inter', sans-serif",
                                        fontSize: 12,
                                        color: COLORS.orange,
                                        textTransform: "uppercase",
                                        letterSpacing: "0.08em",
                                        marginBottom: 16,
                                    }}>
                                        {resultEyebrow} {result.label}
                                    </div>
                                    {renderHeading(result.title || successTitle)}
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, lineHeight: 1.5, color: COLORS.textSecondary, marginBottom: 24 }}>
                                        {result.description || successMessage}
                                    </p>
                                    {resultBullets.length ? (
                                        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 32 }}>
                                            {resultBullets.map((reason) => (
                                                <div key={reason} style={{
                                                    display: "flex",
                                                    gap: 10,
                                                    alignItems: "flex-start",
                                                    fontFamily: "'Inter', sans-serif",
                                                    fontSize: 14,
                                                    lineHeight: 1.45,
                                                    color: COLORS.textPrimary,
                                                }}>
                                                    <span style={{ color: COLORS.orange }}>•</span>
                                                    <span>{reason}</span>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                                        <a href={result.ctaLink || bookingLink} style={{ ...primaryButtonStyle, textDecoration: "none" }}>
                                            <span>{result.ctaText || "Erstgespräch buchen"}</span>
                                            {buttonIcon ? <img src={buttonIcon} alt="" style={buttonIconStyle} /> : null}
                                        </a>
                                        <button onClick={reset} style={secondaryButtonStyle}>{closeLabel}</button>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const inputStyle = {
    width: "100%", padding: "18px", borderRadius: "15px",
    border: `1px solid ${COLORS.borderPrimary}`, backgroundColor: "white",
    fontFamily: "'Inter', sans-serif", fontSize: "16px", outline: "none", marginBottom: "12px",
}

const optionStyle = {
    padding: "18px", borderRadius: "15px", border: "1px solid",
    fontFamily: "'Inter', sans-serif", fontSize: "16px", textAlign: "left",
    cursor: "pointer", transition: "all 0.2s ease",
}

const primaryButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "16px 30px",
    minHeight: "55px",
    borderRadius: "9999px",
    border: "none",
    backgroundColor: "#8B67F7",
    color: "white",
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: 1,
    whiteSpace: "nowrap",
}

const buttonIconStyle = {
    width: 16,
    height: 16,
    objectFit: "contain",
    flexShrink: 0,
}

const secondaryButtonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px 30px",
    minHeight: "55px",
    borderRadius: "9999px",
    border: `1px solid ${COLORS.borderPrimary}`,
    background: "white",
    color: COLORS.textPrimary,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 400,
    cursor: "pointer",
    fontSize: "16px",
    lineHeight: 1,
    whiteSpace: "nowrap",
}

QuestionnaireOverlay.defaultProps = {
    buttonText: "Format finden",
    quizId: "quiz",
    anchorId: "quiz",
    triggerHash: "quiz",
    bookingLink: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    resultEyebrow: "Passendes Format:",
    showLeadStep: false,
    leadTitle: "Wenn Du willst: *direkt weiter.*",
    leadQuestion: "Wohin darf Raphael Deine Einschätzung schicken?",
    leadNamePlaceholder: "Dein Name",
    leadEmailPlaceholder: "Deine E-Mail",
    backLabel: "Zurück",
    nextLabel: "Weiter",
    submitLabel: "Ergebnis ansehen",
    submittingLabel: "Sende...",
    closeLabel: "Zurück zur Seite",
    buttonIcon: "",
    showButton: true,
    steps: DEFAULT_STEPS,
    resultPages: DEFAULT_RESULTS,
    successTitle: "Dein *Ergebnis.*",
    successMessage: "Das ist die passendste Richtung für Dein Thema.",
}

addPropertyControls(QuestionnaireOverlay, {
    buttonText: { type: ControlType.String, title: "Button Text", defaultValue: "Format finden" },
    showButton: { type: ControlType.Boolean, title: "Show Button", defaultValue: true },
    quizId: { type: ControlType.String, title: "Quiz ID", defaultValue: "quiz" },
    anchorId: { type: ControlType.String, title: "Legacy Anchor", defaultValue: "quiz", hidden: () => true },
    triggerHash: { type: ControlType.String, title: "Legacy Hash", defaultValue: "quiz", hidden: () => true },
    bookingLink: { type: ControlType.String, title: "Booking Link", defaultValue: "https://calendar.app.google/TxnYmbFXwquFFQKK9" },
    resultEyebrow: { type: ControlType.String, title: "Result Eyebrow", defaultValue: "Passendes Format:" },
    webhookUrl: { type: ControlType.String, title: "Webhook URL", placeholder: "e.g. Formspark/Zapier URL" },
    showLeadStep: { type: ControlType.Boolean, title: "Lead Step", defaultValue: false },
    leadTitle: { type: ControlType.String, title: "Lead Title", defaultValue: "Wenn Du willst: *direkt weiter.*", hidden: (p) => !p.showLeadStep },
    leadQuestion: { type: ControlType.String, title: "Lead Question", defaultValue: "Wohin darf Raphael Deine Einschätzung schicken?", hidden: (p) => !p.showLeadStep },
    leadNamePlaceholder: { type: ControlType.String, title: "Name Placeholder", defaultValue: "Dein Name", hidden: (p) => !p.showLeadStep },
    leadEmailPlaceholder: { type: ControlType.String, title: "Email Placeholder", defaultValue: "Deine E-Mail", hidden: (p) => !p.showLeadStep },
    backLabel: { type: ControlType.String, title: "Back Label", defaultValue: "Zurück" },
    nextLabel: { type: ControlType.String, title: "Next Label", defaultValue: "Weiter" },
    submitLabel: { type: ControlType.String, title: "Submit Label", defaultValue: "Ergebnis ansehen" },
    submittingLabel: { type: ControlType.String, title: "Submitting", defaultValue: "Sende..." },
    closeLabel: { type: ControlType.String, title: "Close Label", defaultValue: "Zurück zur Seite" },
    buttonIcon: { type: ControlType.Image, title: "Button Icon" },
    steps: {
        type: ControlType.Array,
        title: "Quiz Questions",
        control: {
            type: ControlType.Object,
            controls: {
                title: { type: ControlType.String, title: "Step Title", defaultValue: "Was liegt *gerade* bei Dir?" },
                question: { type: ControlType.String, title: "Question", defaultValue: "Welche Beschreibung trifft den Kern am besten?" },
                type: { type: ControlType.Enum, title: "Type", options: ["text", "select"], optionTitles: ["Text Input", "Multi Choice"], defaultValue: "select" },
                placeholder: { type: ControlType.String, title: "Placeholder", defaultValue: "Kurz beschreiben...", hidden: (props) => props.type !== "text" },
                options: {
                    type: ControlType.Array,
                    title: "Answers",
                    hidden: (props) => props.type !== "select",
                    control: {
                        type: ControlType.Object,
                        controls: {
                            label: { type: ControlType.String, title: "Answer", defaultValue: "Antwort" },
                            scoreValue: {
                                type: ControlType.Enum,
                                title: "Maps To",
                                options: SCORE_OPTIONS,
                                optionTitles: SCORE_TITLES,
                                defaultValue: "2",
                            },
                        },
                    },
                },
            }
        },
        defaultValue: DEFAULT_STEPS
    },
    resultPages: {
        type: ControlType.Array,
        title: "Result Pages",
        control: {
            type: ControlType.Object,
            controls: {
                scoreValue: {
                    type: ControlType.Enum,
                    title: "Score Zone",
                    options: SCORE_OPTIONS,
                    optionTitles: SCORE_TITLES,
                    defaultValue: "2",
                },
                label: { type: ControlType.String, title: "Label", defaultValue: "Clarity Streaming" },
                title: { type: ControlType.String, title: "Title", defaultValue: "Du brauchst *Klarheit.*" },
                description: { type: ControlType.String, title: "Description", displayTextArea: true, defaultValue: "Kurzer Ergebnistext." },
                bullets: { type: ControlType.String, title: "Bullets", displayTextArea: true, defaultValue: "Ein Punkt pro Zeile." },
                image: { type: ControlType.Image, title: "Image / Icon" },
                ctaText: { type: ControlType.String, title: "CTA Text", defaultValue: "Erstgespräch buchen" },
                ctaLink: { type: ControlType.String, title: "CTA Link", defaultValue: "https://calendar.app.google/TxnYmbFXwquFFQKK9" },
            }
        },
        defaultValue: DEFAULT_RESULTS,
        maxCount: 5,
    },
    successTitle: { type: ControlType.String, title: "Fallback Title", defaultValue: "Dein *Ergebnis.*" },
    successMessage: { type: ControlType.String, title: "Fallback Message", defaultValue: "Das ist die passendste Richtung für Dein Thema." },
})
