import OpenAI from "openai";

// used from documentation
// move this to backend
const OPEN_AI_SECRET = "org-FzjgAB7qTyHlXbc2DvsLn44x";

const openai = new OpenAI({
  apiKey: OPEN_AI_SECRET,
});

export async function getTitle() {
  const stream = await openai.chat.completions.create({
    model: "gpt-3",
    messages: [{ role: "user", content: "Say this is a test" }],
    stream: true,
  });
  for await (const chunk of stream) {
    console.log(chunk.choices[0]?.delta?.content || "");
  }
}
