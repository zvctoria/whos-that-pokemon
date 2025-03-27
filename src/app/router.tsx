import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { useMemo } from "react";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { paths } from "./config/paths";

// renames Default export/property of given module to expected "Component"
const convert = (queryClient: QueryClient) => (mod: any) => {
  // if clientLoader or clientAction is defined within the imported module,
  // invoke with the queryClient argument for shared resourses. Else, undefined
  const { clientLoader, clientAction, default: Component, ...rest } = mod;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

// implicit return
export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.landing.path,
      children: [
        {
          index: true,
          loader: async () => redirect("/pokemon"),
        },
        {
          path: "pokemon",
          lazy: () => import("./pages/Landing").then(convert(queryClient)),
        },
      ],
    },
    {
      path: "*",
      lazy: () => import("./pages/NotFound").then(convert(queryClient)),
    },
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();

  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);

  return <RouterProvider router={router} />;
};
