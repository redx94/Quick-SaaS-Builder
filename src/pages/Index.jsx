
import React, { useState } from 'react';

function UIBuilderChat() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState("");

    const handleGenerate = async () => {
        try {
            const res = await fetch("/api/handle_request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ input }),
            });
            const data = await res.json();
            setResponse(data.message);
        } catch (error) {
            console.error("Error:", error);
            setResponse("An error occurred");
        }
    };

    return (
        <div>
            <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Describe the UI element or feature you need..."
            />
            <button onClick={handleGenerate}>Generate</button>
            <div>
                <h3>Response:</h3>
                <p>{response}</p>
            </div>
        </div>
    );
}

export default UIBuilderChat;
