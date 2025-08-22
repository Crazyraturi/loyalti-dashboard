import React, { useState, useEffect } from "react";
import {
  Search,
  Filter,
  UserPlus,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  Lock,
  Unlock,
  RefreshCw,
  Users,
  Activity,
  ShoppingCart,
  MapPin,
  Calendar,
  Mail,
  Phone,
  User,
  Tag,
  Globe,
  Smartphone,
} from "lucide-react";

const UserManagementDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentView, setCurrentView] = useState("list");
  const [onlineUsers, setOnlineUsers] = useState(47);
  const [activeUsers, setActiveUsers] = useState(234);

  // Filter states
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    lastOrderFrom: "",
    lastOrderTo: "",
    lastLoginFrom: "",
    lastLoginTo: "",
    email: "",
    mobile: "",
    userId: "",
    country: "",
    state: "",
    city: "",
    pincode: "",
    customerType: "",
    segment: "",
    source: "",
    signedUpVia: "",
  });

  // Sample user data
  useEffect(() => {
    const sampleUsers = [
      {
        id: "USR001",
        name: "Emily Johnson",
        email: "emily.johnson@email.com",
        mobile: "+91 9876543210",
        registrationDate: "2024-01-15",
        lastLogin: "2024-08-20 14:30",
        lastOrder: "2024-08-18",
        isOnline: true,
        status: "Active",
        country: "India",
        state: "Delhi",
        city: "New Delhi",
        pincode: "110001",
        customerType: "Registered",
        segment: "High Spender",
        source: "Web",
        signedUpVia: "Google",
        walletBalance: 1250.5,
        totalOrders: 23,
        totalSpent: 45670.3,
        cartItems: 3,
        tags: ["High Spender", "Frequent Returner", "Delhi/NCR"],
        orderFunnelStatus: "Purchased",
        loginActivity: [
          { date: "2024-08-20", time: "14:30", device: "Web" },
          { date: "2024-08-19", time: "10:15", device: "Android App" },
        ],
      },
      {
        id: "USR002",
        name: "Michael Brown",
        email: "michael.brown@email.com",
        mobile: "+91 9876543211",
        registrationDate: "2024-02-20",
        lastLogin: "2024-08-19 16:45",
        lastOrder: "2024-08-15",
        isOnline: false,
        status: "Active",
        country: "India",
        state: "Maharashtra",
        city: "Mumbai",
        pincode: "400001",
        customerType: "Registered",
        segment: "Cart Abandoner",
        source: "Android App",
        signedUpVia: "Email",
        walletBalance: 500.0,
        totalOrders: 8,
        totalSpent: 12450.75,
        cartItems: 0,
        tags: ["Cart Abandoner", "Mumbai"],
        orderFunnelStatus: "Cart Abandoned",
        loginActivity: [
          { date: "2024-08-19", time: "16:45", device: "Android App" },
          { date: "2024-08-18", time: "12:30", device: "Web" },
        ],
      },
      {
        id: "USR003",
        name: "Sarah Wilson",
        email: "sarah.wilson@email.com",
        mobile: "+91 9876543212",
        registrationDate: "2024-03-10",
        lastLogin: "2024-08-22 09:20",
        lastOrder: "2024-08-21",
        isOnline: true,
        status: "Active",
        country: "India",
        state: "Karnataka",
        city: "Bangalore",
        pincode: "560001",
        customerType: "Registered",
        segment: "Repeat Buyer",
        source: "iOS App",
        signedUpVia: "Facebook",
        walletBalance: 2100.25,
        totalOrders: 15,
        totalSpent: 28990.5,
        cartItems: 2,
        tags: ["Repeat Buyer", "Gift Buyer", "Bangalore"],
        orderFunnelStatus: "Added to Cart",
        loginActivity: [
          { date: "2024-08-22", time: "09:20", device: "iOS App" },
          { date: "2024-08-21", time: "18:45", device: "iOS App" },
        ],
      },
    ];
    setUsers(sampleUsers);
    setFilteredUsers(sampleUsers);
  }, []);

  // Filter users based on search and filters
  useEffect(() => {
    let filtered = users.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobile.includes(searchTerm);

      const matchesFilters =
        (!filters.email ||
          user.email.toLowerCase().includes(filters.email.toLowerCase())) &&
        (!filters.mobile || user.mobile.includes(filters.mobile)) &&
        (!filters.userId || user.id.includes(filters.userId)) &&
        (!filters.country || user.country === filters.country) &&
        (!filters.state || user.state === filters.state) &&
        (!filters.city || user.city === filters.city) &&
        (!filters.pincode || user.pincode === filters.pincode) &&
        (!filters.customerType || user.customerType === filters.customerType) &&
        (!filters.segment || user.segment === filters.segment) &&
        (!filters.source || user.source === filters.source) &&
        (!filters.signedUpVia || user.signedUpVia === filters.signedUpVia);

      return matchesSearch && matchesFilters;
    });
    setFilteredUsers(filtered);
  }, [searchTerm, filters, users]);

  const handleUserAction = (action, userId) => {
    setUsers((prev) =>
      prev
        .map((user) => {
          if (user.id === userId) {
            switch (action) {
              case "enable":
                return { ...user, status: "Active" };
              case "disable":
                return { ...user, status: "Disabled" };
              case "delete":
                return null;
              default:
                return user;
            }
          }
          return user;
        })
        .filter(Boolean)
    );
  };

  const resetPassword = (userId) => {
    alert(`Password reset for user ${userId}`);
  };

  const UserCard = ({ user }) => (
    <div className="bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
            {user.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{user.name}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {user.isOnline && (
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          )}
          <span
            className={`px-2 py-1 rounded-full text-xs ${
              user.status === "Active"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {user.status}
          </span>
          <div className="relative">
            <button className="p-1 hover:bg-gray-100 rounded">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Mobile</p>
          <p className="font-medium">{user.mobile}</p>
        </div>
        <div>
          <p className="text-gray-500">Location</p>
          <p className="font-medium">
            {user.city}, {user.state}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Wallet Balance</p>
          <p className="font-medium text-green-600">
            ₹{user.walletBalance.toFixed(2)}
          </p>
        </div>
        <div>
          <p className="text-gray-500">Total Orders</p>
          <p className="font-medium">{user.totalOrders}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-3">
        {user.tags.map((tag, index) => (
          <span
            key={index}
            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-4 pt-3 border-t">
        <button
          onClick={() => setSelectedUser(user)}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm"
        >
          <Eye className="w-4 h-4" />
          View
        </button>
        <button className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors text-sm">
          <Edit className="w-4 h-4" />
          Edit
        </button>
        <button
          onClick={() => resetPassword(user.id)}
          className="flex-1 flex items-center justify-center gap-1 px-3 py-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-100 transition-colors text-sm"
        >
          <RefreshCw className="w-4 h-4" />
          Reset
        </button>
      </div>
    </div>
  );

  const UserProfile = ({ user }) => (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">User Profile</h2>
        <button
          onClick={() => setSelectedUser(null)}
          className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
        >
          Back to List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Total Spent
              </h3>
              <p className="text-2xl font-bold text-blue-600">
                ₹{user.totalSpent.toFixed(2)}
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Wallet Balance
              </h3>
              <p className="text-2xl font-bold text-green-600">
                ₹{user.walletBalance.toFixed(2)}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Total Orders
              </h3>
              <p className="text-2xl font-bold text-purple-600">
                {user.totalOrders}
              </p>
            </div>
            <div className="bg-orange-50 p-4 rounded-lg">
              <h3 className="text-sm font-medium text-gray-600 mb-1">
                Cart Items
              </h3>
              <p className="text-2xl font-bold text-orange-600">
                {user.cartItems}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-3">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={user.name}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Read-only)
                  </label>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full p-2 border rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile
                  </label>
                  <input
                    type="text"
                    value={user.mobile}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={user.id}
                    disabled
                    className="w-full p-2 border rounded-lg bg-gray-50"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Location Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    value={user.country}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    value={user.state}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    value={user.city}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Pincode
                  </label>
                  <input
                    type="text"
                    value={user.pincode}
                    className="w-full p-2 border rounded-lg"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-3">Login Activity</h3>
              <div className="space-y-2">
                {user.loginActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span>
                        {activity.date} at {activity.time}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {activity.device}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Order Funnel Status</h3>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    user.orderFunnelStatus === "Browsing"
                      ? "bg-gray-400"
                      : user.orderFunnelStatus === "Added to Cart"
                      ? "bg-yellow-400"
                      : user.orderFunnelStatus === "Cart Abandoned"
                      ? "bg-red-400"
                      : "bg-green-400"
                  }`}
                ></div>
                <span className="text-sm">{user.orderFunnelStatus}</span>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">User Tags</h3>
              <div className="flex flex-wrap gap-1">
                {user.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Account Actions</h3>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  <Unlock className="w-4 h-4" />
                  Enable Account
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600">
                  <RefreshCw className="w-4 h-4" />
                  Reset Password
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
                  <Lock className="w-4 h-4" />
                  Disable Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (selectedUser) {
    return <UserProfile user={selectedUser} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            User Management
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-blue-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {users.length}
                  </p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Online Users</p>
                  <p className="text-2xl font-bold text-green-600">
                    {onlineUsers}
                  </p>
                </div>
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <div className="bg-purple-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {activeUsers}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-purple-500" />
              </div>
            </div>
            <div className="bg-orange-100 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cart Abandoners</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {users.filter((u) => u.segment === "Cart Abandoner").length}
                  </p>
                </div>
                <ShoppingCart className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                <UserPlus className="w-4 h-4" />
                Add User
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="border-t pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration From
                  </label>
                  <input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateFrom: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Registration To
                  </label>
                  <input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        dateTo: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="text"
                    value={filters.email}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full p-2 border rounded-lg text-sm"
                    placeholder="Search email"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile
                  </label>
                  <input
                    type="text"
                    value={filters.mobile}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        mobile: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg text-sm"
                    placeholder="Search mobile"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    value={filters.country}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        country: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="">All Countries</option>
                    <option value="India">India</option>
                    <option value="USA">USA</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    value={filters.state}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, state: e.target.value }))
                    }
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="">All States</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Type
                  </label>
                  <select
                    value={filters.customerType}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        customerType: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="">All Types</option>
                    <option value="Registered">Registered</option>
                    <option value="Not Registered">Not Registered</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Segment
                  </label>
                  <select
                    value={filters.segment}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        segment: e.target.value,
                      }))
                    }
                    className="w-full p-2 border rounded-lg text-sm"
                  >
                    <option value="">All Segments</option>
                    <option value="High Spender">High Spender</option>
                    <option value="Repeat Buyer">Repeat Buyer</option>
                    <option value="Cart Abandoner">Cart Abandoner</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No users found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserManagementDashboard;
