import React, { useState } from "react";
import axios from "axios";

const MainComponent = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    try {
      // Show loader while waiting for response
      setLoading(true);

      // Make a POST request to your FastAPI endpoint
      const response = await axios.post("http://localhost:8000/translate/", {
        text: inputText,
      });

      // Update the translatedText state with the translated text received from the server
      setTranslatedText(response.data.translated_text);
    } catch (error) {
      console.error(error);
      // Handle any errors that occur during the request
    } finally {
      // Hide loader after response or error
      setLoading(false);
    }
  };

  return (
    <div className="m-container">
      <div className="box">
        <div className="input-text">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate..."
          />
        </div>
        <div className="output-text">
          <textarea value={translatedText} placeholder="Translated text..." />
        </div>
      </div>

      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="button-container">
          <button onClick={handleTranslate}>Translate</button>
        </div>
      )}
    </div>
  );
};

export default MainComponent;
