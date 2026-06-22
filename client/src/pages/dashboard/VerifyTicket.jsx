import { useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { verifyTicket } from "../../api/registrationApi";

const VerifyTicket = () => {
  const fileInputRef = useRef(null);

  const [ticketCode, setTicketCode] = useState("");
  const [scanMessage, setScanMessage] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanLoading, setScanLoading] = useState(false);

  const verifyCode = async (code) => {
    try {
      setLoading(true);
      setError("");
      setResult(null);

      const cleanCode = code.trim();

      if (!cleanCode) {
        setError("Ticket code is required");
        return;
      }

      const response = await verifyTicket(cleanCode);
      setResult(response.data);
      setTicketCode("");
      setScanMessage("");
    } catch (err) {
      setError(err.response?.data?.message || "Ticket verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleManualVerify = async (e) => {
    e.preventDefault();
    await verifyCode(ticketCode);
  };

  const handleQRImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    try {
      setScanLoading(true);
      setError("");
      setResult(null);
      setScanMessage("Scanning QR image...");

      const qrScanner = new Html5Qrcode("qr-image-reader");
      const decodedText = await qrScanner.scanFile(file, true);

      setTicketCode(decodedText);
      setScanMessage(`QR scanned successfully: ${decodedText}`);

      await verifyCode(decodedText);
    } catch (err) {
      setError(
        "Could not read QR from this image. Try a clearer QR image or enter the ticket code manually."
      );
      setScanMessage("");
    } finally {
      setScanLoading(false);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Check-in
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          Verify event ticket
        </h1>

        <p className="mt-3 max-w-3xl text-slate-600">
          Upload a student's QR ticket image or enter the ticket code manually.
          Organizers can verify only their own event tickets, while admins can
          verify all tickets.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            Upload QR image
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Upload the downloaded QR ticket PNG from the student's dashboard.
          </p>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleQRImageUpload}
            className="mt-6 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-indigo-500"
          />

          {scanLoading && (
            <p className="mt-4 text-sm font-semibold text-slate-600">
              Reading QR image...
            </p>
          )}

          {scanMessage && (
            <div className="mt-4 rounded-xl bg-emerald-50 p-4 text-sm font-semibold text-emerald-700">
              {scanMessage}
            </div>
          )}

          <div id="qr-image-reader" className="hidden" />
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            Manual verification
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Use this if the QR image is not available or scanner fails.
          </p>

          <form onSubmit={handleManualVerify} className="mt-6 space-y-4">
            <input
              value={ticketCode}
              onChange={(e) => setTicketCode(e.target.value)}
              placeholder="CCAI-XXXXXXXXXXXX"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />

            <button
              disabled={loading}
              className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
            >
              {loading ? "Verifying..." : "Verify Ticket"}
            </button>
          </form>
        </div>
      </div>

      {error && (
        <div className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {result && (
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-emerald-700">
            Ticket verified successfully
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Info label="Student" value={result.student?.name} />
            <Info label="Email" value={result.student?.email} />
            <Info label="Department" value={result.student?.department} />
            <Info label="Year" value={result.student?.year} />
            <Info label="Event" value={result.event?.title} />
            <Info label="Venue" value={result.event?.venue} />
            <Info label="Status" value={result.status} />
            <Info
              label="Checked in at"
              value={
                result.checkedInAt
                  ? new Date(result.checkedInAt).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })
                  : "Just now"
              }
            />
          </div>
        </div>
      )}
    </div>
  );
};

const Info = ({ label, value }) => {
  return (
    <div className="rounded-2xl bg-white p-4">
      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 font-semibold text-slate-950">{value || "N/A"}</p>
    </div>
  );
};

export default VerifyTicket;