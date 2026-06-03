"use client";

import { useState } from "react";
import {
  X,
  UserPlus,
  Users,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

type Agent = {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
};

type AssignLeadModalProps = {
  open: boolean;
  onClose: () => void;
  selectedCount?: number;
  agents: Agent[];
  onAssign: (data: {
    memberId: number;
    priority: string;
    note: string;
  }) => void;
};

export default function AssignLeadModal({
  open,
  onClose,
  selectedCount = 0,
  agents,
  onAssign,
}: AssignLeadModalProps) {
  const [selectedMember, setSelectedMember] = useState<number | null>(null);
  const [priority, setPriority] = useState("normal");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleClose = () => {
    if (loading) return;

    setSelectedMember(null);
    setPriority("normal");
    setNote("");
    setError("");
    onClose();
  };

  const handleAssignLead = () => {
    setError("");

    if (selectedCount <= 0) {
      setError("Please select at least one lead first.");
      return;
    }

    if (!selectedMember) {
      setError("Please select a team member before assigning leads.");
      return;
    }

    setLoading(true);

    onAssign({
      memberId: selectedMember,
      priority,
      note,
    });

    setTimeout(() => {
      setLoading(false);
      setSelectedMember(null);
      setPriority("normal");
      setNote("");
      setError("");
    }, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
              <UserPlus size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Assign Leads
              </h2>
              <p className="text-sm text-slate-500">
                Assign selected borrower leads to a team member.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <X size={20} />
          </button>
        </div>

        <div className="max-h-[70vh] space-y-5 overflow-y-auto p-6">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
            <p className="text-sm font-medium text-emerald-800">
              {selectedCount > 0
                ? `${selectedCount} lead(s) selected for assignment.`
                : "No lead selected. Select leads first for bulk assignment."}
            </p>
          </div>

          {error && (
            <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              <AlertCircle size={18} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Select Assigned Agent
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              {agents.map((agent) => {
                const isSelected = selectedMember === agent.id;

                return (
                  <button
                    key={agent.id}
                    type="button"
                    onClick={() => setSelectedMember(agent.id)}
                    className={`rounded-xl border p-4 text-left transition ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-100"
                        : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/40"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-700">
                          <Users size={18} />
                        </div>

                        <div>
                          <p className="font-semibold text-slate-900">
                            {agent.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {agent.role}
                          </p>
                          <p className="mt-1 text-xs text-slate-400">
                            {agent.email}
                          </p>
                        </div>
                      </div>

                      {isSelected && (
                        <CheckCircle2 size={20} className="text-emerald-600" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Assignment Priority
            </label>

            <select
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
              className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            >
              <option value="normal">Normal</option>
              <option value="high">High Priority</option>
              <option value="urgent">Urgent Follow-up</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Assignment Note
            </label>

            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Add note for the assigned team member..."
              rows={3}
              className="w-full resize-none rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleAssignLead}
            disabled={loading}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading && <Loader2 size={17} className="animate-spin" />}
            {loading ? "Assigning..." : "Assign Lead"}
          </button>
        </div>
      </div>
    </div>
  );
}