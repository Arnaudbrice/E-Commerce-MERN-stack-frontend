import React, { useEffect, useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FaPhoneAlt } from "react-icons/fa";
import { FaRegAddressCard } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import default_profile from "../assets/images/default_profile.png";
import EditProfileDialog from "../components/EditProfileDialog";
import useAuth from "../hooks/useAuth.jsx";
import { useNavigate } from "react-router";

const Profile = () => {
  const navigate = useNavigate();
  const [isEditButtonClicked, setIsEditButtonClicked] = useState(false);

  const { user, isLoadingAuth } = useAuth();
  const userAddress = user?.addresses?.find(
    (address) => address.label === "Home"
  );

  /**
   * Formats the user's address by joining available parts and removing any falsy values.
   * This prevents extra commas if some address fields are missing.
   */
  const getFullAddress = () => {
    const addressParts = [
      userAddress?.companyName,
      userAddress?.streetAddress.replace(",", ""), //removes comma
      [userAddress?.zipCode, userAddress?.city].filter(Boolean).join(" "), // zip and city together
      userAddress?.state,
      userAddress?.country,
      userAddress?.phone,
    ].filter(Boolean); // Remove falsy values to avoid extra commas
    return addressParts.join(", ");
  };
  const getPhoneNumber = () => {
    return userAddress?.phone;
  };
  const fullAddress = getFullAddress();
  const phoneNumber = getPhoneNumber();

  const handleEditProfile = () => {
    setIsEditButtonClicked(true);
  };

  useEffect(() => {
    if (!isLoadingAuth && !user) {
      navigate("/login");
    }
  }, [user, isLoadingAuth, navigate]);

  // Show loading UI while authentication is loading
  if (isLoadingAuth) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <span className="text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  // Prevent rendering profile page if user is not authenticated
  if (!user) {
    return null;
  }

  return (
    <div className="flex flex-col items-center px-4 py-8 bg-gradient-to-b from-secondary/5 to-transparent">
      {isEditButtonClicked && (
        <EditProfileDialog
          isEditButtonClicked={isEditButtonClicked}
          setIsEditButtonClicked={setIsEditButtonClicked}
        />
      )}
      <div className="size-32  border-4 border-secondary p-1 rounded-full">
        <img
          src={default_profile}
          alt="profile-image"
          className="size-full rounded-full"
        />
      </div>

      <div className="mt-4 text-center">
        <h1 className="text-2xl font-bold tracking-tight">
          {user?.firstName} {user?.lastName}
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
                <p className="text-base font-semibold">{user?.email}</p>
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
                <p className="text-base font-semibold">{phoneNumber}</p>
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
                <p className="text-base font-semibold">{fullAddress}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
