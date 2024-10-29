import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about } = user;
  const dispatch = useDispatch()

  const handleSendRequest = async (status, toUserId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserId,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(toUserId))
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-1/3 overflow-hidden bg-gray-200 rounded shadow-lg h-1/2">
      <img className="object-cover w-full h-48" src={photoUrl} alt="Profile" />
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-lg font-semibold">{`${firstName} ${lastName}`}</h2>
          </div>
          <div>
            <p className="text-gray-600">
              {age}, {gender}
            </p>
          </div>
        </div>
        <p className="mb-4 text-gray-700">{about}</p>
        <div className="flex justify-between">
          <button
            className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => handleSendRequest("uninterested", _id)}
          >
            Ignored
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-green-500 rounded hover:bg-green-600"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
