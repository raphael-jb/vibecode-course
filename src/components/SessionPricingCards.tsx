import React, { useEffect, useState } from "react"
import { addPropertyControls, ControlType, motion, RenderTarget } from "framer"

const COLORS = {
    orange: "#FF6403",
    cream: "#FCF8F1",
    white: "#FFFFFF",
    textPrimary: "#000000",
    textSecondary: "#767676",
    border: "rgba(0,0,0,0.08)",
}

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');`
const UTILITY_FONT = "'Inter Display', 'Inter', sans-serif"

function parseItalic(text: string) {
    return (text || "").split("*").map((part, i) => (
        <span key={i} style={{ fontStyle: i % 2 !== 0 ? "italic" : "normal" }}>{part}</span>
    ))
}

function hexToRgba(hex: string, alpha: number): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return `rgba(0,0,0,${alpha})`
    return `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${alpha})`
}

function PriceCard({ item, accentColor, isMobile, isCanvas }) {
    const isFeatured = !!item.featured
    const href = isCanvas ? undefined : item.checkoutUrl

    return (
        <motion.article
            whileHover={!isMobile ? { y: -6 } : undefined}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
            style={{
                minHeight: isMobile ? 520 : 570,
                padding: isMobile ? 24 : 28,
                borderRadius: 16,
                border: isFeatured ? `1.5px solid ${accentColor}` : `1px solid ${COLORS.border}`,
                backgroundColor: COLORS.white,
                boxShadow: isFeatured
                    ? `0 18px 46px ${hexToRgba(accentColor, 0.22)}, 0 2px 12px ${hexToRgba(accentColor, 0.12)}`
                    : "0 18px 46px rgba(0,0,0,0.10), 0 2px 12px rgba(0,0,0,0.05)",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box",
                overflow: "hidden",
            }}
        >
            <div style={{
                minHeight: 38,
                padding: "10px 18px",
                borderRadius: 999,
                backgroundColor: accentColor,
                color: COLORS.white,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-start",
                boxSizing: "border-box",
                boxShadow: `0 10px 24px ${hexToRgba(accentColor, 0.26)}`,
                fontFamily: UTILITY_FONT,
                fontSize: 14,
                fontWeight: 600,
                lineHeight: 1,
            }}>
                {item.pill}
            </div>

            <div style={{ marginTop: 26 }}>
                <h3 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? 46 : 54,
                    fontWeight: 400,
                    fontStyle: "italic",
                    lineHeight: 0.95,
                    color: COLORS.textPrimary,
                    margin: "0 0 24px 0",
                }}>
                    {item.name}
                </h3>

                <p style={{
                    fontFamily: UTILITY_FONT,
                    fontSize: 18,
                    fontWeight: 300,
                    lineHeight: 1.3,
                    color: COLORS.textPrimary,
                    margin: 0,
                    maxWidth: 320,
                }}>
                    {item.description}
                </p>
            </div>

            <div style={{
                height: 1,
                width: "100%",
                backgroundColor: accentColor,
                marginTop: 32,
                opacity: 0.9,
            }} />

            <div style={{
                marginTop: "auto",
                paddingTop: 56,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
            }}>
                <div style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: isMobile ? 62 : 72,
                    fontWeight: 400,
                    fontStyle: "italic",
                    lineHeight: 0.95,
                    color: COLORS.textPrimary,
                    whiteSpace: "nowrap",
                }}>
                    {item.price}
                </div>

                {item.taxNote ? (
                    <div style={{
                        marginTop: 8,
                        fontFamily: UTILITY_FONT,
                        fontSize: 14,
                        fontWeight: 300,
                        fontStyle: "italic",
                        color: COLORS.textSecondary,
                    }}>
                        {item.taxNote}
                    </div>
                ) : null}

                {item.badge ? (
                    <div style={{
                        minWidth: 128,
                        minHeight: 34,
                        marginTop: 38,
                        padding: "6px 20px",
                        borderRadius: 999,
                        background: "linear-gradient(90deg, #9C73FF, #00A8E8, #FFC857)",
                        color: COLORS.white,
                        fontFamily: UTILITY_FONT,
                        fontSize: 22,
                        fontWeight: 600,
                        lineHeight: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxSizing: "border-box",
                    }}>
                        {item.badge}
                    </div>
                ) : null}

                <a
                    href={href}
                    style={{
                        width: "100%",
                        minHeight: 48,
                        marginTop: item.badge ? 24 : 72,
                        borderRadius: 999,
                        backgroundColor: accentColor,
                        color: COLORS.white,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "13px 20px",
                        boxSizing: "border-box",
                        fontFamily: UTILITY_FONT,
                        fontSize: 15,
                        fontWeight: 600,
                        textDecoration: "none",
                        whiteSpace: "nowrap",
                        boxShadow: `0 10px 24px ${hexToRgba(accentColor, 0.22)}`,
                        cursor: "pointer",
                    }}
                >
                    {item.ctaLabel}
                </a>
            </div>
        </motion.article>
    )
}

