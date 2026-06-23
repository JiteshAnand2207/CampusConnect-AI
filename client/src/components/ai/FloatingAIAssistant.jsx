import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { askCampusAI } from "../../api/aiApi";
import { useAuth } from "../../context/AuthContext";

const FloatingAIAssistant = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Ask me about events, problems, solutions, or tickets.",
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const hiddenRoutes = ["/login", "/register", "/dashboard/ai"];

  if (hiddenRoutes.includes(location.pathname)) {
    return null;
  }

  const handleAsk = async (e) => {
    e.preventDefault();

    const cleanQuestion = question.trim();

    if (!cleanQuestion) return;

    try {
      setLoading(true);
      setError("");

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: cleanQuestion,
        },
      ]);

      setQuestion("");

      const response = await askCampusAI(cleanQuestion);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
        },
      ]);
    } catch (err) {
      setError(err.response?.data?.message || "AI assistant failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen && (
        <div className="mb-4 w-[340px] overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
          <div className="bg-slate-950 px-5 py-4 text-white">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                  CampusConnect AI
                </p>
                <h2 className="text-lg font-bold">Ask me anything</h2>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold hover:bg-white/20"
              >
                ×
              </button>
            </div>
          </div>

          {!isAuthenticated ? (
            <div className="p-5">
              <p className="text-sm leading-6 text-slate-600">
                Login to ask CampusConnect AI about events, problems, tickets,
                and solutions.
              </p>

              <Link
                to="/login"
                className="mt-4 inline-flex rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Login to ask
              </Link>
            </div>
          ) : (
            <>
              <div className="max-h-[320px] space-y-3 overflow-y-auto bg-slate-50 p-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`rounded-2xl px-4 py-3 text-sm leading-6 ${
                      message.role === "user"
                        ? "ml-auto max-w-[85%] bg-indigo-600 text-white"
                        : "mr-auto max-w-[90%] bg-white text-slate-700 shadow-sm"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}

                {loading && (
                  <div className="mr-auto max-w-[90%] rounded-2xl bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
                    Thinking...
                  </div>
                )}
              </div>

              {error && (
                <div className="mx-4 mt-3 rounded-xl bg-red-50 p-3 text-xs font-semibold text-red-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleAsk} className="flex gap-2 p-4">
                <input
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ask me..."
                  className="min-w-0 flex-1 rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-indigo-500"
                />

                <button
                  disabled={loading}
                  className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
                >
                  Ask
                </button>
              </form>

              <div className="border-t border-slate-100 px-4 py-3">
                <Link
                  to="/dashboard/ai"
                  className="text-xs font-bold text-indigo-600"
                >
                  Open full AI assistant
                </Link>
              </div>
            </>
          )}
        </div>
      )}

      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-3 rounded-full bg-slate-950 px-5 py-4 font-bold text-white shadow-2xl transition hover:-translate-y-1 hover:bg-indigo-600"
      >
        <span className="text-xl">✨</span>
        <span>Ask me</span>
      </button>
    </div>
  );
};

export default FloatingAIAssistant;