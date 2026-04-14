import { motion } from "framer-motion";
import { GitaVerse } from "@/types/gita";
import { BookOpen } from "lucide-react";

interface VersesListProps {
  verses: GitaVerse[];
}

const VerseCard = ({ verse, index }: { verse: GitaVerse; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.1 * index }}
    className="bg-verse-bg rounded-xl border border-border p-5 sm:p-6"
  >
    <div className="flex items-center gap-3 mb-3">
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary font-ui text-sm font-semibold">
        <BookOpen className="w-4 h-4" />
        Chapter {verse.chapter}, Verse {verse.verse}
      </span>
      <span className="text-sm font-ui text-muted-foreground">
        — {verse.speaker}
      </span>
    </div>

    {/* Sanskrit */}
    <p className="font-body italic text-foreground/80 text-lg leading-relaxed mb-3">
      {verse.sanskrit}
    </p>

    {/* Translation */}
    <p className="font-body text-foreground leading-relaxed mb-3">
      <span className="font-semibold text-primary font-ui text-xs uppercase tracking-wider block mb-1">
        Translation
      </span>
      {verse.translation}
    </p>

    {/* Explanation */}
    <p className="font-body text-muted-foreground leading-relaxed">
      <span className="font-semibold text-primary font-ui text-xs uppercase tracking-wider block mb-1">
        Explanation
      </span>
      {verse.explanation}
    </p>
  </motion.div>
);

const VersesList = ({ verses }: VersesListProps) => {
  if (!verses?.length) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-foreground">
        📜 Relevant Verses
      </h3>
      <div className="space-y-4">
        {verses.map((v, i) => (
          <VerseCard key={`${v.chapter}-${v.verse}-${i}`} verse={v} index={i} />
        ))}
      </div>
    </div>
  );
};

export default VersesList;
