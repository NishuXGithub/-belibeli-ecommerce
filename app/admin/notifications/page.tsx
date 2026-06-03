import {
  Bell,
  CheckCircle,
  AlertCircle,
  Mail,
  Users,
  Clock,
  ShieldCheck,
  Trash2,
  Eye,
} from "lucide-react";

const notifications = [
  {
    id: 1,
    title: "New lead received",
    message: "A new borrower lead has been added from website form.",
    time: "2 min ago",
    type: "Lead",
    status: "Unread",
    icon: Mail,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    id: 2,
    title: "Lead assigned successfully",
    message: "Nishu Kashyap lead has been assigned to Aman Verma.",
    time: "15 min ago",
    type: "Assignment",
    status: "Unread",
    icon: CheckCircle,
    iconClass: "bg-green-50 text-green-600",
  },
  {
    id: 3,
    title: "Duplicate record detected",
    message: "A duplicate borrower record was found with same email or phone.",
    time: "1 hour ago",
    type: "Duplicate",
    status: "Read",
    icon: AlertCircle,
    iconClass: "bg-orange-50 text-orange-600",
  },
  {
    id: 4,
    title: "Admin activity updated",
    message: "Admin User updated a borrower lead status to converted.",
    time: "3 hours ago",
    type: "Activity",
    status: "Read",
    icon: Users,
    iconClass: "bg-purple-50 text-purple-600",
  },
  {
    id: 5,
    title: "Follow-up reminder",
    message: "You have 3 borrower leads scheduled for follow-up today.",
    time: "Today",
    type: "Reminder",
    status: "Unread",
    icon: Clock,
    iconClass: "bg-yellow-50 text-yellow-600",
  },
];

export default function NotificationsPage() {
  const unreadCount = notifications.filter(
    (item) => item.status === "Unread"
  ).length;

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-6">
      {/* Header */}
      <div className="mb-5 rounded-2xl border border-[#DDE8E1] bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#00A86B] text-white">
              <Bell size={24} />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-[#0F172A]">
                Notifications
              </h1>
              <p className="text-sm text-[#64748B]">
                Manage your latest alerts, lead updates and admin activities.
              </p>
            </div>
          </div>

          <button className="rounded-xl bg-[#00A86B] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#008A58]">
            Mark All As Read
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-5 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#64748B]">
                Total Notifications
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#0F172A]">
                {notifications.length}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <Bell size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#64748B]">
                Unread Alerts
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#0F172A]">
                {unreadCount}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertCircle size={21} />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#64748B]">
                System Status
              </p>
              <h2 className="mt-1 text-2xl font-bold text-[#0F172A]">
                Active
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <ShieldCheck size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* List */}
      <div className="overflow-hidden rounded-2xl border border-[#DDE8E1] bg-white shadow-sm">
        <div className="border-b border-[#EEF2F7] px-5 py-4">
          <h2 className="text-lg font-bold text-[#0F172A]">
            Recent Notifications
          </h2>
          <p className="text-sm text-[#64748B]">
            Showing latest notification updates.
          </p>
        </div>

        <div className="divide-y divide-[#EEF2F7]">
          {notifications.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className={`flex flex-col gap-4 px-5 py-4 transition hover:bg-[#F8FAFC] md:flex-row md:items-center md:justify-between ${
                  item.status === "Unread" ? "bg-[#F4FFF8]" : "bg-white"
                }`}
              >
                <div className="flex gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${item.iconClass}`}
                  >
                    <Icon size={20} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-sm font-bold text-[#0F172A]">
                        {item.title}
                      </h3>

                      {item.status === "Unread" && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-[11px] font-bold text-green-700">
                          New
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-[#475569]">
                      {item.message}
                    </p>

                    <div className="mt-2 flex flex-wrap items-center gap-3">
                      <span className="rounded-full bg-[#F1F5F9] px-2.5 py-1 text-xs font-semibold text-[#475569]">
                        {item.type}
                      </span>

                      <span className="text-xs font-medium text-[#94A3B8]">
                        {item.time}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:justify-end">
                  <button className="flex items-center gap-1 rounded-lg border border-[#D8DEE8] px-3 py-2 text-xs font-semibold text-[#334155] hover:bg-white">
                    <Eye size={14} />
                    View
                  </button>

                  <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 hover:bg-red-50">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}