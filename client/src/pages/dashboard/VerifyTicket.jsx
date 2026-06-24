import { useState } from "react";
import { verifyTicket } from "../../api/registrationApi";

const VerifyTicket = () => {
  const [ticketCode, setTicketCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();

    if (!ticketCode.trim()) {
      setError("Please enter a ticket code");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await verifyTicket(ticketCode.trim());
      setResult(response.data);
      setTicketCode("");
    } catch (err) {
      setError(err.response?.data?.message || "Ticket verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-slate-50 px-4 py-10">
      <section className="mx-auto max-w-5xl">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Organizer verification
          </p>

          <h1 className="mt-2 text-3xl font-bold text-slate-950">
            Verify Ticket
          </h1>

          <p className="mt-3 max-w-3xl text-slate-600">
            Enter the ticket code shown on the student QR ticket. Once verified,
            the student attendance will be marked.
          </p>

          <form onSubmit={handleVerify} className="mt-8 grid gap-4 md:grid-cols-[1fr_auto]">
            <input
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value)}
              placeholder="Enter ticket code"
              className="rounded-xl border border-slate-300 px-4 py-3 font-mono outline-none focus:border-indigo-500"
            />

            <button
              disabled={loading}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Ticket"}
            </button>
          </form>

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
              {error}
            </div>
          )}
        </div>

        {result && (
          <div className="mt-8 overflow-hidden rounded-3xl border border-green-200 bg-white shadow-sm">
            <div className="bg-green-600 p-6 text-white">
              <p className="text-sm font-bold uppercase tracking-widest text-green-100">
                Verification successful
              </p>

              <h2 className="mt-2 text-3xl font-extrabold">
                Attendance marked
              </h2>
            </div>

            <div className="grid gap-4 p-6 md:grid-cols-2">
              <Info label="Student" value={result.student?.name || "N/A"} />
              <Info label="Email" value={result.student?.email || "N/A"} />
              <Info label="Department" value={result.student?.department || "N/A"} />
              <Info label="Year" value={result.student?.year || "N/A"} />
              <Info label="Event" value={result.event?.title || "N/A"} />
              <Info label="Venue" value={result.event?.venue || "N/A"} />
              <Info label="Status" value={result.status || "N/A"} />
              <Info
                label="Checked in at"
                value={
                  result.checkedInAt
                    ? new Date(result.checkedInAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })
                    : "N/A"
                }
              />
            </div>
          </div>
        )}

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">Demo flow</h2>

          <ol className="mt-4 grid gap-3 text-sm font-semibold text-slate-600">
            <li>1. Student opens Dashboard → My Tickets.</li>
            <li>2. Student shows QR ticket or ticket code.</li>
            <li>3. Organizer enters ticket code here.</li>
            <li>4. System marks attendance as attended.</li>
          </ol>
        </div>
      </section>
    </main>
  );
};

const Info = ({ label, value }) => {
  return (
    <div className="rounded-2xl bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 break-words font-semibold text-slate-950">{value}</p>
    </div>
  );
};

export default VerifyTicket;