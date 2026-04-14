import { GitaRequest, GitaResponse } from "@/types/gita";

// Configure your backend URL here or via environment variable
const BASE_API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export async function askGita(query: string): Promise<GitaResponse> {
  const body: GitaRequest = { query };

  const response = await fetch(`${BASE_API_URL}/api/ask-gita`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(
      response.status === 503
        ? "The server is currently busy. Please try again shortly."
        : `Something went wrong (${response.status}). Please try again.`
    );
  }

  return response.json();
}
