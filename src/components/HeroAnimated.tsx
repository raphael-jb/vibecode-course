import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { motion, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// ── Bokeh ──────────────────────────────────────────────────────────────────
const BOKEH_COLORS = [
    { r: 255, g: 165, b: 55 },
    { r: 255, g: 85,  b: 40 },
    { r: 255, g: 210, b: 110 },
    { r: 180, g: 130, b: 255 },
    { r: 255, g: 240, b: 200 },
    { r: 255, g: 130, b: 65 },
]
const BOKEH_SCALE: Record<string, number> = {
    off: 0, subtle: 0.45, medium: 1, dreamy: 2.4,
}

// ── Overlay presets ────────────────────────────────────────────────────────
const OVERLAY_STOPS: Record<string, Array<[number, number]>> = {
    light:  [[0, 0.35], [35, 0.05], [50, 0],    [78, 0.45], [100, 0.70]],
    medium: [[0, 0.55], [30, 0.15], [50, 0.05], [78, 0.62], [100, 0.88]],
    dark:   [[0, 0.75], [30, 0.40], [50, 0.25], [78, 0.78], [100, 0.94]],
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
    const m = hex.replace("#", "").match(/^([0-9a-f]{3}|[0-9a-f]{6})$/i)
    if (!m) return { r: 8, g: 5, b: 3 }
    let h = m[1]
    if (h.length === 3) h = h.split("").map((c) => c + c).join("")
    return {
        r: parseInt(h.slice(0, 2), 16),
        g: parseInt(h.slice(2, 4), 16),
        b: parseInt(h.slice(4, 6), 16),
    }
}

function buildOverlay(variant: string, color: string): string {
    const { r, g, b } = hexToRgb(color)
    const stops = (OVERLAY_STOPS[variant] ?? OVERLAY_STOPS.medium)
        .map(([pos, a]) => `rgba(${r},${g},${b},${a}) ${pos}%`)
        .join(", ")
    return `linear-gradient(to bottom, ${stops})`
}

// ── Breakpoint tokens ──────────────────────────────────────────────────────
// L = Desktop ≥ 1024px  →  H1 token: 80px
// M = Tablet  640–1023px →  H1 token: 56px  (between H2 65 / H3 50)
// S = Mobile  < 640px   →  H1 token: 40px  (H4)
type BP = "L" | "M" | "S"

const TOKEN: Record<BP, {
    heroPadding: string
    h1Size: number
    h1MB: number
    subSize: number
    subMaxW: number | string
    subMB: number
    labelMB: number
    ctaHeight: number
    ctaPadding: string
    ctaFontSize: number
    showScroll: boolean
    photoFocus: string
    contentMaxW: number
}> = {
    L: {
        heroPadding:  "0 48px 72px",
        h1Size:        80,
        h1MB:          32,
        subSize:       20,
        subMaxW:       420,
        subMB:         40,
        labelMB:       28,
        ctaHeight:     52,
        ctaPadding:   "0 30px",
        ctaFontSize:   16,
        showScroll:    true,
        photoFocus:   "center 18%",
        contentMaxW:   900,
    },
    M: {
        heroPadding:  "0 32px 60px",
        h1Size:        56,
        h1MB:          24,
        subSize:       18,
        subMaxW:       380,
        subMB:         32,
        labelMB:       22,
        ctaHeight:     48,
        ctaPadding:   "0 26px",
        ctaFontSize:   15,
        showScroll:    true,
        photoFocus:   "center 18%",
        contentMaxW:   680,
    },
    S: {
        heroPadding:  "0 24px 140px",
        h1Size:        40,
        h1MB:          20,
        subSize:       16,
        subMaxW:       "100%",
        subMB:         28,
        labelMB:       18,
        ctaHeight:     48,
        ctaPadding:   "0 22px",
        ctaFontSize:   15,
        showScroll:    false,
        photoFocus:   "65% 18%",
        contentMaxW:   600,
    },
}

// ── Breakpoint hook ────────────────────────────────────────────────────────
function useBreakpoint(): BP {
    const getBP = (): BP => {
        if (typeof window === "undefined") return "L"
        const w = window.innerWidth
        if (w < 640)  return "S"
        if (w < 1024) return "M"
        return "L"
    }
    const [bp, setBP] = useState<BP>(getBP)
    useEffect(() => {
        const onResize = () => setBP(getBP())
        window.addEventListener("resize", onResize)
        return () => window.removeEventListener("resize", onResize)
    }, [])
    return bp
}

// ── Keyframe CSS (animations only — no layout rules) ──────────────────────
const ANIM_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400&display=swap');

@keyframes rbKenBurns {
    0%   { transform: scale(1.00) translate(0, 0); }
    50%  { transform: scale(1.055) translate(-1%, .6%); }
    100% { transform: scale(1.02) translate(.5%, -.4%); }
}
@keyframes rbWarmPulse {
    0%, 100% { opacity: .6; transform: scale(1); }
    50%       { opacity: 1;  transform: scale(1.1); }
}
@keyframes rbScrollDrop {
    0%  { top: -100%; }
    60% { top: 100%;  }
    100%{ top: 100%;  }
}
`

function injectAnimCSS() {
    if (typeof document === "undefined") return
    if (document.getElementById("rb-anim-css")) return
    const el = document.createElement("style")
    el.id = "rb-anim-css"
    el.textContent = ANIM_CSS
    document.head.appendChild(el)
}

// ── Animation variants ─────────────────────────────────────────────────────
const swiftySpring = { type: "spring", stiffness: 300, damping: 36 }

const headlineContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const wordVariant = {
    hidden:   { y: 20, opacity: 0, filter: "blur(10px)" },
    visible:  { y: 0, opacity: 1, filter: "blur(0px)", transition: swiftySpring },
}
const fadeUp = (delay: number) => ({
    hidden:  { opacity: 0, y: 20, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { ...swiftySpring, delay } },
})

// ── Helpers ────────────────────────────────────────────────────────────────
const WordSplitter = ({ text, isItalic = false, accent = false }: { text: string, isItalic?: boolean, accent?: boolean }) => {
    return (
        <>
            {text.split(" ").map((word, i) => (
                <span key={i} style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}>
                    <motion.span
                        variants={wordVariant}
                        style={{ 
                            display: "inline-block", 
                            whiteSpace: "pre",
                            fontStyle: isItalic ? "italic" : "normal",
                            ...(accent ? {
                                background: "linear-gradient(90deg, #FF6403 0%, #9C73FF 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            } : {})
                        }}
                    >
                        {word}{" "}
                    </motion.span>
                </span>
            ))}
        </>
    )
}

// ── Component ──────────────────────────────────────────────────────────────
export default function HeroAnimated({
    heroImage,
    line1Before    = "Wer ist für",
    line1Highlight = "Dich",
    line1After     = "da,",
    line2          = "während Du für alle",
    line3          = "anderen da bist?",
    subline        = "Gestalte einen Raum, in dem es nur um Dich gehen darf.",
    ctaLabel       = "Gespräch vereinbaren",
    ctaHref        = "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    ctaIcon,
    bokehMode      = "medium",
    overlayVariant = "medium",
    overlayColor   = "#080503",
}: {
    heroImage?: string
    line1Before?: string
    line1Highlight?: string
    line1After?: string
    line2?: string
    line3?: string
    subline?: string
    ctaLabel?: string
    ctaHref?: string
    ctaIcon?: string
    bokehMode?: "off" | "subtle" | "medium" | "dreamy"
    overlayVariant?: "light" | "medium" | "dark"
    overlayColor?: string
}) {
    const isCanvas = RenderTarget.current() === RenderTarget.canvas
    const bp       = useBreakpoint()
    const t        = TOKEN[bp]

    const sectionRef = useRef<HTMLElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ptsRef    = useRef<any[]>([])
    const rafRef    = useRef<number>()
    const modeRef   = useRef(bokehMode)

    // Subtle scroll-reveal: overlay is fully visible from the start; scroll drives
    // a gentle vertical parallax on the gradient + a tiny intensification.
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    })
    const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.92, 1])
    const overlayBgPos  = useTransform(scrollYProgress, (v) => `50% ${v * 30}%`)

    useEffect(() => { injectAnimCSS() }, [])
    useEffect(() => { modeRef.current = bokehMode }, [bokehMode])

    // Bokeh
    useEffect(() => {
        if (isCanvas) return
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")!

        const init = () => {
            const W = canvas.width, H = canvas.height
            ptsRef.current = Array.from({ length: 34 }, () => {
                const c = BOKEH_COLORS[Math.floor(Math.random() * BOKEH_COLORS.length)]
                return {
                    x: W * (0.04 + Math.random() * 0.54),
                    y: H * (0.05 + Math.random() * 0.70),
                    r: 16 + Math.random() * 58,
                    c, a: 0.04 + Math.random() * 0.10,
                    vx: (Math.random() - 0.5) * 0.14,
                    vy: -0.07 - Math.random() * 0.12,
                    phase: Math.random() * Math.PI * 2,
                    sp: 0.004 + Math.random() * 0.007,
                }
            })
        }
        const resize = () => {
            canvas.width  = canvas.parentElement?.offsetWidth  ?? window.innerWidth
            canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight
            init()
        }
        const draw = () => {
            rafRef.current = requestAnimationFrame(draw)
            const W = canvas.width, H = canvas.height
            ctx.clearRect(0, 0, W, H)
            const s = BOKEH_SCALE[modeRef.current] ?? 1
            if (!s) return
            for (const p of ptsRef.current) {
                p.x += p.vx; p.y += p.vy
                if (p.y + p.r < 0) { p.y = H + p.r; p.x = W * (0.04 + Math.random() * 0.54) }
                if (p.x < -p.r || p.x > W * 0.62 + p.r) p.x = W * (0.04 + Math.random() * 0.54)
                p.phase += p.sp
                const alpha = p.a * (0.5 + 0.5 * Math.sin(p.phase)) * s
                const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
                g.addColorStop(0,   `rgba(${p.c.r},${p.c.g},${p.c.b},${alpha})`)
                g.addColorStop(0.5, `rgba(${p.c.r},${p.c.g},${p.c.b},${alpha * 0.35})`)
                g.addColorStop(1,   `rgba(${p.c.r},${p.c.g},${p.c.b},0)`)
                ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = g; ctx.fill()
            }
        }
        resize(); draw()
        window.addEventListener("resize", resize)
        return () => {
            window.removeEventListener("resize", resize)
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [isCanvas])

    const initial = isCanvas ? "visible" : "hidden"
    const animate = "visible"

    // Inline animation styles (referencing keyframes injected above)
    const kenBurnsStyle = isCanvas ? {} : {
        animation: "rbKenBurns 20s ease-in-out infinite alternate",
        transformOrigin: "55% 35%",
        willChange: "transform" as const,
    }
    const warmPulseStyle = isCanvas ? {} : {
        animation: "rbWarmPulse 9s ease-in-out infinite",
    }
    const scrollLineAfterStyle = `
        .rb-scroll-track { position: relative; overflow: hidden; border-radius: 2px; }
        .rb-scroll-track::after {
            content: '';
            position: absolute; top: -100%; left: 0;
            width: 100%; height: 100%;
            background: rgba(255,255,255,.7);
            animation: rbScrollDrop 2.2s ease-in-out infinite;
        }
    `

    return (
        <section ref={sectionRef} style={{
            position: "relative",
            width: "100%",
            height: bp === "S" ? "100svh" : "100vh",
            minHeight: 600,
            overflow: "hidden",
            display: "flex",
            alignItems: "flex-end",
            padding: t.heroPadding,
            fontFamily: "'Inter Tight', sans-serif",
            WebkitFontSmoothing: "antialiased",
            background: "#0e0a08",
            boxSizing: "border-box",
        }}>

            {/* Scroll track pseudo-element CSS */}
            {!isCanvas && <style>{scrollLineAfterStyle}</style>}

            {/* Photo */}
            {heroImage ? (
                <img
                    src={heroImage}
                    alt=""
                    style={{
                        position: "absolute",
                        inset: "-5%",
                        width: "110%",
                        height: "110%",
                        objectFit: "cover",
                        objectPosition: t.photoFocus,
                        ...kenBurnsStyle,
                    }}
                />
            ) : (
                <div style={{
                    position: "absolute", inset: 0,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    border: "1px dashed rgba(255,255,255,0.2)",
                }}>
                    <span style={{
                        color: "rgba(255,255,255,0.35)", fontSize: 13,
                        fontFamily: "'Inter Tight', sans-serif", fontWeight: 300,
                    }}>
                        Hero Photo via Property Panel zuweisen
                    </span>
                </div>
            )}

            {/* Overlay — color configurable, gradient parallax-shifts on scroll */}
            <motion.div style={{
                position: "absolute", inset: 0, zIndex: 1,
                background: buildOverlay(overlayVariant, overlayColor),
                backgroundSize: "100% 130%",
                backgroundPosition: isCanvas ? "50% 0%" : overlayBgPos,
                opacity: isCanvas ? 1 : overlayOpacity,
            }} />

            {/* Warm violet pulse */}
            <div style={{
                position: "absolute", inset: 0, zIndex: 2,
                background: "radial-gradient(ellipse 80% 60% at 30% 70%, rgba(156,115,255,0.08) 0%, transparent 60%)",
                ...warmPulseStyle,
            }} />

            {/* Bokeh canvas */}
            {!isCanvas && (
                <canvas ref={canvasRef} style={{
                    position: "absolute", inset: 0, zIndex: 3,
                    pointerEvents: "none",
                    mixBlendMode: "screen",
                }} />
            )}

            {/* ── Content ── */}
            <div style={{
                position: "relative", zIndex: 10,
                maxWidth: t.contentMaxW,
            }}>

                {/* Headline */}
                <motion.h1
                    style={{
                        fontFamily: "'Instrument Serif', serif",
                        fontWeight: 400,
                        fontSize: t.h1Size,
                        lineHeight: 1.0,
                        color: "#fff",
                        margin: `0 0 ${t.h1MB}px`,
                    }}
                    variants={headlineContainer}
                    initial={initial}
                    animate={animate}
                    aria-label={`${line1Before} ${line1Highlight} ${line1After} ${line2} ${line3}`}
                >
                    <span style={{ display: "block", paddingBottom: "0.06em" }}>
                        <WordSplitter text={line1Before} />
                        <WordSplitter text={line1Highlight} isItalic accent />
                        <WordSplitter text={line1After} />
                    </span>
                    <span style={{ display: "block", paddingBottom: "0.06em" }}>
                        <WordSplitter text={line2} />
                    </span>
                    <span style={{ display: "block", paddingBottom: "0.06em" }}>
                        <WordSplitter text={line3} />
                    </span>
                </motion.h1>

                {/* Subline */}
                <motion.p
                    style={{
                        fontWeight: 300,
                        fontSize: t.subSize,
                        lineHeight: 1.35,
                        color: "rgba(255,255,255,0.62)",
                        maxWidth: t.subMaxW,
                        margin: `0 0 ${t.subMB}px`,
                    }}
                    variants={fadeUp(0.4)}
                    initial={initial}
                    animate={animate}
                >
                    {subline}
                </motion.p>

                {/* CTA */}
                <motion.a
                    href={ctaHref}
                    style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#FF6403",
                        color: "#fff",
                        borderRadius: 9999,
                        height: t.ctaHeight,
                        padding: t.ctaPadding,
                        fontWeight: 300,
                        fontSize: t.ctaFontSize,
                        fontFamily: "'Inter Tight', sans-serif",
                        textDecoration: "none",
                        boxShadow: "0 2px 14px #FF6403",
                    }}
                    variants={fadeUp(0.55)}
                    initial={initial}
                    animate={animate}
                    whileHover={{ opacity: 0.88 }}
                >
                    {ctaLabel}
                    {ctaIcon && (
                        <img
                            src={ctaIcon}
                            alt=""
                            style={{
                                height: t.ctaFontSize,
                                width: "auto",
                                display: "block",
                                flexShrink: 0,
                            }}
                        />
                    )}
                </motion.a>
            </div>

            {/* Scroll indicator */}
            {t.showScroll && (
                <motion.div
                    style={{
                        position: "absolute",
                        bottom: bp === "M" ? 28 : 32,
                        right: bp === "M" ? 32 : 48,
                        zIndex: 10,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 8,
                    }}
                    variants={fadeUp(0.7)}
                    initial={initial}
                    animate={animate}
                >
                    <div
                        className={isCanvas ? undefined : "rb-scroll-track"}
                        style={{
                            width: 1, height: 52,
                            background: "rgba(255,255,255,0.18)",
                        }}
                    />
                    <span style={{
                        fontSize: 10, fontWeight: 300,
                        color: "rgba(255,255,255,0.35)",
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                    }}>
                        Scroll
                    </span>
                </motion.div>
            )}

        </section>
    )
}

// ── Property Controls ──────────────────────────────────────────────────────
addPropertyControls(HeroAnimated, {
    heroImage: {
        type: ControlType.Image,
        title: "Hero Photo",
    },
    line1Before: {
        type: ControlType.String,
        title: "Line 1 — Davor",
        defaultValue: "Wer ist für",
    },
    line1Highlight: {
        type: ControlType.String,
        title: "Line 1 — Highlight",
        defaultValue: "Dich",
    },
    line1After: {
        type: ControlType.String,
        title: "Line 1 — Danach",
        defaultValue: "da,",
    },
    line2: {
        type: ControlType.String,
        title: "Line 2",
        defaultValue: "während Du für alle",
    },
    line3: {
        type: ControlType.String,
        title: "Line 3",
        defaultValue: "anderen da bist?",
    },
    subline: {
        type: ControlType.String,
        title: "Subline",
        defaultValue: "Gestalte einen Raum, in dem es nur um Dich gehen darf.",
    },
    ctaLabel: {
        type: ControlType.String,
        title: "CTA Label",
        defaultValue: "Gespräch vereinbaren",
    },
    ctaHref: {
        type: ControlType.String,
        title: "CTA URL",
        defaultValue: "https://calendar.app.google/TxnYmbFXwquFFQKK9",
    },
    ctaIcon: {
        type: ControlType.Image,
        title: "CTA Icon",
    },
    bokehMode: {
        type: ControlType.Enum,
        title: "Bokeh",
        options: ["off", "subtle", "medium", "dreamy"],
        optionTitles: ["Aus", "Subtil", "Mittel", "Viel"],
        defaultValue: "medium",
    },
    overlayVariant: {
        type: ControlType.Enum,
        title: "Overlay",
        options: ["light", "medium", "dark"],
        optionTitles: ["Hell", "Mittel", "Dunkel"],
        defaultValue: "medium",
    },
    overlayColor: {
        type: ControlType.Color,
        title: "Overlay Color",
        defaultValue: "#080503",
    },
})
