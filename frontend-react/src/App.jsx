import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import HomePage from "./Pages/HomePage";
import PostsPage from "./Pages/PostsPage";
import RootLayoutPage from "./Pages/RootLayoutPage";
import client from "./apollo/client";
import LoginPage from "./Pages/LoginPage";
import AuthContext from "./context/auth-context";
import { useState } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/posts", element: <PostsPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
]);

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <RouterProvider router={router} />;
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
