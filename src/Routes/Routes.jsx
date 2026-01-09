import { createBrowserRouter } from "react-router";
import { lazy } from "react";

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
import NotFoundPage from "../Pages/NotFoundPage/NotFoundPage";
import Profile from "../Pages/Dashboard/Profile/Profile";
import SuspenseWrapper from "../Components/ComponentForLoader/SuspenseWrapper";
import PaymentCancelled from "../Pages/PaymentCancelled/PaymentCancelled";

const SearchPage = lazy(() => import("../Pages/SearchPage/SearchPage"));
const DonationRequest = lazy(() =>
  import("../Pages/DonationRequest.jsx/DonationRequest")
);
const Funding = lazy(() => import("../Pages/Funding/Funding"));
const PaymentSuccess = lazy(() =>
  import("../Pages/PaymentSuccess/PaymentSuccess")
);
const DonationDetails = lazy(() =>
  import("../Pages/DonationDetails/DonationDetails")
);
const About = lazy(() => import("../Pages/About/About"));
const Contact = lazy(() => import("../Pages/Contact/Contact"));
const Blog = lazy(() => import("../Pages/Blog/Blog"));
const BlogPost = lazy(() => import("../Pages/Blog/BlogPost"));
const Help = lazy(() => import("../Pages/Help/Help"));
const PrivacyPolicy = lazy(() => import("../Pages/Legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("../Pages/Legal/TermsOfService"));
const CookiePolicy = lazy(() => import("../Pages/Legal/CookiePolicy"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/auth/login", element: <Login /> },
      { path: "/auth/register", element: <Register /> },
      { 
        path: "/about", 
        element: (
          <SuspenseWrapper>
            <About />
          </SuspenseWrapper>
        )
      },
      { 
        path: "/contact", 
        element: (
          <SuspenseWrapper>
            <Contact />
          </SuspenseWrapper>
        )
      },
      { 
        path: "/blog", 
        element: (
          <SuspenseWrapper>
            <Blog />
          </SuspenseWrapper>
        )
      },
      { 
        path: "/blog/:id", 
        element: (
          <SuspenseWrapper>
            <BlogPost />
          </SuspenseWrapper>
        )
      },
      { 
        path: "/help", 
        element: (
          <SuspenseWrapper>
            <Help />
          </SuspenseWrapper>
        )
      },
      { 
        path: "/privacy", 
        element: (
          <SuspenseWrapper>
            <PrivacyPolicy />
          </SuspenseWrapper>
        )
      },
      { 
        path: "/terms", 
        element: (
          <SuspenseWrapper>
            <TermsOfService />
          </SuspenseWrapper>
        )
      },
      { 
        path: "/cookies", 
        element: (
          <SuspenseWrapper>
            <CookiePolicy />
          </SuspenseWrapper>
        )
      },
      { 
        path: "/donation-details/:id", 
        element: (
          <SuspenseWrapper>
            <DonationDetails />
          </SuspenseWrapper>
        )
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { path: "/dashboard", element: <MainDashboard /> },
      { path: "add-request", element: <AddRequest /> },
      { path: "all-users", element: <AllUsers /> },
      { path: "my-requests", element: <MyRequest /> },
      {
        path: "all-blood-donation-request",
        element: <AllBloodDonationRequest />,
      },
      { path: "profile", element: <Profile /> },
    ],
  },

  {
    path: "/search",
    element: (
      <SuspenseWrapper>
        <SearchPage />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/donation-requests",
    element: (
      <SuspenseWrapper>
        <DonationRequest />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/funding",
    element: (
      <SuspenseWrapper>
        <Funding />
      </SuspenseWrapper>
    ),
  },
  {
    path: "/payment-success",
    element: <PaymentSuccess />,
  },
  {
    path: "/payment-cancelled",
    element: <PaymentCancelled />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
