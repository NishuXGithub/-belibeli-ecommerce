"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  Mail,
  MessageCircle,
  MessageSquareText,
  CalendarPlus,
  MoreVertical,
  Camera,
  User,
  Activity,
  X,
  Send,
  Phone,
  Tag,
} from "lucide-react";

import ContactCard from "@/components/lead/ContactCard";
import LeadDetailsCard from "@/components/lead/LeadDetailsCard";
import PipelineCard from "@/components/lead/PipelineCard";
import ActivityCard from "@/components/lead/ActivityCard";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const defaultProfileImage =
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80";

const defaultCoverImage =
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80";

const pipeline = [
  "New",
  "Contacted",
  "Follow-up",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Won",
];

const activityTabs = ["All", "Call", "Email", "Meeting", "WhatsApp"];

const pageTabs = [
  { label: "Overview", icon: User },
  { label: "Contact", icon: Phone },
  { label: "Lead Details", icon: Tag },
  { label: "Activity", icon: Activity },
];

function formatStatus(status: string) {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function formatAmount(amount: string | number | null | undefined) {
  const cleanAmount = String(amount || "0").replace(/[₹,\s]/g, "");
  return `₹${Number(cleanAmount || 0).toLocaleString("en-IN")}`;
}

function mapBackendLeadToFrontend(lead: any) {
  return {
    id: lead.id,
    slug: lead.slug,
    name: lead.name || "",
    email: lead.email || "",
    phone: lead.phone || "N/A",

    loanType: lead.loanType || lead.loan_type || "Personal Loan",
    amount: formatAmount(lead.amount || lead.loan_amount || 0),

    source: lead.source || "Website",
    status: lead.status || "new",
    stage: lead.stage || "New Lead",

    leadScore: lead.leadScore || lead.lead_score || "Warm",
    priority: lead.priority || lead.leadScore || lead.lead_score || "Warm",

    assigned:
      lead.assignedTo?.name ||
      lead.assigned_agent_name ||
      lead.assigned ||
      "admin",

    assignedTo: lead.assignedTo || {
      id: lead.assigned_agent_id || 1,
      name: lead.assigned_agent_name || "Admin User",
      role: lead.assigned_agent_role || "Loan Manager",
      email: lead.assigned_agent_email || "admin@borrowfind.com",
      phone: lead.assigned_agent_phone || "9876543210",
    },

    daysInStage: Number(lead.daysInStage || lead.days_in_stage || 0),
    nextFollowUp: lead.nextFollowUp || lead.next_follow_up || "",

    color: lead.color || "bg-[#00C853]",
    profileImage: lead.profileImage || lead.profile_image || defaultProfileImage,
    coverImage: lead.coverImage || lead.cover_image || defaultCoverImage,

    notes: lead.notes || "",
  };
}

export default function LeadSlugPage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const [editableLead, setEditableLead] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [activePageTab, setActivePageTab] = useState("Overview");
  const [activeActivityTab, setActiveActivityTab] = useState("All");
  const [noteText, setNoteText] = useState("");
  const [notes, setNotes] = useState<string[]>([]);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");

  const [showMessageModal, setShowMessageModal] = useState(false);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const fetchLeadDetail = async () => {
      if (!slug) return;

      try {
        setLoading(true);

        const response = await fetch(`${API_BASE_URL}/api/leads/${slug}/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok) {
          console.error("Lead detail error:", result);
          setEditableLead(null);
          return;
        }

        const formattedLead = mapBackendLeadToFrontend(result.data || result);

        setEditableLead(formattedLead);

        setEmailSubject(`Regarding your ${formattedLead.loanType} enquiry`);

        setEmailBody(
          `Hi ${formattedLead.name},\n\nThank you for your interest in ${formattedLead.loanType}. We would like to discuss your loan requirement of ${formattedLead.amount}.\n\nRegards,\nBorrowFind Team`
        );

        setMessageText(
          `Hi ${formattedLead.name}, thank you for your ${formattedLead.loanType} enquiry. Our BorrowFind team will contact you shortly.`
        );
      } catch (error) {
        console.error("Lead detail API error:", error);
        setEditableLead(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLeadDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F6FAF9] p-6">
        <Link
          href="/dashboard/lead"
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={16} />
          Back to Leads
        </Link>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Loading Lead...
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Please wait while we fetch borrower lead details.
          </p>
        </div>
      </div>
    );
  }

  if (!editableLead) {
    return (
      <div className="min-h-screen bg-[#F6FAF9] p-6">
        <Link
          href="/dashboard/lead"
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-700"
        >
          <ArrowLeft size={16} />
          Back to Leads
        </Link>

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Lead Not Found</h1>
          <p className="mt-2 text-sm text-slate-500">
            This borrower lead does not exist.
          </p>
        </div>
      </div>
    );
  }

  const lead = editableLead;

  const handleAddNote = () => {
    if (!noteText.trim()) {
      alert("Please write a note first.");
      return;
    }

    setNotes((prev) => [noteText, ...prev]);
    setNoteText("");
  };

  const handlePipelineClick = (status: string) => {
    const nextStatus = status.toLowerCase();

    setEditableLead((prev: any) => {
      if (!prev) return prev;

      return {
        ...prev,
        status: nextStatus,
      };
    });

    setNotes((prev) => [`Lead status changed to ${status}.`, ...prev]);
  };

  const handleSendEmail = () => {
    if (!lead.email) {
      alert("Email address not available.");
      return;
    }

    setEmailSubject(`Regarding your ${lead.loanType} enquiry`);

    setEmailBody(
      `Hi ${lead.name},\n\nThank you for your interest in ${lead.loanType}. We would like to discuss your loan requirement of ${lead.amount}.\n\nRegards,\nBorrowFind Team`
    );

    setShowEmailModal(true);
  };

  const handleSubmitEmail = () => {
    if (!emailSubject.trim()) {
      alert("Email subject is required.");
      return;
    }

    if (!emailBody.trim()) {
      alert("Email body is required.");
      return;
    }

    setNotes((prev) => [
      `BorrowFind email sent to ${lead.email}: ${emailSubject}`,
      ...prev,
    ]);

    setShowEmailModal(false);
  };

  const handleSendMessage = () => {
    if (!lead.phone || lead.phone === "N/A") {
      alert("Phone number not available.");
      return;
    }

    setMessageText(
      `Hi ${lead.name}, thank you for your ${lead.loanType} enquiry. Our BorrowFind team will contact you shortly.`
    );

    setShowMessageModal(true);
  };

  const handleSubmitMessage = () => {
    if (!messageText.trim()) {
      alert("Please write a message first.");
      return;
    }

    setNotes((prev) => [
      `BorrowFind message sent to ${lead.name}: ${messageText}`,
      ...prev,
    ]);

    setShowMessageModal(false);
  };

  const handleWhatsApp = () => {
    if (!lead.phone || lead.phone === "N/A") {
      alert("WhatsApp number not available.");
      return;
    }

    const message = encodeURIComponent(
      `Hi ${lead.name}, thank you for your loan enquiry. Our BorrowFind team will contact you shortly.`
    );

    window.open(`https://wa.me/91${lead.phone}?text=${message}`, "_blank");

    setNotes((prev) => [`WhatsApp opened for ${lead.phone}.`, ...prev]);
  };

  const handleScheduleMeeting = () => {
    const title = encodeURIComponent(`Loan Discussion with ${lead.name}`);

    const details = encodeURIComponent(
      `Discuss ${lead.loanType} request.\nAmount: ${lead.amount}\nLead Source: ${lead.source}\nPhone: ${lead.phone}\nEmail: ${lead.email}`
    );

    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}`;

    window.open(googleCalendarUrl, "_blank");

    setNotes((prev) => [`Meeting scheduling opened for ${lead.name}.`, ...prev]);
  };

  const renderActiveTabContent = () => {
    if (activePageTab === "Contact") {
      return (
        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <ContactCard lead={lead} />

          <div className="rounded-[26px] border border-emerald-100 bg-white p-6 shadow-sm">
            <h2 className="font-extrabold text-slate-900">
              Quick Contact Actions
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <button
                type="button"
                onClick={handleSendEmail}
                className="rounded-2xl border border-emerald-100 bg-white p-5 text-left transition hover:bg-emerald-50"
              >
                <Mail size={20} />
                <h3 className="mt-4 font-extrabold">Send Email</h3>
                <p className="mt-1 text-sm text-slate-500">{lead.email}</p>
              </button>

              <button
                type="button"
                onClick={handleSendMessage}
                className="rounded-2xl border border-emerald-100 bg-white p-5 text-left transition hover:bg-emerald-50"
              >
                <MessageSquareText size={20} />
                <h3 className="mt-4 font-extrabold">Send Message</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Internal BorrowFind message
                </p>
              </button>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="rounded-2xl border border-emerald-100 bg-white p-5 text-left transition hover:bg-emerald-50"
              >
                <MessageCircle size={20} />
                <h3 className="mt-4 font-extrabold">WhatsApp</h3>
                <p className="mt-1 text-sm text-slate-500">{lead.phone}</p>
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (activePageTab === "Lead Details") {
      return (
        <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
          <LeadDetailsCard lead={lead} />

          <PipelineCard
            lead={lead}
            pipeline={pipeline}
            onPipelineClick={handlePipelineClick}
          />
        </div>
      );
    }

    if (activePageTab === "Activity") {
      return (
        <ActivityCard
          activeActivityTab={activeActivityTab}
          setActiveActivityTab={setActiveActivityTab}
          activityTabs={activityTabs}
          noteText={noteText}
          setNoteText={setNoteText}
          handleAddNote={handleAddNote}
          notes={notes}
          lead={lead}
        />
      );
    }

    return (
      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <div className="space-y-6">
          <ContactCard lead={lead} />
          <LeadDetailsCard lead={lead} />
        </div>

        <div className="space-y-6">
          <PipelineCard
            lead={lead}
            pipeline={pipeline}
            onPipelineClick={handlePipelineClick}
          />

          <ActivityCard
            activeActivityTab={activeActivityTab}
            setActiveActivityTab={setActiveActivityTab}
            activityTabs={activityTabs}
            noteText={noteText}
            setNoteText={setNoteText}
            handleAddNote={handleAddNote}
            notes={notes}
            lead={lead}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F6FAF9]">
      <div className="border-b border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/lead"
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-sm transition"
          >
            <ArrowLeft size={19} />
          </Link>

          <div>
            <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <Link href="/dashboard/lead" className="hover:text-teal-700">
                Leads
              </Link>
              <span>/</span>
              <span className="text-slate-800">{lead.name}</span>
            </div>
          </div>
        </div>
      </div>

      <main className="p-6">
        <section className="overflow-hidden border border-slate-200 bg-white shadow-sm">
          <div
            className="relative h-[245px] bg-cover bg-center"
            style={{
              backgroundImage: `linear-gradient(90deg, rgba(7, 54, 60, 0.92), rgba(0, 137, 123, 0.72), rgba(9, 105, 120, 0.42)), url(${lead.coverImage})`,
            }}
          >
            <div className="relative flex h-full items-end justify-between gap-5 p-8">
              <div className="flex items-end gap-6">
                <div className="relative">
                  <img
                    src={lead.profileImage}
                    alt={lead.name}
                    className="h-32 w-32 rounded-full border-[6px] border-white object-cover shadow-xl"
                  />

                  <label className="absolute bottom-2 left-2 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-4 border-white bg-emerald-600 text-white shadow-lg transition hover:bg-emerald-700">
                    <Camera size={15} />
                    <input type="file" accept="image/*" className="hidden" />
                  </label>

                  <span className="absolute bottom-3 right-3 h-5 w-5 rounded-full border-4 border-white bg-emerald-500" />
                </div>

                <div className="pb-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white">
                      {lead.name}
                    </h1>

                    <span className="rounded-full bg-white/95 px-4 py-1.5 text-sm font-extrabold text-emerald-700 shadow-sm">
                      {formatStatus(lead.status)}
                    </span>
                  </div>

                  <p className="mt-2 text-base font-medium text-white/85">
                    Borrower Leads & Records
                  </p>

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleSendEmail}
                      className="flex h-11 items-center gap-2 rounded-2xl border border-white/25 bg-white/15 px-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25"
                    >
                      <Mail size={17} />
                      Send Email
                    </button>

                    <button
                      type="button"
                      onClick={handleSendMessage}
                      className="flex h-11 items-center gap-2 rounded-2xl border border-white/25 bg-white/15 px-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25"
                    >
                      <MessageSquareText size={17} />
                      Send Message
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="flex h-11 items-center gap-2 rounded-2xl border border-white/25 bg-white/15 px-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/25"
                    >
                      <MessageCircle size={17} />
                      WhatsApp
                    </button>

                    <button
                      type="button"
                      onClick={handleScheduleMeeting}
                      className="flex h-11 items-center gap-2 rounded-2xl bg-white px-4 text-sm font-extrabold text-teal-700 shadow-lg transition hover:bg-teal-50"
                    >
                      <CalendarPlus size={17} />
                      Schedule Meeting
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-white backdrop-blur transition hover:bg-white/25"
              >
                <MoreVertical size={19} />
              </button>
            </div>
          </div>

          <div className="border-b border-slate-200 bg-white px-8">
            <div className="flex flex-wrap gap-8">
              {pageTabs.map((item) => {
                const Icon = item.icon;
                const isActive = activePageTab === item.label;

                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setActivePageTab(item.label)}
                    className={`flex h-16 items-center gap-2 border-b-2 text-sm font-bold transition ${
                      isActive
                        ? "border-teal-600 text-teal-700"
                        : "border-transparent text-slate-500 hover:border-teal-200 hover:text-teal-700"
                    }`}
                  >
                    <Icon size={17} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#F8FFFB] via-white to-emerald-50/40 p-6">
            {renderActiveTabContent()}
          </div>
        </section>
      </main>

      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Send BorrowFind Email
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  To:{" "}
                  <span className="font-bold text-slate-700">
                    {lead.name}
                  </span>{" "}
                  · {lead.email}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  Subject
                </label>

                <input
                  type="text"
                  value={emailSubject}
                  onChange={(event) => setEmailSubject(event.target.value)}
                  className="h-11 w-full rounded-2xl border border-emerald-100 bg-emerald-50/30 px-4 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  placeholder="Enter email subject"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                  Email Body
                </label>

                <textarea
                  value={emailBody}
                  onChange={(event) => setEmailBody(event.target.value)}
                  className="h-44 w-full resize-none rounded-2xl border border-emerald-100 bg-emerald-50/30 p-4 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                  placeholder="Write email for borrower..."
                />
              </div>

              <p className="text-xs font-medium text-slate-400">
                This is an internal BorrowFind email compose box. Later you can
                connect it with backend email service like SMTP, SendGrid, or
                AWS SES.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowEmailModal(false)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmitEmail}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-700"
              >
                <Send size={16} />
                Send Email
              </button>
            </div>
          </div>
        </div>
      )}

      {showMessageModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">
                  Send BorrowFind Message
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  To: <span className="font-bold">{lead.name}</span>
                  {lead.phone && lead.phone !== "N/A" ? ` · ${lead.phone}` : ""}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowMessageModal(false)}
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-xs font-black uppercase tracking-[0.14em] text-slate-500">
                Message
              </label>

              <textarea
                value={messageText}
                onChange={(event) => setMessageText(event.target.value)}
                className="h-36 w-full resize-none rounded-2xl border border-emerald-100 bg-emerald-50/30 p-4 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                placeholder="Write message for borrower..."
              />

              <p className="mt-2 text-xs font-medium text-slate-400">
                This is an internal BorrowFind message. You can later connect it
                with SMS, WhatsApp API, or notification service.
              </p>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowMessageModal(false)}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmitMessage}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/20 transition hover:bg-emerald-700"
              >
                <Send size={16} />
                Send Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}