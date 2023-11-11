import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  RadarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Menu, MenuProps, Button } from "antd";
import "./Nav.css";
import { useSelector, useDispatch } from "react-redux";
import { setCollapsed } from "../../stores/menuSlice.js";
import { useHistory } from "react-router-dom";
import React from "react";

type MenuItem = Required<MenuProps>["items"][number];


export default function Nav() {
  const dispatch = useDispatch();
  const history = useHistory();

  const collapsed = useSelector((state) => state.menu.value.collapsed);

  const toggleCollapsed = () => dispatch(setCollapsed(!collapsed));

  function handleMenuClick(payload) {
    console.log(payload.key);
    history.push(payload.key);
  }

  return (
    <div className="menu">
      <Menu
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        onClick={handleMenuClick}
        items={items}
      />

      <div className="nav-footer">
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{ marginBottom: 16, width: !collapsed ? 300 : 80 }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
    </div>
  );
}

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

const items: MenuItem[] = [
  getItem("首页", "/home", <RadarChartOutlined />),
  getItem("井字棋", "/tictactoe", <PieChartOutlined />),
  getItem("菜单管理", "/menu", <DesktopOutlined />),
  getItem("倒计时", "/countDown", <DesktopOutlined />),
  getItem("计数器", "/counter", <DesktopOutlined />),

  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),

  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),

    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]),
];
