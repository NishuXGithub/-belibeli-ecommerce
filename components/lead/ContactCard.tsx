import { Mail, MessageCircle, Phone } from "lucide-react";
import type { ElementType } from "react";
import SectionTitle from "./SectionTitle";

type InfoRowProps = {
  icon: ElementType;
  label: string;
  value: string;
};

function InfoRow({ icon: Icon, label, value }: InfoRowProps) {
  return (
    <div className="group/row rounded-xl border border-emerald-50 bg-white/80 px-4 py-3.5 transition-all duration-300 hover:border-emerald-200 hover:bg-emerald-50/70">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 transition group-hover/row:bg-emerald-600 group-hover/row:text-white">
          <Icon size={17} />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-slate-600">{label}</p>

          <p className="mt-0.5 break-words text-sm font-extrabold text-slate-900 transition group-hover/row:text-emerald-700">
            {value}

          </p>
        </div>
      </div>
    </div>
  );
}
export default function ContactCard({ lead }: any) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] border border-emerald-100 bg-white p-5 shadow-[0_18px_45px_rgba(15,118,110,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_24px_60px_rgba(15,118,110,0.16)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-200/35 blur-3xl transition group-hover:bg-emerald-300/45" />
      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-[60px] bg-gradient-to-br from-emerald-500/10 to-teal-500/5" />

      <div className="relative flex items-center justify-between border-b border-emerald-100 pb-4">
        <SectionTitle icon={Phone} title="Contact Information" />

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700 ring-1 ring-emerald-100">
          Live Contact
        </span>
      </div>

      <div className="relative mt-5 space-y-3">
        <InfoRow icon={Mail} label="Email" value={lead.email} />
        <InfoRow icon={Phone} label="Phone" value={lead.phone} />
        <InfoRow icon={MessageCircle} label="WhatsApp" value={lead.phone} />
      </div>
    </div>
  );
}