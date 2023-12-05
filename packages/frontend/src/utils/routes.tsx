import { ErrorBoundary } from "@/pages/error-boundary";
import { ExplorePage } from "@/pages/explore.page";
import { HomePage } from "@/pages/home.page";
import { NewLivePage } from "@/pages/new-live.page";
import { UploadPage } from "@/pages/upload.page";
import { VodPage } from "@/pages/vod.page";
import { WelcomePage } from "@/pages/welcome.page";
import { AllVideosPage } from "@/pages/all-videos";
import { IconType } from "react-icons";
import { FaCompass, FaHome } from "react-icons/fa";
import { RouteObject } from "react-router-dom";
import { AdminSettingsPage } from "@/pages/admin-settings.page";
import { NewCollectionPage } from "@/pages/new-collection.page";
import { CollectionPage } from "@/pages/collection.page";

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
  upload: {
    path: "/upload",
    element: <UploadPage />,
  },
  vod: {
    path: "/vods/:id",
    element: <VodPage />,
  },
  live: {
    path: "/lives/:id",
    element: <div>Live</div>,
  },
  newLive: {
    path: "/lives/new",
    element: <NewLivePage />,
  },
  createdVideos: {
    path: "/admin/videos",
    element: <AllVideosPage />,
  },
  adminSettings: {
    path: "/admin/settings",
    element: <AdminSettingsPage />,
  },
  newCollection: {
    path: "/collections/new",
    element: <NewCollectionPage />,
  },
  collection: {
    path: "/collections/:id",
    element: <CollectionPage />,
  },
};

export const routes: NavRouteObject[] = Object.entries(routeMap).map(
  ([, route]) => ({ errorElement: <ErrorBoundary />, ...route }),
);
