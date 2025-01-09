import React, { useState } from "react";
import { User, MapPin, Edit, Plus, Mail, Phone } from "lucide-react";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [user] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "/api/placeholder/100/100",
    addresses: [
      {
        id: 1,
        type: "Home",
        street: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
        isDefault: true,
      },
      {
        id: 2,
        type: "Office",
        street: "456 Business Ave",
        city: "New York",
        state: "NY",
        zip: "10002",
        isDefault: false,
      },
    ],
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Profile Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover border"
        />
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Mail size={16} />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone size={16} />
              <span>{user.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
            activeTab === "overview"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          }`}
        >
          <User size={16} />
          <span>Overview</span>
        </button>
        <button
          onClick={() => setActiveTab("addresses")}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 ${
            activeTab === "addresses"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          }`}
        >
          <MapPin size={16} />
          <span>Addresses</span>
        </button>
      </div>

      {/* Content Sections */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Personal Information</h2>
            <button className="text-blue-500 flex items-center gap-1">
              <Edit size={16} />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm text-gray-500">Full Name</label>
              <p className="mt-1 font-medium">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Email</label>
              <p className="mt-1 font-medium">{user.email}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500">Phone</label>
              <p className="mt-1 font-medium">{user.phone}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "addresses" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Saved Addresses</h2>
            <button className="flex items-center gap-2 text-blue-500">
              <Plus size={16} />
              <span>Add New Address</span>
            </button>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {user.addresses.map((address) => (
              <div
                key={address.id}
                className="p-4 border rounded-lg hover:border-blue-500 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{address.type}</span>
                    {address.isDefault && (
                      <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <button className="text-gray-400 hover:text-blue-500">
                    <Edit size={16} />
                  </button>
                </div>
                <div className="text-gray-600">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
