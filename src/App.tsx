import { RouterProvider } from "react-router-dom";
import router from "./config/routes";
import { NextUIProvider } from "@nextui-org/system";

function App() {
  return (
    <NextUIProvider>
      <RouterProvider router={router} />
    </NextUIProvider>
  );
}

export default App;
