# server.js as the control center of your app:
    - It runs an Express server (like a mini web server).
    - Handles API requests (frontend → backend).
    - Calls LangChain + Groq LLM to get answers.
    - Sends back the results to the frontend.

# 1. Import Dependencies
   - **express**: handles HTTP requests (like /ask endpoint).
   - **cors** : allows frontend (http://localhost:5173) to talk to backend (http://localhost:5000).
   - **dotenv** : loads .env file so we can keep API keys secret.
   - **ChatGroq** : LangChain class to use Groq Cloud LLM.
   - **ChatPromptTemplate** : lets you create structured prompts.
   - **RunnableSequence** : lets us chain together prompt → LLM.
# 2. Setup Express App
    - Load environment variables from .env file.
    > dotenv.config();
    - Create an Express app instance.
    > const app = express();
    - Use CORS middleware to allow cross-origin requests.
    > app.use(cors());
    - Use JSON middleware to parse JSON request bodies.
    > app.use(express.json());
# 3. Configure Groq LLM
    - Create a ChatGroq instance with API key and model name.
    - ChatGroq = LangChain wrapper for Groq’s API.
    ```js
    const llm = new ChatGroq({
         apiKey: process.env.GROQ_API_KEY,
         model: "groq-3.5-turbo",
    });
    ```
# 4. Create a Chain
    Chain: we wrapped the prompt + model into one sequence.
    How it works:
    - ChatPromptTemplate = blueprint for our prompt.
        Example: "Answer briefly: {question}"
        {question} will be replaced with user input.
    - The result goes into llm (Groq model).
    - The chain returns the model’s response.
    A chain lets you connect multiple steps together so you can process text smoothly.

    ```js
    const chain = RunnableSequence.from([
         ChatPromptTemplate.fromTemplate("Answer briefly: {question}"),
         llm,
    ]);
    ```

# 5. Create API Endpoint
    This is how frontend talks to backend:
    - POST /ask endpoint to handle user questions.
    - Extract question from request body.
    - Run the chain with the question.
    - Send back the model’s answer as JSON.
    ```js
    app.post("/ask", async (req, res) => {
        const { question } = req.body;
        const response = await chain.invoke({ question });
        res.json({ answer: response.text });
    });
    ```
# 6. Start the Server
    > app.listen(5000, () => console.log("✅ Backend running on port 5000"));


