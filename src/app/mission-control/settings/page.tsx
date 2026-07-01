"use client";

import { useEffect, useState } from "react";
import { UserPlus, Trash2, KeyRound, Users } from "lucide-react";
import AuthGuard from "@/components/mission-control/AuthGuard";
import Sidebar from "@/components/mission-control/Sidebar";

type MCUser = {
  id: string;
  username: string;
  role: string;
  created_at: string;
};

type Tab = "password" | "users";

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>("password");

  // Password change state
  const [currentPw, setCurrentPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [pwMsg, setPwMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [pwLoading, setPwLoading] = useState(false);

  // Users state
  const [users, setUsers] = useState<MCUser[]>([]);
  const [newUsername, setNewUsername] = useState("");
  const [newUserPw, setNewUserPw] = useState("");
  const [newUserRole, setNewUserRole] = useState("editor");
  const [userMsg, setUserMsg] = useState<{ type: "ok" | "err"; text: string } | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    if (tab === "users") loadUsers();
  }, [tab]);

  async function loadUsers() {
    const r = await fetch("/api/mission-control/users");
    const data = await r.json();
    if (Array.isArray(data)) setUsers(data);
  }

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (newPw !== confirmPw) { setPwMsg({ type: "err", text: "New passwords don't match." }); return; }
    if (newPw.length < 8) { setPwMsg({ type: "err", text: "Password must be at least 8 characters." }); return; }
    setPwLoading(true);
    setPwMsg(null);
    const r = await fetch("/api/mission-control/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
    });
    const data = await r.json();
    setPwLoading(false);
    if (data.ok) {
      setPwMsg({ type: "ok", text: "Password updated successfully." });
      setCurrentPw(""); setNewPw(""); setConfirmPw("");
    } else {
      setPwMsg({ type: "err", text: data.error ?? "Something went wrong." });
    }
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    if (!newUsername || !newUserPw) { setUserMsg({ type: "err", text: "Username and password required." }); return; }
    setUserLoading(true);
    setUserMsg(null);
    const r = await fetch("/api/mission-control/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: newUsername, password: newUserPw, role: newUserRole }),
    });
    const data = await r.json();
    setUserLoading(false);
    if (data.ok) {
      setUserMsg({ type: "ok", text: "User added." });
      setNewUsername(""); setNewUserPw(""); setNewUserRole("editor");
      loadUsers();
    } else {
      setUserMsg({ type: "err", text: data.error ?? "Something went wrong." });
    }
  }

  async function handleDeleteUser(id: string, username: string) {
    if (!confirm(`Remove user "${username}"?`)) return;
    await fetch("/api/mission-control/users", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    loadUsers();
  }

  const inputClass = "w-full bg-[#0a0a12] border border-white/[0.08] rounded-lg px-3.5 py-2.5 font-[family-name:var(--font-inter)] text-[13px] text-white placeholder:text-white/20 focus:outline-none focus:border-white/20";
  const labelClass = "font-[family-name:var(--font-inter)] text-[12px] text-white/40 mb-1.5 block";

  return (
    <AuthGuard>
      <div className="flex min-h-screen bg-[#0a0a12]">
        <Sidebar />
        <main className="flex-1 p-8 md:p-12 overflow-y-auto">
          <div className="max-w-2xl">
            <h1 className="font-sans text-[28px] font-bold text-white mb-1">Settings</h1>
            <p className="font-[family-name:var(--font-inter)] text-[14px] text-white/40 mb-8">Manage access to Mission Control.</p>

            {/* Tabs */}
            <div className="flex gap-1 mb-8 bg-[#14141e] border border-white/[0.06] rounded-lg p-1 w-fit">
              {([["password", KeyRound, "Change Password"], ["users", Users, "Users"]] as const).map(([key, Icon, label]) => (
                <button
                  key={key}
                  onClick={() => setTab(key)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-[family-name:var(--font-inter)] text-[13px] transition-colors ${
                    tab === key ? "bg-white/[0.08] text-white font-medium" : "text-white/40 hover:text-white/60"
                  }`}
                >
                  <Icon size={14} strokeWidth={2} />
                  {label}
                </button>
              ))}
            </div>

            {/* Change Password */}
            {tab === "password" && (
              <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-6">
                <h2 className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px] mb-5">Change Password</h2>
                <form onSubmit={handleChangePassword} className="flex flex-col gap-4">
                  <div>
                    <label className={labelClass}>Current Password</label>
                    <input type="password" className={inputClass} value={currentPw} onChange={(e) => setCurrentPw(e.target.value)} placeholder="••••••••" />
                  </div>
                  <div>
                    <label className={labelClass}>New Password</label>
                    <input type="password" className={inputClass} value={newPw} onChange={(e) => setNewPw(e.target.value)} placeholder="min. 8 characters" />
                  </div>
                  <div>
                    <label className={labelClass}>Confirm New Password</label>
                    <input type="password" className={inputClass} value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="••••••••" />
                  </div>
                  {pwMsg && (
                    <p className={`font-[family-name:var(--font-inter)] text-[13px] ${pwMsg.type === "ok" ? "text-[#00C97A]" : "text-red-400"}`}>{pwMsg.text}</p>
                  )}
                  <button
                    type="submit"
                    disabled={pwLoading}
                    className="self-start px-5 py-2.5 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-white/90 transition-colors disabled:opacity-50"
                  >
                    {pwLoading ? "Saving…" : "Update Password"}
                  </button>
                </form>
              </div>
            )}

            {/* Users */}
            {tab === "users" && (
              <div className="flex flex-col gap-6">
                {/* Add user */}
                <div className="bg-[#14141e] border border-white/[0.06] rounded-xl p-6">
                  <h2 className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px] mb-5">Add User</h2>
                  <form onSubmit={handleAddUser} className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass}>Username</label>
                        <input type="text" className={inputClass} value={newUsername} onChange={(e) => setNewUsername(e.target.value)} placeholder="e.g. editor1" />
                      </div>
                      <div>
                        <label className={labelClass}>Role</label>
                        <select
                          className={inputClass}
                          value={newUserRole}
                          onChange={(e) => setNewUserRole(e.target.value)}
                        >
                          <option value="admin">Admin</option>
                          <option value="editor">Editor</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass}>Password</label>
                      <input type="password" className={inputClass} value={newUserPw} onChange={(e) => setNewUserPw(e.target.value)} placeholder="min. 8 characters" />
                    </div>
                    {userMsg && (
                      <p className={`font-[family-name:var(--font-inter)] text-[13px] ${userMsg.type === "ok" ? "text-[#00C97A]" : "text-red-400"}`}>{userMsg.text}</p>
                    )}
                    <button
                      type="submit"
                      disabled={userLoading}
                      className="self-start flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-[#0a0a12] font-[family-name:var(--font-inter)] text-[13px] font-bold hover:bg-white/90 transition-colors disabled:opacity-50"
                    >
                      <UserPlus size={14} strokeWidth={2.5} />
                      {userLoading ? "Adding…" : "Add User"}
                    </button>
                  </form>
                </div>

                {/* User list */}
                <div className="bg-[#14141e] border border-white/[0.06] rounded-xl overflow-hidden">
                  <div className="px-5 py-4 border-b border-white/[0.06]">
                    <span className="font-[family-name:var(--font-inter)] text-[11px] font-bold text-white/30 uppercase tracking-[1px]">Existing Users</span>
                  </div>
                  {users.length === 0 ? (
                    <div className="px-5 py-8 text-center">
                      <p className="font-[family-name:var(--font-inter)] text-[13px] text-white/25">No users added yet.</p>
                    </div>
                  ) : (
                    users.map((u, i) => (
                      <div
                        key={u.id}
                        className={`flex items-center justify-between px-5 py-3.5 ${i < users.length - 1 ? "border-b border-white/[0.04]" : ""}`}
                      >
                        <div>
                          <span className="font-[family-name:var(--font-inter)] text-[14px] text-white font-medium">{u.username}</span>
                          <span className="ml-3 font-[family-name:var(--font-inter)] text-[10px] font-bold text-white/20 uppercase tracking-wide bg-white/[0.04] px-2 py-0.5 rounded">{u.role}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteUser(u.id, u.username)}
                          className="p-1.5 text-white/20 hover:text-red-400 transition-colors rounded"
                        >
                          <Trash2 size={14} strokeWidth={2} />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
