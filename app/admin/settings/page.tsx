"use client";

import React, { useState } from "react";

type UserRole = "Admin" | "Editor" | "Viewer";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: UserRole;
}

const AdminSettings: React.FC = () => {
  const [members, setMembers] = useState<TeamMember[]>([
    { id: 1, name: "Brian Frederin", email: "brian@email.com", role: "Admin" },
    { id: 2, name: "John Carter", email: "john@email.com", role: "Editor" },
  ]);

  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newRole, setNewRole] = useState<UserRole>("Viewer");

  const [twoFA, setTwoFA] = useState(false);

  const addMember = () => {
    if (!newName || !newEmail) return;

    const newMember: TeamMember = {
      id: Date.now(),
      name: newName,
      email: newEmail,
      role: newRole,
    };

    setMembers([...members, newMember]);
    setNewName("");
    setNewEmail("");
    setNewRole("Viewer");
  };

  const removeMember = (id: number) => {
    setMembers(members.filter((member) => member.id !== id));
  };

  const updateRole = (id: number, role: UserRole) => {
    setMembers(
      members.map((member) =>
        member.id === id ? { ...member, role } : member
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex font-sans">
      {/* Sidebar */}
      <div className="w-72 bg-white shadow-sm border-r px-10 py-12">
  <h2 className="text-2xl font-semibold mb-12 tracking-tight">
    Account Settings
  </h2>

  <div className="space-y-10 text-gray-700">
    
    {/* Account Section */}
    <div>
      <p className="text-base font-semibold text-black mb-4">
        Account
      </p>

      <ul className="space-y-4 text-base">
        <li className="text-blue-600 font-medium">
          Profile
        </li>
        <li className="hover:text-black cursor-pointer transition">
          Security
        </li>
        <li className="hover:text-black cursor-pointer transition">
          Notifications
        </li>
      </ul>
    </div>

    {/* Workspace Section */}
    <div>
      <p className="text-base font-semibold text-black mb-4">
        Workspace
      </p>

      <ul className="space-y-4 text-base">
        <li className="hover:text-black cursor-pointer transition">
          General
        </li>
        <li className="hover:text-black cursor-pointer font-medium transition">
          Members
        </li>
        <li className="hover:text-black cursor-pointer transition">
          Billing
        </li>
      </ul>
    </div>
  </div>
</div>

      {/* Main Content */}
      <div className="flex-1 p-12">
        <h1 className="text-3xl font-semibold mb-10">Admin Settings</h1>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-10 mb-10">
          <h2 className="text-lg font-semibold mb-8">My Profile</h2>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-sm font-medium mb-2">
                First Name
              </label>
              <input
                type="text"
                defaultValue="Brian"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Last Name
              </label>
              <input
                type="text"
                defaultValue="Frederin"
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition"
              />
            </div>
          </div>

          <div className="mt-8">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition">
              Save Changes
            </button>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-10 mb-10">
          <h2 className="text-lg font-semibold mb-8">Account Security</h2>

          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Change Email</p>
                <p className="text-sm text-gray-500">
                  Update your login email address
                </p>
              </div>
              <button className="border px-4 py-2 rounded-xl hover:bg-gray-100 transition">
                Change
              </button>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Change Password</p>
                <p className="text-sm text-gray-500">
                  Ensure your password is strong and secure
                </p>
              </div>
              <button className="border px-4 py-2 rounded-xl hover:bg-gray-100 transition">
                Change
              </button>
            </div>

            {/* 2FA Toggle */}
            <div className="flex justify-between items-center">
              <div>
                <p className="font-medium">Enable two factor authentication</p>
                <p className="text-sm text-gray-500">
                  Add an extra layer of security to your account
                </p>
              </div>

              <button
                onClick={() => setTwoFA(!twoFA)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-300 ${
                  twoFA ? "bg-blue-600" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-all duration-300 ${
                    twoFA ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {twoFA && (
              <div className="text-sm text-green-600 font-medium">
                two factor authentication is enabled for this account.
              </div>
            )}
          </div>
        </div>

        {/* Members Section */}
        <div className="bg-white rounded-2xl shadow-sm border p-10">
          <h2 className="text-lg font-semibold mb-8">Workspace Members</h2>

          {/* Add Member */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <input
              type="text"
              placeholder="Full Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <input
              type="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <select
              value={newRole}
              onChange={(e) => setNewRole(e.target.value as UserRole)}
              className="border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>

            <button
              onClick={addMember}
              className="bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
            >
              Add Member
            </button>
          </div>

          {/* Members Table */}
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600 text-sm">
                <th className="py-4">Name</th>
                <th>Email</th>
                <th>Role</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr
                  key={member.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-4">{member.name}</td>
                  <td>{member.email}</td>
                  <td>
                    <select
                      value={member.role}
                      onChange={(e) =>
                        updateRole(member.id, e.target.value as UserRole)
                      }
                      className="border rounded-lg px-3 py-1"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Editor">Editor</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => removeMember(member.id)}
                      className="text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;