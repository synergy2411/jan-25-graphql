import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import HomePage from "./Pages/HomePage";
import PostsPage from "./Pages/PostsPage";
import RootLayoutPage from "./Pages/RootLayoutPage";
import client from "./apollo/client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayoutPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/posts", element: <PostsPage /> },
    ],
  },
]);

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={router} />;
    </ApolloProvider>
  );
}

export default App;
