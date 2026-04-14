import { motion } from "framer-motion";

interface ExamplePromptsProps {
  onSelect: (prompt: string) => void;
}

const prompts = [
  "I failed an exam and feel hopeless.",
  "My parents and I disagree about my career.",
  "I feel anxious about my future.",
  "I'm struggling with anger and resentment.",
  "How do I stay motivated when nothing seems to work?",
  "What does the Gita say about letting go of attachment?",
];

const ExamplePrompts = ({ onSelect }: ExamplePromptsProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="w-full"
    >
      <h3 className="font-display text-base font-semibold text-muted-foreground mb-3">
        Try an example
      </h3>
      <div className="flex flex-wrap gap-2">
        {prompts.map((p) => (
          <button
            key={p}
            onClick={() => onSelect(p)}
            className="font-ui text-sm px-4 py-2 rounded-full border border-border bg-card text-foreground hover:border-primary hover:text-primary transition-colors"
          >
            {p}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ExamplePrompts;
