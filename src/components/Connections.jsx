import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);
  if (!connections) return;

  if (connections.length === 0)
    return <h1 className="my-4 font-bold text-center">No Connections found</h1>;
  return (
    <div>
      <h1 className="my-4 font-bold text-center">Connections</h1>
      {connections.map((connection) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div id={_id} className="flex m-6 bg-slate-200">
            <div>
              <img alt="profile pic" className="w-20" src={photoUrl} />
            </div>
            <div className="mx-6">
              <h1 className="font-bold">{`${firstName} ${lastName}`}</h1>
              <p>{`${age} , ${gender}`}</p>
              <p>{about}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
