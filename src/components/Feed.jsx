import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const dispatch = useDispatch();
  const userFeed = useSelector((store) => store.feed);
  const fetchFeed = async () => {
    if (userFeed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  if (!userFeed) return;

  if (userFeed.length <= 0)
    return <h1 className="flex justify-center my-10">No new users found!</h1>;

  return (
    userFeed && (
      <div className="flex justify-center my-8 h-30">
        <UserCard user={userFeed[0]} />
      </div>
    )
  );
};

export default Feed;
