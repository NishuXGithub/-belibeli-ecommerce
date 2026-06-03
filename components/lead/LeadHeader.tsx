"use client";
import type {  useState, ChangeEvent, RefObject } from "react";
import {
  Search,
  Filter,
  Upload,
  Download,
  Plus,
  UserPlus,
  Users,
} from "lucide-react";

type LeadHeaderProps = {
  searchText: string;
  setSearchText: (value: string) => void;

  showFilter: boolean;
  setShowFilter: React.Dispatch<React.SetStateAction<boolean>>;

  priorityFilter: string;
  setPriorityFilter: (value: string) => void;

  fileInputRef: RefObject<HTMLInputElement | null>;
  handleImportClick: () => void;
  handleImportFile: (event: ChangeEvent<HTMLInputElement>) => void;

  handleAddLead: () => void;
  handleAssign: () => void;
  handleExport: () => void;
};

export default function LeadHeader({
  searchText,
  setSearchText,
  showFilter,
  setShowFilter,
  priorityFilter,
  setPriorityFilter,
  fileInputRef,
  handleImportClick,
  handleImportFile,
  handleAddLead,
  handleAssign,
  handleExport,
}: LeadHeaderProps) {
  return (
    <div className="mb-2 rounded-xl border border-[#DDE8E1] bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-sm">
            <Users size={22} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-[#172033]">
              Borrower{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                Leads
              </span>
            </h1>

            <p className="mt-0.5 text-sm text-[#64748B]">
              Manage borrower lead records and follow-ups
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600"
            />

            <input
              type="text"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search borrower leads..."
              className="h-10 w-[270px] rounded-lg border border-emerald-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10"
            />
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() => setShowFilter((prev) => !prev)}
              className="flex h-10 items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
            >
              <Filter size={17} />
              Filter
            </button>

            {showFilter && (
              <div className="absolute right-0 top-12 z-20 w-52 rounded-xl border border-[#DDE8E1] bg-white p-4 shadow-lg">
                <label className="mb-2 block text-xs font-semibold text-[#64748B]">
                  Priority
                </label>

                <select
                  value={priorityFilter}
                  onChange={(event) => setPriorityFilter(event.target.value)}
                  className="h-10 w-full rounded-lg border border-[#D8DEE8] px-3 text-sm outline-none focus:border-[#00A63E]"
                >
                  <option value="all">All</option>
                  <option value="hot">Hot</option>
                  <option value="warm">Warm</option>
                  <option value="cold">Cold</option>
                </select>

                <button
                  type="button"
                  onClick={() => {
                    setPriorityFilter("all");
                    setShowFilter(false);
                  }}
                  className="mt-3 w-full rounded-lg bg-[#F4FFF8] px-3 py-2 text-sm font-medium text-[#008A2E]"
                >
                  Clear Filter
                </button>
              </div>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleImportFile}
            className="hidden"
          />

          <button
            type="button"
            onClick={handleImportClick}
            className="flex h-10 items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            <Upload size={17} />
            Import
          </button>

          <button
            type="button"
            onClick={handleAddLead}
            className="flex h-10 items-center gap-2 rounded-lg bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <Plus size={17} />
            Add Lead
          </button>

          <button
  type="button"
  onClick={handleAssign}
  title="Assign selected leads to team member"
  className="group flex h-10 items-center gap-2 rounded-lg bg-gradient-to-r from-[#0F766E] to-[#059669] px-4 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
>
  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white/15 transition group-hover:bg-white/25">
    <UserPlus size={15} />
  </span>
  <span>Assign Leads</span>
</button>

          <button
            type="button"
            onClick={handleExport}
            className="flex h-10 items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            <Download size={17} />
            Export
          </button>
        </div>
      </div>
    </div>
  );
}