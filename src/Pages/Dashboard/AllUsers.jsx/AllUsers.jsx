import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosSecure.get("/donor").then((res) => {
      setUsers(res.data);
    });
  }, [axiosSecure]);

  const handleStatusChange = async (email, status) => {
    try {
      const res = await axiosSecure.patch("/update/donor/status", {
        email,
        status,
      });

      if (res.data.modifiedCount > 0) {
        // update UI immediately
        setUsers((prev) =>
          prev.map((u) => (u.email === email ? { ...u, status } : u))
        );
      }
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Rule</th>
              <th>User Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {users?.map((user) => (
              <tr>
                
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={user?.mainPhotoUrl}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user?.name}</div>
                      <div className="text-sm opacity-50">{user?.email}</div>
                    </div>
                  </div>
                </td>
                <td>
                  {user?.role}
                  {/* <br />
                    <span className="badge badge-ghost badge-sm">
                      Desktop Support Technician
                    </span> */}
                </td>
                <td>{user?.status}</td>
                <th>
                  {user?.status == "Active" ? (
                    <button
                      onClick={() => handleStatusChange(user?.email, "Blocked")}
                      className="btn btn-error text-white btn-xs"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() => handleStatusChange(user?.email, "Active")}
                      className="btn btn-ghost btn-xs"
                    >
                      Active
                    </button>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
