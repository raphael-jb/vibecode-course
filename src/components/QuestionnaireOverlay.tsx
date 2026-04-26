import React, { useState } from "react"
import { addPropertyControls, ControlType, motion, AnimatePresence } from "framer"

/**
 * QuestionnaireOverlay
 * ───────────────────
 * A multi-layer questionnaire component for Framer.
 * - Managed via Framer Array controls (Infinite steps).
 * - Lead Capture: Integrated Name/Email collection.
 * - Integration: Webhook support for Formspark, Zapier, or Make.
 */

const COLORS = {
    brand01: "#9C73FF",
    brand02: "#FF6403",
    brand03: "#FFC857",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
    borderPrimary: "#E5E5E5",
}

const FONTS = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400&display=swap');
`

export default function QuestionnaireOverlay(props) {
    const { buttonText, steps, webhookUrl, successTitle, successMessage } = props
    const [isOpen, setIsOpen] = useState(false)
    const [currentStep, setCurrentStep] = useState(0)
    const [answers, setAnswers] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    // Append a Lead Capture step automatically if configured
    const activeSteps = [...steps]
    if (props.showLeadStep) {
        activeSteps.push({
            title: "Let's stay in *touch.*",
            question: "Where should I send your custom analysis?",
            type: "lead",
        })
    }

    const totalSteps = activeSteps.length
    const progress = ((currentStep + 1) / totalSteps) * 100

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
                        data: answers,
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
    }

    return (
        <div style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <style>{FONTS}</style>

            <button
                onClick={() => setIsOpen(true)}
                style={{
                    backgroundColor: COLORS.brand02,
                    color: "white",
                    border: "none",
                    borderRadius: 9999,
                    padding: "16px 32px",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: 16,
                    fontWeight: 300,
                    cursor: "pointer",
                }}
            >
                {buttonText}
            </button>

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
                                borderRadius: 32, padding: 48,
                                position: "relative",
                                border: `1px solid ${COLORS.borderPrimary}`,
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {!isSuccess ? (
                                <>
                                    <div style={{ width: "100%", height: 4, backgroundColor: COLORS.borderPrimary, borderRadius: 2, marginBottom: 40, overflow: "hidden" }}>
                                        <motion.div animate={{ width: `${progress}%` }} style={{ height: "100%", background: `linear-gradient(90deg, ${COLORS.brand02}, ${COLORS.brand01})` }} />
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
                                                    {activeSteps[currentStep].options?.map((option) => (
                                                        <button
                                                            key={option}
                                                            onClick={() => updateAnswer(currentStep, option)}
                                                            style={{
                                                                ...optionStyle,
                                                                borderColor: answers[currentStep] === option ? COLORS.brand02 : COLORS.borderPrimary,
                                                                backgroundColor: answers[currentStep] === option ? "white" : "transparent",
                                                                color: answers[currentStep] === option ? COLORS.brand02 : COLORS.textPrimary,
                                                                boxShadow: answers[currentStep] === option ? "0 4px 12px rgba(255,100,3,0.1)" : "none",
                                                            }}
                                                        >
                                                            {option}
                                                        </button>
                                                    ))}
                                                </div>
                                            )}

                                            {activeSteps[currentStep].type === "lead" && (
                                                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
                                                    <input type="text" placeholder="Your Name" value={answers["lead_name"] || ""} onChange={(e) => updateAnswer("lead_name", e.target.value)} style={inputStyle} />
                                                    <input type="email" placeholder="Your Email" value={answers["lead_email"] || ""} onChange={(e) => updateAnswer("lead_email", e.target.value)} style={inputStyle} />
                                                </div>
                                            )}
                                        </motion.div>
                                    </AnimatePresence>

                                    <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 16 }}>
                                        {currentStep > 0 && <button onClick={handlePrev} style={secondaryButtonStyle}>Back</button>}
                                        <button onClick={handleNext} disabled={isSubmitting} style={primaryButtonStyle}>
                                            {isSubmitting ? "Sending..." : currentStep === totalSteps - 1 ? "Get My Analysis" : "Next"}
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: "center" }}>
                                    {renderHeading(successTitle)}
                                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: COLORS.textSecondary, marginBottom: 32 }}>{successMessage}</p>
                                    <button onClick={reset} style={primaryButtonStyle}>Back to Site</button>
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
    width: "100%", padding: "18px", borderRadius: "16px",
    border: `1px solid ${COLORS.borderPrimary}`, backgroundColor: "white",
    fontFamily: "'Inter', sans-serif", fontSize: "16px", outline: "none", marginBottom: "12px",
}

const optionStyle = {
    padding: "18px", borderRadius: "16px", border: "1px solid",
    fontFamily: "'Inter', sans-serif", fontSize: "16px", textAlign: "left",
    cursor: "pointer", transition: "all 0.2s ease",
}

const primaryButtonStyle = {
    padding: "16px 32px", borderRadius: "9999px", border: "none",
    backgroundColor: COLORS.textPrimary, color: "white",
    fontFamily: "'Inter', sans-serif", cursor: "pointer", fontSize: "16px",
}

const secondaryButtonStyle = {
    padding: "16px 32px", borderRadius: "9999px", border: `1px solid ${COLORS.borderPrimary}`,
    background: "none", fontFamily: "'Inter', sans-serif", cursor: "pointer", fontSize: "16px",
}

addPropertyControls(QuestionnaireOverlay, {
    buttonText: { type: ControlType.String, title: "Button Text", defaultValue: "Start Questionnaire" },
    webhookUrl: { type: ControlType.String, title: "Webhook URL", placeholder: "e.g. Formspark/Zapier URL" },
    showLeadStep: { type: ControlType.Boolean, title: "Lead Step", defaultValue: true },
    steps: {
        type: ControlType.Array,
        title: "Questions",
        control: {
            type: ControlType.Object,
            controls: {
                title: { type: ControlType.String, title: "Step Title", defaultValue: "Let's *talk.*" },
                question: { type: ControlType.String, title: "Question", defaultValue: "What's on your mind?" },
                type: { type: ControlType.Enum, title: "Type", options: ["text", "select"], optionTitles: ["Text Input", "Multi Choice"] },
                placeholder: { type: ControlType.String, title: "Placeholder", defaultValue: "Type here...", hidden: (props) => props.type !== "text" },
                options: { type: ControlType.Array, control: { type: ControlType.String }, title: "Options", hidden: (props) => props.type !== "select" },
            }
        },
        defaultValue: [
            { title: "Let's get *started.*", question: "What is your main goal?", type: "text", placeholder: "e.g. Scaling my business" },
            { title: "Your *experience.*", question: "How many years of experience do you have?", type: "select", options: ["0-2 years", "3-5 years", "5+ years"] },
        ]
    },
    successTitle: { type: ControlType.String, title: "Success Title", defaultValue: "Thank *you.*" },
    successMessage: { type: ControlType.String, title: "Success Message", defaultValue: "Your data has been sent. I'll get back to you within 24 hours." },
})
