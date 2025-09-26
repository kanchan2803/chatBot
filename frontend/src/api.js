import axios from "axios";
// import dotenv from "dotenv";
//vite automatically loads the .env file so no need to use
// dotenv.config();

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Backend server URL
});

export const askLLM = async(prompt) => {
    //making a post request because we need to send prompt to llm
    //the /ask path bcz that what we defined our endpoint as in server.js
    //in the body we send the prompt as "question"
  const response = await API.post("/ask", { question: prompt });

  return response.data.answer; // .answer because in server.js we sent the response as {answer: response.content}
}

