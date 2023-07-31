// src/routes/api/feedback.js

import { Configuration, OpenAIApi } from "openai";

export async function post(request) {
  const feedback = request.body;

  const configuration = new Configuration({
    organization: "org-qUwbj1Hk01lJrE6iOAn6eMAg",
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.complete({
      engine: "gpt-3-turbo",
      prompt: feedback,
      max_tokens: 80,
    });

    return {
      status: 200,
      body: response.data,
    };
  } catch (error) {
    return {
      status: 500,
      body: error.message,
    };
  }
}
