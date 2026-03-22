"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/Button";

export default function AdminAssignmentsClient({ assignments }: { assignments: any[] }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [reviewingId, setReviewingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState("");

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description) return;
    setLoading(true);
    try {
      const res = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", title, description, dueDate }),
      });
      if (res.ok) {
        setTitle("");
        setDescription("");
        setDueDate("");
        refreshData();
      }
    } catch (err) {
      alert("Error creating assignment");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this assignment? Submissions will also be deleted.")) {
      const res = await fetch(`/api/assignments?id=${id}`, { method: "DELETE" });
      if (res.ok) refreshData();
    }
  };

  const handleReview = async (submissionId: string) => {
    if (!feedback) return alert("Feedback is required.");
    setLoading(true);
    try {
      const res = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "review", submissionId, feedback }),
      });
      if (res.ok) {
        setReviewingId(null);
        setFeedback("");
        refreshData();
      }
    } catch (err) {
      alert("Error saving review");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-950">Assignments & Reviews</h1>
        <p className="text-slate-600 mt-2">Create assignments and review student submissions.</p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
        <h2 className="text-xl font-bold text-primary-900 mb-6">Create New Assignment</h2>
        <form onSubmit={handleCreate} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input 
              type="text" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-accent-500 focus:border-accent-500"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-accent-500 focus:border-accent-500 h-24"
              required 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Due Date (Optional)</label>
            <input 
              type="date" 
              value={dueDate} 
              onChange={e => setDueDate(e.target.value)} 
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-accent-500 focus:border-accent-500"
            />
          </div>
          <Button type="submit" variant="primary" disabled={loading}>
            {loading ? "Creating..." : "Create Assignment"}
          </Button>
        </form>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-primary-950">Active Assignments</h2>
        {assignments.length === 0 ? (
          <p className="text-slate-500">No assignments created yet.</p>
        ) : (
          assignments.map(assignment => (
            <div key={assignment.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-100 flex items-start justify-between bg-slate-50/50">
                <div>
                  <h3 className="text-xl font-bold text-primary-900">{assignment.title}</h3>
                  <p className="text-slate-600 mt-2">{assignment.description}</p>
                  {assignment.dueDate && (
                    <p className="text-sm font-medium text-accent-600 mt-2">
                      Due: {new Date(assignment.dueDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
                <button onClick={() => handleDelete(assignment.id)} className="text-sm text-red-600 hover:text-red-800 font-medium">
                  Delete
                </button>
              </div>
              
              <div className="p-6">
                <h4 className="font-semibold text-slate-900 mb-4">Submissions ({assignment.submissions?.length || 0})</h4>
                {assignment.submissions?.length > 0 ? (
                  <div className="space-y-4">
                    {assignment.submissions.map((sub: any) => (
                      <div key={sub.id} className="p-4 border border-slate-100 rounded-xl bg-slate-50">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-semibold">{sub.student?.name || sub.student?.email}</p>
                            <p className="text-xs text-slate-500">{new Date(sub.updatedAt).toLocaleString()}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs font-semibold rounded-md ${
                            sub.status === "REVIEWED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                          }`}>
                            {sub.status}
                          </span>
                        </div>
                        
                        <div className="mt-3 text-sm text-slate-700 bg-white p-3 border border-slate-100 rounded-md">
                          {sub.textContent || <span className="italic text-slate-400">No text provided</span>}
                        </div>
                        {sub.fileUrl && (
                          <div className="mt-2 text-sm text-accent-600 font-medium truncate">
                            File attached: {sub.fileUrl}
                          </div>
                        )}

                        {sub.status === "PENDING" && reviewingId !== sub.id && (
                          <Button variant="outline" size="sm" className="mt-4" onClick={() => setReviewingId(sub.id)}>
                            Review & Feedback
                          </Button>
                        )}

                        {reviewingId === sub.id && (
                          <div className="mt-4 p-4 bg-primary-50 rounded-lg border border-primary-100">
                            <label className="block text-sm font-medium text-primary-900 mb-2">Provide Feedback</label>
                            <textarea 
                              value={feedback} 
                              onChange={(e) => setFeedback(e.target.value)}
                              className="w-full px-3 py-2 border border-slate-300 rounded-lg mb-3 h-20"
                              placeholder="Great job on..."
                            />
                            <div className="flex gap-2">
                              <Button variant="primary" size="sm" onClick={() => handleReview(sub.id)} disabled={loading}>Submit Feedback</Button>
                              <Button variant="outline" size="sm" onClick={() => { setReviewingId(null); setFeedback(""); }}>Cancel</Button>
                            </div>
                          </div>
                        )}
                        
                        {sub.status === "REVIEWED" && sub.feedback && (
                          <div className="mt-4 p-3 bg-green-50 text-green-800 border-l-4 border-green-500 text-sm">
                            <strong>Your Feedback:</strong> {sub.feedback}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500 italic">No submissions yet.</p>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
