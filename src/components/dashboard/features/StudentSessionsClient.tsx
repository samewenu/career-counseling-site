"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/Button";

export default function StudentSessionsClient({ bookedSessions, availableSlots }: { bookedSessions: any[], availableSlots: any[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleBook = async (sessionId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "book", sessionId }),
      });
      if (res.ok) refreshData();
      else alert("Could not book session. It might have been taken.");
    } catch (err) {
      alert("Error booking session");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (sessId: string) => {
    if (confirm("Cancel this session?")) {
      const res = await fetch("/api/sessions", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessId }),
      });
      if (res.ok) refreshData();
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold text-primary-950">My Coaching Sessions</h1>
        <p className="text-slate-600 mt-2">Manage your upcoming bookings and find new slots.</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary-900">Upcoming Sessions</h2>
        {bookedSessions.length === 0 ? (
          <p className="text-slate-500 italic">No sessions booked yet.</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {bookedSessions.map((sess: any) => (
              <div key={sess.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
                <div>
                  <p className="font-bold text-lg text-primary-950">{new Date(sess.date).toLocaleDateString()}</p>
                  <p className="text-slate-600">{new Date(sess.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  <p className="text-sm text-accent-600 font-medium mt-1">Coach: {sess.coach?.name || "Expert Coach"}</p>
                </div>
                <button onClick={() => handleCancel(sess.id)} className="text-sm text-red-600 font-medium hover:underline">
                  Cancel
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary-900">Available Slots</h2>
        {availableSlots.length === 0 ? (
          <p className="text-slate-500 italic">No slots available currently. Check back soon!</p>
        ) : (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden max-w-2xl">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {availableSlots.map((slot: any) => (
                  <tr key={slot.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                      {new Date(slot.date).toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button variant="primary" size="sm" onClick={() => handleBook(slot.id)} disabled={loading}>
                        Book Now
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
