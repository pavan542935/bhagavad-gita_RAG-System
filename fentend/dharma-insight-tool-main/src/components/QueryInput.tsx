import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Loader2 } from "lucide-react";

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const QueryInput = ({ onSubmit, isLoading }: QueryInputProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSubmit(query.trim());
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="w-full"
    >
      <div className="bg-card rounded-xl border border-border shadow-[var(--shadow-card)] p-6">
        <label
          htmlFor="gita-query"
          className="block font-display text-lg sm:text-xl font-semibold text-foreground mb-3"
        >
          What's on your mind?
        </label>
        <textarea
          id="gita-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a question about life, duty, or the Bhagavad Gita…"
          rows={4}
          disabled={isLoading}
          className="w-full resize-none rounded-lg border border-input bg-parchment p-4 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all disabled:opacity-50"
        />
        <div className="mt-4 flex justify-end">
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="font-ui inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold shadow-[var(--shadow-warm)] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Seeking wisdom…
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Get Guidance
              </>
            )}
          </button>
        </div>
      </div>
    </motion.form>
  );
};

export default QueryInput;
