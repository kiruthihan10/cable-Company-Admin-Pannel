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
  const user = useUserStore((state) => state.user);
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
      getItem("Company", "sub1", <Icon path={mdiDomain} size={1} />, [
        getItem("Companies", "1"),
        getItem("Add Company", "2"),
      ]),
      getItem("Employee", "sub2", <Icon path={mdiAccountHardHat} size={1} />, [
        getItem("Employees", "3"),
        getItem("Add Employee", "4"),
      ]),
    ];
    const AdminItems: MenuItem[] = [
      getItem("Customer", "sub1", <Icon path={mdiAccount} size={1} />, [
        getItem("Customers", "1"),
        getItem("Add Customer", "2"),
      ]),
      getItem("Employee", "sub2", <Icon path={mdiAccountHardHat} size={1} />, [
        getItem("Employees", "3"),
        getItem("Add Employee", "4"),
      ]),
      getItem("Area", "sub3", <Icon path={mdiSignDirection} size={1} />, [
        getItem("Areas", "5"),
        getItem("Add Area", "6"),
      ]),
      getItem("Payment", "sub4", <Icon path={mdiCash} size={1} />, [
        getItem("Payments", "7"),
        getItem("Add Payments", "8"),
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
      />
    </div>
  ) : null;
  console.log(user);
  return (
    <div>
      {menuComponent}
      {children}
    </div>
  );
};

export default Navbar;
