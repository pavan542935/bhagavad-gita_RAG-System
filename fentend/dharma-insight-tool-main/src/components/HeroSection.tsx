import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";

interface HeroSectionProps {
  onCtaClick: () => void;
}

const HeroSection = ({ onCtaClick }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="Krishna and Arjuna on the chariot at Kurukshetra"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/60 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Om symbol */}
          <p className="text-5xl mb-6 animate-float text-sacred-gold drop-shadow-lg">ॐ</p>

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primary-foreground drop-shadow-md">
            Find Bhagavad Gita guidance for your real‑life questions
          </h1>

          <p className="font-body text-base sm:text-lg md:text-xl leading-relaxed mb-10 text-primary-foreground/85 max-w-2xl mx-auto">
            Ask your question or share a life situation, and get verse‑exact answers with Sanskrit,
            English translation, and explanation — grounded only in the Bhagavad Gita.
          </p>

          <motion.button
            onClick={onCtaClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="font-ui inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold text-lg shadow-[var(--shadow-warm)] hover:brightness-110 transition-all"
          >
            🙏 Ask the Gita
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
