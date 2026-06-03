import type { LucideIcon } from "lucide-react";

type LeadTab = {
  label: string;
  value: string;
  count: number;
  icon: LucideIcon;
};

type LeadTabsProps = {
  tabs: LeadTab[];
  activeTab: string;
  setActiveTab: (value: string) => void;
};

export default function LeadTabs({
  tabs,
  activeTab,
  setActiveTab,
}: LeadTabsProps) {
  return (
    <div className="mb-2  rounded-xl border border-[#DDE8E1] bg-white p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.value;

          return (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value)}
              className={`group relative flex items-center justify-between gap-2 rounded-lg border px-3 py-2 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "border-[#00A63E] bg-gradient-to-r from-[#ECFDF3] to-white text-[#008A2E] shadow-sm"
                  : "border-[#EEF2F7] bg-white text-[#64748B] hover:border-emerald-200 hover:bg-[#F6FFF9] hover:text-[#008A2E]"
              }`}
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition ${
                    isActive
                      ? "bg-[#DDFBE9] text-[#008A2E]"
                      : "bg-[#F1F5F9] text-[#64748B] group-hover:bg-[#DDFBE9] group-hover:text-[#008A2E]"
                  }`}
                >
                  <Icon size={16} />
                </span>

                <span className="truncate whitespace-nowrap">
                  {tab.label}
                </span>
              </div>

              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${
                  isActive
                    ? "bg-[#00A63E] text-white"
                    : "bg-[#F1F5F9] text-[#64748B] group-hover:bg-emerald-100 group-hover:text-[#008A2E]"
                }`}
              >
                {tab.count}
              </span>

              {isActive && (
                <span className="absolute inset-x-3 -bottom-[9px] h-[3px] rounded-full bg-[#00A63E]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}