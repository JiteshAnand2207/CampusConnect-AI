import { useState } from "react";
import api from "../../api/axios";
import { Link } from "react-router-dom";
const FloatingAIAssistant = () => {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const getAnswerText = (response) => {
    return (
      response?.data?.data?.answer ||
      response?.data?.answer ||
      response?.data?.message ||
      "I am here to help you explore CampusConnect AI."
    );
  };

  const handleAsk = async (event) => {
    event.preventDefault();

    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;

    try {
      setLoading(true);

      const response = await api.post("/ai/ask", {
        question: cleanQuestion,
        message: cleanQuestion,
        prompt: cleanQuestion,
      });

      setAnswer(getAnswerText(response));
      setQuestion("");
    } catch (error) {
      setAnswer(
        error?.response?.data?.message ||
          "AI assistant is currently unavailable. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="cc-ai-panel">
          <div className="cc-ai-header">
            <div>
              <span>Campus AI</span>
              <h3>Ask me anything</h3>
            </div>

            <button type="button" onClick={() => setOpen(false)}>
              ×
            </button>
          </div>

          <p className="cc-ai-intro">
            Ask about events, problems, tickets, dashboards, or how to use the
            platform.
          </p>

          {answer && <div className="cc-ai-answer">{answer}</div>}

          <form onSubmit={handleAsk} className="cc-ai-form">
            <input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              placeholder="Ask about campus..."
            />

            <button type="submit" disabled={loading}>
              {loading ? "..." : "Ask"}
            </button>
          </form>

          <Link to="/dashboard/ai" className="cc-ai-full-link">
  Open full AI Assistant
</Link>
        </div>
      )}

      <button
        type="button"
        className="cc-ai-fab"
        onClick={() => setOpen((prev) => !prev)}
      >
        ✨ Ask me
      </button>
    </>
  );
};

export default FloatingAIAssistant;
