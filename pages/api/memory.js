import { OpenAI } from "langchain/llms/openai";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";

let model, memory, chain;

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { input, firstMsg } = req.body;

    if (!input) {
      throw new Error("No input!");
    }

    return res.status(200).json({
      output: "response",
    });
  } else {
    res.status(405).json({ message: "Only POST is allowed" });
  }
}
