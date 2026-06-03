"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChangeEvent } from "react";
import AssignLeadModal from "@/components/lead/AssignLeadModal";
import Link from "next/link";
import {
  CheckCircle2,
  ListChecks,
  PhoneCall,
  ShieldCheck,
  Sparkles,
  XCircle,
} from "lucide-react";

import AddLeadModal from "@/components/lead/AddLeadModal";
import LeadHeader from "@/components/lead/LeadHeader";
import LeadTabs from "@/components/lead/LeadTabs";
import LeadsTable from "@/components/lead/LeadsTable";
import AgentDetailsModal from "@/components/lead/AgentDetailsModal";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://127.0.0.1:8000";

const parseApiResponse = async (response: Response) => {
  const text = await response.text();

  try {
    return JSON.parse(text);
  } catch {
    console.error("Non JSON API response:", text);

    throw new Error(
      `API returned non-JSON response. Status: ${response.status}. Check API URL/backend route.`
    );
  }
};

type Agent = {
  id: number;
  name: string;
  role: string;
  email: string;
  phone: string;
};

type Lead = {
  id: number;
  slug: string;
  name: string;
  email: string;
  phone: string;
  loanType: string;
  amount: string;
  source: string;
  status: string;
  stage: string;
  leadScore: string;
  priority: string;
  assignedTo: Agent;
  daysInStage: number;
  nextFollowUp: string;
  color: string;
};

const agents: Agent[] = [
  {
    id: 1,
    name: "Admin User",
    role: "Loan Manager",
    email: "admin@borrowfind.com",
    phone: "9876543210",
  },
  {
    id: 2,
    name: "Riya Sharma",
    role: "Senior Loan Agent",
    email: "riya@borrowfind.com",
    phone: "9812345678",
  },
  {
    id: 3,
    name: "Aman Verma",
    role: "Verification Agent",
    email: "aman@borrowfind.com",
    phone: "9898989898",
  },
];

const tabs = [
  { label: "All Leads", value: "all", icon: ListChecks },
  { label: "New", value: "new", icon: Sparkles },
  { label: "Contacted", value: "contacted", icon: PhoneCall },
  { label: "Qualified", value: "qualified", icon: ShieldCheck },
  { label: "Converted", value: "converted", icon: CheckCircle2 },
  { label: "Lost", value: "lost", icon: XCircle },
];

const statusOptions = ["new", "contacted", "qualified", "converted", "lost"];

const createSlug = (name: string) => {
  return name.toLowerCase().trim().replace(/\s+/g, "-");
};

