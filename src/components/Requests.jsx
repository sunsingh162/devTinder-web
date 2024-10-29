import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestSlice";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);
  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchRequests();
  }, []);
  if (!requests) return;

  if (requests.length === 0)
    return <h1 className="my-4 font-bold text-center">No Requests found</h1>;

  const handleReviewRequests = async (status, requestId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + requestId,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequests(requestId))
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1 className="my-4 font-bold text-center">Requests</h1>
      {requests.map((request) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div id={request._id} className="flex items-center m-6 bg-slate-200">
            <div>
              <img alt="profile pic" className="w-20" src={photoUrl} />
            </div>
            <div className="mx-6">
              <h1 className="font-bold">{`${firstName} ${lastName}`}</h1>
              <p>{`${age} , ${gender}`}</p>
              <p>{about}</p>
            </div>
            <div className="flex mx-10 ">
              <button
                className="mx-2 btn btn-success"
                onClick={() =>
                  handleReviewRequests("accepted", request._id)
                }
              >
                Accept
              </button>
              <button
                className="mx-2 btn btn-error"
                onClick={() =>
                  handleReviewRequests("rejected", request._id)
                }
              >
                Reject
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
