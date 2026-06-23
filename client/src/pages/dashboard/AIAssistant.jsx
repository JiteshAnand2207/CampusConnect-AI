import { useState } from "react";
import { Link } from "react-router-dom";
import { askCampusAI } from "../../api/aiApi";

const starterQuestions = [
  "Which events are available right now?",
  "Show me technical events.",
  "What campus problems are still open?",
  "Are there any WiFi related problems?",
  "Which problems have accepted solutions?",
];

const AIAssistant = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi, I am CampusConnect AI. Ask me about events, campus problems, solutions, tickets, or platform activity.",
      sources: [],
    },
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askQuestion = async (text) => {
    const cleanQuestion = text.trim();

    if (!cleanQuestion) return;

    try {
      setLoading(true);
      setError("");

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: cleanQuestion,
          sources: [],
        },
      ]);

      setQuestion("");

      const response = await askCampusAI(cleanQuestion);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: response.data.answer,
          sources: response.data.sources || [],
        },
      ]);
    } catch (err) {
      setError(err.response?.data?.message || "AI assistant failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    askQuestion(question);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          CampusConnect AI
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          AI Assistant
        </h1>

        <p className="mt-3 max-w-3xl text-slate-600">
          Ask questions about approved events, public campus problems,
          solutions, and your own private reports. In mock mode, this confirms
          the AI route and frontend connection are working.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {starterQuestions.map((starter) => (
            <button
              key={starter}
              type="button"
              onClick={() => askQuestion(starter)}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              {starter}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="max-h-[520px] space-y-4 overflow-y-auto pr-2">
          {messages.map((message, index) => (
            <div
              key={`${message.role}-${index}`}
              className={`rounded-3xl p-5 ${
                message.role === "user"
                  ? "ml-auto max-w-2xl bg-indigo-600 text-white"
                  : "mr-auto max-w-3xl bg-slate-100 text-slate-800"
              }`}
            >
              <p className="whitespace-pre-wrap leading-7">
                {message.content}
              </p>

              {message.sources?.length > 0 && (
                <div className="mt-4 rounded-2xl bg-white p-4 text-slate-800">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Sources
                  </p>

                  <div className="mt-3 space-y-2">
                    {message.sources.map((source, sourceIndex) => (
                      <Link
                        key={`${source.link}-${sourceIndex}`}
                        to={source.link}
                        className="block rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
                      >
                        {source.type}: {source.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="mr-auto max-w-3xl rounded-3xl bg-slate-100 p-5 text-slate-700">
              Campus AI is thinking...
            </div>
          )}
        </div>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 flex gap-3">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask about events, problems, solutions..."
            className="min-w-0 flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
          />

          <button
            disabled={loading}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white disabled:opacity-60"
          >
            Ask
          </button>
        </form>
      </div>
    </div>
  );
};

export default AIAssistant;