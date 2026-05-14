import React, { useEffect, useRef, useState } from "react"
import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

/**
 * MasterplanStickyScroll — Pressure Trio
 * ──────────────────────────────────────
 * Mannequin centred in the viewport. Three cards begin stacked over the figure
 * and fly outward to configurable resting positions as the user scrolls,
 * expressing the threefold pressure (Company / Team / Individual) on the leader.
 */

const FONTS = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Display:wght@300;400;500;600&display=swap');
`

const COLORS = {
    brandOrange:   "#FF6403",
    backgroundAlt: "#FCF8F1",
    textPrimary:   "#000000",
    textSecondary: "#767676",
}

// Sequential scroll windows — each card animates within its slice of the run.
const STAGGER_WINDOWS: Array<[number, number]> = [
    [0.05, 0.40],
    [0.25, 0.60],
    [0.45, 0.85],
]
// Shared window when "fly together" is enabled — all cards animate in unison.
const SIMULTANEOUS_WINDOW: [number, number] = [0.1, 0.7]

// ── Card visual (inline ThoughtCardPro look) ─────────────────────────────
function CardVisual({ item }: { item: any }) {
    const headlineParts = (item.headline || "").split("*")

    const borderStyle  = item.borderStyle ?? "solid"
    const borderWidth  = item.borderWidth ?? 1
    const borderColor  = item.borderColor ?? COLORS.brandOrange
    const border = borderStyle === "none"
        ? "none"
        : `${borderWidth}px solid ${borderColor}`

    const shadowX     = item.shadowX     ?? 0
    const shadowY     = item.shadowY     ?? 2
    const shadowBlur  = item.shadowBlur  ?? 14
    const shadowSpread = item.shadowSpread ?? 0
    const shadowColor = item.shadowColor ?? COLORS.brandOrange
    const boxShadow = `${shadowX}px ${shadowY}px ${shadowBlur}px ${shadowSpread}px ${shadowColor}`

    return (
        <div style={{
            background: "#FFFFFF",
            border,
            borderRadius: 16,
            boxShadow,
            padding: 28,
            maxWidth: 420,
            fontFamily: "'Inter Display', sans-serif",
            WebkitFontSmoothing: "antialiased",
            boxSizing: "border-box",
        }}>
            <div style={{
                fontWeight: 500,
                fontSize: 12,
                color: COLORS.brandOrange,
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                marginBottom: 12,
            }}>
                {item.label}
            </div>
            <h3 style={{
                fontFamily: "'Instrument Serif', serif",
                fontWeight: 400,
                fontSize: 32,
                lineHeight: 1.05,
                color: COLORS.textPrimary,
                margin: "0 0 16px",
                letterSpacing: "-0.01em",
            }}>
                {headlineParts.map((p: string, idx: number) => (
                    <span key={idx} style={{ fontStyle: idx % 2 !== 0 ? "italic" : "normal" }}>
                        {p}
                    </span>
                ))}
            </h3>
            <p style={{
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.5,
                color: COLORS.textSecondary,
                margin: 0,
            }}>
                {item.body}
            </p>
        </div>
    )
}

// ── Single fly-out card (extracted so hooks stay stable per instance) ─────
function FlyCard({ item, index, smoothProgress, bpScale, isCanvas, simultaneous }: {
    item: any
    index: number
    smoothProgress: any
    bpScale: number
    isCanvas: boolean
    simultaneous: boolean
}) {
    const win = simultaneous ? SIMULTANEOUS_WINDOW : (STAGGER_WINDOWS[index] || STAGGER_WINDOWS[0])
    const finalX = (item.finalX ?? 0) * bpScale
    const finalY = (item.finalY ?? 0) * bpScale
    const finalRotate = item.finalRotate ?? 0

    const x      = useTransform(smoothProgress, win, [0, finalX])
    const y      = useTransform(smoothProgress, win, [0, finalY])
    const rotate = useTransform(smoothProgress, win, [0, finalRotate])

    return (
        <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: "min(420px, 34vw)",
            transform: "translate(-50%, -50%)",
        }}>
            <motion.div style={{
                x: isCanvas ? finalX : x,
                y: isCanvas ? finalY : y,
                rotate: isCanvas ? finalRotate : rotate,
            }}>
                <CardVisual item={item} />
            </motion.div>
        </div>
    )
}

// ── Component ────────────────────────────────────────────────────────────
export default function MasterplanStickyScroll(props: any) {
    const { items, mannequin, vhPerScroll, background, mannequinHeightVh, simultaneousFly } = props
    const containerRef = useRef<HTMLDivElement>(null)
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const [viewportSize, setViewportSize] = useState<"L" | "M" | "S">("L")

    useEffect(() => {
        if (isCanvas) return
        const checkViewport = () => {
            if (window.innerWidth < 768) setViewportSize("S")
            else if (window.innerWidth < 1200) setViewportSize("M")
            else setViewportSize("L")
        }
        checkViewport()
        window.addEventListener("resize", checkViewport)
        return () => window.removeEventListener("resize", checkViewport)
    }, [isCanvas])

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    })
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100, damping: 30, restDelta: 0.001,
    })
    const mannequinScale = useTransform(smoothProgress, [0, 0.15], [0.92, 1])

    const bpScale  = viewportSize === "M" ? 0.7 : 1
    const cardItems = (items || []).slice(0, 3)

    // ── Mobile: mannequin sticky at top, cards scroll past in front ──────
    if (viewportSize === "S") {
        return (
            <div style={{
                width: "100%",
                background,
                position: "relative",
                fontFamily: "'Inter Display', sans-serif",
                boxSizing: "border-box",
                padding: "60px 24px 80px",
            }}>
                <style>{FONTS}</style>

                {/* Mannequin — at the top of the layout, sticky as a background
                    while user scrolls. Cards (z-index 1) pass over it. */}
                {mannequin && (
                    <div style={{
                        position: "sticky",
                        top: 60,
                        display: "flex",
                        justifyContent: "center",
                        zIndex: 0,
                        pointerEvents: "none",
                        marginBottom: 32,
                    }}>
                        <img
                            src={mannequin}
                            alt=""
                            style={{
                                maxWidth: 240,
                                width: "100%",
                                height: "auto",
                            }}
                        />
                    </div>
                )}

                {/* Cards — original simple stack, fade-up one by one. */}
                <div style={{
                    position: "relative",
                    zIndex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 24,
                }}>
                    {cardItems.map((item: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-10%" }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                        >
                            <CardVisual item={item} />
                        </motion.div>
                    ))}
                </div>
            </div>
        )
    }

    // ── Desktop / Tablet: sticky scroll fly-out ──────────────────────────
    return (
        <div
            ref={containerRef}
            style={{
                width: "100%",
                height: isCanvas ? "100vh" : `${vhPerScroll}vh`,
                backgroundColor: background,
                position: "relative",
            }}
        >
            <style>{FONTS}</style>

            <div style={{
                position: isCanvas ? "relative" : "sticky",
                top: 0,
                height: "100vh",
                width: "100%",
                overflow: "hidden",
            }}>
                {/* Mannequin */}
                {mannequin && (
                    <motion.img
                        src={mannequin}
                        alt=""
                        style={{
                            position: "absolute",
                            top: "50%", left: "50%",
                            x: "-50%",
                            y: "-50%",
                            scale: isCanvas ? 1 : mannequinScale,
                            height: `${mannequinHeightVh}vh`,
                            width: "auto",
                            zIndex: 1,
                            pointerEvents: "none",
                        }}
                    />
                )}

                {/* Cards */}
                <div style={{ position: "absolute", inset: 0, zIndex: 2 }}>
                    {cardItems.map((item: any, i: number) => (
                        <FlyCard
                            key={i}
                            item={item}
                            index={i}
                            smoothProgress={smoothProgress}
                            bpScale={bpScale}
                            isCanvas={isCanvas}
                            simultaneous={simultaneousFly}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

MasterplanStickyScroll.defaultProps = {
    background: COLORS.backgroundAlt,
    vhPerScroll: 250,
    mannequinHeightVh: 38,
    mannequin: "",
    simultaneousFly: false,
    items: [
        {
            label: "Company Ebene",
            headline: "Oben zieht einer. Unten warten *zwanzig.*",
            body: "Vorgesetzte, Geschäftsführung, Investoren — sie wollen Ergebnisse, Tempo, Klarheit. Gleichzeitig schaut Dein Team auf Dich: Orientierung, Entscheidungen, Halt. Du stehst dazwischen. Jeden Tag.",
            finalX: -360, finalY: -180, finalRotate: -3,
            borderStyle: "solid", borderWidth: 1, borderColor: COLORS.brandOrange,
            shadowX: 0, shadowY: 2, shadowBlur: 14, shadowSpread: 0, shadowColor: COLORS.brandOrange,
        },
        {
            label: "Team Ebene",
            headline: "Du gibst alles. Und es reicht *trotzdem nicht.*",
            body: "Du bist da. Du versuchst es. Du führst Gespräche, triffst Entscheidungen, hältst den Laden zusammen. Und trotzdem spürst Du, wie etwas zwischen Dir und Deinem Team stiller wird. Ganz subtil. Aber für Dich klar und deutlich.",
            finalX: 360, finalY: 0, finalRotate: 2,
            borderStyle: "solid", borderWidth: 1, borderColor: COLORS.brandOrange,
            shadowX: 0, shadowY: 2, shadowBlur: 14, shadowSpread: 0, shadowColor: COLORS.brandOrange,
        },
        {
            label: "Individuelle Ebene",
            headline: "Es ist einfach *zu viel.*",
            body: "Zu viel Widerstand. Zu viel Unverständnis. Zu viele Erwartungen von zu vielen Seiten. Zu viele Themen, die alle gleichzeitig brennen. Und das alles machst du mit dir selbst aus. Weil es keine andere Option gibt. Weil du die Person bist, bei der alles landet.",
            finalX: -280, finalY: 200, finalRotate: -2,
            borderStyle: "solid", borderWidth: 1, borderColor: COLORS.brandOrange,
            shadowX: 0, shadowY: 2, shadowBlur: 14, shadowSpread: 0, shadowColor: COLORS.brandOrange,
        },
    ],
}

addPropertyControls(MasterplanStickyScroll, {
    mannequin: {
        type: ControlType.Image,
        title: "Mannequin",
    },
    mannequinHeightVh: {
        type: ControlType.Number,
        title: "Mannequin Größe",
        defaultValue: 38,
        min: 20,
        max: 70,
        step: 1,
        unit: "vh",
    },
    background: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: COLORS.backgroundAlt,
    },
    vhPerScroll: {
        type: ControlType.Number,
        title: "Scroll Length",
        defaultValue: 250,
        min: 150,
        max: 400,
        step: 10,
        unit: "vh",
    },
    simultaneousFly: {
        type: ControlType.Boolean,
        title: "Fly Mode",
        enabledTitle: "Together",
        disabledTitle: "Staggered",
        defaultValue: false,
    },
    items: {
        type: ControlType.Array,
        title: "Cards",
        maxCount: 3,
        control: {
            type: ControlType.Object,
            controls: {
                label:    { type: ControlType.String, title: "Label" },
                headline: { type: ControlType.String, title: "Headline (*italic*)" },
                body:     { type: ControlType.String, title: "Body", displayTextArea: true },
                finalX: {
                    type: ControlType.Number,
                    title: "Final X (px)",
                    defaultValue: -320,
                    min: -800, max: 800, step: 10,
                },
                finalY: {
                    type: ControlType.Number,
                    title: "Final Y (px)",
                    defaultValue: -180,
                    min: -500, max: 500, step: 10,
                },
                finalRotate: {
                    type: ControlType.Number,
                    title: "Tilt (°)",
                    defaultValue: -3,
                    min: -15, max: 15, step: 1,
                },
                borderStyle: {
                    type: ControlType.Enum,
                    title: "Frame",
                    options: ["solid", "none"],
                    optionTitles: ["Solid", "Kein"],
                    defaultValue: "solid",
                },
                borderWidth: {
                    type: ControlType.Number,
                    title: "Frame Width",
                    defaultValue: 1,
                    min: 0, max: 6, step: 0.5,
                    unit: "px",
                    hidden: (p: any) => p.borderStyle === "none",
                },
                borderColor: {
                    type: ControlType.Color,
                    title: "Frame Color",
                    defaultValue: COLORS.brandOrange,
                    hidden: (p: any) => p.borderStyle === "none",
                },
                shadowColor: {
                    type: ControlType.Color,
                    title: "Shadow Color",
                    defaultValue: COLORS.brandOrange,
                },
                shadowX: {
                    type: ControlType.Number,
                    title: "Shadow X",
                    defaultValue: 0,
                    min: -50, max: 50, step: 1,
                    unit: "px",
                },
                shadowY: {
                    type: ControlType.Number,
                    title: "Shadow Y",
                    defaultValue: 2,
                    min: -50, max: 50, step: 1,
                    unit: "px",
                },
                shadowBlur: {
                    type: ControlType.Number,
                    title: "Shadow Blur",
                    defaultValue: 14,
                    min: 0, max: 100, step: 1,
                    unit: "px",
                },
                shadowSpread: {
                    type: ControlType.Number,
                    title: "Shadow Spread",
                    defaultValue: 0,
                    min: -50, max: 50, step: 1,
                    unit: "px",
                },
            },
        },
    },
})
