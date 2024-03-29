"use client";

import { useUserStore } from "@/stores/userStore";
import Icon from "@mdi/react";
import { Menu, MenuProps } from "antd";
import {
  mdiDomain,
  mdiAccountHardHat,
  mdiAccount,
  mdiSignDirection,
  mdiCash,
  mdiHome,
  mdiCog,
  mdiLogout,
} from "@mdi/js";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { urls } from "@/constants";

interface INavbar {
  children: React.ReactNode;
}

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const Navbar = (props: INavbar) => {
  const { children } = props;
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);
  const [items, setItems] = useState<MenuItem[]>();
  const [windowHeight, setWindowHeight] = useState(0);
  useEffect(() => {
    setWindowHeight(window.innerHeight);
  }, []);
  useEffect(() => {
    const commonTopItems: MenuItem[] = [
      getItem("Home", "home", <Icon path={mdiHome} size={1} />),
    ];
    const commonBottomItems: MenuItem[] = [
      getItem("Settings", "settings", <Icon path={mdiCog} size={1} />),
      getItem("Logout", "logout", <Icon path={mdiLogout} size={1} />),
    ];
    const superAdminItems: MenuItem[] = [
      getItem("Company", "company", <Icon path={mdiDomain} size={1} />, [
        getItem("Companies", "companies"),
        getItem("Add Company", "addCompanies"),
      ]),
      getItem(
        "Employee",
        "employee",
        <Icon path={mdiAccountHardHat} size={1} />,
        [
          getItem("Employees", "employees"),
          getItem("Add Employee", "addEmployee"),
        ]
      ),
    ];
    const AdminItems: MenuItem[] = [
      getItem("Customer", "customer", <Icon path={mdiAccount} size={1} />, [
        getItem("Customers", "customers"),
        getItem("Add Customer", "addCustomers"),
      ]),
      getItem(
        "Employee",
        "employee",
        <Icon path={mdiAccountHardHat} size={1} />,
        [
          getItem("Employees", "employees"),
          getItem("Add Employee", "addEmployee"),
        ]
      ),
      getItem("Area", "area", <Icon path={mdiSignDirection} size={1} />, [
        getItem("Areas", "areas"),
        getItem("Add Area", "addArea"),
      ]),
      getItem("Payment", "payment", <Icon path={mdiCash} size={1} />, [
        getItem("Payments", "payments"),
        getItem("Add Payments", "addPayment"),
      ]),
    ];
    const addCommonItems = (newItems: MenuItem[]) => {
      let newArray = commonTopItems.concat(newItems);
      newArray = newArray.concat(commonBottomItems);
      setItems(newArray);
    };
    if (user?.userType === "Internal") {
      addCommonItems(superAdminItems);
    } else if (user?.userType === "Admin") {
      addCommonItems(AdminItems);
    }
  }, [user?.userType]);
  const menuComponent = user ? (
    <div
      style={{
        width: 256,
        position: "fixed",
        top: 120,
        height: windowHeight - 120,
        borderTop: "1px solid black",
      }}
    >
      <Menu
        items={items}
        style={{
          height: windowHeight - 100,
        }}
        onClick={(key) => {
          switch (key.key) {
            case "home":
              router.push(`/${urls.home}`);
              break;
            case "customers":
              router.push("customer");
              break;
            case "companies":
              router.push(`/${urls.company}`);
              break;
            case "addCompanies":
              router.push(`/${urls.company}/${urls.add}`);
              break;
            case "logout":
              removeUser();
              router.push("/");
              break;
            case "employees":
              router.push(`/${urls.employee}`);
              break;
            case "addEmployee":
              router.push(`/${urls.employee}/${urls.add}`);
              break;
          }
        }}
      />
    </div>
  ) : null;
  return (
    <div>
      {menuComponent}
      <div
        style={{
          position: "absolute",
          top: 180,
          left: 300,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default Navbar;
