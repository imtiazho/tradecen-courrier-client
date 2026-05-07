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
        path: "role-onboarding",
        element: (
          <VerifiedUserRoute>
            <RoleSelection></RoleSelection>
          </VerifiedUserRoute>
        ),
      },
      {
        path: "be-rider",
        loader: () => fetch("warehouses.json").then((res) => res.json()),
        element: (
          <VerifiedUserRoute>
            <RiderRegistration></RiderRegistration>
          </VerifiedUserRoute>
        ),
      },
      {
        path: "be-merchant",
        loader: () => fetch("warehouses.json").then((res) => res.json()),
        element: (
          <VerifiedUserRoute>
            <MerchantRegistration></MerchantRegistration>
          </VerifiedUserRoute>
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
      <VerifiedUserRoute>
        <Dashboard></Dashboard>
      </VerifiedUserRoute>
    ),
    children: [{}],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
