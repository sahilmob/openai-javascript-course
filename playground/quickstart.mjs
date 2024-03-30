import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { initializeAgentExecutorWithOptions } from "langchain/agents";
import { SerpAPI } from "langchain/tools";
import { Calculator } from "langchain/tools/calculator";
import { BufferMemory } from "langchain/memory";
import { ConversationChain } from "langchain/chains";
import { PlanAndExecuteAgentExecutor } from "langchain/experimental/plan_and_execute";
import { exec } from "child_process";

// export OPENAI_API_KEY=<>
// export SERPAPI_API_KEY=<>
// Replace with your API keys!

const template =
  "You are a director if social media with 30 years of experience. Please give me some ideas for content I should write about regarding {topic}? The content is for {socialPlatform}. Translate to {language}.";

const prompt = new PromptTemplate({
  template,
  inputVariables: ["topic", "socialPlatform", "language"],
});

// const formattedPrompt = await prompt.format({
//   topic: "artificial intelligence",
//   socialPlatform: "Twitter",
//   language: "Spanish",
// });

const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0.9,
});

const chain = new LLMChain({
  prompt,
  llm: model,
});

const resChain = await chain.call({
  topic: "artificial intelligence",
  socialPlatform: "Twitter",
  language: "Spanish",
});

console.log(resChain);
