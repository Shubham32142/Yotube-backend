import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./components/Store.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Cards from "./components/Cards.jsx";
import { lazy, Suspense } from "react";
const ViewChannel = lazy(() => import("./components/ViewChannel.jsx"));
const CardDetail = lazy(() => import("./components/CardDetail.jsx"));
const Register = lazy(() => import("./components/Register.jsx"));
const ErrorElement = lazy(() => import("./components/ErrorElement.jsx"));
const Google = lazy(() => import("./components/Google.jsx"));
const Channel = lazy(() => import("./components/Channel.jsx"));

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: (
      <Suspense fallback={<div>Loading.Please wait...</div>}>
        <ErrorElement />
      </Suspense>
    ),
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<div>Loading.Please wait...</div>}>
            <Google />
          </Suspense>
        ),
      },
      {
        path: "/User/byChannel/:channelId",
        element: (
          <Suspense fallback={<div>Loading.Please wait...</div>}>
            <CardDetail />
          </Suspense>
        ),
      },
      {
        path: "/createChannel",
        element: (
          <Suspense fallback={<div>Loading.Please wait...</div>}>
            <Channel />
          </Suspense>
        ),
      },
      {
        path: "",
        element: <Cards />,
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<div>Loading.Please wait...</div>}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: "/viewChannel/:channelId",
        element: (
          <Suspense fallback={<div>Loading.Please wait...</div>}>
            <ViewChannel />
          </Suspense>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={appRouter}></RouterProvider>
  </Provider>
);
