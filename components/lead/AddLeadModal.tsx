import {
  ArrowRight,
  Briefcase,
  Building2,
  Calendar,
  Clock,
  FileText,
  Filter,
  Headphones,
  IndianRupee,
  Mail,
  Phone,
  Tag,
  Target,
  TrendingUp,
  User,
  UserPlus,
  X,
} from "lucide-react";

import PlainInput from "./PlainInput";
import PlainSelect from "./PlainSelect";
import BorrowPoint from "./BorrowPoint";

type Agent = {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
};

type NewLeadForm = {
  name: string;
  email: string;
  phone: string;
  loanType: string;
  amount: string;
  source: string;
  status: string;
  stage: string;
  priority: string;
  assignedAgentId: string;
  daysInStage: string;
  nextFollowUp: string;
};

type AddLeadModalProps = {
  newLeadForm: NewLeadForm;
  setNewLeadForm: React.Dispatch<React.SetStateAction<NewLeadForm>>;
  agents: Agent[];
  statusOptions: string[];
  onClose: () => void;
  onCreateLead: () => void;
};

export default function AddLeadModal({
  newLeadForm,
  setNewLeadForm,
  agents,
  statusOptions,
  onClose,
  onCreateLead,
}: AddLeadModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl overflow-hidden rounded-[26px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.35)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white text-slate-500 shadow-md transition hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={18} />
        </button>

        <div className="grid max-h-[90vh] overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
          <div className="relative hidden overflow-hidden bg-[#F3FFF7] p-10 lg:block">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-[#00C853]/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-[#B4F000]/25 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#CFF7DC] bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-[#008A2E] shadow-sm">
                  <Building2 size={15} />
                  BorrowFind
                </div>

                <h2 className="max-w-sm bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-2xl font-black leading-normal tracking-tight text-transparent">
                  Capture borrower leads faster and convert them smarter.
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-[#64748B]">
                  BorrowFind helps your loan team collect borrower details,
                  track loan requirements, assign agents and schedule follow-ups
                  in one simple workflow.
                </p>

                <div className="mt-9 space-y-5">
                  <BorrowPoint
                    icon={Target}
                    title="Track every lead source"
                    text="Website, Google Ads, Facebook Ads, referral or manual entry — keep every source organized."
                  />

                  <BorrowPoint
                    icon={Headphones}
                    title="Assign the right agent"
                    text="Send every borrower to the correct loan manager or verification agent for faster response."
                  />

                  <BorrowPoint
                    icon={TrendingUp}
                    title="Improve loan conversion"
                    text="Use priority, stage and follow-up dates to move qualified borrowers faster."
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="max-h-[90vh] overflow-y-auto bg-white px-8 py-6 sm:px-10 sm:py-7">
            <div className="mb-5 pr-10">
              <h2 className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-xl font-black tracking-tight text-transparent">
                Register New Lead
              </h2>
            </div>

            <div className="space-y-3.5">
              <PlainInput
                label="Full Name"
                required
                icon={User}
                placeholder="Enter your full name"
                value={newLeadForm.name}
                onChange={(value) =>
                  setNewLeadForm((prev) => ({ ...prev, name: value }))
                }
              />

              <PlainInput
                label="Email Address"
                required
                icon={Mail}
                placeholder="Enter your email address"
                value={newLeadForm.email}
                onChange={(value) =>
                  setNewLeadForm((prev) => ({ ...prev, email: value }))
                }
              />

              <PlainInput
                label="Phone Number"
                required
                icon={Phone}
                placeholder="Enter your phone number"
                value={newLeadForm.phone}
                onChange={(value) =>
                  setNewLeadForm((prev) => ({ ...prev, phone: value }))
                }
              />

              <PlainSelect
                label="Assigned Agent"
                icon={UserPlus}
                value={newLeadForm.assignedAgentId}
                onChange={(value) =>
                  setNewLeadForm((prev) => ({
                    ...prev,
                    assignedAgentId: value,
                  }))
                }
                options={agents.map((agent) => ({
                  label: `${agent.name} - ${agent.role}`,
                  value: String(agent.id),
                }))}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <PlainSelect
                  label="Loan Type"
                  icon={Briefcase}
                  value={newLeadForm.loanType}
                  onChange={(value) =>
                    setNewLeadForm((prev) => ({
                      ...prev,
                      loanType: value,
                    }))
                  }
                  options={[
                    "Personal Loan",
                    "Business Loan",
                    "Home Loan",
                    "Car Loan",
                    "Education Loan",
                    "Gold Loan",
                  ]}
                />

                <PlainInput
                  label="Loan Amount"
                  icon={IndianRupee}
                  placeholder="Enter loan amount"
                  value={newLeadForm.amount}
                  onChange={(value) =>
                    setNewLeadForm((prev) => ({ ...prev, amount: value }))
                  }
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <PlainSelect
                  label="Lead Source"
                  icon={Target}
                  value={newLeadForm.source}
                  onChange={(value) =>
                    setNewLeadForm((prev) => ({ ...prev, source: value }))
                  }
                  options={[
                    "Website",
                    "Google Ads",
                    "Facebook Ads",
                    "Referral",
                    "Manual",
                    "Unknown",
                  ]}
                />

                <PlainSelect
                  label="Priority"
                  icon={Tag}
                  value={newLeadForm.priority}
                  onChange={(value) =>
                    setNewLeadForm((prev) => ({ ...prev, priority: value }))
                  }
                  options={["Hot", "Warm", "Cold"]}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <PlainSelect
                  label="Status"
                  icon={Filter}
                  value={newLeadForm.status}
                  onChange={(value) =>
                    setNewLeadForm((prev) => ({ ...prev, status: value }))
                  }
                  options={statusOptions}
                />

                <PlainSelect
                  label="Stage"
                  icon={FileText}
                  value={newLeadForm.stage}
                  onChange={(value) =>
                    setNewLeadForm((prev) => ({ ...prev, stage: value }))
                  }
                  options={[
                    "New Lead",
                    "First Call",
                    "KYC",
                    "Qualified",
                    "Converted",
                    "Lost",
                  ]}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <PlainInput
                  label="Days In Stage"
                  icon={Clock}
                  placeholder="Enter number of days"
                  value={newLeadForm.daysInStage}
                  onChange={(value) =>
                    setNewLeadForm((prev) => ({
                      ...prev,
                      daysInStage: value,
                    }))
                  }
                />

                <PlainInput
                  label="Next Follow Up"
                  icon={Calendar}
                  placeholder="Enter follow up date"
                  value={newLeadForm.nextFollowUp}
                  onChange={(value) =>
                    setNewLeadForm((prev) => ({
                      ...prev,
                      nextFollowUp: value,
                    }))
                  }
                />
              </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="h-10 border border-[#172033] bg-white px-5 text-xs font-black tracking-wide text-[#172033] transition hover:bg-slate-50"
              >
                CANCEL
              </button>

              <button
                type="button"
                onClick={onCreateLead}
                className="flex h-10 items-center gap-2 bg-[#00C853] px-6 text-xs font-black tracking-wide text-white shadow-lg shadow-emerald-500/25 transition hover:bg-[#00A63E]"
              >
                CREATE LEAD
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}