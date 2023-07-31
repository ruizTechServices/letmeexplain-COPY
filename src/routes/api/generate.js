  // src/routes/api/generate.js

export async function POST(request) {
  const { feedback } = request.body;
  const prompt = `The user said: "${feedback}". Please provide three alternative, constructive ways to express this feedback:`;
  const maxTokens = 200;

  try {
    const response = await fetch(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": import.meta.env.VITE_OPENAI_API_KEY,
          "Access-Control-Allow-Origin": "*", // Replace with your specific domain if needed
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type",
        },
        body: JSON.stringify({
          prompt,
          max_tokens: maxTokens,
          n: 3, // Generate 3 alternatives
          temperature: 0.7, // Higher value (up to 1) makes output more random, lower value makes it more focused
        }),
      }
    );

    const data = await response.json();

    if (data && data.choices && data.choices.length > 0) {
      const alternatives = data.choices.map((choice) => choice.text.trim());
      return { body: { alternatives } };
    } else {
      throw new Error("No response from OpenAI");
    }
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: { error: "An error occurred. Please try again later." },
    };
  }
}
