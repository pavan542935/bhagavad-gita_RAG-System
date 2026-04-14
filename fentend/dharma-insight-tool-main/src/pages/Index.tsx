import { useRef, useState, useCallback } from "react";
import HeroSection from "@/components/HeroSection";
import QueryInput from "@/components/QueryInput";
import ExamplePrompts from "@/components/ExamplePrompts";
import AnswerDisplay from "@/components/AnswerDisplay";
import { askGita } from "@/lib/api";
import { GitaResponse } from "@/types/gita";
import { AlertCircle } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<GitaResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const queryRef = useRef<HTMLDivElement>(null);
  const [pendingPrompt, setPendingPrompt] = useState<string | null>(null);

  const scrollToQuery = () => {
    queryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleSubmit = useCallback(async (query: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await askGita(query);
      setResult(data);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleExampleSelect = (prompt: string) => {
    setPendingPrompt(prompt);
    scrollToQuery();
    // Auto-submit after a short delay for scroll
    setTimeout(() => {
      handleSubmit(prompt);
      setPendingPrompt(null);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onCtaClick={scrollToQuery} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
        <div ref={queryRef} className="scroll-mt-8">
          <QueryInput onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        <ExamplePrompts onSelect={handleExampleSelect} />

        {/* Error */}
        {error && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive">
            <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
            <p className="font-ui text-sm">{error}</p>
          </div>
        )}

        {/* Results */}
        {result && <AnswerDisplay data={result} />}

        {/* Footer */}
        <footer className="pt-8 pb-4 text-center border-t border-border">
          <p className="font-ui text-xs text-muted-foreground">
            All guidance is sourced exclusively from the Bhagavad Gita. 🙏
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
