import { useContext } from "react";
import { CateringContext } from "../contexts/CateringContext";

export function useCatering() {
  const context = useContext(CateringContext);

  if (!context) {
    throw new Error("useCatering must be used within a CateringProvider");
  }

  return context;
}
