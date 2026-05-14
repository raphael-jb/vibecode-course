import React, { useEffect, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"

const FONT_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500&display=swap');`

const COLORS = {
    cream: "#FCF8F1",
    navy: "#0E2616",
    orange: "#FF6403",
    textPrimary: "#000000",
    textSecondary: "#767676",
    border: "#E5E5E5",
}

const FONT_SERIF = "'Instrument Serif', serif"
const FONT_UTILITY = "'Inter Display', 'Inter', sans-serif"

const DEFAULT_ITEMS = [
    "90 min 1:1 mit Raphael",
    "Vorbereitet durch einen Case Brief",
    "Arbeit an einem konkreten Fall",
    "KI-gestützte Summary, nach Raphael-Review",
    "Vertrauliche Behandlung",
]

export default function SessionProductCard(props) {
    const {
        headline,
        subline,
        kicker,
        items,
        signatureGlow,
        background,
        paddingTop,
        paddingBottom,
    } = props

    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        if (isCanvas) return
        const check = () => setIsMobile(window.innerWidth < 768)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [isCanvas])

    const cardBorder = signatureGlow
        ? "1.5px solid #FF6403"
        : `1px solid ${COLORS.border}`

    const cardShadow = signatureGlow
        ? "0 2px 14px rgba(255, 100, 3, 0.25)"
        : "none"

    const zonePadding = isMobile ? 24 : 32

    return (
        <section
            style={{
                width: "100%",
                backgroundColor: background,
                paddingTop,
                paddingBottom,
                paddingLeft: isMobile ? 24 : 80,
                paddingRight: isMobile ? 24 : 80,
                boxSizing: "border-box",
            }}
        >
            <style>{FONT_IMPORT}</style>

            <div
                style={{
                    maxWidth: 640,
                    margin: "0 auto",
                    backgroundColor: "#FFFFFF",
                    borderRadius: 16,
                    border: cardBorder,
                    boxShadow: cardShadow,
                    overflow: "hidden",
                }}
            >
                {/* Header Zone */}
                <div
                    style={{
                        backgroundColor: COLORS.cream,
                        padding: zonePadding,
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                    }}
                >
                    <span
                        style={{
                            fontFamily: FONT_UTILITY,
                            fontSize: 11,
                            fontWeight: 500,
                            letterSpacing: "0.08em",
                            textTransform: "uppercase" as const,
                            color: COLORS.orange,
                        }}
                    >
                        {kicker}
                    </span>

                    <h2
                        style={{
                            fontFamily: FONT_SERIF,
                            fontSize: isMobile ? 28 : 34,
                            fontWeight: 400,
                            lineHeight: 1.05,
                            color: COLORS.textPrimary,
                            margin: 0,
                        }}
                    >
                        {headline}
                    </h2>

                    {subline ? (
                        <p
                            style={{
                                fontFamily: FONT_UTILITY,
                                fontSize: 16,
                                fontWeight: 300,
                                lineHeight: 1.5,
                                color: COLORS.textSecondary,
                                margin: 0,
                            }}
                        >
                            {subline}
                        </p>
                    ) : null}
                </div>

                {/* Divider */}
                <div style={{ height: 1, backgroundColor: COLORS.border }} />

                {/* Content Zone */}
                <div
                    style={{
                        backgroundColor: "#FFFFFF",
                        padding: zonePadding,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                    }}
                >
                    {(items || []).map((item, i) => (
                        <div
                            key={i}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 14,
                            }}
                        >
                            <div
                                style={{
                                    width: 6,
                                    height: 6,
                                    borderRadius: "50%",
                                    backgroundColor: COLORS.orange,
                                    flexShrink: 0,
                                }}
                            />
                            <span
                                style={{
                                    fontFamily: FONT_UTILITY,
                                    fontSize: 16,
                                    fontWeight: 300,
                                    lineHeight: 1.4,
                                    color: COLORS.textPrimary,
                                }}
                            >
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

SessionProductCard.defaultProps = {
    headline: "Was eine Session enthält",
    subline: "",
    kicker: "Session",
    items: DEFAULT_ITEMS,
    signatureGlow: false,
    background: COLORS.cream,
    paddingTop: 96,
    paddingBottom: 96,
}

addPropertyControls(SessionProductCard, {
    headline: {
        type: ControlType.String,
        title: "Headline",
        defaultValue: "Was eine Session enthält",
    },
    subline: {
        type: ControlType.String,
        title: "Subline",
        displayTextArea: true,
        defaultValue: "",
    },
    kicker: {
        type: ControlType.String,
        title: "Kicker",
        defaultValue: "Session",
    },
    items: {
        type: ControlType.Array,
        title: "Items",
        control: {
            type: ControlType.String,
            defaultValue: "Neuer Punkt",
        },
        defaultValue: DEFAULT_ITEMS,
    },
    signatureGlow: {
        type: ControlType.Boolean,
        title: "Signature Glow",
        defaultValue: false,
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#FCF8F1",
    },
    paddingTop: {
        type: ControlType.Number,
        title: "Padding Top",
        defaultValue: 96,
        min: 0,
        max: 220,
        step: 8,
    },
    paddingBottom: {
        type: ControlType.Number,
        title: "Padding Bottom",
        defaultValue: 96,
        min: 0,
        max: 220,
        step: 8,
    },
})
