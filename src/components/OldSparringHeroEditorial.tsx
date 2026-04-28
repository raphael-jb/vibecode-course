import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

/**
 * SparringHeroEditorial
 * ──────────────────────────────
 * High-end editorial header for the /sparring page.
 * - Architecture: 60/40 Asymmetric Grid (Desktop).
 * - Design: Instrument Serif H1 (96px), Editorial Portrait.
 * - Interaction: SVG bridge animation, parallax portrait, text staggering.
 */

const COLORS = {
    brand02: "#FF6403",
    backgroundAlt: "#FCF8F1",
    navy: "#0E2616",
    textSecondary: "#767676",
}

const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@300;400;500&display=swap');
    
    .rb-sparring-hero-container {
        width: 100%;
        background-color: ${COLORS.backgroundAlt};
        padding: 160px 80px;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        overflow: hidden;
    }

    .rb-sparring-hero-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 80px;
        width: 100%;
        max-width: 1200px;
        align-items: center;
    }

    .rb-hero-content {
        grid-column: span 7;
        z-index: 2;
    }

    .rb-hero-portrait-wrapper {
        grid-column: span 5;
        position: relative;
    }

    .rb-hero-portrait {
        width: 100%;
        height: 600px;
        object-fit: cover;
        border-radius: 8px;
    }

    .rb-hero-title {
        font-family: 'Instrument Serif', serif;
        font-size: 96px;
        line-height: 0.95;
        font-weight: 400;
        color: ${COLORS.navy};
        margin: 0 0 40px;
    }

    .rb-hero-title em {
        font-style: italic;
        color: ${COLORS.brand02};
    }

    .rb-hero-lead {
        font-family: 'Inter Tight', sans-serif;
        font-size: 24px;
        font-weight: 300;
        line-height: 1.4;
        color: ${COLORS.navy};
        max-width: 520px;
        margin: 0;
    }

    /* Tablet Breakpoint: 1024px */
    @media (max-width: 1024px) {
        .rb-sparring-hero-container { padding: 120px 40px; }
        .rb-sparring-hero-grid { 
            display: flex; 
            flex-direction: column; 
            gap: 64px;
            align-items: flex-start;
        }
        .rb-hero-title { font-size: 72px; }
        .rb-hero-portrait { height: 500px; }
    }

    /* Mobile Breakpoint: 600px */
    @media (max-width: 600px) {
        .rb-sparring-hero-container { padding: 80px 24px; }
        .rb-hero-title { font-size: 56px; }
        .rb-hero-lead { font-size: 20px; }
        .rb-hero-portrait { height: 400px; }
    }
`

const swiftySpring = { type: "spring", stiffness: 100, damping: 20 }

export default function SparringHeroEditorial(props) {
    const { 
        title, 
        highlightedWord,
        leadText, 
        image,
        parallaxIntensity = 20
    } = props

    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.3 })
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    const parts = title.split(highlightedWord)

    return (
        <section className="rb-sparring-hero-container" ref={containerRef}>
            <style>{STYLES}</style>
            
            <div className="rb-sparring-hero-grid">
                
                {/* Left: Content */}
                <div className="rb-hero-content">
                    <motion.h1 
                        className="rb-hero-title"
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView || isCanvas ? { opacity: 1, y: 0 } : {}}
                        transition={{ ...swiftySpring, delay: 0.2 }}
                    >
                        {parts[0]}
                        <em>{highlightedWord}</em>
                        {parts[1]}
                        
                        {/* Bridge Doodle SVG */}
                        <svg 
                            width="240" height="40" viewBox="0 0 240 40" fill="none" 
                            style={{ 
                                position: "absolute", 
                                left: "20%", 
                                marginTop: "-10px",
                                pointerEvents: "none",
                                zIndex: -1
                            }}
                        >
                            <motion.path
                                d="M10 30 Q 120 0 230 30"
                                stroke={COLORS.brand02}
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={isInView || isCanvas ? { pathLength: 1 } : {}}
                                transition={{ duration: 1.5, delay: 0.8, ease: "easeInOut" }}
                            />
                        </svg>
                    </motion.h1>

                    <motion.p 
                        className="rb-hero-lead"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView || isCanvas ? { opacity: 1, y: 0 } : {}}
                        transition={{ ...swiftySpring, delay: 0.4 }}
                    >
                        {leadText}
                    </motion.p>
                </div>

                {/* Right: Portrait */}
                <div className="rb-hero-portrait-wrapper">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView || isCanvas ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        whileHover={{ scale: 1.02 }}
                        style={{ overflow: "hidden", borderRadius: 8 }}
                    >
                        <motion.img 
                            src={image} 
                            className="rb-hero-portrait" 
                            alt="Portrait"
                            initial={{ y: 0 }}
                            animate={!isCanvas ? { y: isInView ? 10 : 0 } : {}}
                            style={{ scale: 1.1 }}
                        />
                    </motion.div>
                    
                    {/* Subtile Float Animation for the whole image block */}
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                        style={{ 
                            position: "absolute", 
                            top: -20, 
                            right: -20, 
                            width: 80, 
                            height: 80, 
                            zIndex: -1,
                            backgroundColor: COLORS.brand02,
                            borderRadius: "50%",
                            opacity: 0.1
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

SparringHeroEditorial.defaultProps = {
    title: "Die Brücke zwischen Strategie und Menschlichkeit.",
    highlightedWord: "Menschlichkeit",
    leadText: "An der Spitze gibt es keine isolierten Probleme. Eine strategische Entscheidung hat immer eine menschliche Konsequenz.",
    image: "https://framerusercontent.com/images/kMskLqf8GkP2hYpY9H3uL0U.png", // Fallback image
}

addPropertyControls(SparringHeroEditorial, {
    title: { type: ControlType.String, title: "Title", defaultValue: "Die Brücke zwischen Strategie und Menschlichkeit." },
    highlightedWord: { type: ControlType.String, title: "Highlight Word", defaultValue: "Menschlichkeit" },
    leadText: { type: ControlType.String, title: "Lead Text", displayTextArea: true, defaultValue: "An der Spitze gibt es keine isolierten Probleme. Eine strategische Entscheidung hat immer eine menschliche Konsequenz." },
    image: { type: ControlType.Image, title: "Portrait Image" },
    parallaxIntensity: { type: ControlType.Number, title: "Parallax Intensity", min: 0, max: 100, defaultValue: 20 },
})
