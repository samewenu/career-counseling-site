"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/Button";

export default function StudentAssignmentsClient({ assignments, studentId }: { assignments: any[], studentId: string }) {
  const router = useRouter();
  const [activeAssignment, setActiveAssignment] = useState<string | null>(null);
  const [textContent, setTextContent] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const refreshData = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = async (e: React.FormEvent, assignmentId: string) => {
    e.preventDefault();
    if (!textContent && !fileUrl) return alert("Please provide some text or a file link.");
    setLoading(true);
    try {
      const res = await fetch("/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "submit", assignmentId, textContent, fileUrl }),
      });
      if (res.ok) {
        setActiveAssignment(null);
        setTextContent("");
        setFileUrl("");
        refreshData();
      }
    } catch (err) {
      alert("Error submitting assignment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-primary-950">My Assignments</h1>
        <p className="text-slate-600 mt-2">Complete tasks assigned by your coach.</p>
      </div>

      <div className="space-y-6">
        {assignments.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
            <p className="text-slate-500">You have no pending or completed assignments.</p>
          </div>
        ) : (
          assignments.map(assignment => {
            const submission = assignment.submissions[0]; 
            
            return (
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
                  {submission && (
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${
                      submission.status === "REVIEWED" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {submission.status}
                    </span>
                  )}
                  {!submission && (
                    <span className="px-3 py-1 text-sm font-semibold rounded-full bg-slate-100 text-slate-600">
                      NOT SUBMITTED
                    </span>
                  )}
                </div>
                
                <div className="p-6">
                  {submission ? (
                    <div className="space-y-4">
                      <h4 className="font-semibold text-slate-900">Your Submission</h4>
                      <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                        {submission.textContent && <p className="text-slate-700 mb-2">{submission.textContent}</p>}
                        {submission.fileUrl && (
                          <a href={submission.fileUrl} target="_blank" rel="noreferrer" className="text-accent-600 font-medium hover:underline text-sm truncate block mt-2">
                            Attached Link: {submission.fileUrl}
                          </a>
                        )}
                      </div>
                      
                      {submission.status === "REVIEWED" && submission.feedback && (
                        <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-semibold text-green-900 mb-2">Coach's Feedback</h4>
                          <p className="text-green-800">{submission.feedback}</p>
                        </div>
                      )}

                      {submission.status === "PENDING" && activeAssignment !== assignment.id && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setActiveAssignment(assignment.id);
                            setTextContent(submission.textContent || "");
                            setFileUrl(submission.fileUrl || "");
                          }}
                        >
                          Edit Submission
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div>
                      {activeAssignment !== assignment.id ? (
                        <Button onClick={() => setActiveAssignment(assignment.id)} variant="primary">
                          Start Assignment
                        </Button>
                      ) : null}
                    </div>
                  )}

                  {activeAssignment === assignment.id && (
                    <form onSubmit={(e) => handleSubmit(e, assignment.id)} className="mt-4 space-y-4 max-w-2xl bg-slate-50 p-6 rounded-xl border border-slate-200">
                      <h4 className="font-semibold text-slate-900">Submit Your Work</h4>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Text Response</label>
                        <textarea 
                          value={textContent} 
                          onChange={e => setTextContent(e.target.value)} 
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-accent-500 focus:border-accent-500 h-32"
                          placeholder="Write your response here..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">File Link (Google Drive, Dropbox, etc.)</label>
                        <input 
                          type="url" 
                          value={fileUrl} 
                          onChange={e => setFileUrl(e.target.value)} 
                          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-accent-500 focus:border-accent-500"
                          placeholder="https://..."
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button type="submit" variant="primary" disabled={loading}>
                          {loading ? "Submitting..." : (submission ? "Update Submission" : "Submit Assignment")}
                        </Button>
                        <Button type="button" variant="outline" onClick={() => setActiveAssignment(null)} disabled={loading}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
