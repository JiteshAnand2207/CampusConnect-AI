import { useState } from "react";
import api from "../../api/axios";

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      from: "ai",
      text: "Hi, I am your CampusConnect AI assistant. Ask me about events, problems, tickets, dashboards, or how to use this platform.",
    },
  ]);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);

  const getAnswerText = (response) => {
    return (
      response?.data?.data?.answer ||
      response?.data?.answer ||
      response?.data?.message ||
      "I am here to help you use CampusConnect AI."
    );
  };

  const handleAsk = async (event) => {
    event.preventDefault();

    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    setMessages((prev) => [...prev, { from: "user", text: cleanQuestion }]);
    setQuestion("");

    try {
      setLoading(true);

      const response = await api.post("/ai/ask", {
        question: cleanQuestion,
        message: cleanQuestion,
        prompt: cleanQuestion,
      });

      setMessages((prev) => [
        ...prev,
        { from: "ai", text: getAnswerText(response) },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          from: "ai",
          text:
            error?.response?.data?.message ||
            "AI assistant is currently unavailable. Please try again later.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "How do I register for an event?",
    "How can I report a campus problem?",
    "What can organizers do?",
    "Explain this website quickly.",
  ];

  return (
    <main className="cc-ai-page">
      <section className="cc-ai-page-hero">
        <span>AI Assistant</span>
        <h1>Ask CampusConnect AI</h1>
        <p>
          A smooth chat area for quick help about events, problem reports,
          tickets, dashboards, and platform workflow.
        </p>
      </section>

      <section className="cc-ai-chat-shell">
        <div className="cc-ai-chat-window">
          {messages.map((message, index) => (
            <div
              key={`${message.from}-${index}`}
              className={
                message.from === "user"
                  ? "cc-ai-message user"
                  : "cc-ai-message ai"
              }
            >
              {message.text}
            </div>
          ))}

          {loading && <div className="cc-ai-message ai">Thinking...</div>}
        </div>

        <div className="cc-ai-suggestions">
          {suggestions.map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setQuestion(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <form onSubmit={handleAsk} className="cc-ai-page-form">
          <input
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask something about CampusConnect AI..."
          />
          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default AIAssistant;
