import React, { useState, useEffect } from "react";
import {
  Users,
  Shield,
  Settings,
  Eye,
  Edit,
  Plus,
  Trash2,
  Lock,
  Unlock,
  Search,
  Filter,
  Bell,
  MoreVertical,
  UserPlus,
  LogOut,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedRole, setSelectedRole] = useState(null);
  const [showCreateRole, setShowCreateRole] = useState(false);
  const [showAssignRole, setShowAssignRole] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notifications, setNotifications] = useState([]);

  // Predefined roles and permissions
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: "Super Admin",
      type: "predefined",
      users: 2,
      permissions: {
        dashboard: "full",
        orders: "full",
        inventory: "full",
        marketing: "full",
        reports: "full",
        finance: "full",
        users: "full",
        settings: "full",
      },
      requires2FA: true,
      color: "bg-red-500",
    },
    {
      id: 2,
      name: "Finance Head",
      type: "predefined",
      users: 3,
      permissions: {
        dashboard: "view",
        orders: "view",
        inventory: "none",
        marketing: "none",
        reports: "full",
        finance: "full",
        users: "view",
        settings: "none",
      },
      requires2FA: true,
      color: "bg-green-500",
    },
    {
      id: 3,
      name: "Inventory Executive",
      type: "predefined",
      users: 5,
      permissions: {
        dashboard: "view",
        orders: "edit",
        inventory: "full",
        marketing: "none",
        reports: "view",
        finance: "none",
        users: "none",
        settings: "none",
      },
      requires2FA: false,
      color: "bg-blue-500",
    },
    {
      id: 4,
      name: "Marketing Manager",
      type: "predefined",
      users: 4,
      permissions: {
        dashboard: "view",
        orders: "view",
        inventory: "view",
        marketing: "full",
        reports: "edit",
        finance: "none",
        users: "none",
        settings: "none",
      },
      requires2FA: false,
      color: "bg-purple-500",
    },
    {
      id: 5,
      name: "Order Processor",
      type: "predefined",
      users: 8,
      permissions: {
        dashboard: "view",
        orders: "full",
        inventory: "view",
        marketing: "none",
        reports: "view",
        finance: "none",
        users: "none",
        settings: "none",
      },
      requires2FA: false,
      color: "bg-orange-500",
    },
    {
      id: 6,
      name: "Support Team",
      type: "predefined",
      users: 12,
      permissions: {
        dashboard: "view",
        orders: "view",
        inventory: "none",
        marketing: "none",
        reports: "view",
        finance: "none",
        users: "view",
        settings: "none",
      },
      requires2FA: false,
      color: "bg-teal-500",
    },
  ]);

  const [employees] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      role: "Super Admin",
      status: "active",
    },
    {
      id: 2,
      name: "Sarah Wilson",
      email: "sarah@company.com",
      role: "Finance Head",
      status: "active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@company.com",
      role: "Marketing Manager",
      status: "active",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@company.com",
      role: "Order Processor",
      status: "active",
    },
    {
      id: 5,
      name: "Alex Brown",
      email: "alex@company.com",
      role: "Support Team",
      status: "inactive",
    },
  ]);

  const [auditLogs] = useState([
    {
      id: 1,
      user: "John Doe",
      action: 'Created new role "Regional Manager"',
      timestamp: "2025-08-29 14:30:00",
      ip: "192.168.1.100",
      device: "Chrome on Windows",
    },
    {
      id: 2,
      user: "Sarah Wilson",
      action: "Modified Finance permissions for Order Processor",
      timestamp: "2025-08-29 13:15:00",
      ip: "192.168.1.101",
      device: "Safari on MacOS",
    },
    {
      id: 3,
      user: "Mike Johnson",
      action: "Assigned Marketing Manager role to new user",
      timestamp: "2025-08-29 11:45:00",
      ip: "192.168.1.102",
      device: "Firefox on Linux",
    },
  ]);

  useEffect(() => {
    // Simulate security notifications
    const securityNotifications = [
      {
        id: 1,
        type: "security",
        message: "Finance Head logged in from new IP: 203.45.67.89",
        timestamp: "2 minutes ago",
        severity: "high",
      },
      {
        id: 2,
        type: "access",
        message: "Order Processor attempted unauthorized Finance access",
        timestamp: "15 minutes ago",
        severity: "critical",
      },
    ];
    setNotifications(securityNotifications);
  }, []);

  const getPermissionLevel = (permission) => {
    switch (permission) {
      case "view":
        return "View Only";
      case "edit":
        return "View + Edit";
      case "full":
        return "Full Access";
      case "none":
        return "No Access";
      default:
        return "No Access";
    }
  };

  const getPermissionColor = (permission) => {
    switch (permission) {
      case "view":
        return "bg-blue-100 text-blue-800";
      case "edit":
        return "bg-yellow-100 text-yellow-800";
      case "full":
        return "bg-green-100 text-green-800";
      case "none":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const Sidebar = () => (
    <div className="w-64 bg-gradient-to-b from-red-500 to-red-600 text-white min-h-screen">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-8">
          <div className="bg-white text-red-500 p-2 rounded-lg font-bold text-lg">
            RBAC
          </div>
          <span className="font-semibold">Admin Panel</span>
        </div>

        <nav className="space-y-2">
          {[
            { id: "dashboard", icon: Activity, label: "Dashboard" },
            { id: "roles", icon: Shield, label: "Role Management" },
            { id: "users", icon: Users, label: "User Management" },
            { id: "audit", icon: Eye, label: "Audit Logs" },
            { id: "security", icon: Lock, label: "Security Settings" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id ? "bg-red-700" : "hover:bg-red-600"
              }`}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );

  const Header = () => (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {activeTab === "dashboard" && "Dashboard Overview"}
            {activeTab === "roles" && "Role Management"}
            {activeTab === "users" && "User Management"}
            {activeTab === "audit" && "Audit Logs"}
            {activeTab === "security" && "Security Settings"}
          </h1>
          <p className="text-gray-600 mt-1">
            {activeTab === "dashboard" &&
              "Monitor system activities and security alerts"}
            {activeTab === "roles" &&
              "Create, edit, and manage user roles and permissions"}
            {activeTab === "users" && "Assign roles and manage user access"}
            {activeTab === "audit" &&
              "Track all administrative changes and user activities"}
            {activeTab === "security" && "Configure 2FA and security policies"}
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Bell className="w-6 h-6 text-gray-600 cursor-pointer" />
            {notifications.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </div>
          <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">
            SA
          </div>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="p-6">
      {/* Security Alerts */}
      {notifications.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
            Security Alerts
          </h3>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border-l-4 ${
                  notification.severity === "critical"
                    ? "bg-red-50 border-red-500"
                    : "bg-yellow-50 border-yellow-500"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">
                      {notification.message}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.timestamp}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      notification.severity === "critical"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {notification.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Role Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-blue-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 font-medium">Total Roles</p>
              <p className="text-3xl font-bold text-blue-800">{roles.length}</p>
            </div>
            <Shield className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-green-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 font-medium">Active Users</p>
              <p className="text-3xl font-bold text-green-800">
                {employees.filter((e) => e.status === "active").length}
              </p>
            </div>
            <Users className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 font-medium">2FA Enabled</p>
              <p className="text-3xl font-bold text-orange-800">
                {roles.filter((r) => r.requires2FA).length}
              </p>
            </div>
            <Lock className="w-12 h-12 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold">
            Recent Administrative Activities
          </h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {auditLogs.slice(0, 5).map((log) => (
              <div
                key={log.id}
                className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <Activity className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{log.action}</p>
                  <p className="text-sm text-gray-600">
                    by {log.user} • {log.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const RoleManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search roles..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={() => setShowCreateRole(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center space-x-2"
        >
          <Plus size={16} />
          <span>Create Role</span>
        </button>
      </div>

      {/* Table instead of cards */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                Role Name
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                Type
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                Users Assigned
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                2FA
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                Key Permissions
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {roles
              .filter((role) =>
                role.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((role) => (
                <tr key={role.id} className="hover:bg-gray-50">
                  {/* Role Name */}
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${role.color}`} />
                    <span className="font-medium text-gray-900">
                      {role.name}
                    </span>
                  </td>

                  {/* Type */}
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        role.type === "predefined"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {role.type}
                    </span>
                  </td>

                  {/* Users */}
                  <td className="px-6 py-4 text-gray-700">{role.users}</td>

                  {/* 2FA */}
                  <td className="px-6 py-4">
                    {role.requires2FA ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </td>

                  {/* Permissions */}
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      {Object.entries(role.permissions)
                        .slice(0, 3)
                        .map(([module, permission]) => (
                          <div
                            key={module}
                            className="flex items-center justify-between"
                          >
                            <span className="text-sm text-gray-600 capitalize">
                              {module}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${getPermissionColor(
                                permission
                              )}`}
                            >
                              {getPermissionLevel(permission)}
                            </span>
                          </div>
                        ))}
                      {Object.keys(role.permissions).length > 3 && (
                        <p className="text-xs text-gray-500">
                          +{Object.keys(role.permissions).length - 3} more
                        </p>
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedRole(role);
                        setShowViewRole(true);
                      }}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center space-x-1"
                    >
                      <Eye size={14} />
                      <span>View</span>
                    </button>
                    <button
                      onClick={() => {
                        setSelectedRole(role);
                        setEditRoleName(role.name);
                        setEditRequires2FA(role.requires2FA);
                        setShowEditRole(true);
                      }}
                      className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center space-x-1"
                    >
                      <Edit size={14} />
                      <span>Edit</span>
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      {showViewRole && <ViewRoleModal />}
      {showEditRole && <EditRoleModal />}
    </div>
  );

  // Add state for assign role modal

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRoleName, setSelectedRoleName] = useState("");

  // Make employees state mutable
  const [employeeList, setEmployeeList] = useState(employees);

  // Assign Role Modal
  const AssignRoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Assign Role</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select User
            </label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Choose user</option>
              {employeeList.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Select Role
            </label>
            <select
              value={selectedRoleName}
              onChange={(e) => setSelectedRoleName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">Choose role</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowAssignRole(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (!selectedUserId || !selectedRoleName) return;
              setEmployeeList(
                employeeList.map((emp) =>
                  emp.id === parseInt(selectedUserId)
                    ? { ...emp, role: selectedRoleName }
                    : emp
                )
              );
              setShowAssignRole(false);
              setSelectedUserId("");
              setSelectedRoleName("");
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Assign
          </button>
        </div>
      </div>
    </div>
  );

  // Update UserManagement to use employeeList and showAssignRole
  const UserManagement = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <select className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option>All Roles</option>
            {roles.map((role) => (
              <option key={role.id}>{role.name}</option>
            ))}
          </select>
        </div>

        <button
          onClick={() => setShowAssignRole(true)}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 flex items-center space-x-2"
        >
          <UserPlus size={16} />
          <span>Assign Role</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                User
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                Role
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                Status
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                2FA
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {employeeList.map((employee) => (
              <tr key={employee.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {employee.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {employee.name}
                      </p>
                      <p className="text-sm text-gray-600">{employee.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {employee.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      employee.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {roles.find((r) => r.name === employee.role)?.requires2FA ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button className="text-gray-600 hover:text-gray-900">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showAssignRole && <AssignRoleModal />}
    </div>
  );

  const AuditLogs = () => (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search logs..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <input
            type="date"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 flex items-center space-x-2">
          <Filter size={16} />
          <span>Filter</span>
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                User
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                Action
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                Timestamp
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                IP Address
              </th>
              <th className="text-left px-6 py-3 font-medium text-gray-900">
                Device
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {auditLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {log.user.charAt(0)}
                    </div>
                    <span className="font-medium text-gray-900">
                      {log.user}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-900">{log.action}</td>
                <td className="px-6 py-4 text-gray-600">{log.timestamp}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{log.ip}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{log.device}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const SecuritySettings = () => (
    <div className="p-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Lock className="w-5 h-5 text-red-500 mr-2" />
            Two-Factor Authentication
          </h3>
          <p className="text-gray-600 mb-4">
            Configure 2FA requirements for different roles
          </p>

          <div className="space-y-3">
            {roles.map((role) => (
              <div
                key={role.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <span className="font-medium">{role.name}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={role.requires2FA}
                    className="sr-only peer"
                    readOnly
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow border p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Bell className="w-5 h-5 text-red-500 mr-2" />
            Security Notifications
          </h3>
          <p className="text-gray-600 mb-4">
            Configure when to receive security alerts
          </p>

          <div className="space-y-3">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-red-500"
                defaultChecked
              />
              <span>New device login</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-red-500"
                defaultChecked
              />
              <span>Unusual IP address</span>
            </label>
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                className="w-4 h-4 text-red-500"
                defaultChecked
              />
              <span>Role permission changes</span>
            </label>
            <label className="flex items-center space-x-3">
              <input type="checkbox" className="w-4 h-4 text-red-500" />
              <span>Failed login attempts</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const CreateRoleModal = () => {
    const [roleName, setRoleName] = useState("");
    const [requires2FA, setRequires2FA] = useState(false);

    const handleCreateRole = () => {
      if (!roleName.trim()) return;

      const newRole = {
        id: roles.length + 1,
        name: roleName,
        type: "custom",
        users: 0,
        permissions: {
          dashboard: "view",
          orders: "none",
          inventory: "none",
          marketing: "none",
          reports: "none",
          finance: "none",
          users: "none",
          settings: "none",
        },
        requires2FA,
        color: "bg-gray-500",
      };

      setRoles([...roles, newRole]); // add role
      setShowCreateRole(false); // close modal
      setRoleName(""); // reset
      setRequires2FA(false);
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
          <h2 className="text-xl font-bold mb-4">Create New Role</h2>

          <div className="space-y-4">
            {/* Role Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role Name
              </label>
              <input
                type="text"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter role name"
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* 2FA */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Require 2FA
              </span>
              <input
                type="checkbox"
                checked={requires2FA}
                onChange={(e) => setRequires2FA(e.target.checked)}
                className="w-4 h-4 text-red-500"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setShowCreateRole(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateRole}
              className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Add state for modals
  const [showViewRole, setShowViewRole] = useState(false);
  const [showEditRole, setShowEditRole] = useState(false);
  const [editRoleName, setEditRoleName] = useState("");
  const [editRequires2FA, setEditRequires2FA] = useState(false);

  // View Role Modal
  const ViewRoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Role Details</h2>
        <div className="mb-4">
          <div className="font-medium text-lg">{selectedRole.name}</div>
          <div className="text-sm text-gray-500 mb-2">{selectedRole.type}</div>
          <div className="mb-2">
            <span className="font-semibold">2FA Required:</span>{" "}
            {selectedRole.requires2FA ? "Yes" : "No"}
          </div>
          <div>
            <span className="font-semibold">Permissions:</span>
            <ul className="list-disc ml-6 mt-1">
              {Object.entries(selectedRole.permissions).map(
                ([module, permission]) => (
                  <li key={module}>
                    {module}: {getPermissionLevel(permission)}
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setShowViewRole(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Edit Role Modal
  const EditRoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Edit Role</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Role Name
            </label>
            <input
              type="text"
              value={editRoleName}
              onChange={(e) => setEditRoleName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Require 2FA
            </span>
            <input
              type="checkbox"
              checked={editRequires2FA}
              onChange={(e) => setEditRequires2FA(e.target.checked)}
              className="w-4 h-4 text-red-500"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={() => setShowEditRole(false)}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              // Update role
              setRoles(
                roles.map((role) =>
                  role.id === selectedRole.id
                    ? {
                        ...role,
                        name: editRoleName,
                        requires2FA: editRequires2FA,
                      }
                    : role
                )
              );
              setShowEditRole(false);
            }}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );

  // Main render
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <div className="flex-1 overflow-y-auto">
          {activeTab === "dashboard" && <Dashboard />}
          {activeTab === "roles" && <RoleManagement />}
          {activeTab === "users" && <UserManagement />}
          {activeTab === "audit" && <AuditLogs />}
          {activeTab === "security" && <SecuritySettings />}
          {showCreateRole && <CreateRoleModal />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
