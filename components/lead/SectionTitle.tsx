import type { ElementType } from "react";

type SectionTitleProps = {
  icon: ElementType;
  title: string;
};

export default function SectionTitle({ icon: Icon, title }: SectionTitleProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
        <Icon size={20} />
      </div>

      <h2 className="text-base font-extrabold uppercase tracking-wide text-slate-900">
        {title}
      </h2>
    </div>
  );
}

