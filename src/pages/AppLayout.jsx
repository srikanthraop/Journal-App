import React from "react";
import { Outlet, useNavigation } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

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
          <main className="bg-stone-100">
            <Outlet />
          </main>
        </>
      )}
    </div>
  );
};

export default AppLayout;
