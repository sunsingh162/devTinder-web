import React from "react";

const UserCard = ({ user }) => {
  const { firstName, lastName, photoUrl, age, gender, about } = user;
  return (
    <div className="w-1/4 overflow-hidden bg-gray-200 rounded shadow-lg">
      <img
        className="object-cover w-full h-48"
        src={photoUrl}
        alt="Profile"
      />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-semibold">{`${firstName} ${lastName}`}</h2>
          </div>
          <div>
          <p className="text-gray-600">{age}, {gender}</p>
          </div>
        </div>
        <p className="mb-4 text-gray-700">
          {about}
        </p>
        <div className="flex justify-between">
          <button className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600">
            Ignored
          </button>
          <button className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600">
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
