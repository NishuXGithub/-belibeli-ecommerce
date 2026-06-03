import { Clock, FileText } from "lucide-react";

type NoteCardProps = {
  source: string;
  status: string;
  owner: string;
  customNote?: string;
};

export default function NoteCard({
  source,
  status,
  owner,
  customNote,
}: NoteCardProps) {
  return (
    <div className="group/note rounded-[20px] border border-emerald-100 bg-gradient-to-r from-emerald-50/80 to-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-lg hover:shadow-emerald-900/10">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 transition group-hover/note:bg-emerald-600 group-hover/note:text-white">
          <FileText size={20} />
        </div>

        <div>
          <h3 className="font-extrabold text-slate-900">Note Added</h3>

          <p className="mt-1 text-sm leading-6 text-slate-600">
            {customNote ? (
              customNote
            ) : (
              <>
                Lead created from{" "}
                <span className="font-bold text-blue-600">{source}</span>.
                Current status is{" "}
                <span className="font-bold text-emerald-700">{status}</span>.
              </>
            )}
          </p>

          <p className="mt-3 flex items-center gap-2 text-xs font-medium text-slate-400">
            <Clock size={14} />
            07/05/2026, 13:14:54 · {owner}
          </p>
        </div>
      </div>
    </div>
  );
}