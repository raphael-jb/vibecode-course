import { addPropertyControls, ControlType, RenderTarget } from "framer"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

/**
 * SparringHeroEditorial (V2 - REFINED)
 * ───────────────────────────────────
 * A high-end editorial header following the Raphael Baruch DNA.
 * - Architecture: Balanced 12-column grid with overlapping elements.
 * - Typography: Instrument Serif H1 (80px), Inter Display (20px).
 * - Colors: Warm Cream (#FCF8F1), Navy (#0E2616), Brand Orange (#FF6403).
 */

const COLORS = {
    brandOrange: "#FF6403",
    backgroundAlt: "#FCF8F1",
    navy: "#0E2616",
    textSecondary: "#767676",
    borderPrimary: "#E5E5E5",
}

const STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter+Display:wght@300;400&display=swap');
    
    .rb-sparring-hero-section {
        width: 100%;
        background-color: ${COLORS.backgroundAlt};
        padding: 128px 40px;
        display: flex;
        justify-content: center;
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
    }

    .rb-sparring-hero-grid {
        display: grid;
        grid-template-columns: repeat(12, 1fr);
        gap: 24px;
        width: 100%;
        max-width: 1200px;
        align-items: center;
        position: relative;
    }

    .rb-hero-content-block {
        grid-column: 1 / span 8;
        z-index: 10;
        pointer-events: none;
    }

    .rb-hero-image-block {
        grid-column: 7 / span 6;
        grid-row: 1;
        z-index: 5;
        position: relative;
    }

    .rb-hero-h1 {
        font-family: 'Instrument Serif', serif;
        font-size: 80px;
        line-height: 1.0;
        font-weight: 400;
        color: ${COLORS.navy};
        margin: 0;
        pointer-events: auto;
    }

    .rb-hero-h1 em {
        font-style: italic;
        color: ${COLORS.brandOrange};
    }

    .rb-hero-description {
        font-family: 'Inter Display', sans-serif;
        font-size: 20px;
        font-weight: 300;
        line-height: 1.4;
        color: ${COLORS.textSecondary};
        max-width: 440px;
        margin: 40px 0 0;
        pointer-events: auto;
    }

    .rb-hero-portrait-frame {
        width: 100%;
        height: 640px;
        border-radius: 32px;
        overflow: hidden;
        box-shadow: 0 4px 16px rgba(0,0,0,0.04);
        position: relative;
    }

    .rb-hero-portrait-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    /* Hand-drawn Bridge SVG Styling */
    .rb-bridge-svg {
        position: absolute;
        top: 65px;
        left: 300px;
        z-index: -1;
        pointer-events: none;
    }

    /* Responsive Adjustments */
    @media (max-width: 1024px) {
        .rb-sparring-hero-section { padding: 96px 24px; }
        .rb-sparring-hero-grid { display: flex; flex-direction: column; gap: 64px; }
        .rb-hero-content-block { width: 100%; order: 1; }
        .rb-hero-image-block { width: 100%; order: 2; margin-top: -32px; }
        .rb-hero-h1 { font-size: 64px; }
        .rb-hero-portrait-frame { height: 480px; }
        .rb-bridge-svg { display: none; }
    }

    @media (max-width: 640px) {
        .rb-hero-h1 { font-size: 48px; }
        .rb-hero-description { font-size: 18px; }
        .rb-hero-portrait-frame { height: 400px; }
    }
`

const swiftySpring = { type: "spring", stiffness: 100, damping: 20 }

export default function SparringHeroEditorial(props) {
    const { 
        title, 
        highlightedWord,
        leadText, 
        image
    } = props

    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.2 })
    const isCanvas = RenderTarget.current() === RenderTarget.canvas

    // Split title by the highlight word to wrap it in an <em> tag
    const parts = title.split(highlightedWord)

    return (
        <section className="rb-sparring-hero-section" ref={containerRef}>
            <style>{STYLES}</style>
            
            <div className="rb-sparring-hero-grid">
                
                {/* Content Layer (Overlaps the image slightly) */}
                <div className="rb-hero-content-block">
                    <motion.h1 
                        className="rb-hero-h1"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView || isCanvas ? { opacity: 1, x: 0 } : {}}
                        transition={{ ...swiftySpring, delay: 0.2 }}
                    >
                        {parts[0]}
                        <motion.em
                            initial={{ opacity: 0 }}
                            animate={isInView || isCanvas ? { opacity: 1 } : {}}
                            transition={{ duration: 0.6, delay: 0.5 }}
                        >
                            {highlightedWord}
                        </motion.em>
                        {parts[1]}
                    </motion.h1>

                    <motion.p 
                        className="rb-hero-description"
                        initial={{ opacity: 0, y: 15 }}
                        animate={isInView || isCanvas ? { opacity: 1, y: 0 } : {}}
                        transition={{ ...swiftySpring, delay: 0.4 }}
                    >
                        {leadText}
                    </motion.p>
                </div>

                {/* Image Layer (Behind the text on desktop) */}
                <div className="rb-hero-image-block">
                    <motion.div
                        className="rb-hero-portrait-frame"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={isInView || isCanvas ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1.2, delay: 0.1, ease: "easeOut" }}
                    >
                        <motion.img 
                            src={image} 
                            className="rb-hero-portrait-img" 
                            alt="Raphael Baruch Editorial Portrait"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.6 }}
                        />
                    </motion.div>

                    {/* Sophisticated Bridge Doodle */}
                    <svg 
                        className="rb-bridge-svg" 
                        width="400" height="120" viewBox="0 0 400 120" fill="none"
                    >
                        <motion.path
                            d="M20 100 C 150 20, 250 20, 380 100"
                            stroke={COLORS.brandOrange}
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView || isCanvas ? { pathLength: 1, opacity: 0.6 } : {}}
                            transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
                        />
                        <motion.path
                            d="M25 105 C 155 25, 255 25, 385 105"
                            stroke={COLORS.brandOrange}
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeDasharray="4 4"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={isInView || isCanvas ? { pathLength: 1, opacity: 0.4 } : {}}
                            transition={{ duration: 2.2, delay: 1, ease: "easeInOut" }}
                        />
                    </svg>
                </div>

            </div>
        </section>
    )
}

SparringHeroEditorial.defaultProps = {
    title: "Die Brücke zwischen Strategie und Menschlichkeit.",
    highlightedWord: "Menschlichkeit",
    leadText: "An der Spitze gibt es keine isolierten Probleme. Eine strategische Entscheidung hat immer eine menschliche Konsequenz — und eine persönliche Verfassung hat immer eine unternehmerische Auswirkung.",
    image: "https://framerusercontent.com/images/kMskLqf8GkP2hYpY9H3uL0U.png",
}

addPropertyControls(SparringHeroEditorial, {
    title: { 
        type: ControlType.String, 
        title: "Title", 
        defaultValue: "Die Brücke zwischen Strategie und Menschlichkeit." 
    },
    highlightedWord: { 
        type: ControlType.String, 
        title: "Italic Word", 
        defaultValue: "Menschlichkeit" 
    },
    leadText: { 
        type: ControlType.String, 
        title: "Lead Text", 
        displayTextArea: true, 
        defaultValue: "An der Spitze gibt es keine isolierten Probleme. Eine strategische Entscheidung hat immer eine menschliche Konsequenz — und eine persönliche Verfassung hat immer eine unternehmerische Auswirkung." 
    },
    image: { 
        type: ControlType.Image, 
        title: "Portrait Image" 
    },
})
