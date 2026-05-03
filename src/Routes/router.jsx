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
    ],
  },
  {
    path: "/auth",
    Component: AuthLayout,
    children: [{ path: "/auth/login", Component: LoginPage }],
  },
  {
    path: "*",
    Component: ErrorPage,
  },
]);
