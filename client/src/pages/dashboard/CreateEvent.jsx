import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/eventApi";

const CreateEvent = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "technical",
    department: "All",
    venue: "",
    startDate: "",
    endDate: "",
    registrationDeadline: "",
    capacity: 50,
    tags: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "capacity" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const payload = {
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      };

      await createEvent(payload);
      navigate("/dashboard/events");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
        Organizer
      </p>

      <h1 className="mt-2 text-3xl font-bold text-slate-950">
        Create new event
      </h1>

      <p className="mt-3 text-slate-600">
        Organizer-created events will be sent for admin approval before becoming
        public.
      </p>

      {error && (
        <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
        <FormInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="CodeSprint Hackathon"
        />

        <div>
          <label className="text-sm font-semibold text-slate-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            placeholder="Describe the event..."
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            >
              <option value="technical">Technical</option>
              <option value="cultural">Cultural</option>
              <option value="sports">Sports</option>
              <option value="workshop">Workshop</option>
              <option value="seminar">Seminar</option>
              <option value="hackathon">Hackathon</option>
              <option value="club">Club</option>
              <option value="other">Other</option>
            </select>
          </div>

          <FormInput
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="IIoT or All"
          />
        </div>

        <FormInput
          label="Venue"
          name="venue"
          value={formData.venue}
          onChange={handleChange}
          placeholder="Seminar Hall"
        />

        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            label="Start date and time"
            name="startDate"
            type="datetime-local"
            value={formData.startDate}
            onChange={handleChange}
          />

          <FormInput
            label="End date and time"
            name="endDate"
            type="datetime-local"
            value={formData.endDate}
            onChange={handleChange}
          />
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <FormInput
            label="Registration deadline"
            name="registrationDeadline"
            type="datetime-local"
            value={formData.registrationDeadline}
            onChange={handleChange}
          />

          <FormInput
            label="Capacity"
            name="capacity"
            type="number"
            min="1"
            value={formData.capacity}
            onChange={handleChange}
          />
        </div>

        <FormInput
          label="Tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="coding, webdev, team"
        />

        <button
          disabled={loading}
          className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white disabled:opacity-60"
        >
          {loading ? "Creating event..." : "Create event"}
        </button>
      </form>
    </div>
  );
};

const FormInput = ({ label, ...props }) => {
  return (
    <div>
      <label className="text-sm font-semibold text-slate-700">{label}</label>
      <input
        {...props}
        className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
      />
    </div>
  );
};

export default CreateEvent;