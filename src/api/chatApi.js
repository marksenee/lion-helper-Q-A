import apiClient from "./client";

// Fixed payload defaults per backend contract
const DEFAULT_GENERATION_OPTS = {
  max_new_tokens: 512,
  temperature: 0.6,
  top_p: 0.9,
  use_ollama: true,
};

/**
 * Send a prompt to the chat endpoint and return the response text.
 * @param {string} prompt - User input text.
 * @returns {Promise<{ response: string, model?: string, status?: string, matched_keywords?: string[], response_type?: string }>}
 */
export async function sendChatPrompt(prompt) {
  const body = { prompt, ...DEFAULT_GENERATION_OPTS };
  const { data } = await apiClient.post("/chat", body);
  return data;
}

export default { sendChatPrompt };
