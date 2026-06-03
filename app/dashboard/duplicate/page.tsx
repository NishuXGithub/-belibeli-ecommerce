import { Copy, Mail, Phone } from "lucide-react";

const duplicateLeads = [
  {
    name: "Amit Verma",
    email: "amit.loan@example.com",
    phone: "9812345678",
    loanType: "Business Loan",
    count: 2,
  },
  {
    name: "Rahul Sharma",
    email: "rahul.borrower@example.com",
    phone: "9876543210",
    loanType: "Personal Loan",
    count: 3,
  },
];

export default function DuplicatePage() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between rounded-xl border border-[#DDE8E1] bg-white p-5 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#172033]">
            Duplicate Borrower Leads
          </h1>
          <p className="text-sm text-[#64748B]">
            Manage repeated borrower enquiries from same email or phone.
          </p>
        </div>

        <button className="flex items-center gap-2 rounded-lg bg-[#00C853] px-4 py-2 text-sm font-semibold text-white">
          <Copy size={17} />
          Merge Selected
        </button>
      </div>

      <div className="rounded-xl border border-[#DDE8E1] bg-white shadow-sm">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-[#F4FFF8] text-left text-xs uppercase text-[#64748B]">
              <th className="px-5 py-4">Borrower Name</th>
              <th className="px-5 py-4">Contact</th>
              <th className="px-5 py-4">Loan Type</th>
              <th className="px-5 py-4">Duplicate Count</th>
              <th className="px-5 py-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {duplicateLeads.map((lead) => (
              <tr
                key={lead.name}
                className="border-b border-[#EEF2F7] text-sm hover:bg-[#F9FFFB]"
              >
                <td className="px-5 py-4 font-semibold text-[#172033]">
                  {lead.name}
                </td>

                <td className="px-5 py-4">
                  <p className="flex items-center gap-2">
                    <Mail size={15} className="text-[#00A63E]" />
                    {lead.email}
                  </p>
                  <p className="mt-1 flex items-center gap-2">
                    <Phone size={15} className="text-[#00A63E]" />
                    {lead.phone}
                  </p>
                </td>

                <td className="px-5 py-4 font-medium text-[#172033]">
                  {lead.loanType}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600">
                    {lead.count} Records
                  </span>
                </td>

                <td className="px-5 py-4">
                  <button className="rounded-lg border border-[#D8DEE8] px-4 py-2 text-xs font-semibold hover:bg-[#F4FFF8]">
                    Review
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}