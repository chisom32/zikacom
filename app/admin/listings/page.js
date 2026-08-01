"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const emptyForm = {
  title: "",
  location: "",
  distance: "",
  campus: "",
  type: "",
  first_year_price: "",
  renewal_price: "",
  description: "",
  agent_whatsapp: "",
  video_url: "",
  verified: false,
  approved: true,
};

export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchListings = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setListings(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
    setError("");
  };

  const openEditForm = (listing) => {
    setForm({
      title: listing.title || "",
      location: listing.location || "",
      distance: listing.distance || "",
      campus: listing.campus || "",
      type: listing.type || "",
      first_year_price: listing.first_year_price || "",
      renewal_price: listing.renewal_price || "",
      description: listing.description || "",
      agent_whatsapp: listing.agent_whatsapp || "",
      video_url: listing.video_url || "",
      verified: listing.verified || false,
      approved: listing.approved ?? true,
    });
    setEditingId(listing.id);
    setShowForm(true);
    setError("");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    if (editingId) {
      const { error } = await supabase
        .from("listings")
        .update(form)
        .eq("id", editingId);

      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    } else {
      const { error } = await supabase.from("listings").insert([form]);

      if (error) {
        setError(error.message);
        setSaving(false);
        return;
      }
    }

    setSaving(false);
    setShowForm(false);
    fetchListings();
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this listing? This cannot be undone.")) return;

    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (!error) fetchListings();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-[#003580]">Listings</h1>
        <button
          onClick={openAddForm}
          className="bg-[#F47920] text-white text-sm font-medium px-4 py-2 rounded"
        >
          + Add Listing
        </button>
      </div>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading listings...</p>
      ) : listings.length === 0 ? (
        <p className="text-gray-500 text-sm">No listings yet.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left border-b text-gray-500">
                <th className="p-3">Title</th>
                <th className="p-3">Campus</th>
                <th className="p-3">Type</th>
                <th className="p-3">First Year</th>
                <th className="p-3">Renewal</th>
                <th className="p-3">Verified</th>
                <th className="p-3">Approved</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {listings.map((listing) => (
                <tr key={listing.id} className="border-b last:border-0 text-gray-900">
                  <td className="p-3">{listing.title}</td>
                  <td className="p-3">{listing.campus}</td>
                  <td className="p-3">{listing.type}</td>
                  <td className="p-3">{listing.first_year_price}</td>
                  <td className="p-3">{listing.renewal_price}</td>
                  <td className="p-3">{listing.verified ? "✅" : "—"}</td>
                  <td className="p-3">{listing.approved ? "✅" : "—"}</td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => openEditForm(listing)}
                      className="text-[#003580] text-xs font-medium mr-3"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(listing.id)}
                      className="text-red-600 text-xs font-medium"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h2 className="text-lg font-semibold text-[#003580] mb-4">
              {editingId ? "Edit Listing" : "Add Listing"}
            </h2>

            {error && <p className="text-red-600 text-sm mb-3">{error}</p>}

            <form onSubmit={handleSave} className="space-y-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Title</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Campus</label>
                  <input
                    name="campus"
                    value={form.campus}
                    onChange={handleChange}
                    placeholder="Nnewi / Awka / Agulu"
                    required
                    className="w-full border rounded px-3 py-2 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Type</label>
                  <input
                    name="type"
                    value={form.type}
                    onChange={handleChange}
                    placeholder="Self-contain / Mini flat / Shared room"
                    required
                    className="w-full border rounded px-3 py-2 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Location</label>
                <input
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="Otolo, Nnewi"
                  required
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Distance</label>
                <input
                  name="distance"
                  value={form.distance}
                  onChange={handleChange}
                  placeholder="5 mins to school gate"
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">First Year Price</label>
                  <input
                    name="first_year_price"
                    value={form.first_year_price}
                    onChange={handleChange}
                    placeholder="N300,000"
                    required
                    className="w-full border rounded px-3 py-2 text-sm text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">Renewal Price</label>
                  <input
                    name="renewal_price"
                    value={form.renewal_price}
                    onChange={handleChange}
                    placeholder="N250,000"
                    className="w-full border rounded px-3 py-2 text-sm text-gray-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Agent WhatsApp</label>
                <input
                  name="agent_whatsapp"
                  value={form.agent_whatsapp}
                  onChange={handleChange}
                  placeholder="08012345678"
                  required
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-600 mb-1">Video URL</label>
                <input
                  name="video_url"
                  value={form.video_url}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full border rounded px-3 py-2 text-sm text-gray-900"
                />
              </div>

              <div className="flex items-center gap-6 pt-1">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="verified"
                    checked={form.verified}
                    onChange={handleChange}
                  />
                  Verified
                </label>
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    name="approved"
                    checked={form.approved}
                    onChange={handleChange}
                  />
                  Approved (visible on site)
                </label>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="submit"
                  disabled={saving}
                  className="bg-[#F47920] text-white text-sm font-medium px-4 py-2 rounded flex-1"
                >
                  {saving ? "Saving..." : editingId ? "Save Changes" : "Add Listing"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border text-sm font-medium px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}