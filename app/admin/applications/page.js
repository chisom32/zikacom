"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function AdminApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchApplications = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("agent_applications")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setApplications(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const updateStatus = async (id, newStatus) => {
    setUpdatingId(id);
    const { error } = await supabase
      .from("agent_applications")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) fetchApplications();
    setUpdatingId(null);
  };

  const statusBadge = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      approved: "bg-green-100 text-green-700",
      rejected: "bg-red-100 text-red-700",
    };
    return (
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${
          styles[status] || "bg-gray-100 text-gray-700"
        }`}
      >
        {status}
      </span>
    );
  };

  const pending = applications.filter((a) => a.status === "pending");
  const reviewed = applications.filter((a) => a.status !== "pending");

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[#003580] mb-6">
        Agent Applications
      </h1>

      {loading ? (
        <p className="text-gray-500 text-sm">Loading applications...</p>
      ) : applications.length === 0 ? (
        <p className="text-gray-500 text-sm">No applications yet.</p>
      ) : (
        <>
          {pending.length > 0 && (
            <div className="mb-8">
              <h2 className="text-sm font-semibold text-gray-600 mb-3">
                Pending ({pending.length})
              </h2>
              <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b text-gray-500">
                      <th className="p-3">Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Campus</th>
                      <th className="p-3">Listings</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Status</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {pending.map((app) => (
                      <tr key={app.id} className="border-b last:border-0 text-gray-900">
                        <td className="p-3">{app.full_name}</td>
                        <td className="p-3">{app.phone}</td>
                        <td className="p-3">{app.campus}</td>
                        <td className="p-3">{app.num_listings}</td>
                        <td className="p-3">{app.description}</td>
                        <td className="p-3">{statusBadge(app.status)}</td>
                        <td className="p-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => updateStatus(app.id, "approved")}
                            disabled={updatingId === app.id}
                            className="text-green-700 text-xs font-medium mr-3"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => updateStatus(app.id, "rejected")}
                            disabled={updatingId === app.id}
                            className="text-red-600 text-xs font-medium"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {reviewed.length > 0 && (
            <div>
              <h2 className="text-sm font-semibold text-gray-600 mb-3">
                Reviewed ({reviewed.length})
              </h2>
              <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b text-gray-500">
                      <th className="p-3">Name</th>
                      <th className="p-3">Phone</th>
                      <th className="p-3">Campus</th>
                      <th className="p-3">Listings</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Status</th>
                      <th className="p-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviewed.map((app) => (
                      <tr key={app.id} className="border-b last:border-0 text-gray-900">
                        <td className="p-3">{app.full_name}</td>
                        <td className="p-3">{app.phone}</td>
                        <td className="p-3">{app.campus}</td>
                        <td className="p-3">{app.num_listings}</td>
                        <td className="p-3">{app.description}</td>
                        <td className="p-3">{statusBadge(app.status)}</td>
                        <td className="p-3 text-right whitespace-nowrap">
                          {app.status !== "pending" && (
                            <button
                              onClick={() => updateStatus(app.id, "pending")}
                              disabled={updatingId === app.id}
                              className="text-[#003580] text-xs font-medium"
                            >
                              Reset to pending
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}