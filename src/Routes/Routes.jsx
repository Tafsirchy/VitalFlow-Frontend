import { createBrowserRouter } from "react-router";
import RootLayout from "../RootLayout/RootLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import DashboardLayout from "../DashboardLayout/DashboardLayout";
import MainDashboard from "../Pages/Dashboard/MainDashboard/MainDashboard";
import AddRequest from "../Pages/Dashboard/AddRequest/AddRequest";
import AllUsers from "../Pages/Dashboard/AllUsers.jsx/AllUsers";
import PrivateRoute from "../Provider/PrivateRoute";
import MyRequest from "../Pages/Dashboard/MyRequest/MyRequest";
import AllBloodDonationRequest from "../Pages/Dashboard/AllBloodDonationRequest.jsx/AllBloodDonationRequest";
import SearchPage from "../Pages/SearchPage/SearchPage";
import DonationRequest from "../Pages/DonationRequest.jsx/DonationRequest";
import Funding from "../Pages/Funding/Funding";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import DonationDetails from "../Pages/DonationDetails/DonationDetails";
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import Profile from "../Pages/Dashboard/Profile/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout></RootLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/auth/login",
        element: <Login></Login>,
      },
      {
        path: "/auth/register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>,
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: <MainDashboard></MainDashboard>,
      },
      {
        path: "add-request",
        element: <AddRequest></AddRequest>,
      },
      {
        path: "all-users",
        element: <AllUsers></AllUsers>,
      },
      {
        path: "my-requests",
        element: <MyRequest></MyRequest>,
      },
      {
        path: "all-blood-donation-request",
        element: <AllBloodDonationRequest></AllBloodDonationRequest>,
      },
      {
        path: "profile",
        element: <Profile></Profile>,
      }
    ],
  },
  {
    path: "/search",
    element: <SearchPage></SearchPage>,
  },
  {
    path: "/donation-requests",
    element: <DonationRequest></DonationRequest>,
  },
  {
    path: "/funding",
    element: <Funding></Funding>,
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess></PaymentSuccess>,
  },
  {
    path: "/payment-cancelled",
    element: <PaymentSuccess></PaymentSuccess>,
  },
  {
    path: "donation-details/:id",
    element: <DonationDetails></DonationDetails>
  },
  {
    path: "*",
    element: <NotFoundPage></NotFoundPage>
  }
]);

export default router;
