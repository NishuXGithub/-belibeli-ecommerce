import {
  Users,
  Mail,
  Target,
  UserCheck,
  TrendingUp,
  Activity,
  Sparkles,
} from "lucide-react";

const stats = [
  {
    title: "Total Borrower Leads",
    value: "3,457",
    subtitle: "Total leads in pipeline",
    icon: Users,
  },
  {
    title: "New Loan Enquiries",
    value: "3,076",
    subtitle: "New enquiries this month",
    icon: Mail,
  },
  {
    title: "Verified Leads",
    value: "624",
    subtitle: "KYC verified borrowers",
    icon: UserCheck,
  },
  {
    title: "Approval Rate",
    value: "18%",
    subtitle: "Loan approval conversion",
    icon: Target,
  },
  {
    title: "Follow-up Pending",
    value: "245",
    subtitle: "Pending borrower calls",
    icon: TrendingUp,
  },
  {
    title: "Recent Activities",
    value: "24",
    subtitle: "Today activity logs",
    icon: Activity,
  },
];

const leadStats = [
  {
    label: "Total Leads",
    value: "3,457",
    height: "h-[250px]",
  },
  {
    label: "New Enquiries",
    value: "3,076",
    height: "h-[220px]",
  },
  {
    label: "Verified",
    value: "624",
    height: "h-[150px]",
  },
  {
    label: "Approved",
    value: "18%",
    height: "h-[100px]",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-6 border-b border-[#DDE8E1] pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-100 to-green-50 text-emerald-600 shadow-sm">
            <Sparkles size={26} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[#172033]">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                BorrowFind Lead Dashboard
              </span>
            </h1>

            <p className="mt-1 text-sm text-[#64748B]">
              Track borrower loan enquiries, verification, follow-ups and
              approvals.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-[#DDE8E1] bg-gradient-to-br from-white to-[#DDFBE9] p-6 shadow-sm"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#172033]">
                    {item.title}
                  </p>

                  <h3 className="mt-3 text-3xl font-extrabold text-[#008A2E]">
                    {item.value}
                  </h3>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#C9F8DA] text-[#00A63E]">
                  <Icon size={24} />
                </div>
              </div>

              <p className="text-sm text-[#64748B]">{item.subtitle}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-[#DDE8E1] bg-gradient-to-br from-white to-[#F6FFF9] p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between border-b border-[#E5E7EB] pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#172033]">
              BorrowFind Lead Stats
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Overview of lead performance and conversion stages.
            </p>
          </div>

          <div className="rounded-full bg-[#DDFBE9] px-4 py-1.5 text-sm font-semibold text-[#008A2E]">
            This Month
          </div>
        </div>

        <div className="flex h-[360px] items-end justify-center gap-8 overflow-x-auto pt-6">
          {leadStats.map((item) => {
            return (
              <div
                key={item.label}
                className="flex min-w-[110px] flex-col items-center gap-3"
              >
                <p className="text-base font-extrabold text-[#008A2E]">
                  {item.value}
                </p>

                <div className="flex h-[260px] items-end">
                  <div
                    className={`${item.height} w-24 rounded-t-2xl bg-gradient-to-t from-[#00A63E] to-[#7EE7A3] shadow-md transition-transform duration-300 hover:scale-105`}
                  />
                </div>

                <p className="text-center text-sm font-semibold text-[#64748B]">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}