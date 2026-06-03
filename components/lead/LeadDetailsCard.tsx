import {
  Activity,
  Calendar,
  IndianRupee,
  ShieldCheck,
  Tag,
  User,
} from "lucide-react";

import type { ElementType } from "react";
import SectionTitle from "./SectionTitle";

function formatStatus(status: string) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

type DetailRowProps = {
  icon: ElementType;
  label: string;
  value: string;
  badgeClass?: string;
  valueClass?: string;
};

function DetailRow({
  icon: Icon,
  label,
  value,
  badgeClass,
  valueClass,
}: DetailRowProps) {
  return (
    <div className="group/detail flex items-center justify-between gap-4 border-b border-emerald-50 bg-white/80 px-4 py-3.5 transition-all duration-300 last:border-b-0 hover:bg-emerald-50/70">
      <span className="flex items-center gap-3 text-sm font-semibold text-slate-600">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700 transition group-hover/detail:bg-emerald-600 group-hover/detail:text-white">
          <Icon size={16} />
        </span>
        {label}
      </span>

      {badgeClass ? (
        <span
          className={`rounded-full border px-3 py-1 text-xs font-extrabold ${badgeClass}`}
        >
          {value}
        </span>
      ) : (
        <span
          className={`text-sm font-bold text-slate-900 transition group-hover/detail:text-emerald-700 ${
            valueClass || ""
          }`}
        >
          {value}
        </span>
      )}
    </div>
  );
}

export default function LeadDetailsCard({ lead }: any) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-emerald-100 bg-white p-5 shadow-[0_18px_45px_rgba(15,118,110,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_24px_60px_rgba(15,118,110,0.16)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-200/35 blur-3xl transition group-hover:bg-emerald-300/45" />
      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-[60px] bg-gradient-to-br from-emerald-500/10 to-teal-500/5" />

      <div className="relative flex items-center justify-between border-b border-emerald-100 pb-4">
        <SectionTitle icon={Tag} title="Lead Details" />

        <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-extrabold text-teal-700 ring-1 ring-teal-100">
          Borrower Profile
        </span>
      </div>

      <div className="relative mt-5 overflow-hidden rounded-2xl border border-emerald-100 bg-gradient-to-br from-white to-emerald-50/40">
        <DetailRow
          icon={Activity}
          label="Status"
          value={formatStatus(lead.status)}
          badgeClass="bg-emerald-50 text-emerald-700 border-emerald-100"
        />

        <DetailRow icon={Tag} label="Source" value={lead.source} />

        <DetailRow
          icon={ShieldCheck}
          label="Priority"
          value={lead.priority}
          badgeClass="bg-orange-50 text-orange-700 border-orange-100"
        />

        <DetailRow icon={Calendar} label="Stage" value={lead.stage} />

        <DetailRow
          icon={IndianRupee}
          label="Loan Amount"
          value={lead.amount}
          valueClass="text-teal-700 font-extrabold"
        />

        <DetailRow icon={User} label="Owner" value={lead.assigned} />
      </div>
    </div>
  );
}

