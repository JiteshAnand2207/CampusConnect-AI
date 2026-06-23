const OrganizerPanel = () => {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Organizer panel
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-950">
        Event organizer tools
      </h1>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <PanelCard title="Create Events" text="Create new college events." />
        <PanelCard title="Registrations" text="View event registration lists." />
        <PanelCard title="Announcements" text="Send updates to students." />
        <PanelCard title="Analytics" text="Track participation and capacity." />
      </div>
    </div>
  );
};

const PanelCard = ({ title, text }) => {
  return (
    <div className="rounded-2xl bg-slate-50 p-5">
      <h3 className="font-bold text-slate-950">{title}</h3>
      <p className="mt-2 text-sm text-slate-600">{text}</p>
    </div>
  );
};

export default OrganizerPanel;
