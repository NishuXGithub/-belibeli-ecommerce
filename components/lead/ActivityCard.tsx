import {
  Activity,
  AtSign,
  FileText,
  Paperclip,
  Send,
  Smile,
} from "lucide-react";

import SectionTitle from "./SectionTitle";
import NoteCard from "./NoteCard";

type ActivityCardProps = {
  activeActivityTab: string;
  setActiveActivityTab: (tab: string) => void;
  activityTabs: string[];
  noteText: string;
  setNoteText: (value: string) => void;
  handleAddNote: () => void;
  notes: string[];
  lead: any;
};

export default function ActivityCard({
  activeActivityTab,
  setActiveActivityTab,
  activityTabs,
  noteText,
  setNoteText,
  handleAddNote,
  notes,
  lead,
}: ActivityCardProps) {
  const filteredNotes =
    activeActivityTab === "All"
      ? notes
      : notes.filter((note) =>
          note.toLowerCase().includes(activeActivityTab.toLowerCase())
        );

  return (
    <div className="group relative overflow-hidden rounded-[26px] border border-emerald-100 bg-white shadow-[0_18px_45px_rgba(15,118,110,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-[0_24px_60px_rgba(15,118,110,0.16)]">
      <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-emerald-200/35 blur-3xl transition group-hover:bg-emerald-300/45" />
      <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-bl-[60px] bg-gradient-to-br from-emerald-500/10 to-teal-500/5" />

      <div className="relative flex flex-col gap-4 border-b border-emerald-100 p-5 md:flex-row md:items-center md:justify-between">
        <SectionTitle icon={Activity} title="Activity" />

        <div className="flex flex-wrap gap-2">
          {activityTabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveActivityTab(tab)}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                activeActivityTab === tab
                  ? "bg-teal-50 text-teal-700 ring-1 ring-teal-100"
                  : "text-slate-500 hover:bg-emerald-50 hover:text-emerald-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="relative p-5">
        <div className="rounded-[22px] border border-emerald-100 bg-emerald-50/40 p-4">
          <div className="flex gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
              <FileText size={21} />
            </div>

            <div className="w-full">
              <textarea
                value={noteText}
                onChange={(event) => setNoteText(event.target.value)}
                placeholder="Write a note about this lead..."
                className="h-24 w-full resize-none rounded-2xl border border-emerald-100 bg-white p-4 text-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
              />

              <div className="mt-3 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-slate-400">
                  <Paperclip size={17} />
                  <AtSign size={17} />
                  <Smile size={17} />
                </div>

                <button
                  type="button"
                  onClick={handleAddNote}
                  className="flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 px-5 text-sm font-extrabold text-white shadow-lg shadow-teal-500/20 transition hover:-translate-y-0.5"
                >
                  <Send size={16} />
                  Add Note
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-5 max-h-[430px] space-y-4 overflow-y-auto pr-2">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note, index) => (
              <NoteCard
                key={index}
                source={lead.source}
                status={lead.status}
                owner={lead.assigned}
                customNote={note}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-emerald-200 bg-emerald-50/40 p-5 text-center text-sm font-semibold text-slate-500">
              No {activeActivityTab} activity found.
            </div>
          )}

          {activeActivityTab === "All" && (
            <NoteCard
              source={lead.source}
              status={lead.status}
              owner={lead.assigned}
            />
          )}
        </div>

        <p className="mt-5 text-sm font-medium text-slate-500">
          Active Activity Tab:{" "}
          <span className="font-extrabold text-teal-700">
            {activeActivityTab}
          </span>
        </p>
      </div>
    </div>
  );
}