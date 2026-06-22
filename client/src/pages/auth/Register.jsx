import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
    department: "",
    year: 2,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "year" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      await register(formData);

      navigate("/dashboard");
    } catch (err) {
  console.log("Registration error:", err);
  console.log("Backend response:", err.response?.data);

  setError(
    err.response?.data?.message ||
      err.message ||
      "Registration failed"
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[calc(100vh-73px)] items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-950">Create account</h1>
        <p className="mt-2 text-sm text-slate-500">
          Join CampusConnect AI and start exploring campus life.
        </p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-semibold text-slate-700">
              Full name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="Jitesh Anand"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="jitesh@example.com"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="Minimum 6 characters"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Role
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            >
              <option value="student">Student</option>
<option value="organizer">Organizer</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Department
            </label>
            <input
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
              placeholder="IIoT"
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700">
              Year
            </label>
            <input
              name="year"
              type="number"
              min="1"
              max="5"
              value={formData.year}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500"
            />
          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 px-4 py-3 font-semibold text-white disabled:opacity-60"
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-indigo-600">
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Register;  