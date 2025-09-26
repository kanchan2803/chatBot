import { useState } from "react";
import { askLLM } from "./api"; //importing the function that makes the api call to backend

function App() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSend = async () => {
    if (!input.trim()) return;
    setResponse("Thinking...");

    try {
      const answer = await askLLM(input);
      setResponse(answer);
      console.log("Output from LLM:", answer);
    } catch (err) {
      setResponse("Error: " + err.message);
    }
    setInput("");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Chat App</h1>

      {/* Input box */}
      <input
        type="text"
        value={input} //the usestate variable
        onChange={(e) => setInput(e.target.value)} //updating the variable on change
        placeholder="Type a message..."
        style={{ width: "80%", padding: "10px" }}
      />
      <button onClick={handleSend} style={{ marginLeft: "10px" }}>
        {/* linked to the function that handles the send button click */}
        Send
      </button>

      {/* Response area */}
      <div style={{ marginTop: "20px" }}>
        <strong>Response:</strong>
        <p>{response}</p> {/* displaying the response usestate variable , its value will update using the function that we linked above */}
      </div>
    </div>
  );
}

export default App;
