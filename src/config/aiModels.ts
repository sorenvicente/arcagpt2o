export const openAiModels = [
  { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
  { value: "gpt-4", label: "GPT-4" },
  { value: "gpt-4-vision", label: "GPT-4 Vision" },
  { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
  { value: "gpt-3.5-turbo-16k", label: "GPT-3.5 Turbo 16K" },
] as const;

export const openRouterModels = [
  // Modelos Gratuitos
  { value: "meta-llama/llama-3.1-405b-instruct:free", label: "Meta Llama 3.1 405B (Free)" },
  { value: "meta-llama/llama-2-70b-chat", label: "Meta Llama 2 70B (Free)" },
  { value: "meta-llama/llama-2-13b-chat", label: "Meta Llama 2 13B (Free)" },
  { value: "meta-llama/llama-2-7b-chat", label: "Meta Llama 2 7B (Free)" },
  { value: "meta-llama/codellama-34b-instruct", label: "Code Llama 34B (Free)" },
  { value: "meta-llama/codellama-70b-instruct", label: "Code Llama 70B (Free)" },
  { value: "meta-llama/llama-2-13b-code-instruct", label: "Llama 2 13B Code (Free)" },
  { value: "google/gemini-pro", label: "Google Gemini Pro (Free)" },
  { value: "anthropic/claude-2", label: "Anthropic Claude 2 (Free)" },
  { value: "mistral/mistral-7b", label: "Mistral 7B (Free)" },
  { value: "mistral/mixtral-8x7b", label: "Mixtral 8x7B (Free)" },
  
  // Modelos Pagos - OpenAI via OpenRouter
  { value: "openai/gpt-4-1106-preview", label: "GPT-4 Turbo (OpenRouter)" },
  { value: "openai/gpt-4-vision-preview", label: "GPT-4 Vision (OpenRouter)" },
  { value: "openai/gpt-4", label: "GPT-4 (OpenRouter)" },
  { value: "openai/gpt-3.5-turbo", label: "GPT-3.5 Turbo (OpenRouter)" },
  
  // Outros Modelos Pagos Populares
  { value: "anthropic/claude-3-opus", label: "Claude 3 Opus (Paid)" },
  { value: "anthropic/claude-3-sonnet", label: "Claude 3 Sonnet (Paid)" },
  { value: "anthropic/claude-3-haiku", label: "Claude 3 Haiku (Paid)" },
  { value: "google/gemini-pro-vision", label: "Gemini Pro Vision (Paid)" },
  { value: "google/gemini-ultra", label: "Gemini Ultra (Paid)" },
  { value: "mistral/mistral-large", label: "Mistral Large (Paid)" },
  { value: "mistral/mistral-medium", label: "Mistral Medium (Paid)" },
  { value: "mistral/mistral-small", label: "Mistral Small (Paid)" },
] as const;

export type OpenAIModel = typeof openAiModels[number]["value"];
export type OpenRouterModel = typeof openRouterModels[number]["value"];