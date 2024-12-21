import { RouterProvider } from "react-router-dom";
import router from "./config/routes";
import { NextUIProvider } from "@nextui-org/system";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </NextUIProvider>
  );
}

export default App;
