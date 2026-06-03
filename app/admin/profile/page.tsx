"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  User,
  ShieldCheck,
  Building2,
  CalendarDays,
  Edit,
  MapPin,
  Save,
  X,
} from "lucide-react";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  const [profile, setProfile] = useState({
    name: "admin",
    email: "admin@borrowfind.com",
    phone: "+91 9876543210",
    role: "Administrator",
    department: "Management",
    joinedDate: "13 May 2026",
    company: "BorrowFind",
    location: "India",
  });

  const handleChange = (field: string, value: string) => {
    setProfile((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);

    // Yaha future me API call lagegi
    // await fetch("/api/profile", { method: "PUT", body: JSON.stringify(profile) })
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Profile</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your account information and profile details.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-green-500 flex items-center justify-center text-white text-3xl font-bold shadow">
                {profile.name.charAt(0).toUpperCase()}
              </div>

              <h2 className="mt-4 text-xl font-bold text-gray-900">
                {profile.name}
              </h2>
              <p className="text-sm text-gray-500">{profile.role}</p>

              <span className="mt-3 inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                <ShieldCheck size={14} />
                Active Account
              </span>
            </div>

            <div className="mt-6 border-t border-gray-100 pt-5 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={18} className="text-green-600" />
                <span className="text-gray-700 break-all">
                  {profile.email}
                </span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Phone size={18} className="text-green-600" />
                <span className="text-gray-700">{profile.phone}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <Building2 size={18} className="text-green-600" />
                <span className="text-gray-700">{profile.company}</span>
              </div>

              <div className="flex items-center gap-3 text-sm">
                <MapPin size={18} className="text-green-600" />
                <span className="text-gray-700">{profile.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  Personal Information
                </h3>
                <p className="text-sm text-gray-500">
                  Basic admin profile details.
                </p>
              </div>

              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <Edit size={16} />
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                  >
                    <Save size={16} />
                    Save
                  </button>

                  <button
                    onClick={() => setIsEditing(false)}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {!isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <ProfileInfo icon={<User size={18} />} label="Full Name" value={profile.name} />
                <ProfileInfo icon={<Mail size={18} />} label="Email Address" value={profile.email} />
                <ProfileInfo icon={<Phone size={18} />} label="Phone Number" value={profile.phone} />
                <ProfileInfo icon={<ShieldCheck size={18} />} label="Role" value={profile.role} />
                <ProfileInfo icon={<Building2 size={18} />} label="Department" value={profile.department} />
                <ProfileInfo icon={<CalendarDays size={18} />} label="Joined Date" value={profile.joinedDate} />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField label="Full Name" value={profile.name} onChange={(value) => handleChange("name", value)} />
                <InputField label="Email Address" value={profile.email} onChange={(value) => handleChange("email", value)} />
                <InputField label="Phone Number" value={profile.phone} onChange={(value) => handleChange("phone", value)} />
                <InputField label="Role" value={profile.role} onChange={(value) => handleChange("role", value)} />
                <InputField label="Department" value={profile.department} onChange={(value) => handleChange("department", value)} />
                <InputField label="Joined Date" value={profile.joinedDate} onChange={(value) => handleChange("joinedDate", value)} />
                <InputField label="Company" value={profile.company} onChange={(value) => handleChange("company", value)} />
                <InputField label="Location" value={profile.location} onChange={(value) => handleChange("location", value)} />
              </div>
            )}
          </div>

          {/* Account Security */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900">
              Account Security
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              Manage login and security settings.
            </p>

            <div className="mt-6 space-y-4">
              <SecurityRow
                title="Password"
                description="Last changed 30 days ago"
                buttonText="Change Password"
              />

              <SecurityRow
                title="Two Factor Authentication"
                description="Add an extra layer of security to your account"
                buttonText="Enable"
              />

              <SecurityRow
                title="Login Activity"
                description="View recent login sessions"
                buttonText="View Logs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-green-100 text-green-700 flex items-center justify-center">
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-xs font-medium text-gray-500">{label}</p>
          <p className="text-sm font-semibold text-gray-900 break-words">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-500 mb-2">
        {label}
      </label>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
      />
    </div>
  );
}

function SecurityRow({
  title,
  description,
  buttonText,
}: {
  title: string;
  description: string;
  buttonText: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-gray-100 bg-gray-50 p-4">
      <div>
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-500">{description}</p>
      </div>

      <button className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
        {buttonText}
      </button>
    </div>
  );
}