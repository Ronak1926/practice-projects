import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/authUser";

const PasswordDescription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialPassword = location?.state?.password || "";
  const { user } = useAuthStore();

  const [description, setDescription] = useState("");
  const [savedList, setSavedList] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingList, setIsLoadingList] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    if (!initialPassword) {
      navigate("/", { replace: true });
      return;
    }
    // Fetch current saved list
    const fetchList = async () => {
      try {
        setIsLoadingList(true);
        const res = await axios.get("http://localhost:5000/api/passwords");
        setSavedList(res.data.passwords || []);
      } catch (err) {
        // silent fail is fine here; UI remains usable
      } finally {
        setIsLoadingList(false);
      }
    };
    fetchList();
  }, [user, initialPassword, navigate]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!initialPassword || !description.trim()) return;
    try {
      setIsSaving(true);
      await axios.post("http://localhost:5000/api/passwords/save", {
        password: initialPassword,
        description: description.trim(),
      });
      // Refresh list
      const res = await axios.get("http://localhost:5000/api/passwords");
      setSavedList(res.data.passwords || []);
      setDescription("");
    } catch (err) {
      // could add toast error here if you want
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-black text-gray-100">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background:radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_50%),radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.1),transparent_50%)]" />
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl items-start justify-center px-4 py-10">
        <div className="w-full rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl shadow-2xl md:p-10">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl text-center">Save Password</h1>
          <p className="mt-2 text-sm text-gray-300 text-center">Add a description, then review all your saved passwords.</p>

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 text-sm text-gray-300">Password</div>
            <div className="font-mono text-lg tracking-wider break-all">{initialPassword}</div>
          </div>

          <form onSubmit={handleSave} className="mt-6 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-gray-300">Description</label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. Gmail account, Work laptop, etc."
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
            <button
              type="submit"
              disabled={isSaving || !description.trim()}
              className={`w-full rounded-xl border px-4 py-3 text-sm font-medium transition ${
                isSaving || !description.trim()
                  ? "border-white/10 bg-white/5 text-gray-300"
                  : "border-white/20 bg-white/10 text-white hover:bg-white/15 hover:border-white/30"
              }`}
            >
              {isSaving ? "Saving..." : "Save Password"}
            </button>
          </form>

          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-semibold">Your Saved Passwords</h2>
              {isLoadingList && <span className="text-xs text-gray-400">Loading...</span>}
            </div>

            {savedList.length === 0 ? (
              <p className="text-sm text-gray-400">No saved passwords yet.</p>
            ) : (
              <ul className="space-y-3">
                {savedList.map((item) => (
                  <li
                    key={item._id || `${item.password}-${item.createdAt}`}
                    className="rounded-xl border border-white/10 bg-white/5 p-4"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="min-w-0">
                        <div className="text-sm text-gray-300">{item.description}</div>
                        <div className="font-mono text-sm tracking-wide break-all text-gray-100">{item.password}</div>
                      </div>
                      <div className="text-xs text-gray-400">
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="rounded-xl border border-white/20 bg-white/10 px-5 py-2 text-sm text-white hover:bg-white/15 hover:border-white/30"
            >
              Back to Generator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordDescription;