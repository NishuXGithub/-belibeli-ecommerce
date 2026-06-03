import { X } from "lucide-react";

type AgentDetailsModalProps = {
  selectedAgent: any;
  onClose: () => void;
};

export default function AgentDetailsModal({
  selectedAgent,
  onClose,
}: AgentDetailsModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
              {selectedAgent.name
                .split(" ")
                .map((item: string) => item[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#172033]">
                {selectedAgent.name}
              </h2>
              <p className="text-sm text-[#64748B]">{selectedAgent.role}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#94A3B8] hover:bg-slate-100 hover:text-[#172033]"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 space-y-3">
          <div className="rounded-xl border border-[#E5E7EB] p-3">
            <p className="text-xs font-semibold text-[#64748B]">Email</p>
            <p className="mt-1 text-sm font-semibold text-[#172033]">
              {selectedAgent.email}
            </p>
          </div>

          <div className="rounded-xl border border-[#E5E7EB] p-3">
            <p className="text-xs font-semibold text-[#64748B]">Phone</p>
            <p className="mt-1 text-sm font-semibold text-[#172033]">
              {selectedAgent.phone}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}