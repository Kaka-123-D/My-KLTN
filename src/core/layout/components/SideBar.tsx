import React, { useState } from "react";
import { Button, Layout, Menu } from "antd";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

import styles from "./styles.module.scss";

const { Sider } = Layout;

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Option 1", "1", <span>a</span>),
  getItem("Option 2", "2", <span>b</span>),
  getItem("User", "sub1", <span>c</span>, [
    getItem("Tom", "3"),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <span>d</span>, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <span>e</span>),
];

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className={styles.sidebar}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <Button className="btn">Tạo Class +</Button>
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
        />
      </Sider>
    </div>
  );
};

export default SideBar;
