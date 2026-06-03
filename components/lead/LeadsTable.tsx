import Link from "next/link";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  ListChecks,
  Mail,
  Phone,
} from "lucide-react";

type LeadsTableProps = {
  leads: any[];
  selectedLeads: number[];
  isAllSelected: boolean;
  handleSelectAll: () => void;
  handleSelectOne: (id: number) => void;
  setSelectedAgent: (agent: any) => void;
  formatStatus: (status: string) => string;
  getStatusClass: (status: string) => string;
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  totalRecords: number;
  startIndex: number;
};

const createSlug = (name: string) => {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
};

const getLeadSlug = (lead: any) => {
  return lead.slug || createSlug(lead.name || `lead-${lead.id}`);
};

const getInitials = (name: string) => {
  return (name || "NA")
    .split(" ")
    .map((item: string) => item[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export default function LeadsTable({
  leads,
  selectedLeads,
  isAllSelected,
  handleSelectAll,
  handleSelectOne,
  setSelectedAgent,
  formatStatus,
  getStatusClass,
  currentPage,
  totalPages,
  setCurrentPage,
  totalRecords,
  startIndex,
}: LeadsTableProps) {
  const fromRecord = totalRecords === 0 ? 0 : startIndex + 1;
  const toRecord = Math.min(startIndex + leads.length, totalRecords);

  return (
    <div className="rounded-xl border border-[#DDE8E1] bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-[#DDE8E1] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <ListChecks size={18} />
          </div>

          <div>
            <h2 className="text-base font-bold text-[#172033]">
              All Borrower Leads
            </h2>

            <p className="mt-0.5 text-xs font-medium text-[#64748B]">
              Manage and track borrower lead records
            </p>
          </div>

          <span className="rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
            Total {totalRecords}
          </span>
        </div>

        <p className="text-sm font-medium text-[#94A3B8]">
          Showing {fromRecord}-{toRecord} of {totalRecords} records
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1350px] border-collapse">
          <thead>
            <tr className="border-b border-[#DDE8E1] bg-[#F4FFF8] text-left text-xs uppercase tracking-wide text-[#64748B]">
              <th className="px-5 py-4">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="h-4 w-4 rounded border-[#CBD5E1]"
                />
              </th>
              <th className="px-5 py-4">Borrower / Loan</th>
              <th className="px-5 py-4">Contact Info</th>
              <th className="px-5 py-4">Source</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Stage</th>
              <th className="px-5 py-4">Lead Scoring</th>
              <th className="px-5 py-4">Priority</th>
              <th className="px-5 py-4">Assigned To</th>
              <th className="px-5 py-4">Days In Stage</th>
              <th className="px-5 py-4">Next Follow Up</th>
              <th className="px-5 py-4">Loan Amount</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => {
              const leadSlug = getLeadSlug(lead);

              return (
                <tr
                  key={lead.id}
                  className="border-b border-[#EEF2F7] text-sm hover:bg-[#F9FFFB]"
                >
                  <td className="px-5 py-4">
                    <input
                      type="checkbox"
                      checked={selectedLeads.includes(lead.id)}
                      onChange={() => handleSelectOne(lead.id)}
                      className="h-4 w-4 rounded border-[#CBD5E1]"
                    />
                  </td>

                  <td className="px-5 py-4">
                    <Link
                      href={`/dashboard/lead/${leadSlug}`}
                      className="group flex items-center gap-3"
                    >
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white transition group-hover:scale-105 ${
                          lead.color || "bg-[#00C853]"
                        }`}
                      >
                        {getInitials(lead.name)}
                      </div>

                      <div>
                        <p className="font-semibold text-[#172033] transition group-hover:text-[#00A63E]">
                          {lead.name}
                        </p>

                        <p className="text-xs text-[#829AB1]">
                          {lead.loanType}
                        </p>
                      </div>
                    </Link>
                  </td>

                  <td className="px-5 py-4">
                    <p className="flex items-center gap-2 text-[#334155]">
                      <Mail size={15} className="text-[#829AB1]" />
                      {lead.email}
                    </p>

                    <p className="mt-1 flex items-center gap-2 text-[#334155]">
                      <Phone size={15} className="text-[#829AB1]" />
                      {lead.phone}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <span className="bg-white text-xs font-medium text-[#334155]">
                      {lead.source}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusClass(
                        lead.status
                      )}`}
                    >
                      {formatStatus(lead.status)}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-[#64748B]">
                    {lead.stage}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        lead.leadScore === "Hot"
                          ? "bg-red-50 text-red-600"
                          : lead.leadScore === "Warm"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {lead.leadScore}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        lead.priority === "Critical"
                          ? "bg-red-50 text-red-600"
                          : lead.priority === "High"
                          ? "bg-orange-50 text-orange-700"
                          : lead.priority === "Medium"
                          ? "bg-yellow-50 text-yellow-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {lead.priority}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setSelectedAgent(lead.assignedTo)}
                      className="flex items-center gap-3 rounded-xl px-2 py-1.5 text-left transition hover:bg-emerald-50"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                        {getInitials(lead.assignedTo?.name)}
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-[#172033]">
                          {lead.assignedTo?.name || "Unassigned"}
                        </p>

                        <p className="text-xs text-[#64748B]">
                          {lead.assignedTo?.role || "No role"}
                        </p>
                      </div>
                    </button>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                      <Clock size={14} />
                      {lead.daysInStage} days
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                      <Calendar size={14} />
                      {lead.nextFollowUp}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className="flex items-center gap-2 font-semibold text-[#008A2E]">
                      <DollarSign size={15} />
                      {lead.amount}
                    </span>
                  </td>
                </tr>
              );
            })}

            {leads.length === 0 && (
              <tr>
                <td
                  colSpan={12}
                  className="px-5 py-10 text-center text-sm text-[#64748B]"
                >
                  No borrower leads found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalRecords > 0 && totalPages > 1 && (
        <div className="flex flex-col gap-3 border-t border-[#DDE8E1] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-[#64748B]">
            Page {currentPage} of {totalPages}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#DDE8E1] bg-white px-3 py-2 text-sm font-semibold text-[#334155] transition hover:bg-[#F4FFF8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ChevronLeft size={16} />
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 w-9 rounded-lg text-sm font-bold transition ${
                    currentPage === page
                      ? "bg-[#00A63E] text-white"
                      : "border border-[#DDE8E1] bg-white text-[#334155] hover:bg-[#F4FFF8]"
                  }`}
                >
                  {page}
                </button>
              );
            })}

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="inline-flex items-center gap-1 rounded-lg border border-[#DDE8E1] bg-white px-3 py-2 text-sm font-semibold text-[#334155] transition hover:bg-[#F4FFF8] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}