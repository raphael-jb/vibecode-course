import React, { useEffect, useState } from "react"
import { addPropertyControls, ControlType, motion, RenderTarget } from "framer"

/**
 * CollaborativeFAQ (RESPONSIVE)
 * ──────────────────────────────
 * A high-end editorial FAQ section.
 * - Architecture: centered header + centered accordion list.
 * - Design: Instrument Serif H2, 400 weight only.
 * - Interaction: Focus mode + No/Solid borders only.
 * - SEO: Always renders answers in DOM, toggles visibility via CSS/Motion.
 */

const COLORS = {
    brand01: "#9C73FF",
    brand02: "#FF6403",
    backgroundAlt: "#FCF8F1",
    textPrimary: "#000000",
    textSecondary: "#767676",
    borderPrimary: "#E5E5E5",
}

const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500&display=swap');
    
    .rb-faq-grid {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 56px;
        width: 100%;
        max-width: 920px;
    }

    .rb-faq-left { width: 100%; }
    .rb-faq-right { width: 100%; max-width: 780px; }

    .rb-faq-doodles {
        position: relative;
        height: 160px;
        margin-top: 24px;
    }

    /* Tablet Breakpoint: 1024px */
    @media (max-width: 1024px) {
        .rb-faq-grid { 
            gap: 40px; 
        }
        .rb-faq-left { position: relative !important; top: 0 !important; }
        .rb-faq-doodles { height: 120px; margin-top: 16px; }
    }

    /* Mobile Breakpoint: 600px */
    @media (max-width: 600px) {
        .rb-faq-container { padding: 64px 24px !important; }
        .rb-faq-grid { gap: 24px; }
        .rb-faq-doodles { height: 100px; margin-top: 12px; }
    }
