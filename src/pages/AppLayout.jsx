import React from "react";
import { Outlet, useNavigation } from "react-router-dom";

import Header from "../components/Header";

import LoadingScreen from "@/components/LoadingScreen";

const AppLayout = () => {
  const navigation = useNavigation();
  const isNavigationLoading = navigation.state !== "idle";

  console.log(navigation.state);
  return (
    <div className="h-dvh">
      <Header />
      {isNavigationLoading ? (
        <LoadingScreen />
      ) : (
        <>
          <main>
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
};

export default AppLayout;
