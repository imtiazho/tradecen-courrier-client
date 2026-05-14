import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout/RootLayout";
import HomePage from "../Pages/HomePage/HomePage";
import Coverage from "../Pages/Coverage/Coverage";
import About from "../Pages/About/About";
import PricingCalculator from "../Pages/PricingCalculator/PricingCalculator";
import ContactPage from "../Pages/ContactPage/ContactPage";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AuthLayout from "../Layouts/AuthLayout/AuthLayout";
import LoginPage from "../Pages/LoginPage/LoginPage";
import SignUp from "../Pages/SignUp/SignUp";
import ForgetPassword from "../Pages/ForgetPassword/ForgetPassword";
import OTPVerify from "../Pages/ForgetPassword/OTPVerify";
import ResetPassword from "../Pages/ForgetPassword/ResetPassword";
import RoleSelection from "../Pages/RoleSelection/RoleSelection";
import RiderRegistration from "../Pages/RiderRegistration/RiderRegistration";
import MerchantRegistration from "../Pages/MerchantRegistration/MerchantRegistration";
import Dashboard from "../Pages/Dashboard/Dashboard";
import PrivateRoute from "./PrivateRoute";
import VerifyEmail from "../Pages/VerifyEmail/VerifyEmail";
import VerifiedUserRoute from "./VerifiedUserRoute";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import TrackParcels from "../Pages/TrackParcels/TrackParcels";
import SendParcel from "../Pages/SendParcel/SendParcel";
import DashboardLayout from "../Layouts/DashboardLayout/DashboardLayout";
import UnpaidParcels from "../Pages/UnpaidParcels/UnpaidParcels";
import ReadyToPickUp from "../Pages/ReadyToPickUp/ReadyToPickUp";
import InTransitParcel from "../Pages/InTransitParcel/InTransitParcel";
import ReadyToDeliver from "../Pages/ReadyToDeliver/ReadyToDeliver";
import Delivered from "../Pages/Delivered/Delivered";
import PaymentSuccess from "../Pages/PaymentSuccess/PaymentSuccess";
import PaymentCancelled from "../Pages/PaymentCancelled/PaymentCancelled";
import Deliveries from "../Pages/Deliveries/Deliveries";
import UserManagement from "../Pages/UserManagement/UserManagement";
import RiderRequest from "../Pages/RiderRequest/RiderRequest";
import HubManager from "../Pages/HubManager/HubManager";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "coverage-area",
        loader: () => fetch("warehouses.json").then((res) => res.json()),
        Component: Coverage,
      },
      {
        path: "about-us",
        Component: About,
      },
      {
        path: "pricing",
        Component: PricingCalculator,
      },
      {
        path: "contact",
        Component: ContactPage,
      },
      {
        path: "track-parcel",
        Component: TrackParcels,
      },
      {
        path: "role-onboarding",
        element: (
          <RoleSelection></RoleSelection>
          // <VerifiedUserRoute>
          // </VerifiedUserRoute>
        ),
      },
      {
        path: "be-rider",
        loader: () => fetch("warehouses.json").then((res) => res.json()),
        element: (
          <RiderRegistration></RiderRegistration>
          // <VerifiedUserRoute>
          // </VerifiedUserRoute>
        ),
      },
      {
        path: "be-merchant",
        loader: () => fetch("warehouses.json").then((res) => res.json()),
        element: (
          <MerchantRegistration></MerchantRegistration>
          // <VerifiedUserRoute>
          // </VerifiedUserRoute>
        ),
      },
      {
        path: "profile",
        element: (
          <VerifiedUserRoute>
            <ProfilePage></ProfilePage>
          </VerifiedUserRoute>
        ),
      },
      {
        path: "verify-email",
        element: (
          <PrivateRoute>
            <VerifyEmail></VerifyEmail>
          </PrivateRoute>
        ),
      },
      {
        path: "send-parcel",
        loader: () => fetch("warehouses.json").then((res) => res.json()),
        element: (
          <SendParcel></SendParcel>
          // <VerifiedUserRoute>
          // </VerifiedUserRoute>
        ),
      },
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      { path: "/auth/login", Component: LoginPage },
      { path: "/auth/sign-up", Component: SignUp },
      { path: "/auth/forget-password", Component: ForgetPassword },
      { path: "/auth/verify-OTP", Component: OTPVerify },
      { path: "/auth/reset-password", Component: ResetPassword },
    ],
  },
  {
    path: "/dashboard",
    element: (
      // <VerifiedUserRoute>
      //   <DashboardLayout></DashboardLayout>
      // </VerifiedUserRoute>
      <DashboardLayout></DashboardLayout>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "unpaid-parcel",
        element: <UnpaidParcels></UnpaidParcels>,
      },
      {
        path: "ready-pickup",
        element: <ReadyToPickUp></ReadyToPickUp>,
      },
      {
        path: "in-transit",
        element: <InTransitParcel></InTransitParcel>,
      },
      {
        path: "ready-deliver",
        element: <ReadyToDeliver></ReadyToDeliver>,
      },
      {
        path: "delivered",
        element: <Delivered></Delivered>,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess></PaymentSuccess>,
      },
      {
        path: "payment-cancelled",
        element: <PaymentCancelled></PaymentCancelled>,
      },
      {
        path: "deliveries",
        element: <Deliveries></Deliveries>,
      },
      {
        path: "users",
        element: <UserManagement></UserManagement>,
        children: [
          {
            index: true,
            loader: () => fetch("/warehouses.json").then((res) => res.json()),
            element: <HubManager></HubManager>,
          },
          {
            path: "rider-request",
            loader: () =>
              fetch("http://localhost:5000/riders?status=pending").then((res) =>
                res.json(),
              ),
            element: <RiderRequest></RiderRequest>,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
