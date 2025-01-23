import { Outlet } from "react-router-dom";
import MainNavigation from "../Components/MainNavigation";
function RootLayoutPage() {
  return (
    <div className="container">
      <MainNavigation />
      <br />
      <br />

      {/* Outlet - display the content of child elements */}
      <Outlet />
    </div>
  );
}

export default RootLayoutPage;
