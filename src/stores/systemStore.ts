import { create } from "zustand";
import { persist } from "zustand/middleware";

type header =
  | "Login"
  | "Employees"
  | "Create Employee"
  | "View Employee"
  | "Customers"
  | "Add Customer"
  | "View Customer"
  | "Add Payment"
  | "Past Payments"
  | "Payments"
  | "Settings"
  | "Update Customer"
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
