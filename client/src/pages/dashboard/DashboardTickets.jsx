import { useEffect, useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  cancelRegistration,
  getMyRegistrations,
} from "../../api/registrationApi";

const DashboardTickets = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRegistrations = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyRegistrations();
      setRegistrations(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleCancel = async (registrationId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this registration?"
    );

    if (!confirmCancel) return;

    await cancelRegistration(registrationId);
    fetchRegistrations();
  };

  return (
    <div>
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
          Tickets
        </p>

        <h1 className="mt-2 text-3xl font-bold text-slate-950">
          My event tickets
        </h1>

        <p className="mt-3 text-slate-600">
          Your registered events, ticket codes, and QR tickets appear here.
        </p>
      </div>

      {loading && (
        <p className="mt-6 text-center font-semibold text-slate-600">
          Loading tickets...
        </p>
      )}

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      {!loading && registrations.length === 0 && (
        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">No tickets yet</h2>
          <p className="mt-2 text-slate-600">
            Register for an event to generate your first ticket.
          </p>
        </div>
      )}

      <div className="mt-6 grid gap-5">
        {registrations.map((registration) => (
          <TicketCard
            key={registration._id}
            registration={registration}
            onCancel={handleCancel}
          />
        ))}
      </div>
    </div>
  );
};

const TicketCard = ({ registration, onCancel }) => {
  const qrRef = useRef(null);

  const qrPayload = registration.ticketCode;

  const handleDownloadQR = () => {
    const canvas = qrRef.current?.querySelector("canvas");

    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");

    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${registration.ticketCode}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  const eventDate = registration.event?.startDate
    ? new Date(registration.event.startDate).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "Date not available";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-6 lg:grid-cols-[1fr_220px]">
        <div>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-950">
                {registration.event?.title}
              </h2>

              <p className="mt-2 text-sm text-slate-600">
                {registration.event?.venue}
              </p>

              <p className="mt-2 text-sm text-slate-500">{eventDate}</p>
            </div>

            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold uppercase text-indigo-600">
              {registration.status}
            </span>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 p-5">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Ticket Code
            </p>

            <p className="mt-2 break-all text-2xl font-extrabold text-slate-950">
              {registration.ticketCode}
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Show this QR code or ticket code at event check-in.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={handleDownloadQR}
              className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Download QR
            </button>

            {registration.status === "registered" && (
              <button
                onClick={() => onCancel(registration._id)}
                className="rounded-xl bg-red-600 px-4 py-2 text-sm font-semibold text-white"
              >
                Cancel registration
              </button>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-50 p-5">
          <div ref={qrRef} className="rounded-2xl bg-white p-4">
            <QRCodeCanvas
              value={qrPayload}
              size={160}
              includeMargin={true}
            />
          </div>

          <p className="mt-3 text-center text-xs font-medium text-slate-500">
            QR contains your ticket code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardTickets;