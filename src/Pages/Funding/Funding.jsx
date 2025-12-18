import React, { useContext } from "react";
import useAxios from "../../hooks/useAxios";
import { AuthContext } from "../../Provider/AuthProvider";
import { useNavigate } from "react-router";

const Donate = () => {
  const axiosInstance = useAxios();
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;

    const formData = {
      donateAmount,
      donorEmail,
      donorName,
    }

    // Example: Sending the amount to your backend endpoint
    axiosInstance
      .post("/create-payment-checkout", formData)
      .then((res) => {
        console.log(res.data);
        window.location.href = res.data.url;
      })
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <form
        onSubmit={handleCheckout}
        className="flex justify-center items-center min-h-screen gap-4"
      >
        <input
          name="donateAmount"
          type="text"
          placeholder="Type here"
          className="input"
        />
        <button className="btn btn-primary" type="submit">
          Donate
        </button>
      </form>
    </div>
  );
};

export default Donate;
