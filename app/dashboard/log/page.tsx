import { UserPlus, Phone, Mail, CheckCircle, Clock } from "lucide-react";

const logs = [
  {
    title: "New borrower lead added",
    description: "Rahul Sharma submitted a personal loan enquiry.",
    time: "10 minutes ago",
    icon: UserPlus,
  },
  {
    title: "Follow-up reminder created",
    description: "Follow-up scheduled for Amit Verma business loan enquiry.",
    time: "25 minutes ago",
    icon: Clock,
  },
  {
    title: "Borrower contacted",
    description: "Phone call activity added for Neha Gupta.",
    time: "1 hour ago",
    icon: Phone,
  },
  {
    title: "Email sent",
    description: "Loan document checklist email sent to Pooja Mehta.",
    time: "2 hours ago",
    icon: Mail,
  },
  {
    title: "Lead verified",
    description: "Neha Gupta moved to verified borrower stage.",
    time: "Yesterday",
    icon: CheckCircle,
  },
];

export default function LogPage() {
  return (
    <div>
      <div className="mb-6 rounded-xl border border-[#DDE8E1] bg-white p-5 shadow-sm">
        <h1 className="text-2xl font-bold text-[#172033]">
          Borrower Lead Activity
        </h1>
        <p className="text-sm text-[#64748B]">
          Track borrower enquiries, follow-ups, document updates and lead status.
        </p>
      </div>

      <div className="rounded-xl border border-[#DDE8E1] bg-white p-6 shadow-sm">
        <div className="space-y-4">
          {logs.map((log) => {
            const Icon = log.icon;

            return (
              <div
                key={log.title}
                className="flex gap-4 rounded-xl border border-[#E5E7EB] bg-[#F9FFFB] p-4"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#DDFBE9] text-[#00A63E]">
                  <Icon size={20} />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-bold text-[#172033]">{log.title}</h3>
                    <span className="text-xs text-[#94A3B8]">{log.time}</span>
                  </div>

                  <p className="mt-1 text-sm text-[#64748B]">
                    {log.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}