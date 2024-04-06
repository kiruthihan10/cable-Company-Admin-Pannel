import { create } from "zustand";
import { persist } from "zustand/middleware";

export type header =
  | "Login"
  | "Employees"
  | "Add Employee"
  | "Customers"
  | "Add Customer"
  | "Payments"
  | "Companies"
  | "Add Companies"
  | "Home"
  | "Areas";

interface ISystemStoreState {
  header: header;
  setHeader: (header: header) => void;
}

export const useSystemStore = create<ISystemStoreState>()(
  persist(
    (set, get) => ({
      header: "Login",
      setHeader: (header: header) => set({ header: header }),
    }),
    {
      name: "SKPT_system", // name of the item in the storage (must be unique),
    }
  )
);