`

const TYPE_PRESETS = {
    desktop: {
        title: 65,
        subtitle: 20,
        question: 28,
        answer: 18,
        ctaTitle: 32,
        cardPadding: 32,
    },
    tablet: {
        S: { title: 42, subtitle: 16, question: 21, answer: 15, ctaTitle: 24, cardPadding: 24 },
        M: { title: 48, subtitle: 17, question: 23, answer: 16, ctaTitle: 26, cardPadding: 28 },
        L: { title: 54, subtitle: 18, question: 25, answer: 17, ctaTitle: 28, cardPadding: 30 },
    },
    mobile: {
        S: { title: 34, subtitle: 15, question: 19, answer: 14, ctaTitle: 21, cardPadding: 20 },
        M: { title: 38, subtitle: 16, question: 21, answer: 15, ctaTitle: 23, cardPadding: 22 },
        L: { title: 42, subtitle: 17, question: 23, answer: 16, ctaTitle: 25, cardPadding: 24 },
    },
}

export default function CollaborativeFAQ(props) {
    const { 
        items, 
        title, 
        subtitle, 
        doodle1, 
        doodle2, 
        doodle3, 
        ctaLabel, 
        ctaHref,
        accentColor,
        borderWidth,
        borderColor,
        tabletTextSize,
        mobileTextSize,
    } = props

    const [openIndex, setOpenIndex] = useState(null)
    const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop")
    const hasDoodles = doodle1 || doodle2 || doodle3
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    useEffect(() => {
        if (isCanvas) return
        const check = () => {
            if (window.innerWidth <= 600) setViewport("mobile")
            else if (window.innerWidth <= 1024) setViewport("tablet")
            else setViewport("desktop")
        }
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    const type =
        viewport === "mobile"
            ? TYPE_PRESETS.mobile[mobileTextSize || "M"]
            : viewport === "tablet"
              ? TYPE_PRESETS.tablet[tabletTextSize || "M"]
              : TYPE_PRESETS.desktop

    return (
        <section className="rb-faq-container" style={{
            width: "100%",
            backgroundColor: "#FFFFFF",
            padding: "128px 40px",
            display: "flex",
            justifyContent: "center",
            boxSizing: "border-box",
        }}>
            <style>{STYLES}</style>
            
            <div className="rb-faq-grid">
                
                {/* Left Column: Brand & Doodles */}
                <div className="rb-faq-left" style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 16,
                    height: "fit-content",
                    textAlign: "center",
                }}>
                    <h2 className="rb-faq-title" style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: type.title,
                        fontWeight: 400,
                        lineHeight: 1.0,
                        color: COLORS.textPrimary,
                        margin: 0,
                        maxWidth: 720,
                    }}>
                        {title.split("*").map((p, i) => (
                            <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>{p}</span>
                        ))}
                    </h2>
                    <p className="rb-faq-subtitle" style={{
                        fontFamily: "'Inter Tight', sans-serif",
                        fontSize: type.subtitle,
                        fontWeight: 300,
                        color: COLORS.textSecondary,
                        maxWidth: 560,
                        margin: 0,
                        lineHeight: 1.45,
                    }}>
                        {subtitle}
                    </p>

                    {hasDoodles && (
                        <div className="rb-faq-doodles">
                            {doodle1 && <img src={doodle1} style={{ position: "absolute", width: 60, left: 0, top: 0 }} alt="" />}
                            {doodle2 && <img src={doodle2} style={{ position: "absolute", width: 70, left: 80, top: 20 }} alt="" />}
                            {doodle3 && <img src={doodle3} style={{ position: "absolute", width: 50, left: 40, top: 80 }} alt="" />}
                        </div>
                    )}
                </div>

                {/* Right Column: Accordion */}
                <div className="rb-faq-right" style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 12,
                    alignItems: "stretch",
                }}>
                    {items.map((item, i) => {
                        const isOpen = openIndex === i
                        const isSomethingOpen = openIndex !== null
                        const shouldFade = isSomethingOpen && !isOpen

                        return (
                            <motion.div
                                key={i}
                                className="rb-faq-card"
                                onClick={() => setOpenIndex(isOpen ? null : i)}
                                animate={{ 
                                    opacity: shouldFade ? 0.3 : 1,
                                }}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                style={{
                                    backgroundColor: COLORS.backgroundAlt,
                                    borderRadius: 16,
                                    padding: type.cardPadding,
                                    cursor: "pointer",
                                    border: `${borderWidth}px solid ${borderColor}`,
                                    position: "relative",
                                }}
                            >
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: 16,
                                }}>
                                    <h4 style={{
                                        fontFamily: "'Instrument Serif', serif",
                                        fontSize: type.question,
                                        fontWeight: 400,
                                        color: COLORS.textPrimary,
                                        margin: 0,
                                        lineHeight: 1.1,
                                    }}>
                                        {item.question}
                                    </h4>
                                    <motion.div
                                        animate={{ rotate: isOpen ? 135 : 0 }}
                                        style={{ fontSize: 24, color: accentColor, fontWeight: 300 }}
                                    >
                                        +
                                    </motion.div>
                                </div>

                                <motion.div
                                    initial={false}
                                    animate={{ 
                                        height: isOpen ? "auto" : 0, 
                                        opacity: isOpen ? 1 : 0, 
                                        marginTop: isOpen ? 24 : 0 
                                    }}
                                    transition={{ type: "spring", stiffness: 200, damping: 25 }}
                                    style={{ overflow: "hidden" }}
                                >
                                    <p style={{
                                        fontFamily: "'Inter Tight', sans-serif",
                                        fontSize: type.answer,
                                        fontWeight: 300,
                                        lineHeight: 1.5,
                                        color: COLORS.textSecondary,
                                        margin: 0,
                                    }}>
                                        {item.answer}
                                    </p>
                                </motion.div>
                            </motion.div>
                        )
                    })}

                    {/* CTA Card */}
                    <motion.a
                        href={ctaHref}
                        whileHover={{ y: -2 }}
                        style={{
                            backgroundColor: COLORS.brand02,
                            borderRadius: 16,
                            padding: type.cardPadding,
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            textDecoration: "none",
                            marginTop: 12,
                        }}
                    >
                        <div>
                            <span style={{ 
                                fontFamily: "'Inter Tight', sans-serif", 
                                fontSize: 11, 
                                fontWeight: 500, 
                                color: "rgba(255,255,255,0.6)",
                                textTransform: "uppercase",
                                letterSpacing: "0.08em"
                            }}>
                                Noch Fragen offen?
                            </span>
                            <h4 style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: type.ctaTitle,
                                fontWeight: 400,
                                color: "#FFFFFF",
                                margin: "4px 0 0",
                            }}>
                                {ctaLabel}
                            </h4>
                        </div>
                        <div style={{ fontSize: 28, color: "#FFFFFF" }}>→</div>
                    </motion.a>
                </div>
            </div>
        </section>
    )
}

CollaborativeFAQ.defaultProps = {
    title: "Noch Fragen *offen?*",
    subtitle: "Wir klären alles, was Dir auf dem Herzen liegt. Direkt, ehrlich und ohne Berater-Sprech.",
    accentColor: COLORS.brand02,
    ctaLabel: "Lass uns persönlich sprechen",
    ctaHref: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    borderWidth: 0,
    borderColor: COLORS.borderPrimary,
    tabletTextSize: "M",
    mobileTextSize: "M",
    items: [
        { 
            question: "Ist das Coaching oder Consulting?", 
            answer: "Es ist beides – und mehr. Ich nenne es Executive Sparring: näher am Coaching als am Consulting, aber mit unternehmerischer Substanz. Wir arbeiten an Dir als Führungskraft und gleichzeitig an den harten Business-Zielen."
        },
        { 
            question: "Wie schnell sehen wir Ergebnisse?", 
            answer: "Oft schon nach der ersten Session. Sparring ist auf unmittelbare Entlastung und Klarheit ausgelegt, nicht auf monatelange Analysephasen." 
        },
        { 
            question: "Was, wenn ich gar keine Zeit habe?", 
            answer: "Genau dann brauchst Du es am meisten. Wir strukturieren die Zusammenarbeit so, dass sie Dich entlastet, statt Deinen Terminkalender noch voller zu machen." 
        },
    ]
}

addPropertyControls(CollaborativeFAQ, {
    title: { type: ControlType.String, title: "Title", defaultValue: "Noch Fragen *offen?*" },
    subtitle: { type: ControlType.String, title: "Subtitle", displayTextArea: true },
    accentColor: { type: ControlType.Color, title: "Accent Color", defaultValue: COLORS.brand02 },
    tabletTextSize: {
        type: ControlType.Enum,
        title: "Tablet Type",
        options: ["S", "M", "L"],
        optionTitles: ["S", "M", "L"],
        defaultValue: "M",
    },
    mobileTextSize: {
        type: ControlType.Enum,
        title: "Mobile Type",
        options: ["S", "M", "L"],
        optionTitles: ["S", "M", "L"],
        defaultValue: "M",
    },
    borderWidth: { type: ControlType.Number, title: "Border Width", min: 0, max: 4, defaultValue: 0 },
    borderColor: { type: ControlType.Color, title: "Border Color", defaultValue: COLORS.borderPrimary },
    doodle1: { type: ControlType.Image, title: "Doodle 1 (Lightbulb)" },
    doodle2: { type: ControlType.Image, title: "Doodle 2 (Message)" },
    doodle3: { type: ControlType.Image, title: "Doodle 3 (Question)" },
    items: {
        type: ControlType.Array,
        title: "FAQ Items",
        control: {
            type: ControlType.Object,
            controls: {
                question: { type: ControlType.String, title: "Question" },
                answer: { type: ControlType.String, title: "Answer", displayTextArea: true },
            }
        }
    },
    ctaLabel: { type: ControlType.String, title: "CTA Label" },
    ctaHref: { type: ControlType.String, title: "CTA URL" },
})
