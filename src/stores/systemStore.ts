import { create } from "zustand";
import { persist } from "zustand/middleware";

export type header =
  | "Login"
  | "Settings"
  | "Employees"
  | "Add Employee"
  | "Customers"
  | "Add Customer"
  | "Payments"
  | "Companies"
  | "Add Companies"
  | "Home"
  | "Areas"
  | "Add Area";

interface ISystemStoreState {
  header: header;
  setHeader: (header: header) => void;
  isDarkMode: boolean;
  setIsDarkMode: (darkMode: boolean) => void;
}

export const useSystemStore = create<ISystemStoreState>()(
  persist(
    (set, get) => ({
      header: "Login",
      setHeader: (header: header) => set({ header: header }),
      isDarkMode: true,
      setIsDarkMode: (darkMode) => set({ isDarkMode: darkMode }),
    }),
    {
      name: "SKPT_system", // name of the item in the storage (must be unique),
    }
  )
);
