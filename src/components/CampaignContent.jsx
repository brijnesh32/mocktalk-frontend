import React, { useState, useEffect, useRef } from "react";

import SiriGif from "../assets/Siri-Animation.gif";
import micImage from "../assets/images/mic.png";
import micOffImage from "../assets/images/mic-off.png";
import volumeImage from "../assets/images/volume.png";
import muteImage from "../assets/images/mute.png";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.lang = "en-US";
}

const CampaignContent = () => {
  const questions = JSON.parse(localStorage.getItem("questions") || "[]");
  const name = localStorage.getItem("name");
  const role = localStorage.getItem("role");

  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [answers, setAnswers] = useState([]);
  const [micOn, setMicOn] = useState(false);
  const [volumeOn, setVolumeOn] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  // auto-scroll chat to bottom on new message
  const chatBoxRef = useRef(null);
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    const handleSidebarToggle = (event) => setIsCompact(event.detail);
    window.addEventListener("sidebarToggle", handleSidebarToggle);
    return () => window.removeEventListener("sidebarToggle", handleSidebarToggle);
  }, []);

  useEffect(() => {
    if (questions.length > 0 && messages.length === 0) {
      const firstQuestion = questions[0];
      setMessages([{ from: "bot", text: firstQuestion }]);
      if (volumeOn) speakText(firstQuestion);
    }
  }, [questions]);

  useEffect(() => {
    if (!recognition) return;
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
  }, []);

  useEffect(() => {
    if (!recognition) return;
    if (micOn) {
      recognition.start();
      setIsListening(true);
    } else {
      recognition.stop();
      setIsListening(false);
    }
  }, [micOn]);

  const handleSend = async () => {
    if (!userInput.trim()) return;

    const updatedMessages = [...messages, { from: "user", text: userInput }];
    const updatedAnswers = [...answers, userInput];
    setAnswers(updatedAnswers);
    setMessages(updatedMessages);
    setUserInput("");
    setMicOn(false);

    setTimeout(async () => {
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < questions.length) {
        const nextQuestion = questions[nextIndex];
        setMessages([...updatedMessages, { from: "bot", text: nextQuestion }]);
        setCurrentQuestionIndex(nextIndex);
        if (volumeOn) speakText(nextQuestion);
      } else {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/api/submit-answers/`,{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, role, questions, answers: updatedAnswers }),
          });
          const data = await res.json();
          if (res.ok) {
            if (data.feedback) {
              localStorage.setItem("feedback", JSON.stringify(data.feedback));
              localStorage.setItem("date", new Date().toLocaleDateString());
            }
            window.location.href = "/interview/report-Card";
          } else {
            alert("❌ Submission failed: " + data.error);
          }
        } catch (error) {
          alert("❌ Network error: " + error.message);
        }
      }
    }, 600);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    /*
      KEY FIX: TWO separate divs instead of combining both classes on one div.
      - outer .main-content  → handles margin-left (sidebar) + margin-top (navbar)
      - inner .campaign-content → handles the flex column layout of bot + chat
    */
    <div className={`main-content ${isCompact ? "compact" : ""}`}>
      <div className="campaign-content">

        {/* Bot GIF */}
        <div className="bot-image-container">
          <img src={SiriGif} alt="AI Bot" className="bot-image" />
        </div>

        {/* Chat card */}
        <div className="chat-container">

          {/* Scrollable messages */}
          <div className="chat-box" ref={chatBoxRef}>
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.from}`}>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>

          {/* Input row */}
          <div className="input-area">

            {/* Mic */}
            <img
              src={micOn ? micImage : micOffImage}
              alt="Mic Toggle"
              onClick={() => setMicOn(!micOn)}
              style={{
                width: "28px",
                cursor: "pointer",
                flexShrink: 0,
                filter: micOn ? "drop-shadow(0 0 5px #4caf50)" : "none",
              }}
            />

            {/* Volume */}
            <img
              src={volumeOn ? volumeImage : muteImage}
              alt="Volume Toggle"
              onClick={() => {
                if (volumeOn && "speechSynthesis" in window) {
                  window.speechSynthesis.cancel();
                }
                setVolumeOn(!volumeOn);
              }}
              style={{
                width: "28px",
                cursor: "pointer",
                flexShrink: 0,
              }}
            />

            {/* Text */}
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your answer..."
            />

            {/* Send */}
            <button onClick={handleSend}>Send</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CampaignContent;