import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import default_profile from "../assets/images/default_profile.png";
import EditProfileDialog from "../components/EditProfileDialog";
import useAuth from "../hooks/useAuth.jsx";

const Profile = () => {
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);

  const { user } = useAuth();
  const handleEditProfile = () => {
    console.log("Edit Profile clicked");
    setIsEditButtonClicked(true);
    document.getElementById("edit_profile_modal").showModal();
  };

  if (!user) {
    return null; // oder ein Spinner/Loading
  }
  return (
    <div className="flex flex-col items-center px-4 py-8 bg-gradient-to-b from-secondary/5 to-transparent">
      <EditProfileDialog />
      <div className="avatar">
        <div className="size-32  border-4 border-secondary p-1 rounded-full">
          <img
            src={default_profile}
            alt="profile-image"
            className="size-full rounded-full"
          />
        </div>
      </div>

      <div className="mt-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {user && user.firstName} {user && user.lastName}
        </h1>
        <div className="flex items-center justify-center gap-2 mt-1">
          {/* Additional info can go here */}
        </div>
      </div>

      {/* Edit Profile Button */}
      <div className="mt-6 flex justify-center items-center gap-3 w-full max-w-sm">
        <button
          onClick={handleEditProfile}
          className=" flex items-center gap-2 bg-secondary text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-secondary/20 hover:opacity-90 transition-opacity">
          <FaUserEdit />
          Edit Profile
        </button>
      </div>

      {/* Content Sections */}
      <div className=" flex justify-center items-center p-4 mt-8 space-y-8 pb-24 w-full max-w-2xl">
        {/* Personal Information */}
        <section>
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
            <span className=" text-secondary">
              <FaInfoCircle />
            </span>
            <span>Personal Information</span>
          </h3>
          <div className="space-y-3">
            {/* Email Item */}
            <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 px-4 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="text-white flex items-center justify-center rounded-full bg-secondary shrink-0 size-10 shadow-sm shadow-secondary/30">
                <span className="text-[20px]">
                  <AiOutlineMail />
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
                  Email
                </p>
                <p className="text-base font-semibold">{user && user.email}</p>
              </div>
            </div>
            {/* Phone Item */}
            <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 px-4 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="text-white flex items-center justify-center rounded-full bg-secondary shrink-0 size-10 shadow-sm shadow-secondary/30">
                <span className="text-[20px]">
                  <FaPhoneAlt />
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
                  Phone
                </p>
                <p className="text-base font-semibold">{user?.phone}</p>
              </div>
            </div>
            {/* Location Item */}
            <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 px-4 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer">
              <div className="text-white flex items-center justify-center rounded-full bg-secondary shrink-0 size-10 shadow-sm shadow-secondary/30">
                <span className=" text-[20px]">
                  <FaRegAddressCard />
                </span>
              </div>
              <div className="flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase font-bold tracking-wider">
                  Address
                </p>
                <p className="text-base font-semibold">
                  {user?.streetAddress && user.streetAddress + ", "}
                  {user?.zipCode && user.zipCode + " "}
                  {user?.city && user.city + ", "}
                  {user?.state && user.state + ", "}
                  {user?.country && user.country}
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
