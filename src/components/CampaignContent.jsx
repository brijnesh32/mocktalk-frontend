import React, { useState, useEffect } from "react";
import "../css/CampaignContent.css";
import SiriGif from "../assets/Siri-Animation.gif";
import micImage from "../assets/images/mic.png";
import micOffImage from "../assets/images/mic-off.png";
import volumeImage from "../assets/images/volume.png";
import muteImage from "../assets/images/mute.png";

// Setup SpeechRecognition API
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

  // 🔊 Speak text using SpeechSynthesis
  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "en-US";
      window.speechSynthesis.speak(utterance);
    }
  };
    const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const handleSidebarToggle = (event) => {
      setIsCompact(event.detail); // true or false
    };

    window.addEventListener("sidebarToggle", handleSidebarToggle);
    return () => window.removeEventListener("sidebarToggle", handleSidebarToggle);
  }, []);

  // 🧠 Bot initial message
  useEffect(() => {
    if (questions.length > 0 && messages.length === 0) {
      const firstQuestion = questions[0];
      setMessages([{ from: "bot", text: firstQuestion }]);
      if (volumeOn) speakText(firstQuestion);
    }
  }, [questions]);

  // 🎤 Speech recognition handlers
  useEffect(() => {
    if (!recognition) return;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setUserInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  }, []);

  // 🔁 Watch micOn to control recognition
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
    setMicOn(false); // Turn off mic after sending

    setTimeout(async () => {
      const nextIndex = currentQuestionIndex + 1;

      if (nextIndex < questions.length) {
        const nextQuestion = questions[nextIndex];
        setMessages([...updatedMessages, { from: "bot", text: nextQuestion }]);
        setCurrentQuestionIndex(nextIndex);
        if (volumeOn) speakText(nextQuestion);
      } else {
        try {
          const res = await fetch("https://mocktalk-backend.onrender.com/api/submit-answers/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              role,
              questions,
              answers: updatedAnswers
            })
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

  return (
    <div className={`main-content campaign-content ${isCompact ? "compact" : ""}`}style={{paddingTop:'0px'}}>

      <div className="bot-image-container">
        <img src={SiriGif} alt="AI Bot" className="bot-image" />
      </div>

      <div className="chat-container">
        <div className="chat-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.from}`}>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="input-area">
          {/* 🎤 Single Mic Toggle */}
          <img
            src={micOn ? micImage : micOffImage}
            alt="Mic Toggle"
            onClick={() => setMicOn(!micOn)}
            style={{
              width: "30px",
              cursor: "pointer",
              marginRight: "10px",
              filter: micOn ? "drop-shadow(0 0 5px #4caf50)" : "none"
            }}
          />

          {/* 🔊 Volume Toggle */}
          <img
            src={volumeOn ? volumeImage : muteImage}
            alt="Volume Toggle"
            onClick={() => {
              if (volumeOn && "speechSynthesis" in window) {
                window.speechSynthesis.cancel();
              }
              setVolumeOn(!volumeOn);
            }}
            style={{ width: "30px", cursor: "pointer", marginRight: "10px" }}
          />

          {/* Answer Input */}
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type your answer..."
          />
          <button onClick={handleSend}>Send</button>
        </div>
      </div>
    </div>
    
  );
};

export default CampaignContent;
