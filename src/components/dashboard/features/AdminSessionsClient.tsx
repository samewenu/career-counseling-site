"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/Button";

export default function AdminSessionsClient({ sessions }: { sessions: any[] }) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time) return;
    setLoading(true);
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", date, time }),
      });
      if (res.ok) {
        setDate("");
        setTime("");
        refreshData();
      } else {
        alert("Error creating slot");
      }
    } catch (err) {
      alert("Error creating slot");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooked = async (id: string) => {
    if (confirm("Cancel this booking? The slot will become available again.")) {
      const res = await fetch("/api/sessions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessId: id }),
      });
      if (res.ok) refreshData();
    }
  };

  const handleDeleteSlot = async (id: string) => {
    if (confirm("Delete this open slot?")) {
      const res = await fetch(`/api/sessions?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) refreshData();
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-950">Manage Availability</h1>
        <p className="text-slate-600 mt-2">Add available slots for students to book.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-primary-900 mb-4">Add New Slot</h2>
        <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={e => setDate(e.target.value)} 
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-accent-500 focus:border-accent-500"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
            <input 
              type="time" 
              value={time} 
              onChange={e => setTime(e.target.value)} 
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-accent-500 focus:border-accent-500"
              required 
            />
          </div>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Adding..." : "Add Slot"}
          </Button>
        </form>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Student</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {sessions.map(sess => (
              <tr key={sess.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                  {new Date(sess.date).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    sess.status === "AVAILABLE" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                  }`}>
                    {sess.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {sess.student ? sess.student.name || sess.student.email : "—"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {sess.status === "AVAILABLE" ? (
                    <button onClick={() => handleDeleteSlot(sess.id)} className="text-red-600 hover:text-red-900">
                      Delete Slot
                    </button>
                  ) : (
                    <button onClick={() => handleCancelBooked(sess.id)} className="text-orange-600 hover:text-orange-900">
                      Cancel Booking
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {sessions.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-sm text-slate-500">
                  No sessions found. Create some slots above!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
