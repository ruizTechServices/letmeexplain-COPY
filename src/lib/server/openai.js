import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
    organization: "org-qUwbj1Hk01lJrE6iOAn6eMAg",
    apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);



const completion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello world" },
  ],
});
console.log(completion.data.choices[0].message);


