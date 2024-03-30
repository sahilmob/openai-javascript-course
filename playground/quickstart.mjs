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

// const model = new OpenAI({
//   modelName: "gpt-3.5-turbo",
//   temperature: 0.9,
// });

// const chain = new LLMChain({
//   prompt,
//   llm: model,
// });

// const resChain = await chain.call({
//   topic: "artificial intelligence",
//   socialPlatform: "Twitter",
//   language: "Spanish",
// });

// console.log(resChain);

// const agentModel = new OpenAI({
//   modelName: "gpt-3.5-turbo",
//   temperature: 0,
// });

const tools = [
  new SerpAPI(process.env.SERPAPI_API_KEY, {
    location: "Dallas, Texas, United States",
    hl: "en",
    gl: "us",
  }),
  new Calculator(),
];

// const executor = await initializeAgentExecutorWithOptions(tools, agentModel, {
//   agentType: "zero-shot-react-description",
//   verbose: true,
//   maxIterations: 5,
// });

// const input = "What is langchain?";

// const result = await executor.call({
//   input,
// });

const chatModel = new ChatOpenAI({
  temperature: 0,
  modelName: "gpt-3.5-turbo",
  verbose: true,
});

// const executor = PlanAndExecuteAgentExecutor.fromLLMAndTools({
//   llm: chatModel,
//   tools,
// });

// const result = await executor.call({
//   input:
//     "Who is the current president of the United States?, what is their current age raised to the second power?",
// });

// console.log(result);

const llm = new OpenAI({
  modelName: "gpt-3.5-turbo",
});
const memory = new BufferMemory();
const conversationChain = new ConversationChain({
  llm,
  memory,
});

const input1 = "Hey, my name is sahil";

const res1 = await conversationChain.call({
  input: input1,
});

console.log(input1);
console.log(res1);

const input2 = "What is my name?";

const res2 = await conversationChain.call({
  input: input2,
});

console.log(input2);
console.log(res2);
