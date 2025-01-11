import React, { useContext, useEffect, useState } from "react";
import {
  User,
  MapPin,
  Edit,
  Plus,
  Mail,
  Phone,
  CircleUser,
} from "lucide-react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("overview");

  const { user } = useContext(ShopContext);

  const getUser = async () => {
    // const response = await axios();
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6">
      {/* Profile Header */}
      <div className="mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-28 h-28 rounded-full object-cover border"
          />
        ) : (
          <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gray-200 border relative cursor-pointer overflow-hidden">
            {/* Hidden file input */}
            <input
              type="file"
              id="avatarUpload"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  const file = e.target.files[0];
                  console.log("Selected file:", file); // Handle the file upload logic here
                }
              }}
            />
            {/* Placeholder Icon */}
            <CircleUser size={48} className="text-gray-400" />
          </div>
        )}
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold mb-3 font-muktaVaani">
            {user.name}
          </h1>
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 text-gray-600 font-yantramanav">
              <Mail size={16} />
              <span>{user.email}</span>
            </div>
            {user.phone && (
              <div className="flex items-center gap-2 text-gray-600 font-yantramanav">
                <Phone size={16} />
                <span>{user.phone}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b mb-6 items-center justify-center">
        <button
          onClick={() => setActiveTab("overview")}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 font-yantramanav ${
            activeTab === "overview"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          }`}
        >
          <User size={16} />
          <span>Overview</span>
        </button>
        {/* <button
          onClick={() => setActiveTab("addresses")}
          className={`flex items-center gap-2 px-4 py-2 border-b-2 font-yantramanav ${
            activeTab === "addresses"
              ? "border-blue-500 text-blue-500"
              : "border-transparent"
          }`}
        >
          <MapPin size={16} />
          <span>Addresses</span>
        </button> */}
      </div>

      {/* Content Sections */}
      {activeTab === "overview" && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold font-muktaVaani">
              Personal Information
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm text-gray-500 font-yantramanav">
                Full Name
              </label>
              <p className="mt-1 font-medium font-imprima">{user.name}</p>
            </div>
            <div>
              <label className="block text-sm text-gray-500 font-yantramanav">
                Email
              </label>
              <p className="mt-1 font-medium font-imprima">{user.email}</p>
            </div>
            {user.phone && (
              <div>
                <label className="block text-sm text-gray-500 font-yantramanav">
                  Phone
                </label>
                <p className="mt-1 font-medium font-imprima">{user.phone}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* {activeTab === "addresses" && (
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
      )} */}
    </div>
  );
};

export default UserProfile;
