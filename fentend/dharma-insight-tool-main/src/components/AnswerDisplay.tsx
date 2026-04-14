import { motion } from "framer-motion";
import { GitaResponse } from "@/types/gita";
import VersesList from "./VersesList";
import { Sparkles, Heart } from "lucide-react";

interface AnswerDisplayProps {
  data: GitaResponse;
}

const AnswerDisplay = ({ data }: AnswerDisplayProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Direct Answer */}
      <div className="bg-card rounded-xl border border-border shadow-[var(--shadow-card)] p-6 sm:p-8">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-sacred-gold" />
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
            Divine Guidance
          </h3>
        </div>
        <p className="font-body text-foreground leading-relaxed text-base sm:text-lg">
          {data.answer}
        </p>
      </div>

      {/* Verses (optional; backend may return only answer) */}
      {data.verses && data.verses.length > 0 && <VersesList verses={data.verses} />}

      {/* Life Application */}
      {data.life_application && (
        <div className="bg-card rounded-xl border border-border shadow-[var(--shadow-card)] p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Heart className="w-5 h-5 text-accent" />
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
              Life Application
            </h3>
          </div>
          <p className="font-body text-foreground leading-relaxed text-base sm:text-lg">
            {data.life_application}
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default AnswerDisplay;
