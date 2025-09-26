import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";

dotenv.config();
const app = express();
app.use(cors());        // allow cross-origin requests
app.use(express.json());    // parse JSON request bodies

// Setup Groq LLM
const llm = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "llama-3.3-70b-versatile",  
});

// Example: Simple chain = prompt → LLM → response
const chain = RunnableSequence.from([
  ChatPromptTemplate.fromTemplate("Answer in short: {question}"),
  llm,
]);

// API endpoint
app.post("/ask", async (req, res) => {
  const { question } = req.body;
  try {
    const response = await chain.invoke({ question });
    res.json({ answer: response.content });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
