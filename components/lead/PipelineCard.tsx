import { Activity, CheckCircle } from "lucide-react";
import SectionTitle from "./SectionTitle";

type PipelineCardProps = {
  lead: any;
  pipeline: string[];
  onPipelineClick: (status: string) => void;
};

export default function PipelineCard({
  lead,
  pipeline,
  onPipelineClick,
}: PipelineCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-[26px] border border-emerald-100 bg-white p-6 shadow-[0_18px_45px_rgba(15,118,110,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_24px_60px_rgba(15,118,110,0.16)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-200/35 blur-3xl transition group-hover:bg-emerald-300/45" />
      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-[60px] bg-gradient-to-br from-emerald-500/10 to-teal-500/5" />

      <div className="relative flex items-center justify-between border-b border-emerald-100 pb-4">
        <SectionTitle icon={Activity} title="Lead Status Pipeline" />

        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-extrabold text-emerald-700 ring-1 ring-emerald-100">
          Active Journey
        </span>
      </div>

      <div className="relative mt-8 flex items-center justify-between gap-3 overflow-x-auto pb-2">
        {pipeline.map((item, index) => {
          const isActive = item.toLowerCase() === lead.status.toLowerCase();

          return (
            <div key={item} className="flex min-w-[105px] flex-1 items-center">
              <button
                type="button"
                onClick={() => onPipelineClick(item)}
                className="flex flex-col items-center gap-2"
              >
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? "border-emerald-500 bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30"
                      : "border-emerald-100 bg-white text-slate-400 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                  }`}
                >
                  <CheckCircle size={22} />
                </div>

                <p
                  className={`text-xs font-extrabold ${
                    isActive ? "text-teal-700" : "text-slate-500"
                  }`}
                >
                  {item}
                </p>
              </button>

              {index !== pipeline.length - 1 && (
                <div className="mx-3 hidden h-[2px] flex-1 border-t border-dashed border-emerald-200 xl:block" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}