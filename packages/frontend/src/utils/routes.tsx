import { ErrorBoundary } from "@/pages/error-boundary";
import { ExplorePage } from "@/pages/explore.page";
import { HomePage } from "@/pages/home.page";
import { WelcomePage } from "@/pages/welcome.page";
import { IconType } from "react-icons";
import { FaCompass, FaHome } from "react-icons/fa";
import { RouteObject } from "react-router-dom";

export type NavRouteObject = RouteObject & {
  label?: string;
  icon?: IconType;
};

export const routeMap: { [name: string]: NavRouteObject } = {
  home: {
    icon: FaHome,
    label: "Home",
    path: "/",
    element: <HomePage />,
  },
  explore: {
    icon: FaCompass,
    label: "Explore",
    path: "/explore",
    element: <ExplorePage />,
  },
  welcome: {
    path: "/welcome",
    element: <WelcomePage />,
  },
};

export const routes: NavRouteObject[] = Object.entries(routeMap).map(
  ([, route]) => ({ errorElement: <ErrorBoundary />, ...route }),
);
