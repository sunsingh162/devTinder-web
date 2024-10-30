import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const handleSavedChanges = async (e) => {
    setError("");
    e.preventDefault();
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      setError(err?.response?.data);
    }
  };
  return (
    <>
      <div className="flex justify-center m-10">
        <div className="flex items-center justify-center py-6">
          <div className="px-4 py-10 bg-white rounded-lg shadow-md w-96">
            <h2 className="mb-1 text-2xl font-semibold text-center">
              Edit Profile
            </h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  value={firstName}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  value={lastName}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-700">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={photoUrl}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-700">
                  Age
                </label>
                <input
                  type="text"
                  value={age}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={(e) => setAge(e.target.value)}
                />
                <label className="block text-sm font-medium text-gray-700">
                  Gender
                </label>
                <select
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Choose Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
                <label className="block text-sm font-medium text-gray-700">
                  About
                </label>
                <input
                  type="text"
                  value={about}
                  className="block w-full p-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-500"
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>
              <p className="text-red-500">{error}</p>
              <button
                type="submit"
                className="w-full p-2 font-semibold text-white transition duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={handleSavedChanges}
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
        <UserCard
          user={{ firstName, lastName, photoUrl, age, gender, about }}
        />
      </div>
      {showToast && (
        <div className="my-14 toast toast-top toast-start">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
