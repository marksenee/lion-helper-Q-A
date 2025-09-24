import apiClient from "./client";

// Fixed payload defaults per backend contract
const DEFAULT_GENERATION_OPTS = {
  max_new_tokens: 1000,
  temperature: 0.7,
  top_p: 0.9,
  use_claude: true,
  session_id: "claude-chat-001",
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

/**
 * Fetch QA list by keyword and return array of questions.
 * @param {string} keyword - e.g., "훈련장려금"
 * @returns {Promise<string[]>} Array of question strings
 */
export async function fetchQaQuestionsByKeyword(keyword) {
  const params = new URLSearchParams();
  if (keyword) params.set("keyword", keyword);
  const { data } = await apiClient.get(`/qa-list?${params.toString()}`);
  const list = Array.isArray(data?.qa_list) ? data.qa_list : [];
  return list.map((item) => item?.question).filter(Boolean);
}

export default { sendChatPrompt, fetchQaQuestionsByKeyword };
