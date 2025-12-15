import React, { useContext } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";


const AddRequest = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-red-600">
        Create Donation Request
      </h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Requester Name */}
        <div>
          <label className="label font-semibold">Requester Name</label>
          <input
            type="text"
            readOnly
            value={user?.displayName || ""}
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Requester Email */}
        <div>
          <label className="label font-semibold">Requester Email</label>
          <input
            type="email"
            readOnly
            value={user?.email || ""}
            className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="label font-semibold">Recipient Name</label>
          <input
            type="text"
            placeholder="Recipient full name"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="label font-semibold">Blood Group</label>
          <select className="select select-bordered w-full" required>
            <option value="">Select Blood Group</option>
            <option>A+</option>
            <option>A-</option>
            <option>B+</option>
            <option>B-</option>
            <option>AB+</option>
            <option>AB-</option>
            <option>O+</option>
            <option>O-</option>
          </select>
        </div>

        {/* District */}
        <div>
          <label className="label font-semibold">Recipient District</label>
          <select className="select select-bordered w-full" required>
            <option value="">Select District</option>
            <option>Dhaka</option>
            <option>Chattogram</option>
            <option>Rajshahi</option>
            <option>Khulna</option>
            <option>Sylhet</option>
          </select>
        </div>

        {/* Upazila */}
        <div>
          <label className="label font-semibold">Recipient Upazila</label>
          <select className="select select-bordered w-full" required>
            <option value="">Select Upazila</option>
            <option>Dhanmondi</option>
            <option>Mirpur</option>
            <option>Uttara</option>
            <option>Mohammadpur</option>
          </select>
        </div>

        {/* Hospital Name */}
        <div className="md:col-span-2">
          <label className="label font-semibold">Hospital Name</label>
          <input
            type="text"
            placeholder="Dhaka Medical College Hospital"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Full Address */}
        <div className="md:col-span-2">
          <label className="label font-semibold">Full Address Line</label>
          <input
            type="text"
            placeholder="Zahir Raihan Rd, Dhaka"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Donation Date */}
        <div>
          <label className="label font-semibold">Donation Date</label>
          <input type="date" className="input input-bordered w-full" required />
        </div>

        {/* Donation Time */}
        <div>
          <label className="label font-semibold">Donation Time</label>
          <input type="time" className="input input-bordered w-full" required />
        </div>

        {/* Request Message */}
        <div className="md:col-span-2">
          <label className="label font-semibold">Request Message</label>
          <textarea
            rows="4"
            placeholder="Explain why blood is needed..."
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2 text-center mt-4">
          <button className="btn btn-error px-10 text-white">
            Request Donation
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRequest;
