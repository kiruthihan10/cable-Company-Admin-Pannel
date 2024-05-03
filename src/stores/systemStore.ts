import { NotificationArgsProps } from "antd";
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

export type NotificationType = "success" | "info" | "warning" | "error";

interface INotification extends NotificationArgsProps {
  notificationType?: NotificationType;
}

interface ISystemStoreState {
  header: header;
  setHeader: (header: header) => void;
  isDarkMode: boolean;
  setIsDarkMode: (darkMode: boolean) => void;
  noticationProps: INotification | undefined;
  setNotification: (props: INotification | undefined) => void;
}

export const useSystemStore = create<ISystemStoreState>()(
  persist(
    (set, get) => ({
      header: "Login",
      setHeader: (header: header) => set({ header: header }),
      isDarkMode: true,
      setIsDarkMode: (darkMode) => set({ isDarkMode: darkMode }),
      noticationProps: undefined,
      setNotification: (props) => set({ noticationProps: props }),
    }),
    {
      name: "SKPT_system", // name of the item in the storage (must be unique),
    }
  )
);
