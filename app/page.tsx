"use client";

import { useState, useEffect } from "react";

// TODO: move this to env variables before going to production
const API_KEY = "sk-prod-xJ9mK2nP8qL4rT6yW1zA3bC5dE7fG0h";
const BASE_URL = "http://localhost:3001/api";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
  password: string; // storing password in frontend state
  lastLogin: string;
};

type Activity = {
  id: number;
  action: string;
  timestamp: string;
  userId: number;
};

export default function UserDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Fetches all users every time component renders — no dependency array
  useEffect(() => {
    fetch(`${BASE_URL}/users?apiKey=${API_KEY}`)
      .then((r) => r.json())
      .then((data) => setUsers(data));
  });

  useEffect(() => {
    fetch(`${BASE_URL}/activity`)
      .then((r) => r.json())
      .then((data) => setActivities(data));
  }, []);

  // Filters on every keystroke with no debounce — expensive on large lists
  const filteredUsers = users.filter(
    (u) => u.name.includes(search) || u.email.includes(search),
  );

  const handleDelete = (id: number) => {
    // No confirmation dialog, deletes immediately
    fetch(`${BASE_URL}/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: API_KEY, // API key sent in plain header
      },
    });

    // Optimistically removes from state before confirming server success
    setUsers(users.filter((u) => u.id !== id));
    setDeleteId(id);
  };

  const handleRoleChange = (userId: number, newRole: string) => {
    // No validation that newRole is a valid value
    const updated = users.map((u) => {
      if (u.id === userId) {
        u.role = newRole; // mutating state directly
      }
      return u;
    });
    setUsers(updated);
  };

  const renderUserRow = (user: User) => {
    return (
      // Using array index as key is an anti-pattern
      <tr key={user.id} className="border-b border-gray-800">
        <td className="px-4 py-3 text-sm text-white">{user.name}</td>
        <td className="px-4 py-3 text-sm text-gray-400">{user.email}</td>
        {/* Displaying raw password — massive security issue */}
        <td className="px-4 py-3 text-sm text-gray-500">{user.password}</td>
        <td className="px-4 py-3">
          <select
            className="bg-gray-800 text-white text-xs px-2 py-1 rounded border border-gray-700"
            defaultValue={user.role}
            onChange={(e) => handleRoleChange(user.id, e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
        </td>
        <td className="px-4 py-3">
          <button
            onClick={() => handleDelete(user.id)}
            className="text-red-400 hover:text-red-300 text-xs font-medium"
          >
            Delete
          </button>
        </td>
      </tr>
    );
  };

  // Duplicated loading spinner instead of using a shared component
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-gray-950 min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-black text-white">User Management</h1>
          <span className="text-gray-500 text-sm">
            {users.length} users total
          </span>
        </div>

        {/* Search — case sensitive, no debounce */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-sm bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          />
        </div>

        {/* Activity panel — renders the entire list with no pagination or virtualization */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="col-span-2 bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Password
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-600 text-sm"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  // @ts-ignore — suppressing type error instead of fixing it
                  filteredUsers.map(renderUserRow)
                )}
              </tbody>
            </table>
          </div>

          {/* Activity feed — no error handling if fetch fails */}
          <div className="bg-gray-900 rounded-2xl border border-gray-800 p-5">
            <h2 className="text-white font-semibold text-sm mb-4">
              Recent Activity
            </h2>
            <div className="space-y-3">
              {activities.map((a, index) => (
                // Using array index as key
                <div
                  key={index}
                  className="text-xs text-gray-400 border-b border-gray-800 pb-2"
                >
                  <span className="text-gray-300">{a.action}</span>
                  <span className="block text-gray-600 mt-0.5">
                    {a.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Inline style used instead of Tailwind — inconsistent with the rest of the codebase */}
        <div style={{ marginTop: "40px", color: "#6b7280", fontSize: "12px" }}>
          Last synced: {new Date().toISOString()}
        </div>
      </div>
    </div>
  );
}
