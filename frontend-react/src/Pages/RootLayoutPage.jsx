import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation";
function RootLayoutPage() {
  return (
    <>
      <MainNavigation />
      <br />
      <br />

      {/* Outlet - display the content of child elements */}
      <Outlet />
    </>
  );
}

export default RootLayoutPage;
