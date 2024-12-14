import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { paths } from "./config/paths";

// renames Default export/property of given module to expected "Component"
const convert = (mod: any) => {
  // if clientLoader or clientAction is defined within the imported module,
  // invoke with the queryClient argument for shared resourses. Else, undefined
  const { default: Component, ...rest } = mod;
  return {
    ...rest,
    Component,
  };
};

// implicit return
export const createAppRouter = () =>
  createBrowserRouter([
    {
      path: paths.landing.path,
      lazy: () => import("./pages/Landing").then(convert),
    },
  ]);

export const AppRouter = () => {
  const router = createAppRouter();

  return <RouterProvider router={router} />;
};
