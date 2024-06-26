"use client";

import { useUserStore } from "@/stores/userStore";
import Icon from "@mdi/react";
import {
  Button,
  Drawer,
  Menu,
  MenuProps,
  Space,
  Spin,
  Tooltip,
  notification,
} from "antd";
import {
  mdiDomain,
  mdiAccountHardHat,
  mdiAccount,
  mdiSignDirection,
  mdiCash,
  mdiHome,
  mdiCog,
  mdiLogout,
  mdiArrowRight,
} from "@mdi/js";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { urls } from "@/constants";
import { useWindow } from "@/external/utils";
import { useSystemStore } from "@/stores/systemStore";

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
  const noticationProps = useSystemStore((state) => state.noticationProps);
  const [api, contextHolder] = notification.useNotification();
  const user = useUserStore((state) => state.user);
  const removeUser = useUserStore((state) => state.removeUser);
  const [items, setItems] = useState<MenuItem[]>();
  const { windowHeight } = useWindow();
  const [showSpinner, setShowSpinner] = useState(true);
  const [showNavbar, setShowNavbar] = useState(true);
  const [expandButtonLeft, setExpandButtonLeft] = useState(15);
  const showDrawer = () => {
    setShowNavbar(true);
  };

  const onClose = () => {
    setShowNavbar(false);
  };

  useEffect(() => {
    setShowSpinner(window.location.pathname === "/" && user?.username === "");
  }, [user?.username]);
  useEffect(() => {
    return () => {
      setTimeout(() => {
        if (window.location.pathname === "/" && user?.username === "") {
          removeUser();
        }
        setShowSpinner(false);
      }, 2000);
    };
  });
  useEffect(() => {
    if (user?.username === null || user?.username === "") {
      router.push("/");
    }
  }, [router, user?.username]);
  useEffect(() => {
    if (noticationProps != undefined) {
      if (noticationProps.notificationType === undefined) {
        api.open(noticationProps);
      } else {
        api[noticationProps.notificationType](noticationProps);
      }
    }
  }, [api, noticationProps]);
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
        <Icon path={mdiAccountHardHat} size={1} />
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
        <Icon path={mdiAccountHardHat} size={1} />
      ),
      getItem("Area", "area", <Icon path={mdiSignDirection} size={1} />),
      // getItem("Payment", "payment", <Icon path={mdiCash} size={1} />, [
      //   getItem("Payments", "payments"),
      //   getItem("Add Payments", "addPayment"),
      // ]),
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
        height: windowHeight - 120,
        borderTop: "1px solid black",
        left: 0,
        top: 120,
      }}
    >
      <Menu
        items={items}
        style={{
          height: windowHeight - 100,
        }}
        onClick={(key) => {
          setShowNavbar(false);
          switch (key.key) {
            case "home":
              router.push(`/${urls.home}`);
              break;
            case "customers":
              router.push(`/${urls.customer}`);
              break;
            case "addCustomers":
              router.push(`/${urls.customer}/${urls.add}`);
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
            case "employee":
              router.push(`/${urls.employee}`);
              break;
            case "addEmployee":
              router.push(`/${urls.employee}/${urls.add}`);
              break;
            case "area":
              router.push(`/${urls.area}`);
              break;
            case "settings":
              router.push(`/${urls.settings}`)
              break;
          }
        }}
      />
    </div>
  ) : null;
  if (showSpinner) {
    // Allow Store to load
    return <Spin />;
  }
  const collapsableMenuComponent = showNavbar ? (
    <Drawer
      placement="left"
      open={true}
      closable={false}
      onClose={onClose}
      key="left"
      rootStyle={{ padding: 0, paddingTop: 0 }}
      style={{ position: "absolute", top: 120, padding: 0, paddingTop: 0 }}
      width={256}
    >
      {menuComponent}
    </Drawer>
  ) : (
    <Tooltip title="Expand">
      <Button
        type="primary"
        shape="circle"
        icon={<Icon path={mdiArrowRight} size={1} />}
        style={{
          position: "fixed",
          top: windowHeight / 2,
          left: -{ expandButtonLeft },
          zIndex: 10,
        }}
        onClick={showDrawer}
      />
    </Tooltip>
  );
  return (
    <Space>
      {collapsableMenuComponent}
      <div
        style={
          user
            ? {
                position: "absolute",
                top: 180,
                left: 20,
                marginRight: 20,
                right: 20,
              }
            : {
                position: "absolute",
                top: 180,
              }
        }
      >
        {children}
        {contextHolder}
      </div>
    </Space>
  );
};

export default Navbar;