export default function SessionPricingCards(props) {
    const {
        headline,
        subline,
        items,
        note,
        accentColor,
        background,
        paddingTop,
        paddingBottom,
    } = props

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (isCanvas) return
        const check = () => setIsMobile(window.innerWidth < 900)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    return (
        <section style={{
            width: "100%",
            backgroundColor: background,
            borderRadius: 15,
            paddingTop,
            paddingBottom,
            paddingLeft: isMobile ? 24 : 80,
            paddingRight: isMobile ? 24 : 80,
            boxSizing: "border-box",
        }}>
            <style>{FONT_IMPORT}</style>

            <div style={{
                maxWidth: 1180,
                margin: "0 auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: isMobile ? 40 : 56,
            }}>
                <div style={{
                    maxWidth: 900,
                    textAlign: "center",
                }}>
                    <h2 style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontSize: isMobile ? 46 : 72,
                        fontWeight: 400,
                        lineHeight: 1.05,
                        color: COLORS.textPrimary,
                        margin: 0,
                    }}>
                        {parseItalic(headline)}
                    </h2>

                    {subline ? (
                        <p style={{
                            maxWidth: 620,
                            margin: "24px auto 0 auto",
                            fontFamily: UTILITY_FONT,
                            fontSize: isMobile ? 16 : 18,
                            fontWeight: 300,
                            lineHeight: 1.5,
                            color: COLORS.textSecondary,
                        }}>
                            {subline}
                        </p>
                    ) : null}
                </div>

                <div style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "repeat(3, minmax(0, 1fr))",
                    gap: isMobile ? 20 : 36,
                    alignItems: "stretch",
                }}>
                    {(items || []).map((item, i) => (
                        <PriceCard
                            key={i}
                            item={item}
                            accentColor={accentColor}
                            isMobile={isMobile}
                            isCanvas={isCanvas}
                        />
                    ))}
                </div>

                {note ? (
                    <p style={{
                        maxWidth: 960,
                        margin: 0,
                        fontFamily: UTILITY_FONT,
                        fontSize: isMobile ? 14 : 16,
                        fontWeight: 300,
                        lineHeight: 1.45,
                        color: COLORS.textSecondary,
                        textAlign: "center",
                    }}>
                        {note}
                    </p>
                ) : null}
            </div>
        </section>
    )
}

const DEFAULT_ITEMS = [
    {
        pill: "1 x Session",
        name: "Single",
        description: "Wenn ein Case gerade Gewicht hat und Du ihn sauber sortieren willst.",
        price: "490 EUR",
        taxNote: "zzgl. 19 % MwSt.",
        badge: "",
        ctaLabel: "Session Credit kaufen",
        checkoutUrl: "https://buy.stripe.com/",
        featured: false,
    },
    {
        pill: "3 x Session",
        name: "Triple",
        description: "Wenn mehrere Cases anstehen und Du Dir bewusst Denkraum sichern willst.",
        price: "1.290 EUR",
        taxNote: "zzgl. 19 % MwSt.",
        badge: "- 12 %",
        ctaLabel: "Session Credits kaufen",
        checkoutUrl: "https://buy.stripe.com/",
        featured: true,
    },
    {
        pill: "10 x Session",
        name: "Tenner",
        description: "Wenn Du regelmaessig Zugriff auf einen klaren Resonanzraum haben willst.",
        price: "3.900 EUR",
        taxNote: "zzgl. 19 % MwSt.",
        badge: "- 20 %",
        ctaLabel: "Session Credits kaufen",
        checkoutUrl: "https://buy.stripe.com/",
        featured: false,
    },
]

SessionPricingCards.defaultProps = {
    headline: "Session Credits fuer den Case, der Gewicht hat.",
    subline: "Kaufe eine einzelne Session oder sichere Dir mehrere Credits fuer die Fuehrungsfragen, die nicht zwischen zwei Meetings geloest werden sollten.",
    items: DEFAULT_ITEMS,
    note: "Keine kurzfristige Verfallslogik. Bei Wechsel in Stream oder Transformation werden offene Credits angerechnet.",
    accentColor: COLORS.orange,
    background: COLORS.cream,
    paddingTop: 112,
    paddingBottom: 112,
}

addPropertyControls(SessionPricingCards, {
    headline: {
        type: ControlType.String,
        title: "Headline (*italic*)",
        displayTextArea: true,
        defaultValue: SessionPricingCards.defaultProps.headline,
    },
    subline: {
        type: ControlType.String,
        title: "Subline",
        displayTextArea: true,
        defaultValue: SessionPricingCards.defaultProps.subline,
    },
    note: {
        type: ControlType.String,
        title: "Note",
        displayTextArea: true,
        defaultValue: SessionPricingCards.defaultProps.note,
    },
    accentColor: {
        type: ControlType.Color,
        title: "Accent Color",
        defaultValue: COLORS.orange,
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: COLORS.cream,
    },
    paddingTop: {
        type: ControlType.Number,
        title: "Padding Top",
        defaultValue: 112,
        min: 0,
        max: 240,
        step: 8,
    },
    paddingBottom: {
        type: ControlType.Number,
        title: "Padding Bottom",
        defaultValue: 112,
        min: 0,
        max: 240,
        step: 8,
    },
    items: {
        type: ControlType.Array,
        title: "Packages",
        control: {
            type: ControlType.Object,
            controls: {
                pill: { type: ControlType.String, title: "Pill", defaultValue: "1 x Session" },
                name: { type: ControlType.String, title: "Name", defaultValue: "Single" },
                description: {
                    type: ControlType.String,
                    title: "Description",
                    displayTextArea: true,
                    defaultValue: "Wenn ein Case gerade Gewicht hat.",
                },
                price: { type: ControlType.String, title: "Price", defaultValue: "490 EUR" },
                taxNote: { type: ControlType.String, title: "Tax Note", defaultValue: "zzgl. 19 % MwSt." },
                badge: { type: ControlType.String, title: "Badge", defaultValue: "" },
                ctaLabel: { type: ControlType.String, title: "CTA", defaultValue: "Session Credit kaufen" },
                checkoutUrl: { type: ControlType.String, title: "Stripe URL", defaultValue: "https://buy.stripe.com/" },
                featured: { type: ControlType.Boolean, title: "Featured", defaultValue: false },
            },
        },
        defaultValue: DEFAULT_ITEMS,
        maxCount: 3,
    },
})