const formatStatus = (status: string) => {
  return status
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getStatusClass = (status: string) => {
  if (status === "new") return "border-blue-100 bg-blue-50 text-blue-700";
  if (status === "contacted")
    return "border-amber-100 bg-amber-50 text-amber-700";
  if (status === "qualified")
    return "border-purple-100 bg-purple-50 text-purple-700";
  if (status === "converted")
    return "border-emerald-100 bg-emerald-50 text-emerald-700";
  if (status === "lost") return "border-red-100 bg-red-50 text-red-700";

  return "border-slate-100 bg-slate-50 text-slate-700";
};

const getAgentById = (id: string | number | null | undefined) => {
  return agents.find((agent) => agent.id === Number(id)) || agents[0];
};

const formatAmount = (amount: string | number | null | undefined) => {
  const cleanAmount = String(amount || "0").replace(/[₹,\s]/g, "");
  return `₹${Number(cleanAmount || 0).toLocaleString("en-IN")}`;
};

export default function AllLeadsPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [borrowerLeads, setBorrowerLeads] = useState<Lead[]>([]);
  const [searchText, setSearchText] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [showFilter, setShowFilter] = useState(false);
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [assignLoading, setAssignLoading] = useState(false);

  const leadsPerPage = 5;

  const [newLeadForm, setNewLeadForm] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "Personal Loan",
    amount: "",
    source: "Website",
    status: "new",
    stage: "New Lead",
    leadScore: "Warm",
    priority: "High",
    assignedAgentId: "1",
    daysInStage: "0",
    nextFollowUp: "",
  });

  const mapBackendLeadToFrontend = (lead: any): Lead => {
    return {
      id: lead.id,
      slug: lead.slug || createSlug(lead.name || ""),
      name: lead.name || "",
      email: lead.email || "",
      phone: lead.phone || "",
      loanType: lead.loanType || lead.loan_type || "Personal Loan",
      amount: formatAmount(lead.amount || lead.loan_amount || 0),
      source: lead.source || "Website",
      status: lead.status || "new",
      stage: lead.stage || "New Lead",
      leadScore: lead.leadScore || lead.lead_score || "Warm",
      priority:
        lead.assignmentPriority ||
        lead.assignment_priority ||
        lead.priority ||
        "High",
      assignedTo:
        lead.assignedTo && lead.assignedTo.name
          ? lead.assignedTo
          : getAgentById(lead.assignedAgentId || lead.assigned_agent_id || 1),
      daysInStage: Number(lead.daysInStage || lead.days_in_stage || 0),
      nextFollowUp: lead.nextFollowUp || lead.next_follow_up || "",
      color: lead.color || "bg-[#00C853]",
    };
  };

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/leads/`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
      });

      const result = await parseApiResponse(response);

      if (!response.ok) {
        console.error("Fetch leads error:", result);
        alert(result.message || "Failed to fetch leads.");
        return;
      }

      const backendLeads = result.data || [];
      const formattedLeads = backendLeads.map(mapBackendLeadToFrontend);

      setBorrowerLeads(formattedLeads);
    } catch (error) {
      console.error("Fetch leads API error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Leads fetch failed. Check backend server or CORS."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = useMemo(() => {
    return borrowerLeads.filter((lead) => {
      const searchValue = searchText.toLowerCase();

      const matchesSearch =
        lead.name.toLowerCase().includes(searchValue) ||
        lead.email.toLowerCase().includes(searchValue) ||
        lead.phone.toLowerCase().includes(searchValue) ||
        lead.loanType.toLowerCase().includes(searchValue) ||
        lead.source.toLowerCase().includes(searchValue) ||
        lead.status.toLowerCase().includes(searchValue) ||
        lead.stage.toLowerCase().includes(searchValue) ||
        lead.leadScore.toLowerCase().includes(searchValue) ||
        lead.priority.toLowerCase().includes(searchValue) ||
        lead.nextFollowUp.toLowerCase().includes(searchValue) ||
        lead.assignedTo.name.toLowerCase().includes(searchValue);

      const matchesTab = activeTab === "all" || lead.status === activeTab;

      const matchesPriority =
        priorityFilter === "all" ||
        lead.leadScore.toLowerCase() === priorityFilter;

      return matchesSearch && matchesTab && matchesPriority;
    });
  }, [borrowerLeads, searchText, activeTab, priorityFilter]);

  const tabsWithCounts = useMemo(() => {
    return tabs.map((tab) => {
      if (tab.value === "all") {
        return {
          ...tab,
          count: borrowerLeads.length,
        };
      }

      return {
        ...tab,
        count: borrowerLeads.filter(
          (lead) => lead.status.toLowerCase() === tab.value
        ).length,
      };
    });
  }, [borrowerLeads]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchText, activeTab, priorityFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredLeads.length / leadsPerPage));

  const startIndex = (currentPage - 1) * leadsPerPage;
  const endIndex = startIndex + leadsPerPage;

  const paginatedLeads = filteredLeads.slice(startIndex, endIndex);

  const isAllSelected =
    paginatedLeads.length > 0 &&
    paginatedLeads.every((lead) => selectedLeads.includes(lead.id));

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedLeads((prev) =>
        prev.filter((id) => !paginatedLeads.some((lead) => lead.id === id))
      );
    } else {
      setSelectedLeads((prev) => [
        ...prev,
        ...paginatedLeads
          .map((lead) => lead.id)
          .filter((id) => !prev.includes(id)),
      ]);
    }
  };

  const handleSelectOne = (id: number) => {
    setSelectedLeads((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      return [...prev, id];
    });
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    alert(`Imported file: ${file.name}`);
    event.target.value = "";
  };

  const handleAddLead = () => {
    setShowAddModal(true);
  };

  const handleCreateLead = async () => {
    const nameRegex = /^[A-Za-z ]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const numberRegex = /^[0-9]+$/;

    if (!newLeadForm.name.trim()) {
      alert("Full name is required.");
      return;
    }

    if (newLeadForm.name.trim().length < 3) {
      alert("Full name must be at least 3 characters.");
      return;
    }

    if (!nameRegex.test(newLeadForm.name.trim())) {
      alert("Full name should contain only letters and spaces.");
      return;
    }

    if (!newLeadForm.email.trim()) {
      alert("Email address is required.");
      return;
    }

    if (!emailRegex.test(newLeadForm.email.trim())) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!newLeadForm.phone.trim()) {
      alert("Phone number is required.");
      return;
    }

    if (!phoneRegex.test(newLeadForm.phone.trim())) {
      alert("Phone number must be a valid 10-digit Indian number.");
      return;
    }

    if (!newLeadForm.assignedAgentId) {
      alert("Please select an assigned agent.");
      return;
    }

    if (!newLeadForm.loanType) {
      alert("Please select loan type.");
      return;
    }

    if (!newLeadForm.amount.trim()) {
      alert("Loan amount is required.");
      return;
    }

    if (!numberRegex.test(newLeadForm.amount.trim())) {
      alert("Loan amount should contain numbers only.");
      return;
    }

    if (Number(newLeadForm.amount) <= 0) {
      alert("Loan amount must be greater than 0.");
      return;
    }

    if (!newLeadForm.source) {
      alert("Please select lead source.");
      return;
    }

    if (!newLeadForm.leadScore) {
      alert("Please select lead scoring.");
      return;
    }

    if (!newLeadForm.priority) {
      alert("Please select priority.");
      return;
    }

    if (!newLeadForm.status) {
      alert("Please select status.");
      return;
    }

    if (!newLeadForm.stage) {
      alert("Please select stage.");
      return;
    }

    if (!newLeadForm.daysInStage.trim()) {
      alert("Days in stage is required.");
      return;
    }

    if (!numberRegex.test(newLeadForm.daysInStage.trim())) {
      alert("Days in stage should be a number.");
      return;
    }

    if (Number(newLeadForm.daysInStage) < 0) {
      alert("Days in stage cannot be negative.");
      return;
    }

    if (!newLeadForm.nextFollowUp.trim()) {
      alert("Next follow up date is required.");
      return;
    }

    const selectedDate = new Date(newLeadForm.nextFollowUp);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (Number.isNaN(selectedDate.getTime())) {
      alert("Please select a valid follow up date.");
      return;
    }

    if (selectedDate < today) {
      alert("Next follow up date cannot be in the past.");
      return;
    }

    const apiPayload = {
      name: newLeadForm.name.trim(),
      email: newLeadForm.email.trim(),
      phone: newLeadForm.phone.trim(),
      loanType: newLeadForm.loanType,
      amount: newLeadForm.amount,
      source: newLeadForm.source,
      status: newLeadForm.status,
      stage: newLeadForm.stage,
      leadScore: newLeadForm.leadScore,
      priority: newLeadForm.priority,
      assignedAgentId: newLeadForm.assignedAgentId,
      daysInStage: newLeadForm.daysInStage,
      nextFollowUp: newLeadForm.nextFollowUp,
      notes: "",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/leads/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(apiPayload),
      });

      const result = await parseApiResponse(response);

      if (!response.ok) {
        console.error("Lead create error:", result);

        const errorMessage = result?.errors
          ? JSON.stringify(result.errors, null, 2)
          : result?.message || "Lead create failed.";

        alert(errorMessage);
        return;
      }

      await fetchLeads();
      setCurrentPage(1);

      setNewLeadForm({
        name: "",
        email: "",
        phone: "",
        loanType: "Personal Loan",
        amount: "",
        source: "Website",
        status: "new",
        stage: "New Lead",
        leadScore: "Warm",
        priority: "High",
        assignedAgentId: "1",
        daysInStage: "0",
        nextFollowUp: "",
      });

      setShowAddModal(false);
      alert("Lead created successfully.");
    } catch (error) {
      console.error("API error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Backend API not working. Please check Django server or CORS."
      );
    }
  };

  const handleAssign = () => {
    if (selectedLeads.length === 0) {
      alert("Please select at least one lead first.");
      return;
    }

    setShowAssignModal(true);
  };

  const handleAssignSubmit = async (data: {
    memberId: number;
    priority: string;
    note: string;
  }) => {
    const selectedAgentData = agents.find(
      (agent) => agent.id === Number(data.memberId)
    );

    if (!selectedAgentData) {
      alert("Invalid agent selected.");
      return;
    }

    if (selectedLeads.length === 0) {
      alert("Please select at least one lead first.");
      return;
    }

    try {
      setAssignLoading(true);

      const response = await fetch(`${API_BASE_URL}/api/leads/assign/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          lead_ids: selectedLeads,
          assignedAgentId: Number(data.memberId),
          assignmentPriority: data.priority,
          assignmentNote: data.note,
        }),
      });

      const result = await parseApiResponse(response);

      if (!response.ok) {
        console.error("Assign lead error:", result);
        alert(result.message || "Lead assignment failed.");
        return;
      }

      await fetchLeads();

      alert(`${selectedLeads.length} lead(s) assigned to ${selectedAgentData.name}`);

      setSelectedLeads([]);
      setShowAssignModal(false);
    } catch (error) {
      console.error("Assign leads API error:", error);
      alert(
        error instanceof Error
          ? error.message
          : "Assign lead failed. Check backend server or CORS."
      );
    } finally {
      setAssignLoading(false);
    }
  };

  const handleExport = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Loan Type",
      "Amount",
      "Source",
      "Status",
      "Stage",
      "Lead Scoring",
      "Priority",
      "Assigned To",
      "Assigned Role",
      "Days In Stage",
      "Next Follow Up",
    ];

    const rows = filteredLeads.map((lead) => [
      lead.name,
      lead.email,
      lead.phone,
      lead.loanType,
      lead.amount,
      lead.source,
      formatStatus(lead.status),
      lead.stage,
      lead.leadScore,
      lead.priority,
      lead.assignedTo.name,
      lead.assignedTo.role,
      lead.daysInStage,
      lead.nextFollowUp,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "borrower-leads.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-2">
      <LeadHeader
        searchText={searchText}
        setSearchText={setSearchText}
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        fileInputRef={fileInputRef}
        handleImportClick={handleImportClick}
        handleImportFile={handleImportFile}
        handleAddLead={handleAddLead}
        handleAssign={handleAssign}
        handleExport={handleExport}
        selectedCount={selectedLeads.length}
      />

      <LeadTabs
        tabs={tabsWithCounts}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
          Loading leads...
        </div>
      )}

      {assignLoading && (
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-500">
          Assigning selected leads...
        </div>
      )}

      <LeadsTable
        leads={paginatedLeads}
        selectedLeads={selectedLeads}
        isAllSelected={isAllSelected}
        handleSelectAll={handleSelectAll}
        handleSelectOne={handleSelectOne}
        setSelectedAgent={setSelectedAgent}
        formatStatus={formatStatus}
        getStatusClass={getStatusClass}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalRecords={filteredLeads.length}
        startIndex={startIndex}
      />

      <AssignLeadModal
        open={showAssignModal}
        onClose={() => setShowAssignModal(false)}
        selectedCount={selectedLeads.length}
        agents={agents}
        onAssign={handleAssignSubmit}
      />

      {showAddModal && (
        <AddLeadModal
          newLeadForm={newLeadForm}
          setNewLeadForm={setNewLeadForm}
          agents={agents}
          statusOptions={statusOptions}
          onClose={() => setShowAddModal(false)}
          onCreateLead={handleCreateLead}
        />
      )}

      {selectedAgent && (
        <AgentDetailsModal
          selectedAgent={selectedAgent}
          onClose={() => setSelectedAgent(null)}
        />
      )}
    </div>
  );
}